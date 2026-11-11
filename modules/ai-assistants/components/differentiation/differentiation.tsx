import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { cn } from "@/lib/cn";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing";
import { LatticeFrame } from "@/modules/pricing/components/shared/lattice-frame";
import { type DifferentiationRow, differentiationRows } from "../../config/differentiation";

const rule = "border-b border-engraved/50";
const head = cn(rule, "px-5 py-[18px] text-left align-top font-serif text-[18px] leading-[22px] font-medium tracking-[-0.54px] max-md:text-base max-md:leading-5 max-md:tracking-[-0.48px] uppercase");
const cell = cn(rule, "px-5 py-8 align-top");
const body = "font-sans text-[18px] max-md:text-base leading-6 tracking-[-0.36px] text-pretty";
/** The body rows' fill (Figma #faf3e2); the Crossword column stays sand. */
const rowFill = "bg-[#faf3e2]";
/** The first column stays in view while the table scrolls, from 768px up (below that it would fill the screen). */
const pinned = "md:sticky md:left-0 md:z-1";

/**
 * Section · Differentiation (Figma 3305:792): a centred eyebrow, swash headline and the demo button,
 * then 64px below the comparison table (3305:797) in the studded lattice frame (3906:6242, as Pricing's credits
 * table): a cream head row (Crimson Medium 18 caps, the Crossword head sand with an ink label, running on from its column), then the rows
 * on #faf3e2 at 360 / 440 / 482 of 1282: the moment in Crimson 22 down the left, what happens without Crossword in
 * Geist 18 ink muted, and the featured Crossword column on sand (ink soft copy). Rules are engraved at 50% under every
 * row. Below 880px the table scrolls sideways inside the frame. Personal agents (3308:380) passes its own headline, column
 * heads and rows.
 */
export function Differentiation({
  id = "differentiation-title",
  initial = "B",
  firstLine = "eing mentioned is not the",
  secondLine = "same as being there",
  width = 616,
  columns = ["The experience", "Without Crossword", "With Crossword connected"],
  rows = differentiationRows,
  featuredHead = "sand",
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
  /**
   * The featured column's head: sand with an ink label, running on from the column below it (Figma 3991:206122), on
   * every table; `maroon` (a bright gold label) is the earlier look, kept as an option.
   */
  featuredHead?: "maroon" | "sand";
}) {
  return (
    <section aria-labelledby={id} className="relative section-pad">
      <div className="flex content-width flex-col items-center gap-12 lg:gap-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <Eyebrow>Differentiation</Eyebrow>
          <SectionTitle id={id} initial={initial} firstLine={firstLine} secondLine={secondLine} width={width} variant="dynamicCentered" weight="light" />
          <StampButton href={ctaLinks.bookDemo}>GET A DEMO</StampButton>
        </div>

        <LatticeFrame>
          {/*
            Below 768px the first column narrows to 180px (its moments wrap onto two or three lines) while the other two
            keep the widths they had at 880px, so the table is 67px shorter to scroll across.
          */}
          <table className="w-full min-w-[880px] table-fixed border-collapse max-md:min-w-[813px]">
            <colgroup>
              <col className="w-[28.081%] max-md:w-[180px]" />
              <col className="w-[34.321%] max-md:w-[302px]" />
              <col className="w-[37.598%] max-md:w-[331px]" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className={cn(head, pinned, "bg-cream text-ink-soft")}>
                  {columns[0]}
                </th>
                <th scope="col" className={cn(head, "text-ink-soft")}>
                  {columns[1]}
                </th>
                <th scope="col" className={cn(head, featuredHead === "sand" ? "bg-[#f3e9d4] text-[#141414]" : "bg-[#7d0034] text-gold-bright")}>
                  {columns[2]}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.experience}>
                  <th
                    scope="row"
                    className={cn(cell, pinned, rowFill, "text-left font-serif text-[22px] max-md:text-[20px] leading-[1.0909] font-normal tracking-[-0.04em] text-ink")}
                  >
                    {row.experience}
                  </th>
                  {/* Figma sets the copy in 330px and 392px boxes, narrower than the cells. */}
                  <td className={cn(cell, rowFill)}>
                    <p className={cn(body, "max-w-[330px] text-ink-muted")}>{row.without}</p>
                  </td>
                  <td className={cn(cell, "bg-sand")}>
                    <p className={cn(body, "max-w-[392px] text-ink-soft")}>{row.with}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </LatticeFrame>
      </div>
    </section>
  );
}
