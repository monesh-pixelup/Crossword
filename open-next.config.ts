import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

// Cached pages live in R2 and cache tags (cleared by /api/revalidate) in D1. Stale pages refresh through the in-memory
// queue, which is enough at this site's traffic and needs no Durable Object (a Durable Object migration would block
// preview uploads until a production deploy). See https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  tagCache: d1NextTagCache,
  queue: memoryQueue,
});
