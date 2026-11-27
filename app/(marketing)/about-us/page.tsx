import type { Metadata } from "next";
import { AboutCta, AboutHero, DecadeBand, People, Story } from "@/modules/about";
import { BandDivider } from "@/modules/pricing/components/shared/band-divider";

export const metadata: Metadata = {
  title: "About us",
  description:
    "We've got a thing for good conversations. After a decade of making conversations work at scale, the team behind CometChat is building Crossword, so no brand is left out of the conversation.",
};

/**
 * Page · About us (Figma 4454:31872): the hero, the story timeline, the decade line and its numbers between two stamped
 * divider bands, the people behind the replies, and the CTA banner.
 */
export default function AboutUsPage() {
  return (
    <main data-no-curtain>
      <AboutHero />
      <Story />
      {/* Figma "Divider band" (4467:6595): the 75px band (56px below 768px), its quill stamp. */}
      <div className="relative h-[75px] bg-cream max-md:h-[56px]">
        <BandDivider glyph="quill" />
      </div>
      <DecadeBand />
      {/* Figma "Divider band" (4474:38241). */}
      <div className="relative h-[75px] bg-cream max-md:h-[56px]">
        <BandDivider glyph="quill" />
      </div>
      <People />
      <AboutCta />
    </main>
  );
}
