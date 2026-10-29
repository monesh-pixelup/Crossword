import type { Metadata } from "next";
import {
  AiAssistantsHero,
  AssistantCampaigns,
  AssistantsCta,
  AssistantsFaq,
  Differentiation,
  Insights,
  LoggedInExperience,
  Promotions,
  ShopperAsks,
} from "@/modules/ai-assistants";
import { agentDifferentiationRows } from "@/modules/personal-agents/config/differentiation";
import { agentFaqs } from "@/modules/personal-agents/config/faq";
import { agentQuotes } from "@/modules/personal-agents/config/logged-in";
import { agentQuestions } from "@/modules/personal-agents/config/possibilities";
import { agentPromotionSteps } from "@/modules/personal-agents/config/promotions";
import { BandDivider } from "@/modules/pricing/components/shared/band-divider";

export const metadata: Metadata = {
  title: "Personal Agents",
  description:
    "Your next shopper might never see your website. But their AI agent will. Crossword answers for your brand when it shows up.",
};

/** Figma "Page · Personal Agents" (3308:53): the AI Assistants page's sections with this page's copy. */
export default function PersonalAgentsPage() {
  return (
    <main>
      <AiAssistantsHero
        id="personal-agents-hero-title"
        eyebrow="Personal agents"
        initial="Y"
        firstLine="our next shopper might"
        secondLine="never see your website."
        aside="But their AI agent will, make it count"
      />
      <AssistantCampaigns
        id="the-case-title"
        eyebrow="The case"
        initial="Y"
        firstLine="ou designed a shopping journey. Your"
        secondLine="customer’s personal agent may skip it."
        width={1030}
      />
      <ShopperAsks
        id="agent-possibilities-title"
        initial="W"
        firstLine=" hen a customer’s agent shows up,"
        secondLine="Crossword answers for you"
        width={820}
        copy={null}
        questions={agentQuestions}
      />
      {/* Figma "Section · Divider": the 75px book band (56px below 768px). */}
      <div className="relative h-[75px] max-md:h-[56px]">
        <BandDivider glyph="book" />
      </div>
      <Differentiation
        id="agent-differentiation-title"
        initial="W"
        firstLine="hat changes when your"
        secondLine="brand has an agent?"
        width={601}
        columns={["The interaction", "Without Crossword", "With Crossword"]}
        rows={agentDifferentiationRows}
      />
      <LoggedInExperience
        id="agent-logged-in-title"
        eyebrow="Logged-in experiences"
        initial="N"
        firstLine="ot just another"
        secondLine="generic agent"
        copy="Generic agents can only browse and guess. You know the customer, so your agent can pull up their orders, apply their account details and finish the job."
        quotes={agentQuotes}
      />
      <Promotions
        id="agent-promotions-title"
        initial="P"
        firstLine=" oint agents to"
        secondLine="what you want sold"
        width={413}
        copy="Tell Crossword which products or bundles to recommend, and it will bring them up when it fits the request. You stay in control of the offer, even when a personal agent is doing the shopping."
        steps={agentPromotionSteps}
      />
      <Insights
        id="agent-insights-title"
        initial="Y"
        firstLine="ou know what happened"
        copy="You’ll see what personal agents request, their actions, and the outcomes."
      />
      <AssistantsFaq id="agent-faq-title" items={agentFaqs} />
      <AssistantsCta
        id="agent-cta-title"
        initial="T"
        firstLine=" he agents are already shopping."
        secondLine="Be there when they arrive"
        width={724}
      />
    </main>
  );
}
