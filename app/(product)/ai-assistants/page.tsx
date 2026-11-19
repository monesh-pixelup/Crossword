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
    <main data-no-curtain>
      {/* Figma 3991:204637: the Y pulled in to -4%. */}
      <AiAssistantsHero initialTracking={-0.04} />
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
      <Insights initial="S" firstLine="ee what happened" swashTracking={-0.05} scene="insights-motion" mobileScene="insights-mweb-motion" replayAfter={3000} />
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="chat" />
      </div>
      <AssistantsFaq swashTracking={-0.06} />
      <AssistantsCta />
    </main>
  );
}
