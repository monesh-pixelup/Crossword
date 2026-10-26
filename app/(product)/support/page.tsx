import type { Metadata } from "next";
import { Testimonials } from "@/modules/landing";
import {
  CustomerSupport,
  Guardrails,
  HelpdeskOptions,
  HumanHandoff,
  SupportChannels,
  SupportHero,
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
      <CustomerSupport />
      <HumanHandoff />
      <TakeControl />
      <HelpdeskOptions />
      <Workflows />
      <Guardrails />
      <SupportChannels />
      <Testimonials variant="support" />
    </main>
  );
}
