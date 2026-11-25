import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import { RailAccent } from "@/components/ui/rail-accent";
import { StampButton } from "@/components/ui/stamp-button";
import flourish from "../assets/inner-hero/flourish.svg";
import roses from "../assets/inner-hero/roses.webp";
import { ctaLinks } from "../config/navigation";
import { Rails } from "./rails";

type InnerHeroProps = {
  /** The headline's id (the section is labelled by it, and its `…hero-title` ending is what the hero curtain keys on). */
  id: string;
  /** The swash capital the headline opens with. */
  initial: string;
  /** The headline after its capital, one entry per line from 768px (below that the words flow, balanced). */
  lines: ReactNode[];
  /** The line of copy under the headline. */
  copy: ReactNode;
  /** The button's label (BOOK A DEMO unless the page says otherwise). */
  cta?: string;
  /** The capital's tracking in em, where Figma sets its own (e.g. -0.04 for -4%); +5% otherwise. */
  initialTracking?: number;
};

/**
 * Figma "Hero Option B" (4297:34317), the inner pages' hero: on the page's cream (#fff9ea), under the cream header, the
 * copy centred 73px down: the headline (Crimson ExtraLight 69 at 0.9, the section headings' leading, and -5%, after a 94.3px Parisienne capital at
 * 1.18 and +5%), 12px over a 480px line of Geist 16/24 at black/45, and 17px under that the wine BOOK A DEMO. Behind
 * it, from the foot up, the embossed roses (Figma's "Decorative Background Design 2": 1393 × 409, turned 180°, at 30%
 * in luminosity) and the soft-light flourish; a 209px gold tick on each page rail, 111px down. 1440 × 571 at full
 * size; the ornaments scale with the width below that, from the foot.
 *
 * The inner pages opt out of the hero curtain (`data-no-curtain` on their <main>), so the hero scrolls away with the
 * page. The page's rails are drawn by the hero itself, as on the journal's heroes, since the page's own rails start
 * at its foot.
 */
export function InnerHero({ id, initial, lines, copy, cta = "BOOK A DEMO", initialTracking = 0.05 }: InnerHeroProps) {
  return (
    <section aria-labelledby={id} className="relative isolate overflow-clip bg-cream">
      {/* The cream runs the full viewport width, out past the site's 1440px cap (SiteShell clips the overrun). */}
      <div aria-hidden className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-cream" />

      {/*
        The ornaments, laid out on Figma's 1440 × 571 and zoomed to the hero's width, from its foot. No z-index or other
        stacking context between them and the cream above: their luminosity and soft-light blends must reach the cream
        (on a layer of their own, the maroon flourish shows as it is, a red pattern).
      */}
      <div aria-hidden className="@container pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-0 h-[571px] w-[1440px] scale-to-container [--fit-width:1440px]">
          {/* The roses: 1393 × 409, centred, their top 251.4px down, turned 180° (the crop is Figma's image fill). */}
          <div className="absolute top-[251.42px] left-[calc(50%+0.16px)] h-[408.997px] w-[1393.047px] -translate-x-1/2 rotate-180 opacity-30 mix-blend-luminosity">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={roses}
                alt=""
                sizes="1683px"
                className="absolute top-[-11.55%] left-[-10.38%] h-[249.31%] w-[120.77%] max-w-none"
              />
            </div>
          </div>
          {/* The flourish (its own 30% and blur), soft-light, 47.6px in and 395px down. */}
          <div className="absolute top-[395.23px] left-[47.59px] h-[331.006px] w-[1347.531px] mix-blend-soft-light">
            <Image src={flourish} alt="" unoptimized className="absolute top-[-1.51%] left-[-0.37%] h-[103.02%] w-[100.74%] max-w-none" />
          </div>
        </div>
      </div>

      <Rails />
      <RailAccent className="absolute top-[111px] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.938px] w-px max-lg:hidden" />
      <RailAccent className="absolute top-[111px] right-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.938px] w-px max-lg:hidden" />

      {/*
        Below 768px the copy is centred in the hero's height, which stays as it was: the hero's padding (--hero-pad, its
        56px above the copy plus the space kept below it) is shared equally above and below the copy, but at least the
        ornaments' height from the foot (the roses, 319.58px of the 1440px composition: 22.19vw) plus 16px stays below
        it, so the copy never sits over the pattern, and what's left goes above. From 768px it is as Figma sets it.
      */}
      <div className="relative flex content-width flex-col items-center gap-[17px] pt-14 pb-[clamp(150px,40vw,212px)] text-center max-md:[--hero-pad:calc(56px+clamp(150px,40vw,212px))] max-md:[--hero-pb:max(calc(var(--hero-pad)/2),calc(22.19vw+16px))] max-md:pt-[calc(var(--hero-pad)-var(--hero-pb))] max-md:pb-(--hero-pb) md:pt-[73px] lg:min-h-[571px] lg:pb-16">
        <div className="flex w-full max-w-[740px] flex-col items-center gap-3">
          <h1
            id={id}
            className="pt-[0.3em] font-serif text-(length:--display-size) leading-[0.9] font-extralight tracking-[-0.05em] text-balance text-ink lg:text-[69px]"
          >
            {/*
              The swash takes no line height of its own (leading 0), so every line keeps the headline's 0.9, the
              section headings' leading (SectionTitle: 60px lines at 54px), and the first line carries 0.3em of top
              padding for the capital's rise.
            */}
            <span className="font-script text-[1.3667em] leading-0 font-normal" style={{ letterSpacing: `${initialTracking}em` }}>
              {initial}
            </span>
            {lines.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && (
                  <>
                    <br className="max-md:hidden" />
                    <span className="md:hidden"> </span>
                  </>
                )}
                {line}
              </Fragment>
            ))}
          </h1>
          <p className="max-w-[480px] font-sans text-base leading-6 tracking-[-0.32px] text-black/45 max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px]">
            {copy}
          </p>
        </div>
        <StampButton href={ctaLinks.bookDemo} variant="wine">
          {cta}
        </StampButton>
      </div>
    </section>
  );
}
