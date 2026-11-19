import { InnerHero } from "@/modules/marketing/components/inner-hero";

/** The Retain hero: the inner pages' cream hero (Figma "Hero Option B", 4297:34317) with this page's copy. */
export function RetainHero() {
  return (
    <InnerHero
      id="retain-hero-title"
      initial="G"
      lines={["ood to see", "you again"]}
      copy="Crossword remembers every customer after the sale, reaching out at the right moment, on the right channel, with something worth opening."
    />
  );
}
