"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { StampButton } from "@/components/ui/stamp-button";
import { cn } from "@/lib/cn";
import crosswordMarkLight from "../assets/crossword-mark-light.svg";
import crosswordMark from "../assets/crossword-mark.svg";
import featureCardDark from "../assets/nav/card-dark.webp";
import chatgptDark from "../assets/nav/glyphs/dark-chatgpt.svg";
import claudeDark from "../assets/nav/glyphs/dark-claude.svg";
import geminiDark from "../assets/nav/glyphs/dark-gemini.svg";
import grokDark from "../assets/nav/glyphs/dark-grok.svg";
import instinctDark from "../assets/nav/glyphs/dark-instinct.svg";
import museDark from "../assets/nav/glyphs/dark-muse.svg";
import chatgptLight from "../assets/nav/glyphs/light-chatgpt.svg";
import claudeLight from "../assets/nav/glyphs/light-claude.svg";
import geminiLight from "../assets/nav/glyphs/light-gemini.svg";
import grokLight from "../assets/nav/glyphs/light-grok.svg";
import instinctLight from "../assets/nav/glyphs/light-instinct.svg";
import museLight from "../assets/nav/glyphs/light-muse.svg";
import featureCardLight from "../assets/nav/card-light.webp";
import { ctaLinks, type NavItem, type NavLink, platformColumns, platformFeature, primaryNav } from "../config/navigation";
import { MobileMenu } from "./mobile-menu";

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

