"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { StampButton } from "@/components/ui/stamp-button";
import { cn } from "@/lib/cn";
import crosswordMarkLight from "../assets/crossword-mark-light.svg";
import crosswordMark from "../assets/crossword-mark.svg";
import { ctaLinks, type NavItem, primaryNav } from "../config/navigation";
import { MobileMenu } from "./mobile-menu";
import { Rails } from "./rails";

/**
 * Pages whose header starts transparent over a full-bleed photo hero and turns into the dark
 * translucent bar once the page scrolls. Everywhere else it is the cream bar.
 */
const TRANSPARENT_ROUTES = ["/", "/dynamic-landing-pages", "/sell", "/support", "/retain", "/managed-launch", "/pricing"];

/**
 * Of those, pages where the dark bar belongs to the hero only: once the hero (the page's first
 * section) has scrolled up past the header, it becomes the cream bar.
 */
const HERO_ONLY_ROUTES = ["/", "/dynamic-landing-pages", "/sell", "/support", "/retain", "/managed-launch", "/pricing"];

/**
 * Of those, pages whose bar fills (dark and cream) run the full viewport width like their hero,
 * past the 1600px cap; the contents and the rails keep to the cap.
 */
const FULL_BLEED_ROUTES = ["/", "/dynamic-landing-pages", "/sell", "/support", "/retain", "/managed-launch", "/pricing"];

/** Scrolled past this many pixels, the transparent header takes on its dark bar. */
const THRESHOLD = 10;

/** The fixed header's height. */
const HEADER_HEIGHT = 72.5;

const navText = "font-serif text-base leading-[22.356px] tracking-[-0.48px] whitespace-nowrap";

/**
 * Whether the page is scrolled past THRESHOLD and, when `trackHero`, whether the hero has scrolled
 * up past the header; read once per frame (only listens when `active`).
 */
function useScrolled(active: boolean, trackHero: boolean) {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > THRESHOLD);
      const hero = trackHero ? document.querySelector("main > :first-child") : null;
      setPastHero(!!hero && hero.getBoundingClientRect().bottom <= HEADER_HEIGHT);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [active, trackHero]);
  return { scrolled: active && scrolled, pastHero: active && trackHero && pastHero };
}

