// Lists the site's pages for /sitemap.xml (app/sitemap.ts) in lib/sitemap-pages.generated.json, not committed.
// Runs before `next dev`, `next build` and `npm run lint` (see package.json), so a new page is in the sitemap as soon as
// it exists; a Cloudflare Worker can't read the app folder at run time.
//
// A page is every app/**/page.tsx (or .ts, .jsx, .js, .mdx). Left out: route groups' names ("(marketing)") from the
// path, dynamic routes ("[slug]": blog posts come from the blog's own list), private folders ("_x"), app/api, and pages
// whose metadata says `robots: { index: false }` without a condition.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const app = join(root, "app");
const out = join(root, "lib/sitemap-pages.generated.json");
const pageFile = /^page\.(tsx|ts|jsx|js|mdx)$/;
// Unconditional noindex: the line sets index: false and isn't a "cond && {...}" or "cond ? ... : ..." spread.
const hidden = (src) => src.split("\n").some((l) => /robots\s*:\s*\{[^}]*index\s*:\s*false/.test(l) && !/&&|\?/.test(l));

const pages = [];
const walk = (dir, segments) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const name = entry.name;
    if (entry.isDirectory()) {
      if (name.startsWith("_") || name.startsWith("[") || name.startsWith("@")) continue;
      if (segments.length === 0 && name === "api") continue;
      walk(join(dir, name), /^\(.*\)$/.test(name) ? segments : [...segments, name]);
    } else if (pageFile.test(name) && !hidden(readFileSync(join(dir, name), "utf8"))) {
      pages.push(segments.length ? `/${segments.join("/")}` : "");
    }
  }
};
walk(app, []);
pages.sort((a, b) => (a === "" ? -1 : b === "" ? 1 : a.localeCompare(b)));
writeFileSync(out, JSON.stringify([...new Set(pages)], null, 2) + "\n");
console.log(`sitemap: ${pages.length} pages`);
