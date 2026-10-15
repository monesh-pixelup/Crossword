import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { channels } from "../../config/channels";

/** Four 3px gold studs, 5px into each corner of a tile. */
const studs = ["top-[5px] left-[5px]", "top-[5px] right-[5px]", "bottom-[5px] left-[5px]", "right-[5px] bottom-[5px]"];

/**
 * Figma "Library · Integrations": a 400px header (eyebrow, headline and a line of copy) 80px left
 * of the tiles, 188 × 128 and 16px apart, four to a row and right-aligned, alternating sand and
 * cream on a 1px engraved border with a gold stud in each corner: a 32px maroon mark over the
 * channel in Crimson 22, 8px apart. The headline is set as the page's others (1.1, 24px under the
 * eyebrow). The patterned divider band closes it, under its bottom padding, before the next
 * section.
 */
export function SupportChannels() {
  return (
    <>
      <section aria-labelledby="channels-title" className="relative section-pad">
        <div className="flex content-width flex-col items-start gap-12 lg:flex-row lg:gap-20">
          <div className="flex flex-col items-start gap-6 lg:w-[400px] lg:shrink-0">
            <Eyebrow>Channels</Eyebrow>
            <SectionTitle id="channels-title" initial="S" firstLine="upport" secondLine="channels" width={230} />
            <p className="font-sans text-base leading-[1.5] tracking-[-0.32px] text-ink-muted">
              Wherever your customers reach out, someone answers.
            </p>
          </div>

          <ul className="grid w-full min-w-0 grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-1 lg:flex-wrap lg:content-start lg:justify-end">
            {channels.map(({ name, icon }) => (
              <li
                key={name}
                className="relative flex h-32 flex-col items-center justify-center gap-2 border border-engraved px-2 text-center odd:bg-sand even:bg-cream lg:w-[188px]"
              >
                {studs.map((place) => (
                  <span key={place} aria-hidden className={`pointer-events-none absolute size-[3px] rounded-full bg-gold ${place}`} />
                ))}
                <Image src={icon} alt="" className="size-8" />
                <span className="font-serif text-[22px] leading-[1.15] tracking-[-0.88px] whitespace-nowrap text-ink">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The band draws itself across the top of this 24px strip, between the page rails. */}
      <div className="relative h-6">
        <DividerBand glyph="chat" />
      </div>
    </>
  );
}
