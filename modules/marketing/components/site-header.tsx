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
import grokDark from "../assets/nav/glyphs/dark-grok.svg";
import instinctDark from "../assets/nav/glyphs/dark-instinct.svg";
import museDark from "../assets/nav/glyphs/dark-muse.svg";
import perplexityDark from "../assets/nav/glyphs/dark-perplexity.svg";
import chatgptLight from "../assets/nav/glyphs/light-chatgpt.svg";
import claudeLight from "../assets/nav/glyphs/light-claude.svg";
import grokLight from "../assets/nav/glyphs/light-grok.svg";
import instinctLight from "../assets/nav/glyphs/light-instinct.svg";
import museLight from "../assets/nav/glyphs/light-muse.svg";
import perplexityLight from "../assets/nav/glyphs/light-perplexity.svg";
import featureCardLight from "../assets/nav/card-light.webp";
import { ctaLinks, type NavItem, type NavLink, type PlatformLink, platformMenu, primaryNav } from "../config/navigation";
import { MobileMenu } from "./mobile-menu";

/**
 * Pages whose header starts transparent over a full-bleed photo hero and turns into the dark
 * translucent bar once the page scrolls. Everywhere else it is the cream bar.
 */
const TRANSPARENT_ROUTES = ["/", "/dynamic-landing-pages", "/sell", "/support", "/retain", "/managed-launch", "/ai-assistants", "/personal-agents"]; // Pricing is off these while its hero is hidden.

/**
 * Of those, pages where the dark bar belongs to the hero only: once the hero (the page's first
 * section) has scrolled up past the header, it becomes the cream bar.
 */
const HERO_ONLY_ROUTES = ["/", "/dynamic-landing-pages", "/sell", "/support", "/retain", "/managed-launch", "/ai-assistants", "/personal-agents"];

/**
 * Of those, pages whose bar fills (dark and cream) run the full viewport width like their hero,
 * past the 1600px cap; the contents and the rails keep to the cap.
 */
const FULL_BLEED_ROUTES = ["/", "/dynamic-landing-pages", "/sell", "/support", "/retain", "/managed-launch", "/pricing", "/ai-assistants", "/personal-agents"];

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
  /** Claude sits at 60%; the others carry their opacity in their artwork. */
  faded?: boolean;
};

/** Each channel's "Examples" chips, as Figma's "Chip · …" (3572:91, 3572:106). */
const assistantIcons: Record<"assistants" | "agents", Glyph[]> = {
  assistants: [
    { name: "ChatGPT", onDark: chatgptDark, onSand: chatgptLight, width: 11.3, height: 11.199 },
    { name: "Claude", onDark: claudeDark, onSand: claudeLight, width: 11.27, height: 9.714, top: 0.74, faded: true },
    { name: "Perplexity", onDark: perplexityDark, onSand: perplexityLight, width: 11.2, height: 11.2 },
  ],
  agents: [
    { name: "Muse", onDark: museDark, onSand: museLight, width: 11.3, height: 7.494, top: 1.85 },
    { name: "Instinct", onDark: instinctDark, onSand: instinctLight, width: 11.3, height: 11.199 },
    { name: "Grok Bot", onDark: grokDark, onSand: grokLight, width: 11.302, height: 11.2 },
  ],
};

/** The dark bar's chip fill: white at 4% under a soft white radial glow (9%) from the top left. */
const darkChipFill = [
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 18.9 18.8' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.09000000357627869'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0.59206 2.687 -2.1659 0.4621 3.5294 -8.0703)'><stop stop-color='rgba(255,255,255,1)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='0.72276'/></radialGradient></defs></svg>\")",
  "linear-gradient(rgba(255,255,255,0.04), rgba(255,255,255,0.04))",
].join(", ");

/**
 * Figma "Icon · …": an 18.9 × 18.8 glass tile (8.155px corners, a 33px background blur). On the
 * dark bar it has a 0.8155px inside stroke fading from white at 12% to clear top to bottom over a
 * white 4% fill with a radial glow; on the cream one it is ink at 6% in a 0.8155px rail-coloured
 * stroke. Its glyph sits 3.815px in.
 */
function AiIcon({ glyph, light }: { glyph: Glyph; light: boolean }) {
  return (
    <span
      className={cn(
        "relative block h-[18.8px] w-[18.9px] shrink-0 rounded-[8.155px] backdrop-blur-[16.494px]",
        !light && "bg-ink/6 shadow-[inset_0_0_0_0.8155px_var(--color-rail)]",
      )}
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
          alt=""
          className="absolute left-0 max-w-none"
          style={{ top: glyph.top ?? 0, width: glyph.width, height: glyph.height }}
        />
      </span>
    </span>
  );
}

