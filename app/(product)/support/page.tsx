import type { Metadata } from "next";
import { Testimonials } from "@/modules/landing";
import { BandDivider } from "@/modules/pricing/components/shared/band-divider";
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
      {/* Figma "Divider band" between sections: the 75px band (56px below 768px), its glyph naming the next section (Channels). */}
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="chat" />
      </div>
      <SupportChannels />
      {/* <Testimonials variant="support" /> */}
    </main>
  );
}
