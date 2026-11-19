import type { ReactNode } from "react";
import { InnerHero } from "@/modules/marketing/components/inner-hero";

/**
 * The AI Assistants hero: the inner pages' cream hero (Figma "Hero Option B", 4297:34317) with this page's copy. Personal
 * agents uses it too, with its own.
 */
export function AiAssistantsHero({
  id = "ai-assistants-hero-title",
  initial = "Y",
  firstLine = "our customers are already",
  secondLine = "asking ChatGPT about you.",
  aside = "Crossword helps you own the experience",
}: {
  id?: string;
  initial?: string;
  firstLine?: ReactNode;
  secondLine?: ReactNode;
  aside?: ReactNode;
}) {
  return <InnerHero id={id} initial={initial} lines={[firstLine, secondLine]} copy={aside} />;
}
