import type { Metadata } from "next";
import { BlogHero } from "@/modules/blog/components/blog-hero";
import { JournalIndex } from "@/modules/blog/components/journal-index";
import { CtaEnvelope, Testimonials } from "@/modules/landing";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from Crossword on conversational commerce, AI shopping assistants and the brands using them.",
};

/** Page · Blog (Figma 1660:312): the hero, the journal's filters and posts, the testimonials, then the envelope CTA. */
export default function BlogPage() {
  return (
    // No hero curtain here: the journal scrolls in below the hero instead of sliding up over its headline.
    <main data-no-curtain>
      <BlogHero />
      <JournalIndex />
      <Testimonials variant="blog" />
      {/* The patterned divider band across the top of the envelope section, between the page rails (as on the home page). */}
      <div className="relative h-6 max-md:h-[18px]">
        <DividerBand glyph="chat" />
      </div>
      <CtaEnvelope />
    </main>
  );
}
