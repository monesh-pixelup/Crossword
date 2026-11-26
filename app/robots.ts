import type { MetadataRoute } from "next";
import { SITE_URL } from "@/modules/blog/lib/site";

/**
 * /robots.txt for crossword.ai: crawl everything, and here is the sitemap. Staging and the issue previews run the same
 * build, so they would serve this too; proxy.ts answers /robots.txt on those hosts with "Disallow: /" instead, so
 * search engines keep out of them.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
