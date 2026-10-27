import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { cn } from "@/lib/cn";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";
import { type DifferentiationRow, differentiationRows } from "../../config/differentiation";

const rule = "border-b border-engraved/50";
const head = cn(rule, "px-5 py-[18px] text-left font-serif text-base leading-[1.375] font-medium tracking-[-0.03em] uppercase");
const cell = cn(rule, "px-5 py-8 align-top");
const body = "font-sans text-[15px] leading-[1.43] tracking-[-0.02em] text-pretty";
/** The first column stays in view while the table scrolls, from 768px up (below that it would fill the screen). */
const pinned = "bg-cream md:sticky md:left-0 md:z-1";

/**
 * Section · Differentiation (Figma 3305:792): a centred eyebrow, swash headline and the demo button,
 * then the comparison table (3305:797) at 360 / 440 / 480 of 1280: the moment in Crimson 22 down the
 * left, what happens without Crossword in Geist 15 ink muted, and the featured Crossword column (a wine
 * head with a bright gold label over sand cells, ink soft copy). Rules are engraved at 50% under every
 * row. Below 880px the table scrolls sideways. Personal agents (3308:380) passes its own headline, column
 * heads and rows.
 */
export function Differentiation({
  id = "differentiation-title",
  initial = "B",
  firstLine = "eing mentioned is not the",
  secondLine = "same as being there",
  width = 609,
  columns = ["The experience", "Without Crossword", "With Crossword connected"],
  rows = differentiationRows,
}: {
  id?: string;
  initial?: string;
  firstLine?: ReactNode;
  secondLine?: ReactNode;
  /** The headline's Figma text-box width. */
  width?: number;
  /** The three column heads, the last over the featured Crossword column. */
  columns?: [string, string, string];
  rows?: DifferentiationRow[];
}) {
  return (
    <section aria-labelledby={id} className="relative section-pad">
      <div className="flex content-width flex-col items-center gap-12 lg:gap-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <Eyebrow>Differentiation</Eyebrow>
          <SectionTitle id={id} initial={initial} firstLine={firstLine} secondLine={secondLine} width={width} variant="channels" />
          <StampButton href={ctaLinks.bookDemo}>GET A DEMO</StampButton>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[880px] table-fixed border-collapse">
            <colgroup>
              <col className="w-[28.125%]" />
              <col className="w-[34.375%]" />
              <col className="w-[37.5%]" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className={cn(head, pinned, "text-ink-soft")}>
                  {columns[0]}
                </th>
                <th scope="col" className={cn(head, "text-ink-soft")}>
                  {columns[1]}
                </th>
                <th scope="col" className={cn(head, "bg-wine text-gold-bright")}>
                  {columns[2]}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.experience}>
                  <th
                    scope="row"
                    className={cn(cell, pinned, "text-left font-serif text-[22px] leading-[1.15] font-normal tracking-[-0.04em] text-ink")}
                  >
                    {row.experience}
                  </th>
                  {/* Figma sets the copy in 330px and 392px boxes, narrower than the cells. */}
                  <td className={cell}>
                    <p className={cn(body, "max-w-[330px] text-ink-muted")}>{row.without}</p>
                  </td>
                  <td className={cn(cell, "bg-sand")}>
                    <p className={cn(body, "max-w-[392px] text-ink-soft")}>{row.with}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
