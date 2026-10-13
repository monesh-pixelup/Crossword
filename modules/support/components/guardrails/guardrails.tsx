import grainTile from "@/modules/landing/assets/trust/grain-tile.webp";
import { DashedGuides } from "@/modules/landing/components/shared/dashed-guides";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { type GuardrailIcon, guardrailThread, guardrails } from "../../config/guardrails";

/** Feature marks on a 40 grid with the guidelines' 1.5px round stroke, in gold (7.86:1 on forest). */
const icons: Record<GuardrailIcon, string[]> = {
  // An open book with a check: answers from your own sources.
  facts: ["M8 12.5c4-1.5 8-1.5 12 1 4-2.5 8-2.5 12-1v16c-4-1.5-8-1.5-12 1-4-2.5-8-2.5-12-1z", "M20 13.5v16", "m24.5 21 2.5 2.5 4.5-5"],
  // A shield: resists prompt injection.
  shield: ["M20 7.5 30.5 11v8.5c0 6.5-4.5 11-10.5 13-6-2-10.5-6.5-10.5-13V11z", "M15.5 19.5h9", "M20 15v9"],
  // A speech bubble with a quill stroke: the brand’s voice.
  voice: ["M9 11.5h22a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H18l-5.5 4.5v-4.5H9A1.5 1.5 0 0 1 7.5 25V13A1.5 1.5 0 0 1 9 11.5Z", "M14 19.5c2-2 4 2 6 0s4 2 6 0"],
};

function Icon({ icon }: { icon: GuardrailIcon }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2 size-14 text-gold">
      {icons[icon].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/**
 * Layout/Livery, Forest certifications variant, set like the home page's Trust band (“Your data is
 * safe with us”): a full-bleed forest band holding a deep-green card with the soft-light grain tile
 * at 40%, framed by gold dashed guides that overshoot its corners. The headline
 * sits left and the copy right; the badge row becomes the three guardrails, set as the kit's
 * certificates (Geist 500 16 cream titles, on-dark copy, 1px cream/10 dividers), and the doc's
 * refusal example sits under the copy.
 */
export function Guardrails() {
  const [ask, reply] = guardrailThread;

  return (
    <section aria-labelledby="guardrails-title" className="relative bg-forest py-12 md:py-16 lg:py-[87px]">
      <div className="relative content-width px-5 pt-12 pb-10 shadow-[0_0_2px_rgba(0,0,0,0.25)] md:px-8 md:pt-16 md:pb-12 lg:px-16 lg:pt-[88px] lg:pb-16">
        {/* Card surface: deep green with a soft-light grain tile at 40%. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-forest-deep" />
          <div
            className="absolute inset-0 bg-size-[172.82454997301102px_172.82454997301102px] bg-top-left opacity-40 mix-blend-soft-light"
            style={{ backgroundImage: `url(${grainTile.src})` }}
          />
        </div>
        <DashedGuides />

        <div className="relative mx-auto flex w-full max-w-[1030px] flex-col gap-16 lg:gap-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <SectionTitle id="guardrails-title" initial="G" firstLine="uardrails" secondLine={null} width={330} tone="light" />

            <div className="flex flex-col gap-6 lg:max-w-[540px]">
              <p className="font-sans text-base leading-6 tracking-[-0.02em] text-on-dark">
                Set the topics it won&rsquo;t touch, the tone it keeps, and the lines it won&rsquo;t cross.
              </p>
              <figure className="flex flex-col gap-3">
                <p className="ml-auto max-w-[88%] rounded-[13.57px] rounded-br-[4px] bg-wine px-3 py-2.5 font-sans text-[14px] leading-[1.45] tracking-[-0.02em] text-white">
                  {ask.text}
                </p>
                <p className="max-w-[92%] rounded-[13.57px] rounded-bl-[4px] bg-forest px-3 py-2.5 font-sans text-[14px] leading-[1.45] tracking-[-0.02em] text-cream shadow-[inset_0_0_0_0.5px_rgba(224,190,96,0.45)]">
                  {reply.text}
                </p>
              </figure>
            </div>
          </div>

          <ul className="grid gap-8 md:grid-cols-3 md:gap-0">
            {guardrails.map((g) => (
              <li
                key={g.title}
                className="flex flex-col items-start gap-3 md:px-8 md:first:pl-0 md:last:pr-0 md:not-first:shadow-[inset_0.5px_0_0_rgba(255,255,255,0.1)]"
              >
                <Icon icon={g.icon} />
                <span className="font-sans text-base leading-[1.3] font-medium tracking-[-0.02em] text-cream">{g.title}</span>
                <span className="font-sans text-[14px] leading-5 tracking-[-0.02em] text-on-dark">{g.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
