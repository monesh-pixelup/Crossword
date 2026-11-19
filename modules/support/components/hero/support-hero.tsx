import { InnerHero } from "@/modules/marketing/components/inner-hero";

/** The Support hero: the inner pages' cream hero (Figma "Hero Option B", 4297:34317) with this page's copy. */
export function SupportHero() {
  return (
    <InnerHero
      id="support-hero-title"
      initial="M"
      lines={["ost support tickets aren’t", "complicated, they’re just slow"]}
      copy="Crossword answers the moment the question is asked, hands off cleanly when it can’t, and keeps every promise your policies make."
    />
  );
}
