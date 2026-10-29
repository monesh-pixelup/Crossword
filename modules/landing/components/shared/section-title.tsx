import type { CSSProperties, ReactNode } from "react";

/** Typographic settings that differ between section headlines in Figma. */
const variants = {
  /** 60px lines at 1.1 leading (Shopper experience). */
  default: {
    firstLineHeight: 81,
    tracking: "tracking-[-3.5538px]",
    swash: "font-script text-[82px] leading-[1.18] tracking-[4.1px]",
    line: "leading-[1.1] tracking-[-3px]",
    second: "",
  },
  /** As default, on one line: the swash's 1.18 leading sets it 96.76px tall, as Figma does (Lifecycle). */
  oneLine: {
    firstLineHeight: 96.76,
    tracking: "tracking-[-3.5538px]",
    swash: "font-script text-[82px] leading-[1.18] tracking-[4.1px]",
    line: "leading-[1.1] tracking-[-3px]",
    second: "",
  },
  /** One line at 1.18 leading after an untracked swash (Platform overview). */
  compact: {
    firstLineHeight: 96.76,
    tracking: "",
    swash: "font-script text-[82px] leading-[1.18]",
    line: "leading-[1.18] tracking-[-3px]",
    second: "",
  },
  /** Centred, 0.9 leading (Managed launch). */
  centered: {
    firstLineHeight: 75,
    tracking: "tracking-[-2.5px] text-center",
    swash: "font-script text-[82px] leading-[1.18]",
    line: "leading-[0.9] tracking-[-3px]",
    second: "",
  },
  /** As centered, with the swash at -4.1px (-5%) (Managed launch). */
  launch: {
    firstLineHeight: 75,
    tracking: "text-center",
    swash: "font-script text-[82px] leading-[1.18] tracking-[-4.1px]",
    line: "leading-[0.9] tracking-[-3px]",
    second: "",
  },
  /** 0.9 leading, -3px tracking, tight swash (Blog). */
  notes: {
    firstLineHeight: 63,
    tracking: "tracking-[-3px]",
    swash: "font-script text-[82px] leading-[0.9] tracking-[-4.1px]",
    line: "leading-[0.9]",
    second: "",
  },
  /** Centred, 0.95 leading, -3px tracking (Customer intelligence). */
  intelligence: {
    firstLineHeight: 76,
    tracking: "tracking-[-3px] text-center",
    swash: "font-script text-[82px] leading-[1.18] tracking-[4.1px]",
    line: "leading-[0.95]",
    second: "",
  },
  /** Centred, Tangerine swash capital at -4.1px (-5%) (Customer testimonials). */
  calligraphic: {
    firstLineHeight: 73,
    tracking: "tracking-[-2.5px] text-center",
    swash: "font-calligraphy text-[82px] leading-[1.1] tracking-[-4.1px]",
    line: "leading-[0.9] tracking-[-3px]",
    second: "",
  },
  /** Centred, 1.18 leading on both lines, tight swash (Sell: Upsell & cross-sell). */
  upsell: {
    firstLineHeight: 83.2,
    tracking: "tracking-[-2.5px] text-center",
    swash: "font-script text-[82px] leading-[1.18] tracking-[-4.1px]",
    line: "leading-[1.18]",
    second: "",
  },
  /** 50px lines under a 77px swash, all at 1.18 leading (Dynamic landing pages: The stranger problem). */
  stranger: {
    firstLineHeight: 90.86,
    tracking: "tracking-[-3.5538px]",
    swash: "font-script text-[77px] leading-[1.18] tracking-[3.85px]",
    line: "leading-[1.18] tracking-[-2.5px]",
    second: "",
    size: 50,
  },
  /** Centred, 60px lines at 1.1 under line 1's 81px, after an 82px swash at 1.18 and -4.1px (-5%) (Retain: Loyalty). */
  loyalty: {
    firstLineHeight: 81,
    tracking: "tracking-[-4.1px] text-center",
    swash: "font-script text-[82px] leading-[1.18]",
    line: "leading-[1.1] tracking-[-3px]",
    second: "",
  },
  /** As handoff, but two lines: the second sits 75.2px under the first, as Figma sets it (AI Assistants: Promotions). */
  handoffStacked: {
    firstLineHeight: 75.2,
    tracking: "tracking-[-4.1px] text-center",
    swash: "font-script text-[82px] leading-[1.1]",
    line: "leading-[1.1] tracking-[-2.5px]",
    second: "",
    size: 50,
  },
  /** Every line at 1.07, the swash adding no height, as the hero headlines: 50px lines under a 77px swash. */
  displaySmall: {
    // 53.5px of line plus 20px above it, so line 1 keeps the stranger variant's baseline (63px down).
    firstLineHeight: 73.5,
    firstLinePad: 20,
    tracking: "tracking-[-3.5538px]",
    swash: "font-script text-[77px] leading-0 tracking-[3.85px]",
    line: "leading-[1.07] tracking-[-2.5px]",
    second: "",
    size: 50,
  },
  /** As default, but every line at 1.18 leading (the Figma library headings, e.g. Two ways). */
  airy: {
    firstLineHeight: 96.76,
    tracking: "tracking-[-3.5538px]",
    swash: "font-script text-[82px] leading-[1.18] tracking-[4.1px]",
    line: "leading-[1.18] tracking-[-3px]",
    second: "",
  },
  /** One centred 60px line after an 82px swash, both at 1.18 leading (Support: Guardrails). */
  guardrails: {
    firstLineHeight: 96.76,
    tracking: "tracking-[-4.1px] text-center",
    swash: "font-script text-[82px] leading-[1.18]",
    line: "leading-[1.18] tracking-[-3px]",
    second: "",
  },
  /** As channels, but 60px lines at 1.1 under line 1's 81px (Pricing: What does a credit cover?). */
  credits: {
    firstLineHeight: 81,
    tracking: "tracking-[4.1px] text-center",
    swash: "font-script text-[82px] leading-[1.18]",
    line: "leading-[1.1] tracking-[-3px]",
    second: "",
  },
  /** As channels, left-aligned (Sell: Human mode). */
  humanMode: {
    firstLineHeight: 83.2,
    tracking: "tracking-[4.1px]",
    swash: "font-script text-[82px] leading-[1.18]",
    line: "leading-[1.18] tracking-[-3px]",
    second: "",
  },
  /** Centred, 60px lines at 1.18 after an 82px swash at +4.1px, line 1 set 83.2px tall as Figma does (Support: Channels). */
  channels: {
    firstLineHeight: 83.2,
    tracking: "tracking-[4.1px] text-center",
    swash: "font-script text-[82px] leading-[1.18]",
    line: "leading-[1.18] tracking-[-3px]",
    second: "",
  },
  /** As workflows, with 60px lines at 1.1 under line 1's 81px (Support: Workflows). */
  workflowsTight: {
    firstLineHeight: 81,
    tracking: "",
    swash: "font-script text-[82px] leading-[1.18]",
    line: "leading-[1.1] tracking-[-3px]",
    second: "",
  },
  /** As upsell, left-aligned: 60px lines at 1.18 after an 82px swash at -4.1px, line 1 set 83.2px tall (Managed launch: Journey). */
  journey: {
    firstLineHeight: 83.2,
    tracking: "tracking-[-4.1px]",
    swash: "font-script text-[82px] leading-[1.18]",
    line: "leading-[1.18] tracking-[-3px]",
    second: "",
  },
  /** 60px lines at 1.18 after an untracked 82px swash, line 1 set 83.2px tall as Figma does (Support: Workflows). */
  workflows: {
    firstLineHeight: 83.2,
    tracking: "",
    swash: "font-script text-[82px] leading-[1.18]",
    line: "leading-[1.18] tracking-[-3px]",
    second: "",
  },
  /** One centred 60px line at 1.1 after an 82px swash at 1.18 and -4.1px (-5%) (Support: Human-in-the-loop). */
  handoff: {
    firstLineHeight: 96.76,
    tracking: "tracking-[-4.1px] text-center",
    swash: "font-script text-[82px] leading-[1.18]",
    line: "leading-[1.1] tracking-[-3px]",
    second: "",
  },
} as const;

