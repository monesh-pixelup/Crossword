import { InnerHero } from "@/modules/marketing/components/inner-hero";

/** The Managed launch hero: the inner pages' cream hero (Figma "Hero Option B", 4297:34317) with this page's copy. */
export function LaunchHero() {
  return (
    <InnerHero
      id="launch-hero-title"
      initial="A"
      lines={["I shouldn’t become", "another thing on", "your to-do list"]}
      copy="Crossword builds and manages a personal concierge for your customers."
      cta="TALK TO SALES"
    />
  );
}
