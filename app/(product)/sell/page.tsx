import type { Metadata } from "next";
import { Testimonials } from "@/modules/landing";
import { BandDivider } from "@/modules/pricing/components/shared/band-divider";
import {
  ConversionAssist,
  HumanMode,
  HumanTouch,
  ProactiveMessages,
  ProductDiscovery,
  SellHero,
  StorefrontPresence,
  Upsell,
} from "@/modules/sell";

export const metadata: Metadata = {
  title: "Sell",
  description:
    "From the first question to the final click, Crossword guides every shopper toward the product that's perfect for them.",
};

export default function SellPage() {
  return (
    <main>
      <SellHero />
      <ProductDiscovery />
      {/* Figma "Divider band" between each section: the 75px band (56px below 768px), its stamp naming the next section. */}
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="quill" />
      </div>
      <HumanTouch />
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="chat" />
      </div>
      <HumanMode />
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="chart" />
      </div>
      <Upsell />
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="book" />
      </div>
      <ConversionAssist />
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="chat" />
      </div>
      <ProactiveMessages />
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="book" />
      </div>
      <StorefrontPresence />
      {/* <Testimonials variant="sell" /> */}
    </main>
  );
}
