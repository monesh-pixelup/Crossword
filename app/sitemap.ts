import type { MetadataRoute } from "next";
import { getPosts } from "@/modules/blog/lib/posts";
import { SITE_URL } from "@/modules/blog/lib/site";
import pages from "@/lib/sitemap-pages.generated.json";

/**
 * /sitemap.xml: every page of the site and every blog post (archived posts and posts marked "Hide from search" are
 * left out). The page list comes from the app's routes (scripts/sitemap-pages.mjs, run before every build), so a new
 * page is added on its own. To keep a page out, give it `robots: { index: false }` in its metadata.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  return [
    ...pages.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...posts.filter((p) => !p.noindex).map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.updatedAt ?? p.publishAt })),
  ];
}
