import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { channels } from "../../config/channels";

/** Four 3px gold studs, 5px into each corner of a tile. */
const studs = ["top-[5px] left-[5px]", "top-[5px] right-[5px]", "bottom-[5px] left-[5px]", "right-[5px] bottom-[5px]"];

/**
 * Figma "Library · Integrations" (3257:35061): a centred header (eyebrow, the headline on one line, kept from before
 * rather than Figma's two, and a line of copy, 24px apart), then 80px below it the tiles in one row across the 1280px, 169 × 121.1 and 16px apart: a 1px
 * engraved/10 border round the light #fff7e4 panel, which fills it (29px over the channel's 30.9 × 29.1 mark and under
 * its name in Crimson 22, 8px apart, 17px in at the sides), a gold stud 5px into each corner. Narrower than the row,
 * the tiles wrap (centred) or, on smaller screens, sit in a 2-, 3- or 4-column grid. The patterned
 * divider band closes it, under its bottom padding, before the next section.
 */
export function SupportChannels() {
  return (
    <>
      <section aria-labelledby="channels-title" className="relative section-pad">
        <div className="flex content-width flex-col items-center gap-12 min-[1033px]:gap-20">
          <div className="flex w-[520px] max-w-full flex-col items-center gap-6 text-center">
            <Eyebrow>Channels</Eyebrow>
            <SectionTitle id="channels-title" initial="S" firstLine="upport channels" width={520} variant="dynamicCentered" weight="light" />
            <p className="font-sans text-base leading-[1.5] tracking-[-0.32px] text-ink-muted max-md:mt-4">
              Wherever your customers reach out, someone answers.
            </p>
          </div>

          <ul className="grid w-full min-w-0 grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 min-[1033px]:flex min-[1033px]:flex-wrap min-[1033px]:items-end min-[1033px]:justify-center">
            {channels.map(({ name, icon }) => (
              <li
                key={name}
                className="relative flex h-[121.1px] border border-engraved/10 bg-sand text-center min-[1033px]:w-[169px]"
              >
                <div className="flex w-full flex-col items-center justify-center gap-2 bg-[#fff7e4] px-[17px] py-[29px]">
                  <Image src={icon} alt="" className="h-[29.097px] w-[30.916px]" />
                  <span className="font-serif text-[22px] max-md:text-[20px] leading-[1.1] tracking-[-0.88px] whitespace-nowrap text-ink">{name}</span>
                </div>
                {studs.map((place) => (
                  <span key={place} aria-hidden className={`pointer-events-none absolute size-[3px] rounded-full bg-gold ${place}`} />
                ))}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The closing band: a 24px strip before the testimonials. */}
      <div className="relative h-6">
        <DividerBand glyph="chat" />
      </div>
    </>
  );
}
