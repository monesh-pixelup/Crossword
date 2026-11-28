import type { Metadata } from "next";
import {
  TrustCertifications,
  TrustCta,
  TrustDetails,
  TrustFaq,
  TrustHero,
  TrustIntro,
  TrustReliability,
  TrustStandard,
} from "@/modules/trust";
import { BandDivider } from "@/modules/pricing/components/shared/band-divider";

export const metadata: Metadata = {
  title: "Trust & security",
  description:
    "A good concierge keeps your secrets and follows your rules. How Crossword stays inside the lines: checked replies, approved answers, 99.99% uptime, and ISO 27001, SOC 2 Type II, HIPAA, GDPR, PIPEDA and CCPA.",
};

/** Figma "Divider band" (4474:39524 and the others): the 75px band (56px below 768px), its quill stamp. */
function Band() {
  return (
    <div className="relative h-[75px] bg-cream max-md:h-[56px]">
      <BandDivider glyph="quill" />
    </div>
  );
}

/**
 * Page · Trust & security (Figma 4474:39422): the hero, the introduction card, then between quill divider bands the
 * details, reliability, the standard, the certifications in depth and the FAQ, and the CTA banner.
 */
export default function TrustAndSecurityPage() {
  return (
    <main data-no-curtain>
      <TrustHero />
      <TrustIntro />
      <Band />
      <TrustDetails />
      <Band />
      <TrustReliability />
      <Band />
      <TrustStandard />
      <Band />
      <TrustCertifications />
      <Band />
      <TrustFaq />
      <TrustCta />
    </main>
  );
}
