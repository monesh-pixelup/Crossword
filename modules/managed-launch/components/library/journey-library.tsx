import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import noteAubergine from "../../assets/library/note-aubergine.webp";
import noteGreen from "../../assets/library/note-green.webp";
import noteMaroon from "../../assets/library/note-maroon.webp";
import ribbonGiftFinder from "../../assets/library/ribbon-gift-finder.svg";
import ribbonSizeFit from "../../assets/library/ribbon-size-fit.svg";
import ribbonStyleMatch from "../../assets/library/ribbon-style-match.svg";
import ribbonSupport from "../../assets/library/ribbon-support.svg";
import { type NoteTone, libraryJourneys } from "../../config/launch";

/** Figma's punched note (its "Subtract"), 299.117 × 303.674, exported at 2x, one per livery. */
const notes: Record<NoteTone, StaticImageData> = { green: noteGreen, maroon: noteMaroon, aubergine: noteAubergine };
const NOTE_W = 299.117;
const NOTE_H = 303.674;

/**
 * Each journey's title ribbon (Figma "Rectangle 2095589201"), 0.12px in and 31.85px down its note, in the order of
 * libraryJourneys; Support's is longer for its longer title.
 */
const ribbons: { src: StaticImageData; w: number; h: number }[] = [
  { src: ribbonGiftFinder, w: 147.543, h: 41.7316 },
  { src: ribbonStyleMatch, w: 147.543, h: 41.7316 },
  { src: ribbonSizeFit, w: 147.543, h: 41.7316 },
  { src: ribbonSupport, w: 234.715, h: 44.9133 },
];

/**
 * Where Figma lays each pair of notes on the 1392px panel, measured from the cards' strip (356px down the panel): the
 * front note's top-left corner and turn, and the note behind it, likewise (each turned about its centre).
 */
const layout: { front: [number, number, number]; back: [number, number, number] }[] = [
  { front: [24.74, 20.61, -3.2], back: [31.6, 27.53, -11.88] },
  { front: [374.05, 17.92, 3.32], back: [364.11, 35.79, -4.95] },
  { front: [707.11, 21.03, -2.16], back: [721.55, 21.42, 3.69] },
  { front: [1049.12, 27.88, 5.82], back: [1051.45, 29.76, -4.76] },
];

/** The cards' strip: the panel's 1392px width, from 356px down to the panel's foot at 754px (the notes run past it, clipped). */
const STRIP_W = 1392;
const STRIP_H = 754 - 356;

/** A punched note, turned `angle` degrees about its centre. */
function Note({ tone, angle, style, className = "" }: { tone: NoteTone; angle: number; style?: CSSProperties; className?: string }) {
  return (
    <Image
      src={notes[tone]}
      alt=""
      aria-hidden
      sizes="300px"
      className={`pointer-events-none absolute max-w-none select-none ${className}`}
      style={{ width: NOTE_W, height: NOTE_H, rotate: `${angle}deg`, ...style }}
    />
  );
}

/**
 * A journey's note (Figma 3976:16646 and its siblings): the ribbon with its Crimson 22 title in #faedd4, and 93.08px
 * down, 18px in, the 270px line of Geist 16 (its lead at white/90 in Medium, the rest at white/50), turned `angle`.
 */
function JourneyNote({ index: i, angle, style, className = "" }: { index: number; angle: number; style?: CSSProperties; className?: string }) {
  const journey = libraryJourneys[i];
  const ribbon = ribbons[i];
  return (
    <div
      role="listitem"
      className={`absolute ${className}`}
      style={{ width: NOTE_W, height: NOTE_H, rotate: `${angle}deg`, ...style }}
    >
      <Image src={notes[journey.tone]} alt="" aria-hidden sizes="300px" className="pointer-events-none absolute inset-0 size-full max-w-none select-none" />
      <Image
        src={ribbon.src}
        alt=""
        aria-hidden
        className="absolute top-[31.85px] left-[0.12px] max-w-none"
        style={{ width: ribbon.w, height: ribbon.h }}
      />
      <h3 className="absolute top-[38.94px] left-[19.93px] font-serif text-[22px] leading-[1.1] font-normal tracking-[-0.88px] whitespace-nowrap text-[#faedd4]">
        {journey.title}
      </h3>
      <p className="absolute top-[93.08px] left-[18.01px] w-[270.031px] font-sans text-base leading-6 tracking-[-0.32px] text-white/50">
        <span className="font-medium text-white/90">{journey.lead}</span> {journey.body}
      </p>
    </div>
  );
}

/**
 * Figma "Section · Journey library (4x4)" (node 3295:53): a 754px sand panel between the page rails (a 0.5px black/25
 * hairline), the centred cream eyebrow 70px down, 24px over the two-line swash headline (1000px box) and 24px under it
 * an 820px line of Geist at black/60. 29px below that, the four journeys on punched notes in the liveries (green,
 * maroon, aubergine, green), each turned a little over a second note, running off the panel's foot.
 *
 * From 1200px the notes are Figma's 1392px strip, scaled with the panel. Below that they'd shrink past reading, so
 * the pairs sit in a grid at full size instead (two across from 768px, one on phones), each still turned as in Figma.
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
          <p className="max-w-[820px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60">
            Each one maps the whole path: what the shopper asks, where they stall, what nudges them forward, and when a
            person should step in. Then it&rsquo;s tested against how real customers behave before it reaches yours.
          </p>
        </div>

        {/* From 1200px: Figma's strip, 29px under the copy, scaled to the panel's width (and clipped at its foot). */}
        <div className="@container mt-[29px] max-[1199px]:hidden">
          <div
            role="list"
            aria-label="Journeys"
            className="relative scale-to-container"
            style={{ "--fit-width": `${STRIP_W}px`, width: STRIP_W, height: STRIP_H } as CSSProperties}
          >
            {/* Painted in Figma's order: the notes behind the first three, then the first three journeys, then Support's pair. */}
            {[0, 1, 2].map((i) => (
              <Note
                key={`back-${i}`}
                tone={libraryJourneys[i].back}
                angle={layout[i].back[2]}
                style={{ left: layout[i].back[0], top: layout[i].back[1] }}
              />
            ))}
            {[0, 1, 2].map((i) => (
              <JourneyNote key={i} index={i} angle={layout[i].front[2]} style={{ left: layout[i].front[0], top: layout[i].front[1] }} />
            ))}
            <Note tone={libraryJourneys[3].back} angle={layout[3].back[2]} style={{ left: layout[3].back[0], top: layout[3].back[1] }} />
            <JourneyNote index={3} angle={layout[3].front[2]} style={{ left: layout[3].front[0], top: layout[3].front[1] }} />
          </div>
        </div>

        {/* Below 1200px: each pair in its own cell at full size, the back note offset from the front as in Figma. */}
        <div
          role="list"
          aria-label="Journeys"
          className="mx-auto grid w-fit grid-cols-1 justify-items-center gap-x-6 gap-y-10 px-4 pt-12 pb-16 md:grid-cols-2 min-[1200px]:hidden"
        >
          {layout.map(({ front, back }, i) => (
            <div key={i} className="relative h-[340px] w-[330px] max-w-[calc(100vw-2*var(--frame-inset)-32px)]">
              <Note
                tone={libraryJourneys[i].back}
                angle={back[2]}
                className="top-1/2 left-1/2"
                style={{ translate: `calc(-50% + ${back[0] - front[0]}px) calc(-50% + ${back[1] - front[1]}px)` }}
              />
              <JourneyNote index={i} angle={front[2]} className="top-1/2 left-1/2" style={{ translate: "-50% -50%" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
