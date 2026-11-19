import { InnerHero } from "@/modules/marketing/components/inner-hero";

/** The Conversational interface hero: the inner pages' cream hero (Figma "Hero Option B", 4297:34317) with this page's copy. */
export function SellHero() {
  return (
    <InnerHero
      id="sell-hero-title"
      initial="E"
      lines={["very shopper gets", "a reason to buy"]}
      copy="From the first question to the final click, Crossword guides every shopper toward the product that’s perfect for them."
    />
  );
}