/** The caret, drawn at full cream or ink (the label beside it is at 80%); it flips up while its menu is open. */
function Caret({ open, light }: { open: boolean; light: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 14 14"
      fill="none"
      className={cn("size-3.5 transition-transform duration-300 ease-out", light ? "text-cream" : "text-ink", open && "-scale-y-100")}
    >
      <path d="M11.375 5.25 7 9.625 2.625 5.25" stroke="currentColor" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Brand guidelines 11.5: a menu fades in as it drops 4px into place (150ms). */
function reveal(open: boolean) {
  return cn(
    "transition-[opacity,translate,visibility] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0",
    open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
  );
}

type Glyph = {
  name: string;
  /** White artwork for the dark bar, ink for the cream one. */
  onDark: StaticImageData;
  onSand: StaticImageData;
  width: number;
  height: number;
  /** Down from the top of the 11.3 × 11.2 glyph box. */
  top?: number;
  /** Gemini and Claude sit at 60%; the others carry their opacity in their artwork. */
  faded?: boolean;
};

/** Each row of marks, as Figma's "Icon · …" chips. */
const assistantIcons: Record<"assistants" | "agents", Glyph[]> = {
  assistants: [
    { name: "ChatGPT", onDark: chatgptDark, onSand: chatgptLight, width: 11.3, height: 11.199 },
    { name: "Gemini", onDark: geminiDark, onSand: geminiLight, width: 11.2, height: 11.2, faded: true },
    { name: "Claude", onDark: claudeDark, onSand: claudeLight, width: 11.27, height: 9.714, top: 0.74, faded: true },
  ],
  agents: [
    { name: "Muse", onDark: museDark, onSand: museLight, width: 11.3, height: 7.494, top: 1.85 },
    { name: "Instinct", onDark: instinctDark, onSand: instinctLight, width: 11.3, height: 11.199 },
    { name: "Grok", onDark: grokDark, onSand: grokLight, width: 11.302, height: 11.2 },
  ],
};

/** The dark bar's chip fill: white at 4% under a soft white radial glow (9%) from the top left. */
const darkChipFill = [
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 18.9 18.8' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.09000000357627869'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0.59206 2.687 -2.1659 0.4621 3.5294 -8.0703)'><stop stop-color='rgba(255,255,255,1)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='0.72276'/></radialGradient></defs></svg>\")",
  "linear-gradient(rgba(255,255,255,0.04), rgba(255,255,255,0.04))",
].join(", ");

/**
 * Figma "Icon · …": an 18.9 × 18.8 glass chip (8.155px corners, a 33px background blur). On the
 * dark bar it has a 0.8155px inside stroke fading from white at 12% to clear top to bottom over a
 * white 4% fill with a radial glow; on the cream one it is ink at 10% with no stroke. Its glyph
 * sits 3.815px in.
 */
function AiChip({ glyph, light }: { glyph: Glyph; light: boolean }) {
  return (
    <span
      className={cn("relative block h-[18.8px] w-[18.9px] shrink-0 rounded-[8.155px] backdrop-blur-[16.494px]", !light && "bg-ink/10")}
      style={light ? { backgroundImage: darkChipFill } : undefined}
    >
      {light && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-[inherit] p-[0.8155px]"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0))",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}
      <span className={cn("absolute top-[3.815px] left-[3.815px] h-[11.2px] w-[11.3px]", glyph.faded && "opacity-60")}>
        <Image
          src={light ? glyph.onDark : glyph.onSand}
          alt={glyph.name}
          className="absolute left-0 max-w-none"
          style={{ top: glyph.top ?? 0, width: glyph.width, height: glyph.height }}
        />
      </span>
    </span>
  );
}

/**
 * Figma "Navbar" (Platform open): a panel the full width of the bar, in the bar's own fill (the
 * translucent dark one, or cream under the 1px rail rule), 16px down to the columns and 32px
 * under them. Three 200px product columns 125px apart (from 1440px; they close up below), the first
 * under a "SELL" label, the other two bottom-aligned with it, then the 304px "New" card at the right.
 * Each product is a Crimson 16 title over a Geist 12 line, 4px apart and 24px between products; the
 * title turns gold (wine on cream) on hover. AI Assistants and Personal Agents carry their row of
 * marks 127px in from the title's left edge.
 */
function PlatformPanel({ light, fullBleed, open, onChoose }: { light: boolean; fullBleed: boolean; open: boolean; onChoose: () => void }) {
  const gap = "gap-[min(125px,8.68vw)]";
  const label = cn("font-sans text-[12px] leading-6 tracking-[-0.48px]", light ? "text-cream/40" : "text-ink/60");
  return (
    <div className={cn("absolute inset-x-0 top-full isolate", reveal(open))}>
      <div
        aria-hidden
        className={cn(
          "absolute -z-10",
          fullBleed ? "inset-y-0 left-1/2 w-screen -translate-x-1/2" : "inset-0",
          light ? "bg-[rgba(9,9,9,0.71)] backdrop-blur-[16px]" : "bg-cream",
        )}
      />
      <div className={cn("flex content-width items-start justify-between pt-4 pb-8", gap)}>
        <div className={cn("flex min-w-0 items-end", gap)}>
          {platformColumns.map((column, i) => (
            <div key={i} className="flex w-[200px] min-w-0 flex-col gap-[26px]">
              {column.label && <p className={cn(label, "uppercase")}>{column.label}</p>}
              <ul className="flex flex-col gap-6">
                {column.links.map((link) => {
                  const icons = link.icons && assistantIcons[link.icons];
                  return (
                    <li key={link.label} className="relative">
                      <Link href={link.href} onClick={onChoose} className="group/link flex flex-col gap-1 tracking-[-0.48px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon">
                        <span
                          className={cn(
                            "font-serif text-base leading-[22.356px] whitespace-nowrap transition-colors duration-150",
                            light
                              ? "text-cream/80 group-hover/link:text-gold group-focus-visible/link:text-gold"
                              : "text-ink group-hover/link:text-wine group-focus-visible/link:text-wine",
                          )}
                        >
                          {link.label}
                        </span>
                        <span className={cn("max-w-[198px] font-sans text-[12px] leading-5", light ? "text-cream/40" : "text-ink/60")}>{link.description}</span>
                      </Link>
                      {icons && (
                        <span className="pointer-events-none absolute top-1 left-[127px] flex items-center gap-[5px]">
                          {icons.map((glyph) => (
                            <AiChip key={glyph.name} glyph={glyph} light={light} />
                          ))}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex w-[304.172px] min-w-0 shrink flex-col gap-6">
          <p className={cn(label, "uppercase")}>{platformFeature.label}</p>
          <Link href={platformFeature.href} onClick={onChoose} className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon">
            <Image src={light ? featureCardDark : featureCardLight} alt={platformFeature.alt} sizes="305px" className="h-auto w-full" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Figma "Navbar" (Company open): a 235px list, its links 24px in so they line up under the trigger's
 * label, 12px apart. Over a dark bar it hangs from the bar in the same translucent fill (2px corners,
 * 32px under the last link); under the cream bar it floats 16px below as a cream card (5px corners,
 * 24px under). The top padding of the wrapper bridges that gap for the pointer.
 */
function ListPanel({ links, light, open, onChoose }: { links: NavLink[]; light: boolean; open: boolean; onChoose: () => void }) {
  return (
    <div className={cn("absolute top-[calc(100%+0.5px)] -left-6", !light && "pt-4", reveal(open))}>
      <ul
        className={cn(
          "flex w-[235px] flex-col gap-3 px-6 pt-4",
          light ? "rounded-[2px] bg-[rgba(9,9,9,0.71)] pb-8 backdrop-blur-[16px]" : "rounded-[5px] bg-cream pb-6",
        )}
      >
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              onClick={onChoose}
              className={cn(
                "block transition-colors duration-150",
                navText,
                light ? "text-cream/80 hover:text-cream" : "text-ink hover:text-ink",
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * A primary nav item, with its menu when it has children: the full-width Platform panel (`mega`) or
 * a list under the item. The item spans the bar's full height (72px) so the pointer can move from
 * the label into the menu without leaving it. The menu opens on hover or keyboard focus and closes
 * when the pointer leaves (after a beat, so a quick crossing doesn't flicker), focus moves out,
 * Escape is pressed or a link in it is chosen. While open, the label sits on a 5% wash (8px by 4px
 * past it, 2px corners) and the caret flips.
 */
function MenuItem({
  item,
  link,
  light,
  fullBleed,
  open,
  setOpen,
}: {
  item: NavItem;
  link: string;
  light: boolean;
  fullBleed: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const show = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 120);
  };
  const choose = () => {
    clearTimeout(timer.current);
    setOpen(false);
    (document.activeElement as HTMLElement | null)?.blur();
  };
  const menu = item.children ? (item.mega ? "mega" : "list") : null;

  return (
    <li
      // The Platform panel spans the bar, so its item leaves positioning to the header.
      className={cn("-my-4 flex h-18 items-center", menu !== "mega" && "relative")}
      onPointerEnter={menu ? show : undefined}
      onPointerLeave={menu ? hide : undefined}
      onFocus={menu ? show : undefined}
      onBlur={menu ? (e) => !e.currentTarget.contains(e.relatedTarget) && hide() : undefined}
      onKeyDown={
        menu
          ? (e) => {
              if (e.key !== "Escape" || !open) return;
              // Back to the trigger first (its focus would reopen the menu), then shut.
              (e.currentTarget.querySelector("a") as HTMLElement | null)?.focus();
              clearTimeout(timer.current);
              setOpen(false);
            }
          : undefined
      }
    >
      <Link href={item.href} aria-expanded={menu ? open : undefined} className={cn("relative flex items-center gap-1", navText, link)}>
        {menu && (
          <span
            aria-hidden
            className={cn(
              "absolute -inset-x-2 -inset-y-1 -z-10 rounded-[2px] transition-opacity duration-150",
              light ? "bg-white/5" : "bg-ink/5",
              open ? "opacity-100" : "opacity-0",
            )}
          />
        )}
        {item.label}
        {item.hasMenu && <Caret open={open} light={light} />}
      </Link>
      {menu === "mega" && <PlatformPanel light={light} fullBleed={fullBleed} open={open} onChoose={choose} />}
      {menu === "list" && item.children && <ListPanel links={item.children} light={light} open={open} onChoose={choose} />}
    </li>
  );
}

/**
 * The links and buttons, shared by both headers; `light` sets them cream for dark grounds and
 * `fullBleed` runs the Platform panel's fill the full viewport width. `onMenuChange` hears when the
 * mobile menu opens or closes, `onDropdownChange` when a desktop menu does.
 */
function Contents({
  light,
  fullBleed = false,
  onMenuChange,
  onDropdownChange,
}: {
  light: boolean;
  fullBleed?: boolean;
  onMenuChange?: (open: boolean) => void;
  onDropdownChange?: (open: boolean) => void;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  useEffect(() => onDropdownChange?.(openMenu !== null), [openMenu, onDropdownChange]);
  const link = light ? "text-cream/80 transition-colors duration-150 hover:text-cream" : "text-ink transition-colors duration-150 hover:text-ink";
  return (
    <>
      <div className="flex items-center gap-8">
        <Link href="/" aria-label="Crossword home" className="relative size-10 shrink-0">
          {/* The mark's artwork bleeds ~0.27px past its 40px box. */}
          <Image src={light ? crosswordMarkLight : crosswordMark} alt="" loading="eager" className="absolute -top-[0.27px] -left-[0.27px] max-w-none" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="isolate flex items-center gap-8">
            {primaryNav.map((item) => (
              <MenuItem
                key={item.label}
                item={item}
                link={link}
                light={light}
                fullBleed={fullBleed}
                open={openMenu === item.label}
                // Closing only clears this item's own menu, so a menu just opened elsewhere stays open.
                setOpen={(open) => setOpenMenu((current) => (open ? item.label : current === item.label ? null : current))}
              />
            ))}
          </ul>
        </nav>
      </div>

      <div className="hidden items-center gap-3 self-stretch lg:flex">
        <StampButton href={ctaLinks.bookDemo} variant="wine">
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
 * - Most pages: Figma's light navbar, a cream bar with a 1px rail-coloured (#d2cbba) rule underneath, with a
 *   72.5px spacer holding its place.
 * - TRANSPARENT_ROUTES: no spacer, so the hero runs up under it. The same full-width bar, but
 *   transparent with cream links and the light mark; scrolled past 10px, or while a menu is open,
 *   its translucent dark fill (rgba(9, 9, 9, .71) with a blur) and a white/15 hairline fade in
 *   behind them over 300ms. On HERO_ONLY_ROUTES that lasts while the hero is under the header;
 *   past it the header is the cream bar (still with no spacer).
 *
 * Both bars carry the Platform menu (full width, in the bar's fill) and the Company list.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const transparent = TRANSPARENT_ROUTES.includes(pathname);
  const fullBleed = FULL_BLEED_ROUTES.includes(pathname);
  const { scrolled, pastHero } = useScrolled(transparent, HERO_ONLY_ROUTES.includes(pathname));
  // Whether the overlay bar's mobile menu or a desktop menu is open: the bar takes on the dark fill even unscrolled.
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (transparent) {
    // Past the hero (HERO_ONLY_ROUTES) the cream bar crossfades in over the dark one, fill, rule and contents together.
    const dark = (scrolled || menuOpen || dropdownOpen) && !pastHero;
    const fade = "transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";
    const fill = fullBleed ? "inset-y-0 left-1/2 w-screen -translate-x-1/2" : "inset-0";
    return (
      <header className="fixed inset-x-0 top-0 z-50">
        {/* The hairlines run the full viewport width, past the 1600px cap. */}
        <span aria-hidden className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-[0.5px] bg-white/15", fade, dark ? "opacity-100" : "opacity-0")} />
        <span aria-hidden className={cn("pointer-events-none absolute inset-x-0 -bottom-[0.5px] h-px bg-rail", fade, pastHero ? "opacity-100" : "opacity-0")} />
        <div className="relative mx-auto max-w-[1600px] pb-[0.5px]">
          {/* Laid out as the home page's bar (full width, the content row 16px top and bottom); its dark fill fades in once the page scrolls. */}
          <div aria-hidden className={cn("pointer-events-none absolute -z-10 bg-[rgba(9,9,9,0.71)] backdrop-blur-[16px]", fill, fade, dark ? "opacity-100" : "opacity-0")} />
          <div aria-hidden className={cn("pointer-events-none absolute -z-10 bg-cream", fill, fade, pastHero ? "opacity-100" : "opacity-0")} />

          {/*
            Both sets of contents share one grid cell and crossfade; the hidden one is inert. Neither
            is positioned, so the mobile menu and the Platform menu (absolute, top-full) span the whole bar.
          */}
          <div className="grid">
            <div inert={pastHero} className={cn("col-start-1 row-start-1 flex content-width items-center justify-between py-4", fade, pastHero ? "opacity-0" : "opacity-100")}>
              <Contents light fullBleed={fullBleed} onMenuChange={setMenuOpen} onDropdownChange={setDropdownOpen} />
            </div>
            {HERO_ONLY_ROUTES.includes(pathname) && (
              <div inert={!pastHero} className={cn("col-start-1 row-start-1 flex content-width items-center justify-between py-4", fade, pastHero ? "opacity-100" : "opacity-0")}>
                <Contents light={false} fullBleed={fullBleed} />
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
        <span aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-[0.5px] h-px bg-rail" />
        <div className="relative mx-auto max-w-[1600px] pb-[0.5px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-cream" />

          {/* Not positioned, so the mobile menu and the Platform menu (absolute, top-full) span the whole bar. */}
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