/** The caret, drawn in the text colour. */
function Caret() {
  return (
    <svg aria-hidden viewBox="0 0 14 14" fill="none" className="size-3.5 transition-transform duration-300 ease-out group-focus-within/menu:rotate-180 group-hover/menu:rotate-180">
      <path d="M11.375 5.25 7 9.625 2.625 5.25" stroke="currentColor" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * A primary nav item, with its dropdown when it has children. The dropdown opens on hover or keyboard
 * focus (CSS); choosing a link in it closes it, since the pointer and focus are still on it after the
 * route changes. It stays shut until the pointer leaves the item (or focus comes back in from
 * outside), so the next hover or tab opens it again.
 */
function MenuItem({ item, link }: { item: NavItem; link: string }) {
  const [closed, setClosed] = useState(false);
  const close = () => {
    setClosed(true);
    (document.activeElement as HTMLElement | null)?.blur();
  };

  return (
    <li
      className="group/menu relative"
      onPointerLeave={() => setClosed(false)}
      // Tabbing back in from outside opens it again too.
      onFocus={(e) => !e.currentTarget.contains(e.relatedTarget) && setClosed(false)}
    >
      <Link href={item.href} className={cn("flex items-center gap-1", navText, link)}>
        {item.label}
        {item.hasMenu && <Caret />}
      </Link>
      {item.children && (
        // Brand guidelines 11.5: opens on hover or keyboard focus, fading in as it drops 4px from
        // its trigger (150ms); the top padding bridges the gap so the pointer can cross it.
        <div
          className={cn(
            "invisible absolute top-full -left-3 -translate-y-1 pt-4 opacity-0 transition-[opacity,translate,visibility] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0",
            // Shut after a link inside is chosen, until the pointer leaves the item.
            !closed &&
              "group-focus-within/menu:visible group-focus-within/menu:translate-y-0 group-focus-within/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100",
          )}
        >
          <ul className="flex w-[300px] flex-col bg-sand p-2 shadow-[inset_0_0_0_0.5px_var(--color-rail),0_1px_1px_rgba(0,0,0,0.08),0_10px_30px_-12px_rgba(24,8,36,0.28)]">
            {item.children.map((child) => (
              <li key={child.label}>
                {/* A gold rule marks the hovered (or focused) item. */}
                <Link
                  href={child.href}
                  onClick={close}
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
  );
}

/**
 * The links and buttons, shared by both headers; `light` sets them cream for dark grounds.
 * `onMenuChange` hears when the mobile menu opens or closes.
 */
function Contents({ light, onMenuChange }: { light: boolean; onMenuChange?: (open: boolean) => void }) {
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
              <MenuItem key={item.label} item={item} link={link} />
            ))}
          </ul>
        </nav>
      </div>

      <div className="hidden items-center gap-3 self-stretch lg:flex">
        <StampButton href={ctaLinks.bookDemo} variant={light ? "wine-gold" : "primary-soft"}>
          BOOK A DEMO
        </StampButton>
      </div>
      <MobileMenu tone={light ? "light" : "dark"} onOpenChange={onMenuChange} />
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
 *   behind them over 300ms. On HERO_ONLY_ROUTES that lasts while the hero is under the header;
 *   past it the header is the cream bar (still with no spacer).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const transparent = TRANSPARENT_ROUTES.includes(pathname);
  const { scrolled, pastHero } = useScrolled(transparent, HERO_ONLY_ROUTES.includes(pathname));
  // Whether the overlay bar's mobile menu is open: the bar takes on the menu's dark fill even unscrolled.
  const [menuOpen, setMenuOpen] = useState(false);

  if (transparent) {
    // Past the hero (HERO_ONLY_ROUTES) the cream bar crossfades in over the dark one, fill, rule and contents together.
    const dark = (scrolled || menuOpen) && !pastHero;
    const fade = "transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";
    const fill = FULL_BLEED_ROUTES.includes(pathname) ? "inset-y-0 left-1/2 w-screen -translate-x-1/2" : "inset-0";
    return (
      <header className="fixed inset-x-0 top-0 z-50">
        {/* The hairlines run the full viewport width, past the 1600px cap. */}
        <span aria-hidden className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-[0.5px] bg-white/15", fade, dark ? "opacity-100" : "opacity-0")} />
        <span aria-hidden className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-[0.5px] bg-black/20", fade, pastHero ? "opacity-100" : "opacity-0")} />
        <div className="relative mx-auto max-w-[1600px] pb-[0.5px]">
          {/* Laid out as the home page's bar (full width, the content row 16px top and bottom); its dark fill fades in once the page scrolls. */}
          <div aria-hidden className={cn("pointer-events-none absolute -z-10 bg-[rgba(9,9,9,0.71)] backdrop-blur-[16px]", fill, fade, dark ? "opacity-100" : "opacity-0")} />
          <div aria-hidden className={cn("pointer-events-none absolute -z-10 bg-cream/97 backdrop-blur-[16px]", fill, fade, pastHero ? "opacity-100" : "opacity-0")} />
          <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10", fade, pastHero ? "opacity-100" : "opacity-0")}>
            <Rails />
          </div>

          {/*
            Both sets of contents share one grid cell and crossfade; the hidden one is inert. Neither
            is positioned, so the mobile menu (absolute, top-full) spans the whole bar.
          */}
          <div className="grid">
            <div inert={pastHero} className={cn("col-start-1 row-start-1 flex content-width items-center justify-between py-4", fade, pastHero ? "opacity-0" : "opacity-100")}>
              <Contents light onMenuChange={setMenuOpen} />
            </div>
            {HERO_ONLY_ROUTES.includes(pathname) && (
              <div inert={!pastHero} className={cn("col-start-1 row-start-1 flex content-width items-center justify-between py-4", fade, pastHero ? "opacity-100" : "opacity-0")}>
                <Contents light={false} />
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* The rule runs the full viewport width, past the 1600px cap. */}
        <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[0.5px] bg-black/20" />
        <div className="relative mx-auto max-w-[1600px] pb-[0.5px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-cream/97 backdrop-blur-[16px]">
            <Rails />
          </div>

          {/* Not positioned, so the mobile menu (absolute, top-full) spans the whole bar. */}
          <div className="flex content-width items-center justify-between py-4">
            <Contents light={false} />
          </div>
        </div>
      </header>
      {/* Holds the fixed header's 72.5px at the top of the page. */}
      <div aria-hidden className="h-[72.5px]" />
    </>
  );
}
