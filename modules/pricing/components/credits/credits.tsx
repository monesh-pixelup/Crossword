import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { cn } from "@/lib/cn";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";
import { creditRows } from "../../config/pricing";
import { BandDivider } from "../shared/band-divider";
import { LatticeFrame } from "../shared/lattice-frame";

/** Every row sits on a 1px engraved/50 rule. */
const rule = "border-b border-engraved/50";
const cell = `${rule} px-5 py-8 text-left align-top`;
const head = `${rule} px-5 py-[18px] text-left align-top font-serif text-[18px] leading-[22px] font-medium tracking-[-0.54px] whitespace-nowrap uppercase`;
const body = "font-sans text-[18px] max-md:text-base leading-6 font-normal tracking-[-0.36px]";
/** The body rows' fill (Figma #faf3e2); the credits column stays sand. */
const rowFill = "bg-[#faf3e2]";


/** A cell with nothing to say: a 14px rule in ink muted, 11px down (centred on the 24px line). */
const none = (
  <>
    <span aria-hidden className="mt-[11px] block h-px w-3.5 bg-ink-muted" />
    <span className="sr-only">None</span>
  </>
);

/**
 * Library · Comparison table, Credits (Figma 3564:22979), under the book divider band: a centred
 * eyebrow, swash headline and copy, and 24px under it the pilot button beside a link to the calculator. 64px below,
 * the rate table (Figma 3904:16873) in a 1px #d2cdc0 frame 10px wider than the content each side, its 8px band a
 * studded lattice; inside, a 1px engraved/50 line round the table at 520 / 254 / 253 / 253 of 1280: a cream head
 * row (Crimson Medium 18 caps, the credits head wine with a bright gold label), then the rows on #faf3e2: the
 * interactions in Crimson 22 down the left, the credits column on sand (Geist 18 ink-soft), what each is billed per
 * and a note beside it in Geist 18 ink-muted (notes wrap at 200px), every cell left-aligned at 20px / 32px with 1px
 * engraved/50 rules under every row. "Always free" and "Free for a limited time" open their groups in 48px rows of
 * wine Open Sans SemiBold 12 caps, centred, the fill running across. Below 880px the table scrolls sideways inside
 * the frame; from 768px its first column stays pinned, on phones the whole table scrolls (as AI Assistants'
 * Differentiation).
 */
export function Credits() {
  return (
    <section
      aria-labelledby="credits-title"
      className="relative pt-[calc(var(--section-pad)+75px)] pb-(--section-pad) max-md:pt-[calc(var(--section-pad)+56px)]"
    >
      <BandDivider glyph="book" />
      <RailAccent className="absolute top-[calc(var(--section-pad)+75px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[251px] w-px max-lg:hidden" />
      <RailAccent className="absolute top-[calc(var(--section-pad)+75px)] right-[calc(var(--frame-inset)-0.5px)] z-2 h-[251px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col items-center gap-12 lg:gap-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <Eyebrow>Credits</Eyebrow>
          <SectionTitle id="credits-title" initial="W" firstLine="hat does a" secondLine="credit cover?" width={323} variant="dynamicCentered" weight="light" />
          <p className="max-w-[560px] font-sans text-base leading-6 tracking-[-0.02em] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted max-md:mt-[3px]">
            Credits power every interaction, from a conversational reply to a dynamic landing page. A typical conversation
            runs about 5 credits.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <StampButton href={ctaLinks.bookDemo}>START YOUR FREE PILOT</StampButton>
            <TextLink href="#calculator">ESTIMATE YOUR USAGE</TextLink>
          </div>
        </div>

        <LatticeFrame>
          <table className="w-full min-w-[880px] table-fixed border-collapse">
            <colgroup>
              <col className="w-[40.625%]" />
              <col className="w-[19.844%]" />
              <col className="w-[19.766%]" />
              <col className="w-[19.766%]" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className={cn(rule, "bg-cream md:sticky md:left-0 md:z-1")}>
                  <span className="sr-only">Interaction</span>
                </th>
                <th scope="col" className={cn(head, "bg-wine text-gold-bright")}>
                  Credits
                </th>
                <th scope="col" className={cn(head, "text-ink-soft")}>
                  Billed per
                </th>
                <th scope="col" className={cn(head, "text-ink-soft")}>
                  Good to know
                </th>
              </tr>
            </thead>
            <tbody>
              {creditRows.map((row) =>
                "group" in row ? (
                  <tr key={row.group}>
                    <th
                      scope="colgroup"
                      className={cn(
                        rule,
                        rowFill,
                        "h-12 md:sticky md:left-0 md:z-1 pr-6 pl-5 align-middle text-left font-open-sans text-[12px] leading-[1.1667] font-semibold tracking-[1.44px] max-md:text-[10px] max-md:leading-3 max-md:tracking-[1.2px] whitespace-nowrap text-wine uppercase",
                      )}
                    >
                      {row.group}
                    </th>
                    <td className={cn(rule, rowFill)} />
                    <td className={cn(rule, rowFill)} />
                    <td className={cn(rule, rowFill)} />
                  </tr>
                ) : (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className={cn(cell, rowFill, "text-left md:sticky md:left-0 md:z-1 font-serif text-[22px] max-md:text-[20px] leading-[1.0909] font-normal tracking-[-0.04em] text-pretty text-ink")}
                    >
                      {row.label}
                    </th>
                    <td className={cn(cell, body, "bg-sand whitespace-nowrap text-ink-soft")}>{row.credits}</td>
                    <td className={cn(cell, body, rowFill, "text-pretty text-ink-muted")}>{row.billedPer ?? none}</td>
                    <td className={cn(cell, body, rowFill, "text-pretty text-ink-muted")}>
                      {row.note ? <span className="block max-w-[200px]">{row.note}</span> : none}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </LatticeFrame>
      </div>
    </section>
  );
}
