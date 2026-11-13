import { PolicyContents } from "./policy-contents";
import { PrivacyContent } from "./privacy-content";

/** The sidebar's contents, one per numbered section of the policy (section-01 … section-15). */
const sections = [
  "Personal Information We Collect",
  "How We Collect Personal Information",
  "How We Use Personal Information",
  "How We Share Personal Information",
  "Cookies and Similar Technologies",
  "How Long We Keep Personal Information",
  "How We Protect Personal Information",
  "International Transfers",
  "Your Rights and Choices",
  "Additional Information for Certain Regions",
  "AI Features and Automated Decision-Making",
  "Children’s Privacy",
  "Third-Party Sites and Services",
  "Changes to This Privacy Policy",
  "Contact Us",
];

/**
 * Figma "Privacy" body (1662:7713): the 313px sidebar 40px down at the page's edge, a #ccc rule 56px after it (at
 * 449px) running the section's height, and 88px past the rule the 797px policy, 40px down with 86px under it. Below
 * 992px the contents sit above the policy, without the rule.
 */
export function PrivacyBody() {
  return (
    <section aria-label="Privacy Policy" className="relative bg-cream">
      <div className="grid content-width grid-cols-1 gap-y-12 lg:grid-cols-[313px_minmax(0,1fr)] lg:gap-x-14 lg:gap-y-0">
        <div className="pt-10 lg:sticky lg:top-[72.5px] lg:self-start lg:pb-10">
          <PolicyContents
            updated="Last updated: October 26, 2026"
            summary="Our privacy policy outlines how we collect, use, and protect your personal information."
            sections={sections}
          />
        </div>
        <div className="min-w-0 pb-16 lg:border-l lg:border-[#ccc] lg:pt-10 lg:pb-[86px] lg:pl-[88px]">
          <div className="max-w-[797px]">
            <PrivacyContent />
          </div>
        </div>
      </div>
    </section>
  );
}
