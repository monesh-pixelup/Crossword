import type { Icon } from "@phosphor-icons/react";
import {
  ChatCenteredTextIcon,
  ClockCounterClockwiseIcon,
  HeartStraightIcon,
  ListStarIcon,
  RulerIcon,
  ScalesIcon,
  TextTIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import twillTile from "@/modules/landing/assets/blog/damask-tile.webp";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import damaskScroll from "../../assets/personalization/damask-scroll.webp";
import stamp from "../../assets/personalization/stamp.webp";

/** What changes on the page once Crossword knows the shopper (Figma's seven rows, the last the closing line). */
const changes = [
  "The headline speaks to their purpose.",
  "The most relevant benefits come first.",
  "Reviews focus on the questions they care about.",
  "Comparisons reflect their priorities.",
  "Size, fit, color and budget are carried through the experience.",
  "Recommendations take into account what customers already own.",
  "A shopping experience that feels like it was made for them.",
];

/**
 * Each row's 16px glyph, from Phosphor (phosphoricons.com), regular weight, drawn on the maroon icon badge: the
 * headline, benefits, reviews, comparisons, size and fit, what they own, and a shopping experience made for them.
 */
const changeIcons: Icon[] = [
  TextTIcon,
  ListStarIcon,
  ChatCenteredTextIcon,
  ScalesIcon,
  RulerIcon,
  ClockCounterClockwiseIcon,
  HeartStraightIcon,
];

/** Row `index`'s glyph in #ffb657, at 16px. */
function ChangeGlyph({ index }: { index: number }) {
  const Glyph = changeIcons[index];
  return <Glyph size={16} className="block text-[#ffb657]" />;
}

/**
 * Figma "Section · The stranger problem (v2)" (3364:53): the eyebrow over a one-line headline (82px
 * swash, Crimson Light 60 at 1.1) with, 80px across and bottom-aligned, the 560px problem in two Geist
 * 16 paragraphs 14px apart (the second Medium, in ink). 64px below, a 4px-rounded split panel: the
 * 520px maroon solution (twill over a 20% damask scroll, a plain block behind its Crimson ExtraLight 40 and
 * Geist 16 in cream, 56px in, and a tilted postage stamp low on the left) beside the sand list of
 * changes (a maroon icon badge per row, 20px from Crimson 22 lines, 16px above and below each and
 * a #d2cbba rule between them; 48 / 56px in), the seventh row the closing line. Below 1280px
 * the problem goes under the headline, and below 1200px the solution goes over the list; on phones the
 * padding tightens and the solution's heading and the list's lines step down (28px, 19px). A 232px gold tick sits on the
 * left rail beside the eyebrow.
 */
export function Personalization() {
  return (
    <section aria-labelledby="stranger-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-16">
        {/*
          Side by side only where the 488px headline, 80px gap and 560px copy fit (the copy gives up a few px at 1280px).
          Stacked, the copy sits 27px under the headline's box, which reads as the other sections' 24px from the words.
        */}
        <div className="flex w-full flex-col items-start gap-[27px] min-[1280px]:flex-row min-[1280px]:items-end min-[1280px]:gap-20">
          <div className="flex w-full min-w-0 flex-col items-start gap-6 min-[1280px]:w-auto min-[1280px]:min-w-[488px] min-[1280px]:flex-1">
            <Eyebrow>User-level personalization</Eyebrow>
            <SectionTitle id="stranger-title" initial="T" firstLine="he stranger problem" width={488} variant="oneLine" weight="light" />
          </div>
          <div className="flex w-full max-w-[560px] min-w-0 flex-col gap-3.5 font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px]">
            <p className="text-ink-soft">
              A customer who&rsquo;s bought from you three times, has told you their size, and has told you their color
              preference sees exactly the same product page as someone who arrived ten seconds ago.
            </p>
            <p className="font-medium text-ink">
              That&rsquo;s because everything you know stays in a database instead of on the page.
            </p>
          </div>
        </div>

        {/* The solution sits beside the list from 1200px (at most 45% of the row, so the list keeps room), above it below. */}
        <div className="flex w-full flex-col overflow-clip rounded-[4px] min-[1200px]:flex-row">
          <div className="relative isolate flex flex-col px-6 pt-8 pb-[175px] sm:px-8 md:px-14 md:pt-14 min-[1200px]:w-[min(520px,45%)] min-[1200px]:shrink-0">
            {/*
              Figma's Solution fills, bottom to top: maroon; the damask scroll pattern at 20% (its tile, the scroll
              beside its mirror, at 2.59x from the top left, 376.9px tall, repeating down every 365.6px as Figma's
              -3% spacing overlaps them; only the unmirrored half ever shows); and the twill, darkening.
            */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-1">
              <div className="absolute inset-0 bg-maroon" />
              <div
                className="absolute inset-0 bg-no-repeat opacity-20"
                style={{
                  backgroundImage: [0, 1, 2].map(() => `url(${damaskScroll.src})`).join(", "),
                  backgroundSize: "1053.2px 376.9px",
                  backgroundPosition: "0 0, 0 365.6px, 0 731.2px",
                }}
              />
              <div
                className="absolute inset-0 bg-size-[172.82454997301102px_172.82454997301102px] bg-top-left mix-blend-darken"
                style={{ backgroundImage: `url(${twillTile.src})` }}
              />
            </div>

            <div className="relative isolate flex flex-col gap-4 md:gap-5">
              {/* Figma's plain maroon twill block behind the copy (448.84 × 222.29 at 520px), keeping the scrolls out from under it. */}
              <span aria-hidden className="pointer-events-none absolute -top-[8.98px] -right-[22.05px] -bottom-[14.31px] -left-[18.79px] -z-1 isolate bg-maroon">
                <span
                  className="absolute inset-0 bg-size-[172.82454997301102px_172.82454997301102px] bg-top-left mix-blend-darken"
                  style={{ backgroundImage: `url(${twillTile.src})` }}
                />
              </span>
              {/* Figma 3364:97: Crimson ExtraLight 40 at -2px (-5%). */}
              <h3 className="font-serif text-(length:--h4-size) leading-[1.1] font-extralight tracking-[-0.05em] text-cream">Now you have a solution</h3>
              <p className="font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-[rgba(255,249,234,0.82)]">
                Crossword turns customer understanding into a more personal shopping experience. It brings together what a
                shopper has told you, what they&rsquo;ve bought before, what they care about and what they&rsquo;re looking
                for right now, and uses that context to change how your products are presented.
              </p>
            </div>

            {/*
              The postage stamp, tilted 14.68° (Figma 3602:30899, its leather-emboss and guilloché shaders baked into a 3x
              export, cut out of the card), its render box 46.42px in and 12.39px up from the card's corner. The 175px
              bottom padding keeps the copy clear of it.
            */}
            <Image
              src={stamp}
              alt=""
              sizes="137px"
              className="pointer-events-none absolute bottom-[12.39px] left-[46.42px] h-[133.4px] w-[136.64px] max-w-none"
            />
          </div>

          <div className="flex min-w-0 flex-col bg-sand px-6 py-6 sm:px-8 sm:py-8 md:px-14 md:py-12 min-[1200px]:flex-1">
            <ol className="flex flex-col">
              {changes.map((change, i) => (
                <li key={change} className="flex items-center gap-4 border-b border-rail py-4 last:border-b-0 sm:gap-5">
                  {/* Figma 3602:30824 "Icon badge": the 16px glyph on maroon, 4px in, inside a 0.6px #efe9db line. */}
                  <span aria-hidden className="flex shrink-0 items-center justify-center border-[0.6px] border-linen bg-maroon p-1">
                    <ChangeGlyph index={i} />
                  </span>
                  <span className="min-w-0 flex-1 font-serif text-[20px] leading-[1.1] tracking-[-0.04em] text-ink sm:text-[22px] sm:leading-[1.0909]">{change}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
