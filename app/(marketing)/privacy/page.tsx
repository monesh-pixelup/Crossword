import type { Metadata } from "next";
import { PrivacyBody } from "@/modules/legal/components/privacy-body";
import { PrivacyHero } from "@/modules/legal/components/privacy-hero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Crossword collects, uses, shares and protects your personal information, and the choices you have.",
};

/**
 * Page · Privacy (Figma 1662:8194): the hero, then the policy beside its contents. No hero curtain (`data-no-curtain`,
 * as the other inner pages): the hero scrolls away with the page instead of the policy sliding up over it.
 */
export default function PrivacyPage() {
  return (
    <main data-no-curtain>
      <PrivacyHero />
      <PrivacyBody />
    </main>
  );
}
