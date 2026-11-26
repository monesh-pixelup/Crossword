import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { NextConfig } from "next";

/** Old blog addresses (a post whose slug changed), written by scripts/blog/build.mjs before every build. */
const blogRedirectsFile = join(process.cwd(), "modules/blog/content/redirects.generated.json");
const blogRedirects: { source: string; destination: string; permanent: boolean }[] = existsSync(blogRedirectsFile)
  ? JSON.parse(readFileSync(blogRedirectsFile, "utf8"))
  : [];

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    // Tailwind's atomic CSS is small: inlining it removes the render-blocking request.
    inlineCss: true,
  },
  cacheComponents: true,
  poweredByHeader: false,
  // The Conversational Interface page moved from /sell: old links and bookmarks land on it (308, permanent).
  async redirects() {
    return [{ source: "/sell", destination: "/conversational-interface", permanent: true }, ...blogRedirects];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
