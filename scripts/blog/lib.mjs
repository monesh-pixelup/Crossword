// Shared by the blog's build step (build.mjs), the Notion sync (notion-sync.mjs) and the Sanity export (from-sanity.mjs).
//
// A post is one Markdown file, content/blog/posts/<slug>.md: YAML front matter, then the article. The front matter
// uses the field names of the old Sanity "post" type (title, slug, category, author, publishedAt, summary, featured,
// details, cover), so moving back to Sanity is an import script, not a redesign. The article becomes Portable Text
// (Sanity's rich-text format) at build time, so the site renders it exactly as it rendered Sanity's.
import { createHash } from "node:crypto";
import { marked } from "marked";
import YAML from "yaml";

/** Splits a post file into its front matter (parsed) and its Markdown body. */
export function parsePostFile(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text);
  if (!match) throw new Error("the file must start with front matter between two --- lines");
  return { data: YAML.parse(match[1]) ?? {}, body: match[2] };
}

/** Writes a post file from its front matter and Markdown body. */
export function writePostFile(data, body) {
  const front = YAML.stringify(data, { lineWidth: 0 }).trimEnd();
  return `---\n${front}\n---\n\n${body.trim()}\n`;
}

/** Stable short keys, so rebuilding the same file gives the same output (Sanity needs a _key on every array item). */
function keyMaker(seed) {
  let n = 0;
  return () => createHash("sha1").update(`${seed}:${n++}`).digest("hex").slice(0, 12);
}

/**
 * Markdown to Portable Text. Supported: paragraphs, ## section headings (h2), ### subheadings (h3), > quotes, bullet and
 * numbered lists (nested too), **bold**, *italic*, `code`, links, tables, --- rules and images on a line of their own.
 * Anything else (HTML, code blocks) is left out and reported in `warnings`.
 */
export function markdownToPortableText(markdown, seed = "post") {
  const key = keyMaker(seed);
  const blocks = [];
  const warnings = [];

  /** Inline tokens to spans, with marks; links become markDefs on the block. */
  function spans(tokens, markDefs, marks = []) {
    const out = [];
    for (const t of tokens ?? []) {
      switch (t.type) {
        case "text":
          if (t.tokens?.length) out.push(...spans(t.tokens, markDefs, marks));
          else out.push({ _type: "span", _key: key(), text: decode(t.text), marks });
          break;
        case "escape":
          out.push({ _type: "span", _key: key(), text: t.text, marks });
          break;
        case "strong":
          out.push(...spans(t.tokens, markDefs, [...marks, "strong"]));
          break;
        case "em":
          out.push(...spans(t.tokens, markDefs, [...marks, "em"]));
          break;
        case "codespan":
          out.push({ _type: "span", _key: key(), text: decode(t.text), marks: [...marks, "code"] });
          break;
        case "link": {
          const k = key();
          markDefs.push({ _type: "link", _key: k, href: t.href });
          out.push(...spans(t.tokens, markDefs, [...marks, k]));
          break;
        }
        case "br":
          out.push({ _type: "span", _key: key(), text: "\n", marks });
          break;
        case "del":
          out.push(...spans(t.tokens, markDefs, marks));
          break;
        case "image":
          warnings.push(`an image inside a sentence was left out (${t.href}); put images on a line of their own`);
          break;
        default:
          if (t.raw?.trim()) warnings.push(`left out inline ${t.type}: ${t.raw.trim().slice(0, 60)}`);
      }
    }
    return out;
  }

  function textBlock(tokens, style, extra = {}) {
    const markDefs = [];
    // Neighbouring spans with the same marks are one span (escapes and entities split them).
    const children = [];
    for (const span of spans(tokens, markDefs)) {
      const last = children.at(-1);
      if (last && last.marks.join() === span.marks.join()) last.text += span.text;
      else children.push(span);
    }
    if (!children.length) return;
    blocks.push({ _type: "block", _key: key(), style, markDefs, children, ...extra });
  }

  function list(token, level) {
    for (const item of token.items) {
      // An item's own text, then any list nested under it.
      const inline = [];
      for (const t of item.tokens) {
        if (t.type === "list") {
          if (inline.length) textBlock(inline.splice(0), "normal", { listItem: token.ordered ? "number" : "bullet", level });
          list(t, level + 1);
        } else if (t.type === "text" || t.type === "paragraph") inline.push(...(t.tokens ?? [t]));
        else warnings.push(`left out ${t.type} inside a list`);
      }
      if (inline.length) textBlock(inline, "normal", { listItem: token.ordered ? "number" : "bullet", level });
    }
  }

  function cellText(cell) {
    return cell.tokens?.length ? spans(cell.tokens, []).map((s) => s.text).join("") : decode(cell.text);
  }

  for (const token of marked.lexer(markdown)) {
    switch (token.type) {
      case "space":
        break;
      case "heading":
        textBlock(token.tokens, token.depth <= 2 ? "h2" : "h3");
        if (token.depth === 1) warnings.push(`"# ${token.text}" became a section heading: the title is the post's only top heading`);
        break;
      case "paragraph": {
        const images = token.tokens.filter((t) => t.type === "image");
        const rest = token.tokens.filter((t) => t.type !== "image" && !(t.type === "text" && !t.text.trim()) && t.type !== "br");
        if (images.length && !rest.length) {
          for (const img of images) {
            // A title of "=1600x900" is the image's size (the sync writes it, so pages don't jump as images load);
            // any other title is a caption shown under the image.
            const size = /^=(\d+)x(\d+)$/.exec(img.title ?? "");
            blocks.push({
              _type: "image",
              _key: key(),
              src: img.href,
              alt: decode(img.text ?? ""),
              ...(size ? { width: Number(size[1]), height: Number(size[2]) } : img.title ? { caption: img.title } : {}),
            });
          }
        } else textBlock(token.tokens, "normal");
        break;
      }
      case "blockquote":
        for (const inner of token.tokens) {
          if (inner.type === "paragraph") textBlock(inner.tokens, "blockquote");
          else if (inner.type !== "space") warnings.push(`left out ${inner.type} inside a quote`);
        }
        break;
      case "list":
        list(token, 1);
        break;
      case "table":
        blocks.push({
          _type: "table",
          _key: key(),
          rows: [token.header, ...token.rows].map((row) => ({ _type: "tableRow", _key: key(), cells: row.map(cellText) })),
        });
        break;
      case "hr":
        blocks.push({ _type: "divider", _key: key() });
        break;
      default:
        warnings.push(`left out ${token.type}: ${String(token.raw).trim().slice(0, 60)}`);
    }
  }
  return { blocks, warnings };
}

