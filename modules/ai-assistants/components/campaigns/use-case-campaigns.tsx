import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import panel from "../../assets/campaigns/use-case-panel.webp";

/** Figma's two use cases (3562:56, 3562:74). */
const useCases = [
  {
    label: "Back in stock",
    title: "Tell me when my size is back.",
    body: "They ask once and then forget about it. When it’s in stock, ChatGPT tells them. The same works for price drops, exchanges and support replies.",
  },
  {
    label: "Price drop",
    title: "Let me know when it drops below my budget.",
    body: "Crossword follows a customer-defined price condition, and proactively informs them when the time is right.",
  },
];

/**
 * Section · Campaigns (Figma 3305:453): the eyebrow over a one-line swash headline (Crimson Light 60 at
 * 1.1), with its 477px line of copy 120px across from it, bottom-aligned; then 80px below, two 620px use
 * cases 40px apart. Each is the 620 × 290 forest damask panel (its gold corner-notched frame and studs, a
 * 2x export of 3562:57), and 40px under it a Geist Medium 12 label in wine, a Crimson Light 32 line and
 * Geist 16 copy, 16px apart. Below 992px the copy goes under the headline; below 768px the use cases
 * stack. A 232px gold tick sits on the left rail beside the eyebrow (98px down in Figma).
 */
export function UseCaseCampaigns() {
  return (
    <section aria-labelledby="ai-campaigns-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:gap-[120px]">
          <div className="flex shrink-0 flex-col items-start gap-6">
            <Eyebrow>Campaigns</Eyebrow>
            <SectionTitle id="ai-campaigns-title" initial="R" firstLine="eaches them first" width={614.744} variant="oneLine" weight="light" />
          </div>
          <p className="max-w-[477px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60">
            Send a price-drop alert or a back-in-stock note straight into the conversation. It lands where the shopper is
            already spending their time.
          </p>
        </div>

        <ul className="grid w-full grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
          {useCases.map((useCase) => (
            <li key={useCase.label} className="flex min-w-0 flex-col items-start">
              {/* TODO: the use case's motion scene plays in the panel once Figma has one. */}
              <div className="relative aspect-[620/290.141] w-full overflow-clip bg-forest">
                <Image src={panel} alt="" fill sizes="(min-width: 1440px) 620px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <h3 className="mt-10 flex flex-col items-start gap-4">
                <span className="font-sans text-[12px] leading-[1.2] font-medium tracking-[0.96px] text-[#6c2332] uppercase">{useCase.label}</span>
                <span className="max-w-[580px] font-serif text-[32px] leading-[1.1] font-light tracking-[-1.28px] text-[#141414]">
                  {useCase.title}
                </span>
              </h3>
              <p className="mt-4 max-w-[540px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60">{useCase.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
