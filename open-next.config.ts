import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

// Cached pages live in R2, with a copy in each Cloudflare region's cache so most requests skip the R2 read. Cache
// tags (cleared by /api/revalidate) live in D1. Stale pages refresh through the in-memory queue, which is enough at
// this site's traffic and needs no Durable Object (a Durable Object migration would block preview uploads until a
// production deploy). See https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(r2IncrementalCache, { mode: "long-lived" }),
  tagCache: d1NextTagCache,
  queue: memoryQueue,
  // Serve prerendered pages straight from the cache without starting Next's request handling.
  enableCacheInterception: true,
  // Load the page code in the background after the first request, so later requests start faster.
  routePreloadingBehavior: "withWaitUntil",
});
