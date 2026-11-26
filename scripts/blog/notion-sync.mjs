// Turns one Notion Articles page into content/blog/posts/<slug>.md, and its images into ready-to-serve files.
//
//   node scripts/blog/notion-sync.mjs <snapshot.json> --media-out <dir>
//
// The snapshot is what the sync run read from Notion (through the Notion connector) plus the files it downloaded:
//   {
//     "pageId": "424f90cd-…", "url": "https://app.notion.com/p/…", "lastEdited": "2026-11-26T10:00:47.249Z",
//     "properties": { …the Articles row, as the connector returns it: "Title", "Stage", "Slug", "Category",
//                     "SEO title", "SEO description", "Keywords", "date:Publish date:start", "Publish time (MT)",
//                     "Owner", "Starred", "Hide from search", "Canonical URL", "Schema type",
//                     "Cover alt text", "Cover focus", "Card details", "Related posts" … },
//     "markdown": "…the page body in Notion-flavored Markdown…",
//     "files": { "<file reference or URL as it appears in the markdown>": "/local/downloaded/file" },
//     "cover": "/local/cover-file" | null,
//     "socialImage": "/local/social-file" | null
//   }
// It writes the post file (creating, updating, renaming it after a slug change, or marking it archived), writes each
// image, resized and converted to WebP and named by its content, to <media-out>/blog/<slug>/, and prints a JSON report:
//   { slug, file, status: "created" | "updated" | "unchanged" | "archived", media: [paths under media-out],
//     unstarred: [{ slug, pageId }] (posts this one's star took over from), warnings, errors }
// Exit code 1 (with `errors`) when the page can't become a post, e.g. no slug or an unknown category.
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import YAML from "yaml";
import { markdownToPortableText, parsePostFile, writePostFile } from "./lib.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const postsDir = join(root, "content/blog/posts");
const args = process.argv.slice(2);
const snapshotPath = args.find((a) => !a.startsWith("--"));
const mediaOut = args[args.indexOf("--media-out") + 1];
if (!snapshotPath || !args.includes("--media-out") || !mediaOut) {
  console.error("usage: node scripts/blog/notion-sync.mjs <snapshot.json> --media-out <dir>");
  process.exit(2);
}

const snap = JSON.parse(readFileSync(snapshotPath, "utf8"));
const props = snap.properties ?? {};
const warnings = [];
const errors = [];
const media = [];
const unstarred = [];

const categories = YAML.parse(readFileSync(join(root, "content/blog/categories.yml"), "utf8"));
const authors = YAML.parse(readFileSync(join(root, "content/blog/authors.yml"), "utf8")) ?? {};
const AUTHORS_HEADER = `# Who writes posts, copied from the Notion Authors database by the sync (edit them there). A post's \`author\` is one
# of these ids; without one the post is by "Crossword team".
# notionUser: the person's Notion user id (Authors "Person"), so a card with no Author falls back to its Owner.
# notionPage: the Authors row. photo: a square headshot under /media/authors, shown in the byline.
`;

/** Every post file, by Notion page id, so a page is matched to its post even after its slug changes. */
const existing = new Map();
const slugByPage = new Map();
for (const f of readdirSync(postsDir).filter((f) => f.endsWith(".md"))) {
  const { data, body } = parsePostFile(readFileSync(join(postsDir, f), "utf8"));
  const id = normId(data.notion?.pageId);
  if (id) {
    existing.set(id, { file: f, data, body });
    slugByPage.set(id, data.slug);
  }
}

function normId(id) {
  const hex = String(id ?? "").replace(/-/g, "").match(/[0-9a-f]{32}/i)?.[0];
  return hex ? hex.toLowerCase() : null;
}
const text = (v) => (v == null ? "" : String(v).trim());
const yes = (v) => v === true || v === "__YES__" || v === "Yes";
const list = (v) => {
  if (Array.isArray(v)) return v;
  try {
    const parsed = JSON.parse(v);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return v ? [v] : [];
  }
};

