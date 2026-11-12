import type { Metadata } from "next";
import {
  AdaptivePages,
  DedicatedTabs,
  DynamicCta,
  DynamicHero,
  Personalization,
  RoasGap,
  TwoWays,
} from "@/modules/dynamic-landing-pages";
import { BandDivider } from "@/modules/pricing/components/shared/band-divider";

export const metadata: Metadata = {
  title: "Dynamic Landing Pages",
  description:
    "Crossword builds landing pages that carry your ad's message into your store, and product pages that adapt to each shopper. Higher ROAS on the click. Higher conversion on the page.",
};

export default function DynamicLandingPagesPage() {
  return (
    <main>
      <DynamicHero />
      <RoasGap />
      {/* Figma "Divider band" between each section from here on: the 75px band (56px below 768px), its glyph naming the next section. */}
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="quill" />
      </div>
      <Personalization />
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="gear" />
      </div>
      <TwoWays />
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="book" />
      </div>
      <DedicatedTabs />
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="gear" />
      </div>
      <AdaptivePages />
      <DynamicCta />
    </main>
  );
}
