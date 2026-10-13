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
                <li key={item.label} className="group/menu relative">
                  <Link href={item.href} className={cn("flex items-center gap-1 transition-colors", navText, theme.text)}>
                    {item.label}
                    {item.hasMenu && (
                      <Image
                        src={theme.caret}
                        alt=""
                        className="size-3.5 transition-transform duration-300 ease-out group-focus-within/menu:rotate-180 group-hover/menu:rotate-180"
                      />
                    )}
                  </Link>
                  {item.children && (
                    // Brand guidelines 11.5: opens on hover or keyboard focus, fading in as it drops 4px from
                    // its trigger (150ms); the top padding bridges the gap so the pointer can cross it.
                    <div className="invisible absolute top-full -left-3 -translate-y-1 pt-4 opacity-0 transition-[opacity,translate,visibility] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within/menu:visible group-focus-within/menu:translate-y-0 group-focus-within/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100 motion-reduce:translate-y-0">
                      <ul className="flex w-[300px] flex-col bg-sand p-2 shadow-[inset_0_0_0_0.5px_var(--color-rail),0_1px_1px_rgba(0,0,0,0.08),0_10px_30px_-12px_rgba(24,8,36,0.28)]">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            {/* A gold rule marks the hovered (or focused) item. */}
                            <Link
                              href={child.href}
                              className="flex flex-col gap-1 px-4 py-3 transition-shadow duration-150 hover:shadow-[inset_2px_0_0_0_var(--color-gold)] focus-visible:shadow-[inset_2px_0_0_0_var(--color-gold)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon"
                            >
                              <span className="font-serif text-[20px] leading-[1.1] tracking-[-0.04em] text-ink">{child.label}</span>
                              {child.description && (
                                <span className="font-sans text-[14px] leading-5 tracking-[-0.02em] text-ink-muted">{child.description}</span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