const pageId = normId(snap.pageId);
const prev = pageId ? existing.get(pageId) : null;
const stage = text(props.Stage);
const slug = text(props.Slug).toLowerCase();
if (!pageId) errors.push("pageId is missing");
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) errors.push(`Slug "${slug}" must be lowercase-words-with-dashes`);
const clash = [...existing.values()].find((p) => p.data.slug === slug && normId(p.data.notion?.pageId) !== pageId);
if (clash || (!prev && existsSync(join(postsDir, `${slug}.md`)) && !clash)) errors.push(`another post already uses the slug "${slug}"`);
const category = text(props.Category);
if (!categories.includes(category)) errors.push(`Category "${category}" must be one of: ${categories.join(", ")}`);
const date = text(props["date:Publish date:start"]).slice(0, 10);
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.push("Publish date is missing");
if (!text(props.Title)) errors.push("Title is missing");
if (errors.length) done("error");

// --- Publish moment: the date and "Publish time (MT)" in America/Denver (empty = 9:00 AM). ---------------------------
function denverInstant(day, timeLabel) {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(timeLabel || "9:00 AM");
  let hour = Number(m?.[1] ?? 9) % 12;
  if (m?.[3]?.toUpperCase() === "PM") hour += 12;
  const minute = Number(m?.[2] ?? 0);
  // Find the UTC offset Denver has on that day at that time (MST -7, MDT -6).
  const guess = new Date(`${day}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00Z`);
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: "America/Denver", hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
      .formatToParts(guess)
      .map((p) => [p.type, p.value]),
  );
  const asDenver = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
  const offsetMin = Math.round((asDenver - guess.getTime()) / 60000);
  const instant = new Date(guess.getTime() - offsetMin * 60000);
  const sign = offsetMin <= 0 ? "-" : "+";
  const off = `${sign}${String(Math.floor(Math.abs(offsetMin) / 60)).padStart(2, "0")}:${String(Math.abs(offsetMin) % 60).padStart(2, "0")}`;
  const local = `${day}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00${off}`;
  return { iso: instant.toISOString(), local };
}
const timeLabel = text(props["Publish time (MT)"]);
// A post moved here from Sanity keeps its exact old time (it orders same-day posts) while its date and time stay as they were.
const keepOldTime = prev && String(prev.data.publishedAt) === date && !timeLabel && prev.data.publishAt;
const publishAt = keepOldTime ? prev.data.publishAt : denverInstant(date, timeLabel).local;

// --- Images: resize, convert, name by content. ----------------------------------------------------------------------
async function processImage(localPath, purpose) {
  const input = readFileSync(localPath);
  const ext = extname(localPath).toLowerCase();
  const stem =
    basename(localPath, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || purpose;
  let out;
  let outExt = ".webp";
  let width;
  let height;
  if (ext === ".svg") {
    out = input;
    outExt = ".svg";
  } else {
    const animated = ext === ".gif";
    const img = sharp(input, { animated }).rotate();
    const maxWidth = purpose === "cover" || purpose === "social" ? 2400 : 1760;
    // An author photo is shown small and round in the byline: a 512px square is plenty.
    const resized =
      purpose === "author"
        ? img.resize({ width: 512, height: 512, fit: "cover", withoutEnlargement: true })
        : img.resize({ width: maxWidth, withoutEnlargement: true });
    out = await resized.webp({ quality: 82, effort: 5 }).toBuffer();
    const meta = await sharp(out, { animated }).metadata();
    width = meta.width;
    height = animated ? meta.pageHeight : meta.height;
  }
  const hash = createHash("sha256").update(out).digest("hex").slice(0, 10);
  const name = `${stem}-${hash}${outExt}`;
  const folder = purpose === "author" ? "authors" : `blog/${slug}`;
  const dir = join(mediaOut, folder);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, name), out);
  media.push(`${folder}/${name}`);
  return { src: `/media/${folder}/${name}`, width, height };
}

