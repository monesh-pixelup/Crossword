import { InnerHero } from "@/modules/marketing/components/inner-hero";

/** The Dynamic landing pages hero: the inner pages' cream hero (Figma "Hero Option B", 4297:34317) with this page's copy. */
export function DynamicHero() {
  return (
    <InnerHero
      id="dlp-hero-title"
      initial="E"
      lines={["very page, built", "for the person on it"]}
      copy="Crossword builds landing pages that carry your ad’s message into your store, and product pages that adapt to each shopper. Higher ROAS on the click. Higher conversion on the page."
    />
  );
}
