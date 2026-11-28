import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/components/ui/rail-accent";
import { SectionTitle } from "@/components/ui/section-title";
import { cn } from "@/lib/cn";
import { Rails } from "@/modules/marketing/components/rails";

type Cert = { name: string; region?: string; body: string };

const columns: { numeral: string; title: string; items: Cert[] }[] = [
  {
    numeral: "I",
    title: "How we protect information",
    items: [
      {
        name: "ISO 27001",
        body: "The international standard for running a security program. A certifying body confirms we manage risk, access, and incidents by the book.",
      },
      {
        name: "SOC 2 Type II",
        body: "An outside auditor tested our security controls over a period of months, not just on one day. It checks that we do what we say, consistently.",
      },
    ],
  },
  {
    numeral: "II",
    title: "How we handle health information",
    items: [
      {
        name: "HIPAA",
        region: "US",
        body: "Required for healthcare-related brands. It governs how health information is stored, shared, and protected.",
      },
    ],
  },
  {
    numeral: "III",
    title: "How we handle personal data",
    items: [
      {
        name: "GDPR",
        region: "EU",
        body: "Guests in Europe keep the right to see, correct, and delete their data, and we only use it for stated purposes.",
      },
      {
        name: "PIPEDA",
        region: "Canada",
        body: "Canadian guest data is collected with consent, used for the purpose given, and available to the person it belongs to.",
      },
      {
        name: "CCPA",
        region: "California",
        body: "Guests in California can ask what we hold, have it deleted, and opt out of it being sold or shared.",
      },
    ],
  },
];

/**
 * Figma "Certifications in-depth" (Trust & security, 4474:39903): the eyebrow, swash headline and a line of Geist 16,
 * then 80px under them three columns under an engraved rule (split by rail rules, 40px either side): a maroon italic
 * numeral and Crimson 22 heading, then each standard on a rail rule (Crimson ExtraLight 40/44, its region tag on the
 * right, Geist 14/20 under it). Below 1024px the columns stack.
 */
export function TrustCertifications() {
  return (
    <section aria-labelledby="trust-certs-title" className="relative section-pad bg-cream">
      <Rails />
      <RailAccent className="absolute top-[calc(var(--section-pad)+11px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[240px] w-px max-lg:hidden" />

      <div className="relative content-width">
        <div className="flex flex-col items-start gap-5">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Certifications in-depth</Eyebrow>
            <SectionTitle id="trust-certs-title" initial="W" firstLine="hat our certifications mean" width={760} variant="compact" weight="light" />
          </div>
          <p className="font-sans text-base leading-6 tracking-[-0.32px] text-ink-muted max-md:text-[15px] max-md:leading-[22px]">
            The independent checks and legal standards we&rsquo;re held to.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-3 border-t border-engraved max-lg:grid-cols-1 max-md:mt-12">
          {columns.map((col, i) => (
            <div
              key={col.numeral}
              className={cn(
                "flex flex-col pt-11 pb-2 max-lg:px-0 max-lg:pt-9",
                i === 0 && "pr-10",
                i === 1 && "border-l border-rail px-10",
                i === 2 && "border-l border-rail pl-10",
                i > 0 && "max-lg:border-t max-lg:border-l-0",
              )}
            >
              <div className="flex flex-col gap-3.5 pb-8 max-md:pb-6">
                <span className="font-serif text-sm leading-[18px] font-light tracking-[0.14px] text-maroon italic">{col.numeral}</span>
                <h3 className="font-serif text-[22px] leading-6 font-normal tracking-[-0.88px] text-ink">{col.title}</h3>
              </div>
              <ul className="flex flex-col">
                {col.items.map((item) => (
                  <li key={item.name} className="relative flex flex-col gap-3 border-t border-rail py-7 max-md:py-6">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-serif text-[40px] leading-[44px] font-extralight tracking-[-2px] text-ink max-md:text-[34px] max-md:leading-[40px] max-md:tracking-[-1.6px]">
                        {item.name}
                      </h4>
                      {item.region && (
                        <span className="mt-[17px] shrink-0 border-[0.5px] border-engraved px-[7px] py-[3px] font-sans text-xs leading-[14px] font-semibold tracking-[1.44px] text-label-olive uppercase max-md:mt-3 max-md:text-[10px] max-md:tracking-[1.2px]">
                          {item.region}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-sm leading-5 tracking-[-0.28px] text-ink-muted">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
