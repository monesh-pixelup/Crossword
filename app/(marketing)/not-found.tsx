import { NotFoundContent } from "@/modules/marketing/components/not-found/not-found-content";

/**
 * notFound() inside the marketing pages: a blog post that was archived or never existed (blog/[slug]). The marketing
 * layout already draws the header and footer around it.
 */
export default function NotFound() {
  return <NotFoundContent />;
}