const tones = { ink: "text-ink", light: "text-white/85", cream: "text-cream" } as const;

const weights = { extralight: "font-extralight", light: "font-light" } as const;

type SectionTitleProps = {
  id: string;
  /** Swash capital (Parisienne, or Tangerine for the calligraphic variant). */
  initial: string;
  /** Rest of the first line, after the swash capital. */
  firstLine: ReactNode;
  /** Omit for a one-line headline. */
  secondLine?: ReactNode;
  /** Figma text-box width at 60px; the title scales with the breakpoint and to fit narrower screens. */
  width: number;
  variant?: keyof typeof variants;
  /** Horizontal space to leave free when scaling down (default: the page side padding). */
  gutter?: number;
  /** Text colour: ink on light sections, 85% white on dark ones, or cream (the pricing CTA panel). */
  tone?: keyof typeof tones;
  /** Extra space above the second line, in px at the 60px desktop size (scales with the title). */
  lineGap?: number;
  /** Weight of the lines (the swash keeps its own): Crimson ExtraLight, or Light as the home page sets them. */
  weight?: keyof typeof weights;
};

/**
 * Section headline (two lines, or one without `secondLine`) that opens with a calligraphic capital.
 *
 * Figma gives the swash line a fixed height (e.g. 81px) and stacks the second
 * line under it at its own line-height. Browsers would grow line 1 to fit the
 * swash's taller line-height, so each line is its own block.
 */
export function SectionTitle({
  id,
  initial,
  firstLine,
  secondLine,
  width,
  variant = "default",
  gutter,
  tone = "ink",
  lineGap,
  weight = "extralight",
}: SectionTitleProps) {
  const v = variants[variant];
  // Line size in px at desktop (60 unless the variant says otherwise).
  const size = "size" in v ? v.size : 60;

  return (
    // The headline is drawn at its 60px desktop size and zoomed to the breakpoint's h2 size
    // (--h2-scale: 60 / 48 / 40 / 36px); if that still doesn't fit, fit-to-container shrinks it.
    <div
      className="fit-to-container"
      style={
        {
          "--fit-width": `calc(${Math.ceil(width)}px * var(--h2-scale))`,
          ...(gutter !== undefined && { "--fit-gutter": `${gutter}px` }),
        } as CSSProperties
      }
    >
      <h2
        id={id}
        className={`font-serif text-[0px] leading-[0] whitespace-nowrap ${weights[weight]} ${tones[tone]} ${v.tracking}`}
        style={{ width, zoom: "var(--h2-scale)" }}
      >
        <span className="block" style={{ height: v.firstLineHeight, paddingTop: "firstLinePad" in v ? v.firstLinePad : undefined }}>
          <span className={`font-normal ${v.swash}`}>{initial}</span>
          <span className={v.line} style={{ fontSize: size }}>
            {firstLine}
          </span>
        </span>
        {secondLine !== undefined && (
          <>
            {" "}
            <span className={`block ${v.line} ${v.second}`} style={{ fontSize: size, marginTop: lineGap }}>
              {secondLine}
            </span>
          </>
        )}
      </h2>
    </div>
  );
}
