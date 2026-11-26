// Turns content/blog into the JSON the site reads (modules/blog/content/posts.generated.json, not committed), and
// content/testimonials.yml into modules/landing/content/testimonials.generated.json.
// Runs before `next dev`, `next build` and `npm run lint` (see package.json), so the site never reads files at run
// time: a Cloudflare Worker has no file system. It fails the build, naming the file and the field, when a post is
// incomplete, so a broken post can't reach a preview.
//
//   node scripts/blog/build.mjs           build
//   node scripts/blog/build.mjs --check   only check, write nothing
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { markdownToPortableText, parsePostFile } from "./lib.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const dir = join(root, "content/blog");
const out = join(root, "modules/blog/content/posts.generated.json");
const checkOnly = process.argv.includes("--check");

const categories = YAML.parse(readFileSync(join(dir, "categories.yml"), "utf8"));
const authors = YAML.parse(readFileSync(join(dir, "authors.yml"), "utf8")) ?? {};

const errors = [];
const posts = [];
/** Slugs of archived posts: kept in the repo (so they can come back) but left off the site. */
const archived = [];
const redirects = [];
const schemaTypes = ["BlogPosting", "Article", "HowTo"];

/**
 * The questions under a "Frequently asked questions" heading, for FAQ structured data. Each question is either a
 * ### subheading (its answer is what follows) or a paragraph that opens with the question ("Is X? Yes, …"), as the
 * first posts wrote them. Taken from the visible article, so what Google reads always matches what readers see.
 */
function faqFrom(blocks) {
  const text = (b) => (b.children ?? []).map((c) => c.text).join("").trim();
  const start = blocks.findIndex((b) => b._type === "block" && b.style === "h2" && /^(frequently asked questions|faqs?)$/i.test(text(b)));
  if (start < 0) return [];
  const faq = [];
  const part = [];
  for (const b of blocks.slice(start + 1)) {
    if (b._type === "divider" || (b._type === "block" && b.style === "h2")) break;
    if (b._type === "block") part.push(b);
  }
  const asSubheadings = part.some((b) => b.style === "h3");
  for (const b of part) {
    if (asSubheadings) {
      if (b.style === "h3") faq.push({ question: text(b), answer: "" });
      else if (faq.length) faq.at(-1).answer = [faq.at(-1).answer, text(b)].filter(Boolean).join(" ");
    } else {
      const m = /^(.+?\?)\s+(.+)$/s.exec(text(b));
      if (m) faq.push({ question: m[1], answer: m[2] });
    }
  }
  return faq.filter((f) => f.question && f.answer);
}
const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const dateRe = /^\d{4}-\d{2}-\d{2}$/;

for (const file of readdirSync(join(dir, "posts")).filter((f) => f.endsWith(".md")).sort()) {
  const where = `content/blog/posts/${file}`;
  const fail = (msg) => errors.push(`${where}: ${msg}`);
  let parsed;
  try {
    parsed = parsePostFile(readFileSync(join(dir, "posts", file), "utf8"));
  } catch (e) {
    fail(e.message);
    continue;
  }
  const { data, body } = parsed;
  const slug = file.replace(/\.md$/, "");
  const publishedAt = data.publishedAt instanceof Date ? data.publishedAt.toISOString().slice(0, 10) : String(data.publishedAt ?? "");

  if (!data.title) fail("title is missing");
  if (data.slug !== slug) fail(`slug must match the file name (${slug})`);
  if (!slugRe.test(slug)) fail("the file name must be lowercase-words-with-dashes");
  if (!categories.includes(data.category)) fail(`category must be one of: ${categories.join(", ")}`);
  if (data.author && !authors[data.author]) fail(`author "${data.author}" is not in content/blog/authors.yml`);
  if (!dateRe.test(publishedAt)) fail("publishedAt must be a date like 2026-12-08");
  if (data.publishAt && Number.isNaN(Date.parse(data.publishAt))) fail("publishAt must be a time like 2026-12-08T09:00:00-07:00");
  if (!data.summary) fail("summary is missing");
  if (data.cover && !data.cover.src) fail("cover needs a src");
  if (data.cover?.src && !data.cover.alt) fail("cover needs alt text");

  const { blocks, warnings } = markdownToPortableText(body, slug);
  for (const w of warnings) console.warn(`${where}: warning: ${w}`);
  for (const b of blocks) if (b._type === "image" && !b.alt) fail(`an image has no alt text (${b.src})`);
  if (!blocks.length) fail("the article is empty");

  if (data.schemaType && !schemaTypes.includes(data.schemaType)) fail(`schemaType must be one of: ${schemaTypes.join(", ")}`);
  // Old addresses of a post whose slug changed redirect to it (308), so links and search results keep working.
  for (const old of data.previousSlugs ?? []) if (!data.archived) redirects.push({ source: `/blog/${old}`, destination: `/blog/${slug}`, permanent: true });
  if (data.archived) {
    archived.push(slug);
    continue;
  }
  const author = data.author ? authors[data.author] : null;
  posts.push({
    slug,
    title: data.title,
    category: data.category,
    details: data.details ?? [],
    publishedAt,
    // The exact time, for ordering posts published on the same day (newest first).
    publishAt: data.publishAt ? new Date(data.publishAt).toISOString() : `${publishedAt}T00:00:00.000Z`,
    summary: data.summary,
    featured: Boolean(data.featured),
    cover: data.cover ?? null,
    author: author ? { name: author.name, role: author.role ?? "", photo: author.photo ?? null } : null,
    seo: {
      title: data.seo?.title || data.title,
      description: data.seo?.description || data.summary,
      keywords: data.seo?.keywords ?? [],
      canonical: data.seo?.canonical ?? null,
      socialImage: data.seo?.socialImage ?? null,
      noindex: Boolean(data.seo?.noindex),
    },
    faq: faqFrom(blocks),
    schemaType: data.schemaType ?? "BlogPosting",
    related: data.related ?? [],
    updatedAt: data.updatedAt ?? null,
    body: blocks,
  });
}

