import { NextResponse, type NextRequest } from "next/server";
import slugs from "@/modules/blog/content/slugs.generated.json";

const posts = new Set<string>(slugs);

/** The hosts search engines may crawl. Anywhere else (staging, the issue previews) /robots.txt turns them away. */
const PUBLIC_HOSTS = new Set(["crossword.ai", "www.crossword.ai"]);

/**
 * /robots.txt: app/robots.ts on crossword.ai; on every other host, "Disallow: /".
 *
 * Unknown blog addresses (a typo, or an archived post) get a real 404 status. Without this, the post page streams its
 * "not found" content with a 200 the first time an address is asked for, which search engines treat as a live page.
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/robots.txt") {
    if (PUBLIC_HOSTS.has(request.headers.get("host")?.split(":")[0] ?? "")) return NextResponse.next();
    return new NextResponse("User-agent: *\nDisallow: /\n", {
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
    });
  }
  const slug = request.nextUrl.pathname.replace(/^\/blog\//, "").replace(/\/$/, "");
  if (slug && !slug.includes("/") && !posts.has(slug)) {
    return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = { matcher: ["/blog/:slug+", "/robots.txt"] };
