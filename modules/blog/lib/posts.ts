import { cacheLife, cacheTag } from "next/cache";
import { defineQuery, type PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

/**
 * The journal's posts, read from Sanity (edited at /studio). Every read is cached under the "blog" tag until Sanity's
 * webhook (app/api/revalidate) reports a change, so pages stay static and update within seconds of a publish. Without
 * the webhook they still refresh on their own, about an hour after a change (the "hours" profile).
 */
export const BLOG_TAG = "blog";

/** A table in a post: its first row is the header, each row's first cell its label. */
export type PostTableBlock = { _type: "table"; _key: string; rows?: { _key: string; cells?: string[] }[] };
export type BodyBlock = PortableTextBlock | PostTableBlock;

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
  /** One line for the home page, search results and link previews. */
  summary: string;
  featured: boolean;
  /** The editor's cover image (null: the journal's own cover art), and where its hotspot sits for object-position. */
  cover: { src: string; position: string } | null;
  /** Who wrote it (null: none chosen, shown as the Crossword team), with their photo cropped square if they have one. */
  author: { name: string; role: string; photo: string | null } | null;
  /**
   * The post's place in the journal counted from the oldest (0), which picks its cover art when it has no cover of its
   * own (see cover-art.ts). Counted from the oldest so a new post doesn't change the others' covers.
   */
  coverIndex: number;
};

export type BlogPost = BlogPostSummary & {
  /** What comes before the first section heading (the Index's "Introduction"). */
  intro: BodyBlock[];
  sections: BlogSection[];
  /** Reading time in minutes, from the article's length (at 230 words a minute, at least 1). */
  readingMinutes: number;
};

type RawCover = (SanityImageSource & { asset?: unknown; hotspot?: { x: number; y: number } }) | null;
type RawAuthor = { name: string | null; role: string | null; photo: RawCover } | null;
type RawPost = Omit<BlogPostSummary, "date" | "cover" | "author" | "coverIndex"> & {
  publishedAt: string | null;
  cover: RawCover;
  author: RawAuthor;
  body?: BodyBlock[];
};

const fields = `
  "slug": slug.current,
  title,
  "category": coalesce(category->title, ""),
  "details": coalesce(details, []),
  publishedAt,
  "summary": coalesce(summary, ""),
  "featured": coalesce(featured, false),
  cover,
  "author": author->{ name, role, photo }
`;

const postsQuery = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) { ${fields} }`,
);
const postQuery = defineQuery(`*[_type == "post" && slug.current == $slug][0] { ${fields}, body }`);
const categoriesQuery = defineQuery(`*[_type == "category" && defined(title)] | order(coalesce(order, 999) asc, title asc).title`);

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function summarize({ publishedAt, cover, author, body: _body, ...post }: RawPost, coverIndex: number): BlogPostSummary {
  return {
    ...post,
    coverIndex,
    author: author?.name
      ? {
          name: author.name,
          role: author.role ?? "",
          photo: author.photo?.asset ? urlFor(author.photo).width(160).height(160).fit("crop").url() : null,
        }
      : null,
    date: publishedAt ? dateFormat.format(new Date(`${publishedAt}T00:00:00Z`)) : "",
    cover: cover?.asset
      ? {
          src: urlFor(cover).width(1800).fit("max").url(),
          position: cover.hotspot ? `${cover.hotspot.x * 100}% ${cover.hotspot.y * 100}%` : "50% 50%",
        }
      : null,
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

/** Every post, newest first. */
export async function getPosts(): Promise<BlogPostSummary[]> {
  "use cache";
  cacheTag(BLOG_TAG);
  cacheLife("hours");
  const posts = await client.fetch<RawPost[]>(postsQuery);
  return posts.map((post, i) => summarize(post, posts.length - 1 - i));
}

/** The post at `slug`, with its article, if there is one. */
export async function getPost(slug: string): Promise<BlogPost | null> {
  "use cache";
  cacheTag(BLOG_TAG);
  cacheLife("hours");
  const post = await client.fetch<RawPost | null>(postQuery, { slug });
  if (!post) return null;
  // Its cover art follows its place in the journal, as on the journal's card.
  const coverIndex = (await getPosts()).find((p) => p.slug === slug)?.coverIndex ?? 0;
  const body = post.body ?? [];
  const words = body.reduce((n, block) => n + plainText(block).split(/\s+/).filter(Boolean).length, 0);
  return { ...summarize(post, coverIndex), ...splitBody(body), readingMinutes: Math.max(1, Math.round(words / 230)) };
}

/** The journal's filters, in their set order. */
export async function getCategories(): Promise<string[]> {
  "use cache";
  cacheTag(BLOG_TAG);
  cacheLife("hours");
  return client.fetch<string[]>(categoriesQuery);
}

/**
 * The newest post's page, for the header's READ MORE (getPosts is newest first, cached and refreshed when a post is
 * published). With no posts, or Sanity out of reach, the journal.
 */
export async function getLatestPostHref(): Promise<string> {
  try {
    const [latest] = await getPosts();
    return latest ? `/blog/${latest.slug}` : "/blog";
  } catch {
    return "/blog";
  }
}
