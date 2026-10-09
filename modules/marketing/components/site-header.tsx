import Image from "next/image";
import Link from "next/link";
import { StampButton } from "@/components/ui/stamp-button";
import { cn } from "@/lib/cn";
import caretDownLight from "../assets/caret-down-light.svg";
import caretDown from "../assets/caret-down.svg";
import crosswordMarkLight from "../assets/crossword-mark-light.svg";
import crosswordMark from "../assets/crossword-mark.svg";
import { ctaLinks, primaryNav } from "../config/navigation";
import { MobileMenu } from "./mobile-menu";

/**
 * - `default`: cream bar with a hairline underneath (landing page).
 * - `overlay`: a translucent dark bar floating 25px down over a full-bleed hero (product pages).
 */
export type HeaderVariant = "default" | "overlay";

const navText = "font-serif text-base leading-[22.356px] tracking-[-0.48px] whitespace-nowrap";

const themes = {
  default: {
    text: "text-black/80 hover:text-black",
    mark: crosswordMark,
    caret: caretDown,
    demo: "primary-soft",
  },
  overlay: {
    text: "text-cream/80 hover:text-cream",
    mark: crosswordMarkLight,
    caret: caretDownLight,
    demo: "wine-gold",
  },
} as const;

export function SiteHeader({ variant = "default" }: { variant?: HeaderVariant }) {
  const theme = themes[variant];
  const overlay = variant === "overlay";

  return (
    <header
      className={cn(
        "z-50 flex justify-center",
        overlay
          ? "absolute inset-x-0 top-0 pt-[25px]"
          : // Hairline drawn as an overlay so the header is exactly 72.5px as in Figma.
            "relative pb-[0.5px] after:absolute after:inset-x-0 after:bottom-0 after:h-[0.5px] after:bg-black/20",
      )}
    >
      <div
        className={cn(
          "flex content-width items-center justify-between",
          // The mobile menu panel drops from the floating bar itself when overlaid.
          overlay ? "relative rounded-[2px] bg-[rgba(9,9,9,0.71)] p-2" : "py-4",
        )}
      >
        <div className="flex items-center gap-8">
          <Link href="/" aria-label="Crossword home" className="relative size-10 shrink-0">
            {/* The mark's artwork bleeds ~0.27px past its 40px box. */}
            <Image
              src={theme.mark}
              alt=""
              loading="eager"
              className="absolute -top-[0.27px] -left-[0.27px] max-w-none"
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={cn("flex items-center gap-1 transition-colors", navText, theme.text)}>
                    {item.label}
                    {item.hasMenu && <Image src={theme.caret} alt="" className="size-3.5" />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hidden items-center gap-3 self-stretch lg:flex">
          <Link
            href={ctaLinks.signUp}
            className={cn(
              "flex h-full items-center px-3 py-[3px] drop-shadow-[0px_1.35px_1.013px_rgba(0,0,0,0.25)] transition-colors",
              navText,
              theme.text,
            )}
          >
            SIGN UP
          </Link>
          <StampButton href={ctaLinks.bookDemo} variant={theme.demo}>
            BOOK A DEMO
          </StampButton>
        </div>
        <MobileMenu tone={overlay ? "light" : "dark"} />
      </div>
    </header>
  );
}
