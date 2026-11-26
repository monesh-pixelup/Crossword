/**
 * The site's public address, for canonical links, structured data and the sitemap. Previews and staging point their
 * canonical links here too, so search engines credit the real site and not a test copy.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://crossword.ai").replace(/\/$/, "");
