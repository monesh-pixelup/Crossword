// One-time export of the posts in Sanity to content/blog/posts (run 2026-11-26, when the blog moved off Sanity).
// Kept as the record of how the files were made. Reads a JSON file of Sanity documents, e.g. from
//   curl -G https://mb4vhjft.apicdn.sanity.io/v2026-11-01/data/query/production \
//     --data-urlencode 'query=*[_type=="post"]{..., "categoryTitle": category->title}' > posts.json
//   node scripts/blog/from-sanity.mjs posts.json
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { portableTextToMarkdown, writePostFile } from "./lib.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const docs = JSON.parse(readFileSync(process.argv[2], "utf8"));
for (const p of (docs.result ?? docs).filter((d) => d._type === "post")) {
  const slug = p.slug.current;
  const data = {
    title: p.title,
    slug,
    category: p.categoryTitle,
    publishedAt: p.publishedAt,
    // Sanity listed same-day posts by creation time; keep that order.
    publishAt: p._createdAt,
    summary: p.summary,
    featured: Boolean(p.featured),
    ...(p.details?.length && { details: p.details }),
    sanityId: p._id,
  };
  writeFileSync(join(root, "content/blog/posts", `${slug}.md`), writePostFile(data, portableTextToMarkdown(p.body ?? [])));
  console.log(slug);
}
