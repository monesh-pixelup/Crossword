import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const tones = {
  /** Ink soft over a hairline at ink 30% (cream and sand grounds). */
  ink: "border-[rgba(40,40,40,0.3)] text-ink-soft focus-visible:outline-maroon",
  /** Cream text over a cream/40 hairline (livery grounds), as the guidelines' light text link. */
  cream: "border-cream/40 text-cream focus-visible:outline-gold",
} as const;

type TextLinkProps = ComponentProps<typeof Link> & {
  tone?: keyof typeof tones;
  /** Draw the hairline under the label (on by default). */
  underline?: boolean;
};

/** Secondary inline action (brand guidelines 11.2): uppercase Crimson Pro 400 16/22 at -3% over a hairline, with an arrow that nudges 3px on hover. */
export function TextLink({ tone = "ink", underline = true, className, children, ...props }: TextLinkProps) {
  return (
    <Link
      className={cn(
        "group inline-flex shrink-0 items-center gap-2 p-[2px] font-serif text-base leading-[22px] font-normal tracking-[-0.03em] whitespace-nowrap uppercase transition-opacity duration-150 hover:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2",
        underline && "border-b",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
      <svg
        aria-hidden
        width="13"
        height="11"
        viewBox="0 0 12.85 10.85"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transition-none"
      >
        <path d="M0 5.42H12M7 10.42L12 5.42L7 0.42" />
      </svg>
    </Link>
  );
}
