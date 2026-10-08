import type { CSSProperties, ReactNode } from "react";

/** Typographic settings that differ between section headlines in Figma. */
const variants = {
  /** 60px lines at 1.1 leading (Lifecycle, Shopper experience). */
  default: {
    firstLineHeight: 81,
    tracking: "tracking-[-3.5538px]",
    swash: "font-script text-[82px] leading-[1.18] tracking-[4.1px]",
    line: "leading-[1.1] tracking-[-3px]",
    second: "",
  },
  /** Tighter 0.95 leading, uniform -2.5px tracking (Platform overview). */
  compact: {
    firstLineHeight: 76,
    tracking: "tracking-[-2.5px]",
    swash: "font-script text-[82px] leading-[1.18]",
    line: "leading-[0.95]",
    // Measured against the Figma render: line 2 is set at -3px, not -2.5px.
    second: "tracking-[-3px]",
  },
  /** Centred, 0.9 leading (Managed launch). */
  centered: {
    firstLineHeight: 75,
    tracking: "tracking-[-2.5px] text-center",
    swash: "font-script text-[82px] leading-[1.18]",
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
  /** Centred, Tangerine swash capital (Customer testimonials). */
  calligraphic: {
    firstLineHeight: 73,
    tracking: "tracking-[-2.5px] text-center",
    swash: "font-calligraphy text-[82px] leading-[1.1]",
    line: "leading-[0.9] tracking-[-3px]",
    second: "",
  },
} as const;

type SectionTitleProps = {
  id: string;
  /** Swash capital (Parisienne, or Tangerine for the calligraphic variant). */
  initial: string;
  /** Rest of the first line, after the swash capital. */
  firstLine: ReactNode;
  secondLine: ReactNode;
  /** Figma text-box width at 60px; the title scales with the breakpoint and to fit narrower screens. */
  width: number;
  variant?: keyof typeof variants;
  /** Horizontal space to leave free when scaling down (default: the page side padding). */
  gutter?: number;
};

/**
 * Two-line section headline that opens with a calligraphic capital.
 *
 * Figma gives the swash line a fixed height (e.g. 81px) and stacks the second
 * line under it at its own line-height. Browsers would grow line 1 to fit the
 * swash's taller line-height, so each line is its own block.
 */
export function SectionTitle({ id, initial, firstLine, secondLine, width, variant = "default", gutter }: SectionTitleProps) {
  const v = variants[variant];

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
        className={`font-serif text-[0px] leading-[0] font-extralight whitespace-nowrap text-ink ${v.tracking}`}
        style={{ width, zoom: "var(--h2-scale)" }}
      >
        <span className="block" style={{ height: v.firstLineHeight }}>
          <span className={`font-normal ${v.swash}`}>{initial}</span>
          <span className={`text-[60px] ${v.line}`}>{firstLine}</span>
        </span>{" "}
        <span className={`block text-[60px] ${v.line} ${v.second}`}>{secondLine}</span>
      </h2>
    </div>
  );
}
