import { NextResponse, type NextRequest } from "next/server";
import slugs from "@/modules/blog/content/slugs.generated.json";

const posts = new Set<string>(slugs);

/**
 * Unknown blog addresses (a typo, or an archived post) get a real 404 status. Without this, the post page streams its
 * "not found" content with a 200 the first time an address is asked for, which search engines treat as a live page.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.replace(/^\/blog\//, "").replace(/\/$/, "");
  if (slug && !slug.includes("/") && !posts.has(slug)) {
    return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = { matcher: "/blog/:slug+" };
