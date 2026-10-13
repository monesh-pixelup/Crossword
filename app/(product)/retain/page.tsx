import type { Metadata } from "next";
import { CtaEnvelope } from "@/modules/landing";
import {
  AudienceBuilder,
  Campaigns,
  Loyalty,
  ProactiveRecovery,
  RetainBanner,
  RetainHero,
  RetainIntro,
  RetentionChannels,
  ReturnReduction,
} from "@/modules/retain";
import { retainTestimonial } from "@/modules/retain/config/testimonial";
import { SupportTestimonial } from "@/modules/support";

export const metadata: Metadata = {
  title: "Retain",
  description:
    "Crossword remembers every customer after the sale, reaching out at the right moment, on the right channel, with something worth opening.",
};

export default function RetainPage() {
  return (
    <main>
      <RetainHero />
      <RetainIntro />
      <ProactiveRecovery />
      <Campaigns />
      <AudienceBuilder />
      <Loyalty />
      <ReturnReduction />
      <RetentionChannels />
      {/* The quote card from Support, with Retain's quote. */}
      <SupportTestimonial testimonial={retainTestimonial} />
      <RetainBanner />
      <CtaEnvelope />
    </main>
  );
}
