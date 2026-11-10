import type { Metadata } from "next";
import { PrivacyBody } from "@/modules/legal/components/privacy-body";
import { PrivacyHero } from "@/modules/legal/components/privacy-hero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Crossword collects, uses, shares and protects your personal information, and the choices you have.",
};

/** Page · Privacy (Figma 1662:8194): the hero, then the policy beside its contents. */
export default function PrivacyPage() {
  return (
    <main>
      <PrivacyHero />
      <PrivacyBody />
    </main>
  );
}
