import type { Metadata } from "next";
import {
  AiAssistantsHero,
  AssistantsCta,
  AssistantsFaq,
  BrandAesthetics,
  Differentiation,
  Insights,
  LoggedInExperience,
  Promotions,
  ShopperAsks,
  UseCaseCampaigns,
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
      {/* Figma "Divider band" between sections: the 75px band (56px below 768px), its glyph naming the next section. */}
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="chart" />
      </div>
      <UseCaseCampaigns />
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="book" />
      </div>
      <Differentiation />
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="gear" />
      </div>
      <LoggedInExperience layout="accordion" />
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="quill" />
      </div>
      <BrandAesthetics />
      <Promotions />
      <Insights scene="insights-motion" mobileScene="insights-mweb-motion" />
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="chat" />
      </div>
      <AssistantsFaq />
      <AssistantsCta />
    </main>
  );
}
