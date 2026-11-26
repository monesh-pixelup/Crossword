import type { PortableTextBlock } from "@portabletext/react";
import generated from "../content/posts.generated.json";

/**
 * The journal's posts. Each is a Markdown file in content/blog/posts, written by the Notion sync (or by hand), and
 * turned into posts.generated.json by scripts/blog/build.mjs before every build. The site reads that JSON, never the
 * files, since a Cloudflare Worker has no file system. A post changes only through a new build, so pages stay static.
 */

/** A table in a post: its first row is the header, each row's first cell its label. */
export type PostTableBlock = { _type: "table"; _key: string; rows?: { _key: string; cells?: string[] }[] };
/** An image in a post, on its own line: served from /media (R2), already resized and converted by the sync. */
export type PostImageBlock = { _type: "image"; _key: string; src: string; alt: string; caption?: string; width?: number; height?: number };
/** A --- rule between parts of the text. */
export type PostDividerBlock = { _type: "divider"; _key: string };
export type BodyBlock = PortableTextBlock | PostTableBlock | PostImageBlock | PostDividerBlock;

/** One titled part of a post: its anchor (for the Index), its heading and what follows it. */
export type BlogSection = { id: string; title: string; content: BodyBlock[] };

export type BlogPostSummary = {
  /** The post's URL segment, under /blog. */
  slug: string;
  title: string;
  category: string;
  /** Extra words after the category on the journal's card. */
  details: string[];
  /** Publication date, as shown ("11 November 2026"). */
  date: string;
  /** Publication date as YYYY-MM-DD, and the exact moment (ISO), for structured data and the sitemap. */
  publishedAt: string;
  publishAt: string;
  /** One line for the home page, search results and link previews. */
  summary: string;
  featured: boolean;
  /** The post's own cover image (null: the journal's cover art), and where its focus sits for object-position. */
  cover: { src: string; alt: string; position: string } | null;
  /** Who wrote it (null: none chosen, shown as the Crossword team). */
  author: { name: string; role: string; photo: string | null } | null;
  /**
   * The post's place in the journal counted from the oldest (0), which picks its cover art when it has no cover of its
   * own (see cover-art.ts). Counted from the oldest so a new post doesn't change the others' covers.
   */
  coverIndex: number;
  /** "Hide from search": left out of the sitemap and marked noindex. */
  noindex: boolean;
  /** When the post last changed after it was first published (ISO), if it has. */
  updatedAt: string | null;
};

export type BlogPost = BlogPostSummary & {
  /** What comes before the first section heading (the Index's "Introduction"). */
  intro: BodyBlock[];
  sections: BlogSection[];
  /** Reading time in minutes, from the article's length (at 230 words a minute, at least 1). */
  readingMinutes: number;
  seo: { title: string; description: string; keywords: string[]; canonical: string | null; socialImage: string | null; noindex: boolean };
  schemaType: "BlogPosting" | "Article" | "HowTo";
  /** The questions of the article's "Frequently asked questions" part, for FAQ structured data. */
  faq: { question: string; answer: string }[];
  /** Up to three other posts to read next. */
  related: BlogPostSummary[];
};

/** A post as build.mjs writes it. */
type RawPost = {
  slug: string;
  title: string;
  category: string;
  details: string[];
  publishedAt: string;
  publishAt: string;
  summary: string;
  featured: boolean;
  cover: { src: string; alt?: string; position?: string } | null;
  author: { name: string; role: string; photo: string | null } | null;
  seo: BlogPost["seo"];
  faq: BlogPost["faq"];
  schemaType: string;
  related: string[];
  updatedAt: string | null;
  body: BodyBlock[];
};
// The JSON's inferred types are too narrow (a field that is null in every post today), so it's read as RawPost.
const content = generated as unknown as { categories: string[]; posts: RawPost[] };

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function summarize(post: RawPost, coverIndex: number): BlogPostSummary {
  const { cover } = post;
  return {
    slug: post.slug,
    title: post.title,
    category: post.category,
    details: post.details,
    date: dateFormat.format(new Date(`${post.publishedAt}T00:00:00Z`)),
    publishedAt: post.publishedAt,
    publishAt: post.publishAt,
    summary: post.summary,
    featured: post.featured,
    cover: cover?.src ? { src: cover.src, alt: cover.alt ?? "", position: cover.position ?? "50% 50%" } : null,
    author: post.author,
    coverIndex,
    noindex: post.seo.noindex,
    updatedAt: post.updatedAt,
  };
}

const plainText = (block: BodyBlock) =>
  "children" in block && Array.isArray(block.children)
    ? block.children.map((child) => ("text" in child ? String(child.text) : "")).join("")
    : "";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "section";

/** Splits the article at each "Section heading": what comes before is the intro, each heading starts a section. */
function splitBody(body: BodyBlock[]) {
  const intro: BodyBlock[] = [];
  const sections: BlogSection[] = [];
  const used = new Set(["introduction"]);
  for (const block of body) {
    if (block._type === "block" && "style" in block && block.style === "h2") {
      const title = plainText(block);
      let id = slugify(title);
      for (let n = 2; used.has(id); n++) id = `${slugify(title)}-${n}`;
      used.add(id);
      sections.push({ id, title, content: [] });
    } else {
      (sections.at(-1)?.content ?? intro).push(block);
    }
  }
  return { intro, sections };
}

/** The posts as built, newest first (build.mjs sorts them). */
const raw = content.posts;
const summaries = raw.map((post, i) => summarize(post, raw.length - 1 - i));

/** Every post, newest first. */
export async function getPosts(): Promise<BlogPostSummary[]> {
  return summaries;
}

/** The post at `slug`, with its article, if there is one. */
export async function getPost(slug: string): Promise<BlogPost | null> {
  const i = raw.findIndex((p) => p.slug === slug);
  if (i < 0) return null;
  const post = raw[i];
  const body = post.body;
  const words = body.reduce((n, block) => n + plainText(block).split(/\s+/).filter(Boolean).length, 0);
  return {
    ...summaries[i],
    ...splitBody(body),
    readingMinutes: Math.max(1, Math.round(words / 230)),
    seo: post.seo,
    schemaType: post.schemaType as BlogPost["schemaType"],
    faq: post.faq,
    related: post.related.flatMap((r) => summaries.filter((s) => s.slug === r)),
  };
}

/** The post the header's Platform menu shows: its page and title. */
export type MenuPost = { href: string; title: string };

/**
 * The post for the header's Platform menu card, its title line and READ MORE: the starred post (Starred in Notion, as
 * on the home page's Blog section), else the newest. With no posts, null.
 */
export async function getMenuPost(): Promise<MenuPost | null> {
  const post = summaries.find((p) => p.featured) ?? summaries[0];
  return post ? { href: `/blog/${post.slug}`, title: post.title } : null;
}
