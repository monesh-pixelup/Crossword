import type { Metadata } from "next";
import { Credits, Engineer, Faq, Plans } from "@/modules/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Crossword runs on credits. You pay when your agent does something for a shopper and nothing when it doesn't. No platform fee, no per-seat fees, no per-resolution fees.",
};

/** Page · Pricing · v3 (Figma 3156:13090): the photo hero (as on Support and Retain), then the plans, credits, ROI calculator and FAQs, closing on the engineer banner. */
export default function PricingPage() {
  return (
    <main>
      {/* The hero is hidden for now (restore it with its import, and put "/pricing" back on the header's transparent and hero-only routes). */}
      <Plans />
      <Credits />
      {/* The ROI calculator is hidden for now (issue #21). To restore it, put <Calculator /> back here with its import, and the "ESTIMATE YOUR USAGE" link in Credits. */}
      <Faq />
      <Engineer />
    </main>
  );
}
