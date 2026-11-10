import Image from "next/image";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { Rails } from "@/modules/marketing/components/rails";
import damask from "../assets/privacy-damask.webp";

/**
 * Figma "Privacy" hero (1662:5332), under the site's cream header: the one-line headline (Crimson ExtraLight 80 at
 * -4px, each "P" a Parisienne 100 swash at +5px) 71.5px down, the embossed damask (356 × 172, exported from Figma's
 * leather-emboss panel) on the right, a gold tick on the left rail, and the plain patterned band along its foot.
 * The rails run its full height. The headline scales down with the screen (80px from 1440px); the damask shows
 * from 992px.
 */
export function PrivacyHero() {
  return (
    <section aria-labelledby="privacy-hero-title" className="relative h-[303.5px] overflow-hidden bg-cream max-md:h-[220px]">
      {/*
        The page's rails, drawn by the hero itself: it stays put while the policy slides up over it (the hero curtain),
        so the page's own rails start at its foot and never reach it.
      */}
      <Rails />
      <RailAccent className="absolute top-[96.4px] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.9px] w-px max-lg:hidden" />

      <Image
        src={damask}
        alt=""
        aria-hidden
        priority
        sizes="356px"
        className="pointer-events-none absolute top-[51.5px] right-[calc(var(--page-pad)+9px)] h-[172px] w-[356px] max-lg:hidden"
      />

      <div className="relative content-width pt-[71.5px] max-md:pt-12">
        <h1
          id="privacy-hero-title"
          className="font-serif text-[clamp(44px,5.556vw,80px)] leading-none font-extralight whitespace-nowrap text-ink max-md:text-[min(44px,11vw)]"
        >
          <span className="font-script text-[1.25em] leading-[1.18] font-normal tracking-[0.05em]">P</span>
          <span className="leading-[1.1] tracking-[-0.05em]">rivacy </span>
          <span className="font-script text-[1.25em] leading-[1.18] font-normal tracking-[0.05em]">P</span>
          <span className="leading-[1.1] tracking-[-0.05em]">olicy</span>
        </h1>
      </div>

      <div className="absolute inset-x-0 bottom-[2px] h-6 max-md:h-[18px]">
        <DividerBand glyph="chat" badge={false} />
      </div>
    </section>
  );
}
