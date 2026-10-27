import type { Metadata } from "next";
import {
  AiAssistantsHero,
  AssistantCampaigns,
  AssistantsCta,
  AssistantsFaq,
  BrandAesthetics,
  Differentiation,
  Insights,
  LoggedInExperience,
  Promotions,
  ShopperAsks,
} from "@/modules/ai-assistants";
import { BandDivider } from "@/modules/pricing/components/shared/band-divider";

export const metadata: Metadata = {
  title: "AI Assistants",
  description:
    "Your customers are already asking ChatGPT about you. Crossword puts your catalog, offers and brand into the answer.",
};

export default function AiAssistantsPage() {
  return (
    <main>
      <AiAssistantsHero />
      <ShopperAsks />
      <AssistantCampaigns />
      {/* Figma "Section · Divider": the 75px book band (56px below 768px). */}
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="book" />
      </div>
      <Differentiation />
      <LoggedInExperience />
      <BrandAesthetics />
      <Promotions />
      <Insights />
      <AssistantsFaq />
      <AssistantsCta />
    </main>
  );
}
