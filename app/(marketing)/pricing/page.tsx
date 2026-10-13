import type { Metadata } from "next";
import { CtaEnvelope } from "@/modules/landing";
import {
  Calculator,
  Credits,
  Engineer,
  Faq,
  Outcomes,
  Plans,
  PricingBanner,
  PricingHeader,
  SameCrossword,
} from "@/modules/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Crossword runs on credits. You pay when your agent does something for a shopper and nothing when it doesn't. No platform fee, no per-seat fees, no per-resolution fees.",
};

/** Template/Pricing page (Figma 2335:4361) under the cream header, with the doc's extra sections between. */
export default function PricingPage() {
  return (
    <main>
      <PricingHeader />
      <Plans />
      <Credits />
      <SameCrossword />
      <Outcomes />
      <Calculator />
      <Engineer />
      <Faq />
      <PricingBanner />
      <CtaEnvelope />
    </main>
  );
}