const entities = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" };
const decode = (s) => String(s).replace(/&(amp|lt|gt|quot|#39);/g, (m) => entities[m]);

/** Portable Text back to Markdown: the Sanity export uses it, and it documents what the build supports. */
export function portableTextToMarkdown(blocks) {
  const out = [];
  let prevList = null;
  for (const b of blocks) {
    if (b._type === "table") {
      const rows = (b.rows ?? []).map((r) => (r.cells ?? []).map((c) => c.replace(/\|/g, "\\|")));
      const [head = [], ...rest] = rows;
      out.push(["| " + head.join(" | ") + " |", "| " + head.map(() => "---").join(" | ") + " |", ...rest.map((r) => "| " + r.join(" | ") + " |")].join("\n"));
      prevList = null;
      continue;
    }
    if (b._type === "image") {
      const title = b.width && b.height ? `=${b.width}x${b.height}` : b.caption;
      out.push(`![${b.alt ?? ""}](${b.src}${title ? ` "${title}"` : ""})`);
      prevList = null;
      continue;
    }
    if (b._type === "divider") {
      out.push("---");
      prevList = null;
      continue;
    }
    if (b._type !== "block") continue;
    const defs = Object.fromEntries((b.markDefs ?? []).map((d) => [d._key, d]));
    const text = (b.children ?? [])
      .map((c) => {
        let t = escapeInline(c.text ?? "");
        if (!t) return "";
        for (const m of c.marks ?? []) {
          if (m === "strong") t = `**${t}**`;
          else if (m === "em") t = `*${t}*`;
          else if (m === "code") t = `\`${t}\``;
          else if (defs[m]?._type === "link") t = `[${t}](${defs[m].href})`;
        }
        return t;
      })
      .join("");
    if (b.listItem) {
      const line = `${"  ".repeat((b.level ?? 1) - 1)}${b.listItem === "number" ? "1." : "-"} ${text}`;
      if (prevList) out[out.length - 1] += `\n${line}`;
      else out.push(line);
      prevList = b.listItem;
      continue;
    }
    prevList = null;
    if (b.style === "h2") out.push(`## ${text}`);
    else if (b.style === "h3") out.push(`### ${text}`);
    else if (b.style === "blockquote") out.push(`> ${text}`);
    else out.push(escapeLineStart(text));
  }
  return out.join("\n\n") + "\n";
}

/** Characters that would otherwise turn plain text into formatting. */
const escapeInline = (t) => t.replace(/([\\`*_[\]<])/g, "\\$1");
/** A paragraph that starts like a list, heading or quote ("1. Where…", "- ", "# ", "> ") stays a paragraph. */
const escapeLineStart = (t) => t.replace(/^(\d+)([.)] )/, "$1\\$2").replace(/^([-+#>] )/, "\\$1");

/** The words of a post's blocks, for reading time. */
export function plainText(blocks) {
  return blocks
    .map((b) => (b._type === "block" ? (b.children ?? []).map((c) => c.text).join("") : b._type === "table" ? (b.rows ?? []).flatMap((r) => r.cells ?? []).join(" ") : ""))
    .join("\n");
}
