import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { BLOG_TAG } from "@/modules/blog/lib/posts";
import { TESTIMONIALS_TAG } from "@/modules/landing/lib/testimonials";

/**
 * Sanity's webhook calls this whenever a post, category or testimonial is published, changed or deleted (set up in
 * sanity.io/manage → API → Webhooks, signed with SANITY_REVALIDATE_SECRET). It marks the blog's cached content as
 * out of date, so the next visit to any blog page (and the home page's Blog section) renders the new content.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return Response.json({ message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 });

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret);
  if (!isValidSignature) return Response.json({ message: "Invalid signature" }, { status: 401 });

  // `expire: 0`: the next visit waits for the fresh content rather than being shown the old copy once more.
  // A testimonial refreshes the carousels; anything else (a post, a category, an author) the blog.
  revalidateTag(body?._type === "testimonial" ? TESTIMONIALS_TAG : BLOG_TAG, { expire: 0 });
  return Response.json({ revalidated: true, type: body?._type ?? null });
}
