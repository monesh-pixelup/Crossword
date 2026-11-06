import type { Metadata } from "next";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import {
  Commitment,
  HowItWorks,
  Journey,
  JourneyLibrary,
  LaunchHero,
  PilotCta,
  YourPart,
} from "@/modules/managed-launch";

export const metadata: Metadata = {
  title: "Managed Launch",
  description:
    "Crossword builds and manages a personal concierge for your customers. Your commitment: 30 minutes a week. Our commitment: everything else.",
};

export default function ManagedLaunchPage() {
  return (
    <main>
      <LaunchHero />
      <Commitment />
      {/* Figma 3810:34470: a plain 75px divider band (no badge) under Managed launch and progress. */}
      <div className="relative h-[75px] max-md:h-[56px]">
        <div className="absolute inset-x-0 top-[25.5px] max-md:top-[19px]">
          <DividerBand glyph="chat" badge={false} />
        </div>
      </div>
      <Journey />
      <JourneyLibrary />
      <HowItWorks />
      <YourPart />
      <PilotCta />
    </main>
  );
}
