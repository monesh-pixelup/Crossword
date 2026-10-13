import type { Metadata } from "next";
import { CtaEnvelope } from "@/modules/landing";
import {
  CustomerSupport,
  Guardrails,
  HelpdeskOptions,
  HumanHandoff,
  SupportBanner,
  SupportChannels,
  SupportHero,
  SupportIntro,
  SupportTestimonial,
  TakeControl,
  Workflows,
} from "@/modules/support";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Crossword answers the moment the question is asked, hands off cleanly when it can't, and keeps every promise your policies make.",
};

export default function SupportPage() {
  return (
    <main>
      <SupportHero />
      <SupportIntro />
      <CustomerSupport />
      <HumanHandoff />
      <TakeControl />
      <HelpdeskOptions />
      <Workflows />
      <Guardrails />
      <SupportChannels />
      <SupportTestimonial />
      <SupportBanner />
      <CtaEnvelope />
    </main>
  );
}
