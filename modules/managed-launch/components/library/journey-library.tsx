import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import noteAubergine from "../../assets/library/note-aubergine.webp";
import noteGreen from "../../assets/library/note-green.webp";
import noteMaroon from "../../assets/library/note-maroon.webp";
import noteParchment from "../../assets/library/note-parchment.webp";
import ribbon1 from "../../assets/library/ribbon-1.svg";
import ribbon2 from "../../assets/library/ribbon-2.svg";
import ribbon3 from "../../assets/library/ribbon-3.svg";
import ribbon4 from "../../assets/library/ribbon-4.svg";
import ribbon5 from "../../assets/library/ribbon-5.svg";
import ribbon6 from "../../assets/library/ribbon-6.svg";
import ribbon7 from "../../assets/library/ribbon-7.svg";
import { libraryJourneys } from "../../config/launch";
import { ScatterStrip } from "./scatter-strip";

/** Figma's punched note (its "Subtract"), 299.117 × 303.674, exported at 2x, one per livery. */
const NOTE_W = 299.117;
const NOTE_H = 303.674;

/** The ink on each livery: cream on the dark notes, near-black on the parchment one. */
const light = "text-[#fff9ea]";
const dark = "text-[#070707]";

type Card = {
  /** libraryJourneys index: the five journeys, then Gift finder and Style match again to fill the strip. */
  journey: number;
  note: StaticImageData;
  /** The note's copy colour. */
  ink: string;
  /** The title ribbon (Figma "Rectangle 2095589201" and on), 0.12px in, `top` down its note, and its title colour. */
  ribbon: { src: StaticImageData; w: number; h: number; top: number };
  title: string;
  /** Top-left corner on the strip (356px down the panel) and turn about its centre. */
  at: [number, number];
  angle: number;
  /** How far it moves when the strip scatters (Figma 4060:25451), from `at`; its turn stays. */
  scatter: [number, number];
};

/**
 * Figma 4060:25055: seven notes on the 1392px panel, four across then three below, each its own livery (green,
 * parchment, aubergine, maroon), ribbon colour and turn.
 */
const cards: Card[] = [
  { journey: 0, note: noteGreen, ink: light, ribbon: { src: ribbon1, w: 136.626, h: 41.731, top: 31.85 }, title: "text-black", at: [104.74, 20.61], angle: -3.2, scatter: [-83.66, 19.37] },
  { journey: 1, note: noteParchment, ink: dark, ribbon: { src: ribbon2, w: 144.93, h: 41.731, top: 31.85 }, title: "text-[#faedd4]", at: [413.06, 6.76], angle: 3.15, scatter: [-7.07, 2.8] },
  { journey: 2, note: noteAubergine, ink: light, ribbon: { src: ribbon3, w: 137.023, h: 42.65, top: 30.93 }, title: "text-black", at: [707.11, 21.03], angle: -2.16, scatter: [29.06, -50] },
  { journey: 3, note: noteParchment, ink: dark, ribbon: { src: ribbon4, w: 136.223, h: 42.727, top: 31.85 }, title: "text-[#faedd4]", at: [1011.87, 39.98], angle: 9.21, scatter: [70.67, 0] },
  { journey: 4, note: noteMaroon, ink: light, ribbon: { src: ribbon5, w: 132.397, h: 41.731, top: 31.85 }, title: "text-black", at: [234.99, 316.19], angle: 7.04, scatter: [-96.16, 96.94] },
  { journey: 0, note: noteParchment, ink: dark, ribbon: { src: ribbon6, w: 138.212, h: 42.158, top: 31.42 }, title: "text-[#faedd4]", at: [569.06, 328.26], angle: -7.07, scatter: [-3.56, 160.23] },
  { journey: 1, note: noteGreen, ink: light, ribbon: { src: ribbon7, w: 133.29, h: 41.731, top: 31.85 }, title: "text-[#faedd4]", at: [905.74, 335.61], angle: -3.2, scatter: [81, 98.21] },
];

/** Below 1200px, each journey once (the strip's first five notes). */
const compactCards = cards.slice(0, 5);


/**
 * A note in the scattering strip: still at first, then, once the strip is `data-scattered` (ScatterStrip), it glides
 * out by its `--dx` / `--dy` over 1.4s on a soft ease-out, each a little after the last.
 */
const SCATTER =
  "transition-[translate] duration-[1400ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none group-data-[scattered]/strip:[translate:var(--dx)_var(--dy)]";

/** The cards' strip: the panel's 1392px width, from 356px down to the panel's foot at 1171px. */
const STRIP_W = 1392;
const STRIP_H = 1171 - 356;

/**
 * A journey's note: the ribbon with its Crimson 22 title, and 93.08px down, 18px in, the 270px line of Geist 16 (its
 * lead in Medium) in the livery's ink, turned `angle`.
 */
