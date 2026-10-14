import type { Metadata } from "next";
import {
  AdaptivePages,
  DedicatedPages,
  DynamicHero,
  Personalization,
  RoasGap,
  TwoWays,
} from "@/modules/dynamic-landing-pages";
import { CtaEnvelope } from "@/modules/landing";

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
      <Personalization />
      <TwoWays />
      <DedicatedPages />
      <AdaptivePages />
      <CtaEnvelope />
    </main>
  );
}
