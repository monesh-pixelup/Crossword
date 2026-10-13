"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { StampButton } from "@/components/ui/stamp-button";
import { cn } from "@/lib/cn";
import crosswordMarkLight from "../assets/crossword-mark-light.svg";
import crosswordMark from "../assets/crossword-mark.svg";
import rail from "../assets/rail.svg";
import { ctaLinks, primaryNav } from "../config/navigation";
import { MobileMenu } from "./mobile-menu";

/**
 * Pages whose header starts transparent over a full-bleed photo hero and turns into the dark
 * translucent bar once the page scrolls. Everywhere else it is the cream bar.
 */
const TRANSPARENT_ROUTES = ["/dynamic-landing-pages", "/support"];

/** Scrolled past this many pixels, the transparent header takes on its dark bar. */
const THRESHOLD = 10;

const navText = "font-serif text-base leading-[22.356px] tracking-[-0.48px] whitespace-nowrap";

/** Whether the page is scrolled past THRESHOLD, read once per frame (only listens when `active`). */
function useScrolled(active: boolean) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > THRESHOLD);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [active]);
  return active && scrolled;
}

/** The caret, drawn in the text colour. */
function Caret() {
  return (
    <svg aria-hidden viewBox="0 0 14 14" fill="none" className="size-3.5 transition-transform duration-300 ease-out group-focus-within/menu:rotate-180 group-hover/menu:rotate-180">
      <path d="M11.375 5.25 7 9.625 2.625 5.25" stroke="currentColor" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The links and buttons, shared by both headers; `light` sets them cream for dark grounds. */
function Contents({ light }: { light: boolean }) {
  const link = light ? "text-cream/80 transition-colors duration-150 hover:text-cream" : "text-black/80 transition-colors duration-150 hover:text-black";
  return (
    <>
      <div className="flex items-center gap-8">
        <Link href="/" aria-label="Crossword home" className="relative size-10 shrink-0">
          {/* The mark's artwork bleeds ~0.27px past its 40px box. */}
          <Image src={light ? crosswordMarkLight : crosswordMark} alt="" loading="eager" className="absolute -top-[0.27px] -left-[0.27px] max-w-none" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {primaryNav.map((item) => (
              <li key={item.label} className="group/menu relative">
                <Link href={item.href} className={cn("flex items-center gap-1", navText, link)}>
                  {item.label}
                  {item.hasMenu && <Caret />}
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
        <Link href={ctaLinks.signUp} className={cn("flex h-full items-center px-3 py-[3px] drop-shadow-[0px_1.35px_1.013px_rgba(0,0,0,0.25)]", navText, link)}>
          SIGN UP
        </Link>
        <StampButton href={ctaLinks.bookDemo} variant={light ? "wine-gold" : "primary-soft"}>
          BOOK A DEMO
        </StampButton>
      </div>
      <MobileMenu tone={light ? "light" : "dark"} />
    </>
  );
}

/**
 * The site header, fixed to the top so it stays in place as the page scrolls.
 *
 * - Most pages: the home page's cream bar (page cream at 97% with a blur, the page rails running
 *   through it, a 0.5px black/20 rule underneath), with a 72.5px spacer holding its place.
 * - TRANSPARENT_ROUTES: no spacer, so the hero runs up under it. The same full-width bar as the home
 *   page, but transparent with cream links, the light mark and the wine-gold button; scrolled past
 *   10px its translucent dark fill (rgba(9, 9, 9, .71) with a blur) and a white/15 hairline fade in
 *   behind them over 300ms.
 */
export function SiteHeader() {
  const transparent = TRANSPARENT_ROUTES.includes(usePathname());
  const scrolled = useScrolled(transparent);

  if (transparent) {
    return (
      <header className="fixed inset-x-0 top-0 z-50 mx-auto max-w-[1800px] pb-[0.5px]">
        {/* Laid out as the home page's bar (full width, the content row 16px top and bottom); its dark fill and hairline fade in once the page scrolls. */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 bg-[rgba(9,9,9,0.71)] backdrop-blur-[16px] transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        >
          <span className="absolute inset-x-0 bottom-0 h-[0.5px] bg-white/15" />
        </div>

        {/* Not positioned, so the mobile menu (absolute, top-full) spans the whole header. */}
        <div className="flex content-width items-center justify-between py-4">
          <Contents light />
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mx-auto max-w-[1800px] pb-[0.5px]">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-cream/97 backdrop-blur-[16px]">
          <Image src={rail} alt="" className="absolute inset-y-0 left-[calc(var(--frame-inset)-0.25px)] h-full w-[0.5px]" />
          <Image src={rail} alt="" className="absolute inset-y-0 right-[calc(var(--frame-inset)-0.25px)] h-full w-[0.5px]" />
          <span className="absolute inset-x-0 bottom-0 h-[0.5px] bg-black/20" />
        </div>

        {/* Not positioned, so the mobile menu (absolute, top-full) spans the whole header. */}
        <div className="flex content-width items-center justify-between py-4">
          <Contents light={false} />
        </div>
      </header>
      {/* Holds the fixed header's 72.5px at the top of the page. */}
      <div aria-hidden className="h-[72.5px]" />
    </>
  );
}