/**
 * Figma "Chip · …": the icon tile and the name in Geist 12, 4px apart in a 12px-round pill (5 × 4px
 * padding) on a 1px line: white at 5% in white/10 on the dark bar, ink at 4% in the rail colour on the
 * cream one.
 */
function AiChip({ glyph, light }: { glyph: Glyph; light: boolean }) {
  return (
    <span
      className={cn(
        "flex items-center gap-1 rounded-[12px] border px-[5px] py-1",
        light ? "border-white/10 bg-white/5" : "border-rail bg-ink/4",
      )}
    >
      <AiIcon glyph={glyph} light={light} />
      <span className={cn("font-sans text-[12px] leading-none tracking-[-0.12px] whitespace-nowrap", light ? "text-cream/80" : "text-ink/80")}>
        {glyph.name}
      </span>
    </span>
  );
}

/** Figma's 13 × 10 ArrowRight (a 1.25px stroke), in the colour of the text it sits beside. */
function MenuArrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0.625 0.625 13 10" fill="none" className={cn("h-[10px] w-[13px] shrink-0 overflow-visible", className)}>
      <path d="M.625 5.625h13m-5 5 5-5-5-5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * A Platform menu product: its title (Crimson 16, or 18 for the channels) and arrow across the
 * column, 4px over its Geist 12 line. Title and arrow turn amber (maroon on cream) on hover.
 */
function PlatformItem({
  link,
  light,
  large = false,
  descriptionWidth,
  onChoose,
}: {
  link: PlatformLink;
  light: boolean;
  large?: boolean;
  descriptionWidth?: number;
  onChoose: () => void;
}) {
  const hover = light ? "group-hover/link:text-[#ffb657] group-focus-visible/link:text-[#ffb657]" : "group-hover/link:text-maroon group-focus-visible/link:text-maroon";
  return (
    <Link
      href={link.href}
      onClick={onChoose}
      className="group/link flex w-full flex-col items-start gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
    >
      <span className="flex w-full items-center justify-between gap-4">
        <span
          className={cn(
            "font-serif leading-[1.1] whitespace-nowrap transition-colors duration-150",
            large ? "text-[18px] tracking-[-0.36px]" : "text-base tracking-[-0.32px]",
            light ? "text-cream" : "text-ink",
            hover,
          )}
        >
          {link.label}
        </span>
        <MenuArrow className={cn("transition-colors duration-150", light ? "text-cream/85" : "text-ink/70", hover)} />
      </span>
      <span
        className={cn("font-sans text-[12px] leading-5 tracking-[-0.48px]", light ? "text-cream/40" : "text-ink/60")}
        style={{ maxWidth: descriptionWidth }}
      >
        {link.description}
      </span>
    </Link>
  );
}

/**
 * Figma "Platform menu · v2" (3572:53; on cream 3584:24912): a panel the full width of the bar, 32px
 * down to its three columns and 32px under them, in a deeper translucent dark (the bar's
 * rgba(9, 9, 9, .71) laid twice) or cream over a 1px rail rule. Rules (white/10, or the rail at 50%)
 * run down between the columns, about 61px either side:
 * - Website, 311px plus 48px after: its Crimson 18 heading over a Geist 12 line, then 28px apart the
 *   Sell group (its label 14px over its two products, 20px apart, 24px in from a gold/15 or rail/40
 *   rule), Customer support and Retention.
 * - The AI channels, 276px and 48px in either side: AI Assistants and Personal Agents (Crimson 18)
 *   32px either side of a 0.681px rule, each with its "Examples" label (Geist Medium 11, +8%) 8px
 *   down and 10px over its chips.
 * - The 304 × 111 Insight card, 10px over a READ MORE link.
 * Below 1440px the gaps and columns close up.
 */
