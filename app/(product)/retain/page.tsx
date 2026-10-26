import type { Metadata } from "next";
import { Testimonials } from "@/modules/landing";
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
      <AudienceBuilder />
      <Loyalty />
      <ReturnReduction />
      <RetentionChannels />
      <Testimonials variant="retain" />
    </main>
  );
}