// Related posts must point at posts that exist (an archived one is dropped quietly).
const live = new Set(posts.map((p) => p.slug));
for (const post of posts) {
  for (const r of post.related) if (!live.has(r) && !archived.includes(r)) errors.push(`content/blog/posts/${post.slug}.md: related post "${r}" doesn't exist`);
  post.related = post.related.filter((r) => live.has(r) && r !== post.slug).slice(0, 3);
}

// The testimonial carousels (content/testimonials.yml, from the Notion Testimonials database), grouped by page.
const testimonialPages = ["home", "sell", "support", "retain"];
const cardColors = ["#7d0034", "#00331a", "#004c27"];
const testimonials = Object.fromEntries(testimonialPages.map((p) => [p, []]));
const rawTestimonials = YAML.parse(readFileSync(join(root, "content/testimonials.yml"), "utf8")) ?? [];
rawTestimonials.forEach((t, i) => {
  const where = `content/testimonials.yml (entry ${i + 1}${t?.name ? `, ${t.name}` : ""})`;
  if (!t?.quote || !t?.name) return errors.push(`${where}: needs a quote and a name`);
  if (t.cardColor && !cardColors.includes(t.cardColor)) errors.push(`${where}: cardColor must be one of ${cardColors.join(", ")}`);
  for (const p of t.pages ?? []) {
    if (!testimonialPages.includes(p)) errors.push(`${where}: unknown page "${p}" (use ${testimonialPages.join(", ")})`);
    else testimonials[p].push(t);
  }
});
for (const p of testimonialPages) {
  testimonials[p] = testimonials[p]
    .map((t, i) => ({ t, i }))
    .sort((a, b) => (a.t.order ?? 9999) - (b.t.order ?? 9999) || a.i - b.i)
    .map(({ t }, i) => ({
      quote: t.quote,
      name: t.name,
      role: t.role ?? "",
      company: t.company ?? "",
      cardColor: t.cardColor ?? cardColors[i % cardColors.length],
      photo: t.photo ?? null,
    }));
}

if (errors.length) {
  console.error(`The blog has ${errors.length} problem(s):\n  ${errors.join("\n  ")}`);
  process.exit(1);
}

posts.sort((a, b) => b.publishAt.localeCompare(a.publishAt));
if (!checkOnly) {
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify({ categories, posts }, null, 1) + "\n");
  // Just the slugs, for proxy.ts (it answers 404 for any other /blog/<slug> without loading every post).
  writeFileSync(out.replace("posts.generated", "slugs.generated"), JSON.stringify(posts.map((p) => p.slug)) + "\n");
  // Read by next.config.ts.
  writeFileSync(out.replace("posts.generated", "redirects.generated"), JSON.stringify(redirects, null, 1) + "\n");
  const tOut = join(root, "modules/landing/content/testimonials.generated.json");
  mkdirSync(dirname(tOut), { recursive: true });
  writeFileSync(tOut, JSON.stringify(testimonials, null, 1) + "\n");
}
console.log(`Blog: ${posts.length} posts${archived.length ? ` (${archived.length} archived)` : ""}${checkOnly ? " checked" : ` written to ${out.slice(root.length + 1)}`}`);
