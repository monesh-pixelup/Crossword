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
  /**
   * Left-aligned, 60px lines at 0.9 under line 1's 75px, after an 82px swash at 1.18 and +4.1px, as Figma sets the
   * Dynamic landing pages and Retain headlines (two lines 129px tall, three 183px).
   */
  dynamic: {
    firstLineHeight: 75,
    tracking: "tracking-[-3.5538px]",
    swash: "font-script text-[82px] leading-[1.18] tracking-[4.1px]",
    line: "leading-[0.9] tracking-[-3px]",
    second: "",
  },
  /** As dynamic, with the swash pulled in to Figma's -4% (-3.28px) instead of +4.1px (Support: Workflows, Figma 4035:24063). */
  dynamicTightSwash: {
    firstLineHeight: 75,
    tracking: "tracking-[-3.5538px]",
    swash: "font-script text-[82px] leading-[1.18] tracking-[-3.28px]",
    line: "leading-[0.9] tracking-[-3px]",
    second: "",
  },
  /** As dynamic, centred (Retain: Loyalty, Figma 3257:38819). */
  dynamicCentered: {
    firstLineHeight: 75,
    tracking: "tracking-[-4.1px] text-center",
    swash: "font-script text-[82px] leading-[1.18] tracking-[4.1px]",
    line: "leading-[0.9] tracking-[-3px]",
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
    // Figma's type standard (Headings/XL 60/54 under a Swash/XL 82/97 capital): two lines 129px tall, as `dynamic`.
    firstLineHeight: 75,
    tracking: "tracking-[-3px]",
    swash: "font-script text-[82px] leading-[1.18] tracking-[-3px]",
    line: "leading-[0.9]",
    second: "",
  },
  /** Centred, -3px tracking (Customer intelligence): Headings/XL 60/54 under the 97px swash line, two lines 129px tall. */
  intelligence: {
    firstLineHeight: 75,
    tracking: "tracking-[-3px] text-center",
    swash: "font-script text-[82px] leading-[1.18] tracking-[4.1px]",
    line: "leading-[0.9]",
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
  /** Centred, 60px lines at 1.1 under line 1's 81px, after an 82px swash at 1.18 and -4.1px (-5%) (Retain: Loyalty; AI Assistants: Promotions). */
  loyalty: {
    firstLineHeight: 81,
    tracking: "tracking-[-4.1px] text-center",
    swash: "font-script text-[82px] leading-[1.18]",
    line: "leading-[1.1] tracking-[-3px]",
    second: "",
  },
  /** Every line at 1.07, the swash adding no height, as the hero headlines: 50px lines under a 77px swash. */
  displaySmall: {
    // 53.5px of line plus 20px above it, so line 1's baseline sits 63px down (as a 77px swash at 1.18 sets it).
    firstLineHeight: 73.5,
    firstLinePad: 20,
    tracking: "tracking-[-3.5538px]",
    swash: "font-script text-[77px] leading-0 tracking-[3.85px]",
    line: "leading-[1.07] tracking-[-2.5px]",
    second: "",
    size: 50,
  },

  /** One centred 60px line after an 82px swash, both at 1.18 leading (Support: Guardrails). */
  guardrails: {
    firstLineHeight: 96.76,
    tracking: "tracking-[-4.1px] text-center",
    swash: "font-script text-[82px] leading-[1.18]",
    line: "leading-[1.18] tracking-[-3px]",
    second: "",
  },
  /** As channels, but 60px lines at 1.1 under line 1's 81px (Support: Channels; Pricing: Plans, Engineer). */
  credits: {
    firstLineHeight: 81,
    tracking: "tracking-[4.1px] text-center",
    swash: "font-script text-[82px] leading-[1.18]",
    line: "leading-[1.1] tracking-[-3px]",
    second: "",
  },
  /** As credits, the swash untracked (Pricing: What does a credit cover?). */
  creditCover: {
    firstLineHeight: 81,
    tracking: "text-center",
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
  /** Left-aligned: 60px lines at 1.1 under line 1's 81px, after an 82px swash at 1.18 and -4.1px (-5%) (Managed launch: Journey). */
  journey: {
    firstLineHeight: 81,
    tracking: "tracking-[-4.1px]",
    swash: "font-script text-[82px] leading-[1.18]",
    line: "leading-[1.1] tracking-[-3px]",
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
  /** Figma text-box width at 60px; the title scales with the breakpoint and, from 768px, to fit narrower screens. */
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
  /**
   * No longer needed: below 768px every headline keeps the h2 size and wraps to its container (see phoneMetrics), so
   * a re-broken headline needs no width of its own. Still accepted so its callers read as before.
   */
  mobileWidth?: number;
  /** The heading level: h2 (a section's headline), or h1 for a page whose first section's headline is its title. */
  as?: "h1" | "h2";
  /** The swash capital's tracking in em, where Figma sets its own (e.g. -0.06 for -6%); otherwise the variant's. */
  swashTracking?: number;
};

/**
 * Below 768px a headline is never shrunk to fit: every section's is drawn at the breakpoint's h2 size (40px, 36px
 * below 480px), and a line too long for the screen wraps instead (balanced), so headlines are the same size in every
 * section and on every page. Shrunk to fit, as from 768px up, a long line came out smaller than a short one's.
 *
 * A wrapping line can't sit in the fixed-height block the desktop layout gives line 1 (its swash would push the
 * wrapped lines apart), so there the swash takes no height of its own (leading 0) and the block is as tall as its
 * lines, with room above for the swash: `pad` puts line 1's baseline exactly where the fixed block had it, and the
 * margin under the block lands line 2 where it was. A headline that fits is drawn exactly as before.
 *
 * `pad` is where the swash's own line box put the baseline, less the line's half-leading: measured in the browser
 * for the two swash settings (Parisienne 82px at 1.18, Tangerine 82px at 1.1) over Crimson Pro lines.
 */
const SWASH_BASE = { script: 47.14, calligraphy: 45.14 } as const;

function phoneMetrics(v: (typeof variants)[keyof typeof variants], size: number) {
  const lineHeight = size * Number(/leading-\[([\d.]+)\]/.exec(v.line)?.[1] ?? 1.1);
  // displaySmall's swash already takes no height: its own padding is the room above.
  const pad =
    "firstLinePad" in v ? v.firstLinePad : SWASH_BASE[v.swash.includes("font-calligraphy") ? "calligraphy" : "script"] - lineHeight / 2;
  return { pad, after: v.firstLineHeight - pad - lineHeight };
}

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
  as: Heading = "h2",
  swashTracking,
}: SectionTitleProps) {
  const v = variants[variant];
  // Line size in px at desktop (60 unless the variant says otherwise).
  const size = "size" in v ? v.size : 60;

  const phone = phoneMetrics(v, size);

  return (
    // The headline is drawn at its 60px desktop size and zoomed to the breakpoint's h2 size
    // (--h2-scale: 60 / 48 / 40 / 36px). From 768px, if that still doesn't fit, fit-to-container shrinks it; below,
    // its lines wrap at that size instead (see phoneMetrics).
    <div
      className="max-w-full md:fit-to-container"
      style={
        {
          "--title-w": `${width}px`,
          "--fit-width": `calc(${Math.ceil(width)}px * var(--h2-scale))`,
          ...(gutter !== undefined && { "--fit-gutter": `${gutter}px` }),
        } as CSSProperties
      }
    >
      <Heading
        id={id}
        className={`font-serif text-[0px] leading-[0] max-md:text-balance md:w-(--title-w) md:whitespace-nowrap ${weights[weight]} ${tones[tone]} ${v.tracking}`}
        style={{ zoom: "var(--h2-scale)" }}
      >
        <span
          className="block pt-(--line-pad) max-md:mb-(--line-after) max-md:pt-(--line-pad-phone) md:h-(--line-h)"
          style={
            {
              "--line-h": `${v.firstLineHeight}px`,
              "--line-pad": `${"firstLinePad" in v ? v.firstLinePad : 0}px`,
              "--line-pad-phone": `${phone.pad}px`,
              "--line-after": `${phone.after}px`,
            } as CSSProperties
          }
        >
          <span
            className={`font-normal ${v.swash} max-md:leading-[0]`}
            style={swashTracking !== undefined ? { letterSpacing: `${swashTracking}em` } : undefined}
          >
            {initial}
          </span>
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
      </Heading>
    </div>
  );
}
