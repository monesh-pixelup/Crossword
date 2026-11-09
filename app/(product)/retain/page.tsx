import type { Metadata } from "next";
import { Testimonials } from "@/modules/landing";
import { BandDivider } from "@/modules/pricing/components/shared/band-divider";
import {
  AudienceBuilder,
  Campaigns,
  Loyalty,
  ProactiveRecovery,
  RetainHero,
  RetentionChannels,
  ReturnReduction,
} from "@/modules/retain";

export const metadata: Metadata = {
  title: "Retain",
  description:
    "Crossword remembers every customer after the sale, reaching out at the right moment, on the right channel, with something worth opening.",
};

export default function RetainPage() {
  return (
    <main>
      <RetainHero />
      <ProactiveRecovery />
      <Campaigns />
      {/* Figma "Divider band" between sections: the 75px band (56px below 768px), with the book stamp. */}
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="book" />
      </div>
      <AudienceBuilder />
      <Loyalty />
      <ReturnReduction />
      <RetentionChannels />
      {/* <Testimonials variant="retain" /> */}
    </main>
  );
}
