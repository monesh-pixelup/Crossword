import type { Metadata } from "next";
import { JournalIndex } from "@/modules/blog/components/journal-index";
import { getPosts } from "@/modules/blog/lib/posts";
import { Testimonials } from "@/modules/landing";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from Crossword on conversational commerce, AI shopping assistants and the brands using them.",
};

/**
 * Page · Blog (Figma 1660:312), without its hero: the journal's posts (its heading for screen readers only), then the testimonials.
 * The posts come from content/blog (see modules/blog/lib/posts.ts).
 */
export default async function BlogPage() {
  const posts = await getPosts();

  return (
    // No hero, so no hero curtain: the page simply scrolls.
    <main data-no-curtain>
      <h1 className="sr-only">Blog</h1>
      <JournalIndex posts={posts} />
      <Testimonials variant="blog" />
    </main>
  );
}
