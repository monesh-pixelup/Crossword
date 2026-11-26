import { getCloudflareContext } from "@opennextjs/cloudflare";

/** The part of Cloudflare's R2 binding this route uses (the full types live in @cloudflare/workers-types). */
type MediaBucket = {
  get(key: string): Promise<{ body: ReadableStream; httpEtag: string; writeHttpMetadata(headers: Headers): void } | null>;
};

/**
 * /media/<path>: blog images and files, read from the R2 bucket crossword-website-media (binding MEDIA). The Notion
 * sync puts them there, named by their content (…-<hash>.webp), so a file at a given address never changes: browsers
 * and Cloudflare's edge cache keep it for a year, and most requests never reach R2. Files are never deleted, so an old
 * build, or a rollback, still finds its images.
 */
export async function GET(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const key = (await params).path.join("/");
  if (!key || key.includes("..")) return new Response("Not found", { status: 404 });

  const { env, ctx } = await getCloudflareContext({ async: true });
  const cache = (globalThis as unknown as { caches?: { default?: Cache } }).caches?.default;
  const cached = await cache?.match(request);
  if (cached) return cached;

  const bucket = (env as { MEDIA?: MediaBucket }).MEDIA;
  if (!bucket) return new Response("Media storage is not configured", { status: 503 });
  const object = await bucket.get(key);
  if (!object) return new Response("Not found", { status: 404, headers: { "cache-control": "public, max-age=60" } });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");
  headers.set("x-content-type-options", "nosniff");
  const response = new Response(object.body, { headers });
  if (cache) ctx.waitUntil(cache.put(request, response.clone()));
  return response;
}
