import type { Metadata } from "next";
import { JournalIndex } from "@/modules/blog/components/journal-index";
import { getCategories, getPosts } from "@/modules/blog/lib/posts";
import { CtaEnvelope, Testimonials } from "@/modules/landing";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from Crossword on conversational commerce, AI shopping assistants and the brands using them.",
};

/**
 * Page · Blog (Figma 1660:312), without its hero: the journal's filters and posts (its heading for screen readers only), the testimonials, then the envelope CTA.
 * The posts and filters come from Sanity (see modules/blog/lib/posts.ts).
 */
export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  return (
    // No hero, so no hero curtain: the page simply scrolls.
    <main data-no-curtain>
      <h1 className="sr-only">Blog</h1>
      <JournalIndex posts={posts} categories={categories} />
      <Testimonials variant="blog" />
      {/* The patterned divider band across the top of the envelope section, between the page rails (as on the home page). */}
      <div className="relative h-6 max-md:h-[18px]">
        <DividerBand glyph="chat" />
      </div>
      <CtaEnvelope />
    </main>
  );
}
