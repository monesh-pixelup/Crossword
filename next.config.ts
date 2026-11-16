import type { NextConfig } from "next";

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
    return [{ source: "/sell", destination: "/conversational-interface", permanent: true }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Blog cover images uploaded in Sanity.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
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
