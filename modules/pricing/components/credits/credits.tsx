import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { cn } from "@/lib/cn";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";
import { creditRows } from "../../config/pricing";
import { BandDivider } from "../shared/band-divider";

/** Every row sits on a 1px engraved/50 rule. */
const rule = "border-b border-engraved/50";
const cell = `${rule} px-5 py-8 text-left align-top`;
const head = `${rule} px-5 py-[18px] text-left align-top font-serif text-base leading-[22px] font-medium tracking-[-0.48px] whitespace-nowrap uppercase`;
const body = "font-sans text-base leading-6 font-normal tracking-[-0.32px]";

/** A cell with nothing to say: a 14px rule in ink muted, 11px down (centred on the 24px line). */
const none = (
  <>
    <span aria-hidden className="mt-[11px] block h-px w-3.5 bg-ink-muted" />
    <span className="sr-only">None</span>
  </>
);

/**
 * Library · Comparison table, Credits (Figma 3564:22979), under the book divider band: a centred
 * eyebrow, swash headline and copy, then the rate table at 520 / 254 / 253 / 253 of 1280: the
 * interactions in Crimson 22 down the left, the credits column featured (a wine head with a bright
 * gold label over sand cells, the figures in Geist 16 ink-soft), what each is billed per and a note
 * beside it in Geist 16 ink-muted (notes wrap at 200px), every cell left-aligned at 20px / 32px with
 * 1px engraved/50 rules under every row. "Always free" and "Free for a limited time" open their groups
 * in 48px rows of wine Open Sans SemiBold 12 caps. Then the pilot button beside a link to the
 * calculator. Below 880px the table scrolls sideways, its first column pinned.
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
          <SectionTitle id="credits-title" initial="W" firstLine="hat does a" secondLine="credit cover?" width={323} variant="creditCover" weight="light" />
          <p className="max-w-[560px] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">
            Credits power every interaction, from a conversational reply to a dynamic landing page. A typical conversation
            runs about 5 credits.
          </p>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[880px] table-fixed border-collapse">
            <colgroup>
              <col className="w-[40.625%]" />
              <col className="w-[19.844%]" />
              <col className="w-[19.766%]" />
              <col className="w-[19.766%]" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className={cn(rule, "sticky left-0 z-1 bg-cream")}>
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
                        "sticky left-0 z-1 h-12 bg-cream pr-6 pl-5 text-left font-open-sans text-[12px] leading-[1.3] font-semibold tracking-[1.44px] whitespace-nowrap text-wine uppercase",
                      )}
                    >
                      {row.group}
                    </th>
                    <td className={cn(rule, "bg-sand")} />
                    <td className={rule} />
                    <td className={rule} />
                  </tr>
                ) : (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className={cn(cell, "sticky left-0 z-1 bg-cream text-left font-serif text-[22px] leading-[1.1] font-normal tracking-[-0.04em] whitespace-nowrap text-ink")}
                    >
                      {row.label}
                    </th>
                    <td className={cn(cell, body, "bg-sand whitespace-nowrap text-ink-soft")}>{row.credits}</td>
                    <td className={cn(cell, body, "text-pretty text-ink-muted")}>{row.billedPer ?? none}</td>
                    <td className={cn(cell, body, "text-pretty text-ink-muted")}>
                      {row.note ? <span className="block max-w-[200px]">{row.note}</span> : none}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <StampButton href={ctaLinks.bookDemo}>START YOUR FREE PILOT</StampButton>
          <TextLink href="#calculator">Estimate your usage</TextLink>
        </div>
      </div>
    </section>
  );
}
