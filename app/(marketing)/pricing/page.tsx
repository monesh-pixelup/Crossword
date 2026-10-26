import type { Metadata } from "next";
import { Calculator, Credits, Engineer, Faq, Plans, PricingHero } from "@/modules/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Crossword runs on credits. You pay when your agent does something for a shopper and nothing when it doesn't. No platform fee, no per-seat fees, no per-resolution fees.",
};

/** Page · Pricing · v3 (Figma 3156:13090): the photo hero, then the plans, credits, ROI calculator and FAQs, closing on the engineer banner. */
export default function PricingPage() {
  return (
    <main>
      <PricingHero />
      <Plans />
      <Credits />
      <Calculator />
      <Faq />
      <Engineer />
    </main>
  );
}