function PlatformPanel({ light, fullBleed, open, onChoose }: { light: boolean; fullBleed: boolean; open: boolean; onChoose: () => void }) {
  const muted = light ? "text-cream/40" : "text-ink/60";
  const rule = light ? "bg-white/10" : "bg-rail/50";
  return (
    <div className={cn("absolute inset-x-0 top-full isolate", reveal(open))}>
      <div
        aria-hidden
        className={cn(
          "absolute -z-10",
          fullBleed ? "inset-y-0 left-1/2 w-screen -translate-x-1/2" : "inset-0",
          light ? "bg-[rgba(9,9,9,0.916)] backdrop-blur-[16px]" : "border-b border-rail bg-cream",
        )}
      />
      <div className="flex content-width items-stretch justify-between gap-6 py-8">
        <div className="flex w-[359px] min-w-0 shrink flex-col items-start gap-7 pr-12">
          <div className="flex flex-col items-start gap-1 whitespace-nowrap">
            <p className={cn("font-serif text-[18px] leading-[1.1] tracking-[-0.36px]", light ? "text-cream" : "text-ink")}>
              {platformMenu.website.title}
            </p>
            <p className={cn("font-sans text-[12px] leading-5 tracking-[-0.48px]", muted)}>{platformMenu.website.description}</p>
          </div>

          <div className="flex w-full flex-col items-start gap-3.5">
            <p className={cn("font-serif text-base leading-[1.1] tracking-[-0.32px]", light ? "text-cream" : "text-ink")}>
              {platformMenu.sell.label}
            </p>
            <ul className={cn("flex w-full flex-col gap-5 border-l pl-6", light ? "border-[rgba(224,190,96,0.15)]" : "border-rail/40")}>
              {platformMenu.sell.links.map((link) => (
                <li key={link.label}>
                  <PlatformItem link={link} light={light} onChoose={onChoose} />
                </li>
              ))}
            </ul>
          </div>

          {platformMenu.more.map((link) => (
            <PlatformItem key={link.label} link={link} light={light} onChoose={onChoose} />
          ))}
        </div>

        <span aria-hidden className={cn("w-px shrink-0", rule)} />

        <div className="flex w-[372px] min-w-0 shrink flex-col gap-8 px-12">
          {platformMenu.channels.map((channel, i) => (
            <div key={channel.label} className="contents">
              {i > 0 && <span aria-hidden className={cn("h-[0.681px] w-full shrink-0", rule)} />}
              <div className="flex w-full flex-col items-start gap-1">
                <PlatformItem link={channel} light={light} large descriptionWidth={channel.descriptionWidth} onChoose={onChoose} />
                <div className="flex flex-col items-start gap-2.5 pt-2">
                  <p className={cn("font-sans text-[11px] leading-[1.2] font-medium tracking-[0.88px] uppercase", muted)}>Examples</p>
                  <ul className="flex flex-wrap gap-2">
                    {assistantIcons[channel.examples].map((glyph) => (
                      <li key={glyph.name}>
                        <AiChip glyph={glyph} light={light} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <span aria-hidden className={cn("w-px shrink-0", rule)} />

        <div className="flex w-[304.172px] min-w-0 shrink flex-col items-start gap-2.5">
          <Link href={platformMenu.feature.href} onClick={onChoose} className="block w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon">
            <Image src={light ? featureCardDark : featureCardLight} alt={platformMenu.feature.alt} sizes="305px" className="h-auto w-full" />
          </Link>
          <Link
            href={platformMenu.feature.href}
            onClick={onChoose}
            className={cn(
              "flex items-center gap-2 border-b p-[2px] font-serif text-[14px] leading-[22px] tracking-[-0.42px] whitespace-nowrap uppercase transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon",
              light ? "border-white/30 text-cream" : "border-black/30 text-ink",
            )}
          >
            {platformMenu.feature.cta}
            {/* Figma's ArrowRight: a 16px phosphor arrow (#dad5c8) on the dark bar, its 12 × 10 glyph alone (ink) on cream. */}
            <svg
              aria-hidden
              viewBox={light ? "0 0 16 16" : "2 3 12.0004 10.0006"}
              fill={light ? "#dad5c8" : "#141414"}
              className={light ? "size-4" : "h-[10.001px] w-3"}
            >
              <path d="M13.854 8.354l-4.5 4.5a.5.5 0 0 1-.708-.708L12.293 8.5H2.5a.5.5 0 0 1 0-1h9.793L8.646 3.854a.5.5 0 1 1 .708-.708l4.5 4.5a.5.5 0 0 1 0 .708Z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * The Resources list (laid out as the old Figma "Navbar" Company menu, as v2 doesn't draw it): a
 * 235px list, its links 24px in so they line up under the trigger's label, 12px apart. Over a dark bar it hangs from the bar in the same translucent fill (2px corners,
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
 *   its translucent dark fill (rgba(9, 9, 9, .71) with a blur) and a 1px white/10 rule fade in
 *   behind them over 300ms. On HERO_ONLY_ROUTES that lasts while the hero is under the header;
 *   past it the header is the cream bar (still with no spacer).
 *
 * Both bars carry the Platform menu (full width) and the Resources list.
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
        <span aria-hidden className={cn("pointer-events-none absolute inset-x-0 -bottom-[0.5px] h-px bg-white/10", fade, dark ? "opacity-100" : "opacity-0")} />
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
