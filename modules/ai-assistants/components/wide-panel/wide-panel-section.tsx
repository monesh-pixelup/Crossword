import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import panelAubergine from "@/modules/sell/assets/human-mode/panel-aubergine.webp";

/** How the copy column sits beside the headline. */
const layouts = {
  /**
   * Bottom-aligned at the row's far end, overlapping the headline's 614.7px box by 57.8px as in Figma (as Human mode
   * on Sell); side by side only once the row has Figma's 1280px, stacked under the headline below that.
   */
  split: {
    row: "min-[1440px]:flex-row min-[1440px]:items-end min-[1440px]:justify-between min-[1440px]:gap-0",
    heading: "min-[1440px]:-mr-[57.848px]",
    copy: "min-[1440px]:w-(--copy-width)",
  },
  /** Centred on the headline, 120px after it (48px until the row has Figma's 1280px); side by side from 1200px. */
  inline: {
    row: "min-[1200px]:flex-row min-[1200px]:items-center min-[1200px]:gap-12 min-[1440px]:gap-[120px]",
    heading: "",
    copy: "",
  },
} as const;

type WidePanelSectionProps = {
  id: string;
  eyebrow: ReactNode;
  /** SectionTitle's swash capital and lines, at Figma's 614.7px box. */
  initial: string;
  firstLine: ReactNode;
  secondLine?: ReactNode;
  variant: "humanMode" | "airy";
  /** Geist Light copy beside the headline, at most `copyWidth` wide. */
  copy: ReactNode;
  copyWidth: number;
  layout: keyof typeof layouts;
  /** What the panel plays; the static aubergine art until the section's motion lands. */
  children?: ReactNode;
};

/**
 * Figma "Library · Wide panel", as Brand aesthetics and Insights (nodes 3305:1012, 3307:28488): the eyebrow and
 * headline 24px apart on the left, a line of Geist Light beside them, then 80px below the 1280 × 599 aubergine panel
 * (the damask in its notched gold frame with a ring in each corner, the same art as Human mode on Sell), filling the
 * content width. A 232px gold tick sits on the left rail beside the eyebrow.
 */
export function WidePanelSection({
  id,
  eyebrow,
  initial,
  firstLine,
  secondLine,
  variant,
  copy,
  copyWidth,
  layout,
  children,
}: WidePanelSectionProps) {
  const l = layouts[layout];
  return (
    <section aria-labelledby={id} className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        <div className={cn("flex w-full flex-col items-start gap-8", l.row)}>
          <div className={cn("flex shrink-0 flex-col items-start gap-6", l.heading)}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <SectionTitle id={id} initial={initial} firstLine={firstLine} secondLine={secondLine} width={614.744} variant={variant} />
          </div>

          <div
            className={cn("relative max-w-(--copy-width) font-sans text-base leading-6 font-light tracking-[-0.32px] text-black/60", l.copy)}
            style={{ "--copy-width": `${copyWidth}px` } as CSSProperties}
          >
            {copy}
          </div>
        </div>

        <div className="relative aspect-[1280/599] w-full overflow-hidden bg-[#462160]">
          {children ?? <Image src={panelAubergine} alt="" fill sizes="(min-width: 1440px) 1280px, 100vw" className="object-fill" />}
        </div>
      </div>
    </section>
  );
}