function JourneyNote({
  card,
  order,
  style,
  className = "",
}: {
  card: Card;
  /** Where it falls in the strip's scatter (its stagger); left out, it doesn't scatter (the compact grid). */
  order?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const scatter =
    order === undefined
      ? undefined
      : ({
          "--dx": `${card.scatter[0]}px`,
          "--dy": `${card.scatter[1]}px`,
          transitionDelay: `${order * 70}ms`,
        } as CSSProperties);
  const journey = libraryJourneys[card.journey];
  const { ribbon } = card;
  return (
    <div
      role="listitem"
      className={`absolute ${order === undefined ? "" : SCATTER} ${className}`}
      style={{ width: NOTE_W, height: NOTE_H, rotate: `${card.angle}deg`, ...scatter, ...style }}
    >
      <Image src={card.note} alt="" aria-hidden sizes="300px" className="pointer-events-none absolute inset-0 size-full max-w-none select-none" />
      {/* The ribbon is Figma's width at least, stretched (its flag shape scales) when a longer title needs more room. */}
      <div
        className="absolute left-[0.12px] pr-6 pl-[19.81px]"
        style={{ top: ribbon.top, minWidth: ribbon.w, height: ribbon.h, paddingTop: 38.94 - ribbon.top }}
      >
        <Image src={ribbon.src} alt="" aria-hidden className="absolute inset-0 size-full max-w-none" />
        <h3 className={`relative font-serif text-[22px] leading-[1.0909] font-normal tracking-[-0.88px] whitespace-nowrap ${card.title}`}>
          {journey.title}
        </h3>
      </div>
      <p className={`absolute top-[93.08px] left-[18.01px] w-[270.031px] font-sans text-base leading-6 tracking-[-0.32px] ${card.ink}`}>
        <span className="font-medium">{journey.lead}</span> {journey.body}
      </p>
    </div>
  );
}

/**
 * Figma "Section · Journey library (4x4)" (node 4060:25055): a 1171px sand panel between the page rails (a 0.5px
 * black/25 hairline), the centred cream eyebrow 70px down, 24px over the two-line swash headline (1000px box) and 24px
 * under it an 820px line of Geist in ink muted. 29px below that, seven punched notes in four liveries (green,
 * parchment, aubergine, maroon), each with its own coloured ribbon: Gift finder, Style match, Size and fit, Support and
 * exchanges across, then Order tracking, Gift finder and Style match below, each turned its own way, all inside the
 * panel.
 *
 * From 1200px the notes are Figma's 1392px strip, scaled with the panel. Below that they'd shrink past reading, so
 * the five journeys sit in a grid at full size instead (two across from 768px, one on phones), each still turned.
 */
export function JourneyLibrary() {
  return (
    <section aria-labelledby="journey-library-title" className="relative px-(--frame-inset)">
      <div className="overflow-clip bg-sand shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]">
        {/* Figma 3295:56: the eyebrow, headline and copy centred, 24px apart, 70px down the panel. */}
        <div className="mx-auto flex w-[calc(100%-2*(var(--page-pad)-var(--frame-inset)))] flex-col items-center gap-6 pt-16 text-center md:pt-[70px]">
          <Eyebrow>A few of the many</Eyebrow>
          <SectionTitle
            id="journey-library-title"
            initial="E"
            firstLine="very Journey is built by us:"
            secondLine={
              <>
                {/* Below 768px the long second line breaks in two, so the headline keeps the other sections' size. */}
                people who study this
                <br className="md:hidden" />
                <span className="max-md:hidden"> </span>for a living
              </>
            }
            width={1000}
            mobileWidth={700}
            variant="dynamicCentered"
            weight="light"
          />
          <p className="max-w-[820px] font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted">
            Each one maps the whole path: what the shopper asks, where they stall, what nudges them forward, and when a
            person should step in. Then it&rsquo;s tested against how real customers behave before it reaches yours.
          </p>
        </div>

        {/* From 1200px: Figma's strip, 29px under the copy, scaled to the panel's width, down to the panel's foot. */}
        <div className="@container mt-[29px] max-[1199px]:hidden">
          {/* Laid out as before at first; once in view, the notes scatter to Figma's spread (4060:25451). */}
          <ScatterStrip
            className="group/strip relative scale-to-container"
            style={{ "--fit-width": `${STRIP_W}px`, width: STRIP_W, height: STRIP_H } as CSSProperties}
          >
            {cards.map((card, i) => (
              <JourneyNote key={i} card={card} order={i} style={{ left: card.at[0], top: card.at[1] }} />
            ))}
          </ScatterStrip>
        </div>

        {/* Below 1200px: the five journeys once each, in its own cell at full size, turned as in Figma. */}
        <div
          role="list"
          aria-label="Journeys"
          className="mx-auto grid w-fit grid-cols-1 justify-items-center gap-x-6 gap-y-10 px-4 pt-12 pb-16 md:grid-cols-2 min-[1200px]:hidden"
        >
          {compactCards.map((card) => (
            <div key={card.journey} className="relative h-[340px] w-[330px] max-w-[calc(100vw-2*var(--frame-inset)-32px)]">
              <JourneyNote card={card} className="top-1/2 left-1/2" style={{ translate: "-50% -50%" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
