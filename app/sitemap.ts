import type { MetadataRoute } from "next";
import { getPosts } from "@/modules/blog/lib/posts";
import { SITE_URL } from "@/modules/blog/lib/site";

/**
 * /sitemap.xml: the site's pages and every blog post (archived posts and posts marked "Hide from search" are left out).
 * The page list is the app's routes; add a page here when one is added to the site.
 */
const pages = [
  "",
  "/blog",
  "/pricing",
  "/privacy",
  "/waitlist",
  "/ai-assistants",
  "/conversational-interface",
  "/dynamic-landing-pages",
  "/managed-launch",
  "/personal-agents",
  "/retain",
  "/support",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  return [
    ...pages.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...posts.filter((p) => !p.noindex).map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.updatedAt ?? p.publishAt })),
  ];
}
