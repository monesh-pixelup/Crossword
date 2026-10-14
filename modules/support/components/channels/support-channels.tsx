import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing/config/navigation";
import { channels } from "../../config/channels";

/** Four 3px gold studs, 5px into each corner of a tile. */
const studs = ["top-[5px] left-[5px]", "top-[5px] right-[5px]", "bottom-[5px] left-[5px]", "right-[5px] bottom-[5px]"];

/**
 * Figma "Library · Integrations": a 400px header (eyebrow, headline, a line of copy and a text
 * link) 80px left of a grid of 188 × 128 tiles, 16px apart and four to a row, alternating sand and
 * cream on a 1px engraved border with a gold stud in each corner: the channel in Crimson 22 over its
 * tag in Geist Mono 12 caps.
 */
export function SupportChannels() {
  return (
    <section aria-labelledby="channels-title" className="relative section-pad">
      <div className="flex content-width flex-col items-start gap-12 lg:flex-row lg:gap-20">
        <div className="flex flex-col items-start gap-6 lg:w-[400px] lg:shrink-0">
          <Eyebrow>Channels</Eyebrow>
          <SectionTitle id="channels-title" initial="S" firstLine="upport" secondLine="channels" width={230} />
          <p className="font-sans text-base leading-[1.5] tracking-[-0.32px] text-ink-muted">
            Wherever your customers reach out, someone answers.
          </p>
          <TextLink href={ctaLinks.learnMore}>See all channels</TextLink>
        </div>

        <ul className="grid w-full min-w-0 grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:flex-1">
          {channels.map((channel) => (
            <li
              key={channel.name}
              className="relative flex h-32 flex-col items-center justify-center gap-2 border border-engraved px-2 text-center odd:bg-sand even:bg-cream"
            >
              {studs.map((place) => (
                <span key={place} aria-hidden className={`pointer-events-none absolute size-[3px] rounded-full bg-gold ${place}`} />
              ))}
              <span className="font-serif text-[22px] leading-[1.15] tracking-[-0.88px] text-ink">{channel.name}</span>
              <span className="font-mono text-[12px] leading-[1.3] tracking-[0.48px] text-label-olive uppercase">{channel.tag}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
