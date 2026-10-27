import type { Metadata } from "next";
import {
  ChooseJourney,
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
      <Journey />
      <JourneyLibrary />
      <HowItWorks />
      <ChooseJourney />
      <YourPart />
      <PilotCta />
    </main>
  );
}