// --- Notion-flavored Markdown to the site's Markdown. ---------------------------------------------------------------
async function convertBody(md) {
  let s = md.replace(/\r\n/g, "\n");
  // Callouts are notes for the team, never published.
  s = s.replace(/<callout\b[^>]*>[\s\S]*?<\/callout>/g, "");
  s = s.replace(/<empty-block\s*\/>/g, "").replace(/<table-of-contents\b[^>]*\/>/g, "");
  // Toggles become a subheading with their content under it (a FAQ question and its answer).
  s = s.replace(/<toggle\b[^>]*>([^\n]*)\n([\s\S]*?)<\/toggle>/g, (_, title, inner) => `### ${title.trim()}\n\n${inner.trim()}\n`);
  s = s.replace(/<details>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g, (_, title, inner) => `### ${title.trim()}\n\n${inner.trim()}\n`);
  s = s.replace(/<\/?(columns|column)\b[^>]*>/g, "");
  s = s.replace(/<quote\b[^>]*>([\s\S]*?)<\/quote>/g, (_, inner) => inner.trim().split("\n").map((l) => `> ${l}`).join("\n"));
  // XML tables (styled ones) to pipe tables.
  s = s.replace(/<table\b[^>]*>([\s\S]*?)<\/table>/g, (_, inner) => {
    const rows = [...inner.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)].map((r) => [...r[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/g)].map((c) => c[1].replace(/<br\s*\/?>/g, " ").replace(/\|/g, "\\|").trim()));
    if (!rows.length) return "";
    return [`| ${rows[0].join(" | ")} |`, `| ${rows[0].map(() => "---").join(" | ")} |`, ...rows.slice(1).map((r) => `| ${r.join(" | ")} |`)].join("\n");
  });

  // Images, in either form, each on its own line.
  const images = [];
  s = s.replace(/<image\b[^>]*source="([^"]+)"[^>]*>([\s\S]*?)<\/image>|<image\b[^>]*source="([^"]+)"[^>]*\/>/g, (_, src, caption, src2) => {
    images.push({ src: src ?? src2, caption: (caption ?? "").trim() });
    return `\n\n@@IMAGE${images.length - 1}@@\n\n`;
  });
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (_, caption, src) => {
    images.push({ src, caption: caption.trim() });
    return `\n\n@@IMAGE${images.length - 1}@@\n\n`;
  });
  // Other embedded files aren't published yet.
  s = s.replace(/<(video|audio|pdf|file|embed|bookmark)\b[^>]*>([\s\S]*?)<\/\1>|<(video|audio|pdf|file|embed|bookmark)\b[^>]*\/>/g, (m, tag, _c, tag2) => {
    warnings.push(`left out a ${tag ?? tag2} block: only images are published for now`);
    return "";
  });

  // Inline tags.
  s = s
    .replace(/<b>([\s\S]*?)<\/b>/g, "**$1**")
    .replace(/<i>([\s\S]*?)<\/i>/g, "*$1*")
    .replace(/<s>([\s\S]*?)<\/s>/g, "$1")
    .replace(/<u>([\s\S]*?)<\/u>/g, "$1")
    .replace(/<span\b[^>]*>([\s\S]*?)<\/span>/g, "$1")
    .replace(/<mention\b[^>]*>([\s\S]*?)<\/mention>/g, "$1")
    .replace(/<mention\b[^>]*\/>/g, () => {
      warnings.push("left out a mention with no label");
      return "";
    })
    .replace(/<date\b[^>]*start="([^"]+)"[^>]*\/>/g, "$1")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<link-preview\b[^>]*url="([^"]+)"[^>]*\/>/g, "$1");
  const leftover = s.match(/<\/?[a-z][a-z-]*\b[^>]*>/g);
  if (leftover) {
    warnings.push(`removed unsupported Notion tags: ${[...new Set(leftover.map((t) => t.replace(/\s.*$/, ">")))].join(", ")}`);
    s = s.replace(/<\/?[a-z][a-z-]*\b[^>]*>/g, "");
  }

  // Now the images: download already done by the caller; process and put them back as Markdown.
  for (let i = 0; i < images.length; i++) {
    const { src, caption } = images[i];
    const local = snap.files?.[src];
    let replacement = "";
    if (!local || !existsSync(local)) {
      if (/^https?:\/\//.test(src) && !/(notion|amazonaws)\./.test(src)) {
        warnings.push(`an image links to another site (${src}); it was left as a link, not copied`);
        replacement = `![${caption}](${src})`;
      } else errors.push(`an image wasn't downloaded (${src.slice(0, 80)})`);
    } else {
      const img = await processImage(local, "inline");
      if (!caption) errors.push(`an image has no caption to use as alt text (${basename(local)}); the SEO (AI) stage writes one`);
      replacement = `![${caption.replace(/[[\]]/g, "")}](${img.src}${img.width ? ` "=${img.width}x${img.height}"` : ""})`;
    }
    s = s.replace(`@@IMAGE${i}@@`, replacement);
  }
  return s.replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

// --- Build the post. ------------------------------------------------------------------------------------------------
const body = await convertBody(snap.markdown ?? "");
const { warnings: mdWarnings } = markdownToPortableText(body, slug);
warnings.push(...mdWarnings);

// The byline. The run puts the Authors row in the snapshot (the card's Author, else the Owner's row); this copies it
// into authors.yml, which the build reads. Without a row, the Owner is matched to authors.yml by Notion user.
const ownerIds = list(props.Owner).map((u) => String(u).replace(/^user:\/\//, ""));
let authorId;
let authorsChanged = false;
if (snap.author?.name) {
  const row = snap.author;
  const rowId = normId(row.pageId);
  const rowUser = String(list(row.person)[0] ?? "").replace(/^user:\/\//, "");
  // The entry for this Authors row, else (for entries written before Authors existed) the one with its person.
  authorId =
    Object.entries(authors).find(([, a]) => rowId && normId(a.notionPage) === rowId)?.[0] ??
    Object.entries(authors).find(([, a]) => rowUser && !a.notionPage && a.notionUser === rowUser)?.[0];
  if (!authorId) {
    const base = row.name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "author";
    authorId = base;
    for (let n = 2; authors[authorId] && normId(authors[authorId].notionPage) !== rowId && authors[authorId].name !== row.name; n++) authorId = `${base}-${n}`;
  }
  const entry = {
    name: row.name,
    ...(row.role && { role: row.role }),
    ...(list(row.person)[0] && { notionUser: String(list(row.person)[0]).replace(/^user:\/\//, "") }),
    ...(rowId && { notionPage: rowId }),
  };
  if (row.photo) entry.photo = (await processImage(row.photo, "author")).src;
  else if (authors[authorId]?.photo && !row.photoRemoved) entry.photo = authors[authorId].photo;
  if (JSON.stringify(authors[authorId]) !== JSON.stringify(entry)) {
    authors[authorId] = entry;
    authorsChanged = true;
  }
} else {
  authorId = Object.entries(authors).find(([, a]) => ownerIds.includes(a.notionUser))?.[0];
  if (ownerIds.length && !authorId) warnings.push("the Owner has no row in Authors, so the post shows \"Crossword team\"");
}

const related = list(props["Related posts"])
  .map((u) => slugByPage.get(normId(u)))
  .filter(Boolean)
  .filter((s) => s !== slug);

let cover = null;
if (snap.cover) {
  const img = await processImage(snap.cover, "cover");
  // Which part stays in view when the site crops the cover to a wide strip (Sanity's hotspot did this).
  const focus = { Top: "50% 0%", Bottom: "50% 100%", Left: "0% 50%", Right: "100% 50%" }[text(props["Cover focus"])];
  cover = { src: img.src, alt: text(props["Cover alt text"]), ...(focus && { position: focus }), width: img.width, height: img.height };
  if (!cover.alt) errors.push("Cover alt text is empty");
}
let socialImage = null;
if (snap.socialImage) socialImage = (await processImage(snap.socialImage, "social")).src;

const keywords = text(props.Keywords)
  .split(",")
  .map((k) => k.trim())
  .filter(Boolean);
// Words after the category on the journal's card (Sanity's "Extra details").
const details = text(props["Card details"])
  .split(",")
  .map((d) => d.trim())
  .filter(Boolean);
const summary = text(props["SEO description"]);
if (!summary) errors.push("SEO description is empty (it is also the post's summary)");

const data = {
  title: text(props.Title),
  slug,
  category,
  ...(authorId && { author: authorId }),
  publishedAt: date,
  publishAt,
  summary,
  featured: yes(props.Starred ?? props["Feature on home page"]),
  ...(details.length && { details }),
  ...(cover && { cover }),
  seo: {
    ...(text(props["SEO title"]) && { title: text(props["SEO title"]) }),
    description: summary,
    ...(keywords.length && { keywords }),
    ...(text(props["Canonical URL"]) && { canonical: text(props["Canonical URL"]) }),
    ...(socialImage && { socialImage }),
    ...(yes(props["Hide from search"]) && { noindex: true }),
  },
  ...(text(props["Schema type"]) && { schemaType: text(props["Schema type"]) }),
  ...(related.length && { related: related.slice(0, 3) }),
  ...(stage === "Archived" && { archived: true }),
  ...(prev?.data.sanityId && { sanityId: prev.data.sanityId }),
  notion: { pageId: snap.pageId, ...(snap.url && { url: snap.url }), ...(snap.lastEdited && { lastEdited: snap.lastEdited }) },
};

// A slug change keeps the old address working: it redirects to the new one.
const previousSlugs = new Set(prev?.data.previousSlugs ?? []);
if (prev && prev.data.slug !== slug) previousSlugs.add(prev.data.slug);
previousSlugs.delete(slug);
if (previousSlugs.size) data.previousSlugs = [...previousSlugs];

// What counts as a change: everything but the sync's own bookkeeping.
const comparable = (d, b) => JSON.stringify({ ...d, notion: undefined, updatedAt: undefined, body: b.trim() });
const changed = !prev || comparable(prev.data, prev.body) !== comparable(data, body);
// A live post that changes gets updatedAt (dateModified for search engines). The sync passes the time it shipped.
if (prev && changed && !data.archived) data.updatedAt = new Date().toISOString();
else if (prev?.data.updatedAt) data.updatedAt = prev.data.updatedAt;

if (!errors.length) {
  const file = `${slug}.md`;
  if (prev && prev.file !== file) renameSync(join(postsDir, prev.file), join(postsDir, file));
  if (changed || !prev) writeFileSync(join(postsDir, file), writePostFile(data, body));
  else if (snap.lastEdited && prev.data.notion?.lastEdited !== snap.lastEdited) writeFileSync(join(postsDir, file), writePostFile({ ...prev.data, notion: data.notion }, prev.body));
  if (authorsChanged) writeFileSync(join(root, "content/blog/authors.yml"), AUTHORS_HEADER + YAML.stringify(authors));
  // One starred post at a time: starring this one unstars every other post file (the run unticks them in Notion).
  if (data.featured && !data.archived) {
    for (const [id, other] of existing) {
      if (id === pageId || !other.data.featured) continue;
      const { featured, ...rest } = other.data;
      writeFileSync(join(postsDir, other.file), writePostFile(rest, other.body));
      unstarred.push({ slug: other.data.slug, pageId: other.data.notion?.pageId });
    }
  }
}
done(!prev ? "created" : data.archived && !prev.data.archived ? "archived" : changed ? "updated" : "unchanged");

function done(status) {
  const report = { slug, file: `content/blog/posts/${slug}.md`, status: errors.length ? "error" : status, media, unstarred, warnings, errors };
  process.stdout.write(JSON.stringify(report, null, 2) + "\n");
  process.exit(errors.length ? 1 : 0);
}
