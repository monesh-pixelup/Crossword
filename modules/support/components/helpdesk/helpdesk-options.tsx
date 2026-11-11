import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing/config/navigation";
import freshdesk from "../../assets/helpdesk/freshdesk.svg";
import gorgias from "../../assets/helpdesk/gorgias.svg";
import yourHelpDesk from "../../assets/helpdesk/your-help-desk.svg";
import zendesk from "../../assets/helpdesk/zendesk.svg";
import { SupportScenePanel } from "../motion/support-scene-panel";

/** The help desks Crossword connects to (Figma 3799:16889), each with its 31 × 29 gold mark. */
const helpdesks = [
  { name: "Zendesk", icon: zendesk },
  { name: "Gorgias", icon: gorgias },
  { name: "Freshdesk", icon: freshdesk },
  { name: "Your help desk", icon: yourHelpDesk },
];

/** Four 3px gold studs, 5px into each corner of a tile. */
const studs = ["top-[5px] left-[5px]", "top-[5px] right-[5px]", "bottom-[5px] left-[5px]", "right-[5px] bottom-[5px]"];

/** Figma's tag pill: Open Sans SemiBold 12 caps at +1.44px on #ffeec2 in a 0.5px ink/40 hairline, cap-trimmed inside 6px. */
const tag =
  "border-[0.5px] border-black/40 bg-[#ffeec2] p-1.5 font-open-sans text-[12px] leading-[1.1667] font-semibold tracking-[1.44px] max-md:text-[10px] max-md:leading-3 max-md:tracking-[1.2px] text-ink-muted uppercase [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]";
/** Crimson Light 32 at -1.6px (-5%). */
const title = "font-serif text-(length:--h5-size) leading-[1.09375] font-light tracking-[-0.05em] text-ink";
const body = "max-w-[462.865px] font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted";

/**
 * Figma "Library · Numbered panel (Helpdesk)" (3257:34848): the eyebrow and headline, then the two options
 * 120px apart. Row 1 is the copy (a tag, a 32px title, a line of copy and a text link) beside the Crossword
 * inbox scene in its maroon frame; row 2 is the helpdesk integration as a centred sand panel over four help
 * desk tiles. The page sets Figma's 75px divider band above it. A 208.94px gold tick sits on the left rail, 16.51px
 * above the eyebrow (Figma 3257:34931).
 */
export function HelpdeskOptions() {
  return (
    <section aria-labelledby="helpdesk-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-16.51px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Crossword helpdesk</Eyebrow>
          <SectionTitle
            id="helpdesk-title"
            initial="C"
            firstLine="rossword helpdesk"
            secondLine="and helpdesk integration"
            width={760}
            variant="dynamic"
            weight="light"
          />
        </div>

        <div className="flex w-full flex-col gap-16 lg:gap-[120px]">
          {/*
            Row 1: the copy is centred in the top 595px of the 680px row, as in Figma, which centres it with a 24px
            placeholder 32px under the link (so the copy starts 155.5px down; the bottom padding stands in for it). From
            992px a grid keeps the copy at least 320px wide; the panel takes the rest, up to its 738px.
          */}
          <div className="flex w-full flex-col gap-10 lg:grid lg:grid-cols-[minmax(320px,1fr)_minmax(0,738px)] lg:items-start lg:gap-8">
            {/* Below 768px the link sits 24px under the copy (64px from 768px up, as Figma). */}
            <div className="flex flex-col items-start justify-center gap-16 max-md:gap-6 lg:h-[595px] lg:pb-14">
              <div className="flex flex-col items-start gap-4">
                <p className={tag}>Crossword helpdesk</p>
                <h3 className={title}>A free help desk, with unlimited seats.</h3>
                <p className={body}>Give your team one place to see, assign and resolve customer conversations.</p>
              </div>
              <TextLink href={ctaLinks.learnMore}>GET STARTED</TextLink>
            </div>

            {/*
              The Crossword inbox as a motion scene: a chat in its maroon notched frame (738 × 680). Up to 1.2× its size,
              as Customer support's cards, so stacked (below 992px) the two sections' cards match.
            */}
            <div className="relative aspect-[738/680] w-full">
              <SupportScenePanel slug="merchant-helpdesk-inbox" maxScale={1.2} />
            </div>
          </div>

          {/*
            Row 2 (Figma 3799:16878, "Helpdesk integration · centred"): a sand panel (1px black/12 line, 80px in) with the
            tag, title, copy and link centred and 16px apart, then 48px below the four help desks as tiles, 188 × 128 and
            16px apart, styled as Support channels' tiles. Below 992px the copy wraps and the tiles go two to a row.
          */}
          <div className="flex w-full flex-col items-center gap-12 border border-black/12 bg-sand px-5 py-14 md:px-10 lg:p-20">
            <div className="flex flex-col items-center gap-4 text-center">
              <p className={tag}>Helpdesk integration</p>
              <h3 className={title}>Keep the helpdesk you already have.</h3>
              <p className="max-w-[720px] font-sans text-base leading-6 tracking-[-0.32px] max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px] text-ink-muted lg:max-w-none lg:whitespace-nowrap">
                Connect Crossword to Zendesk, Gorgias, Freshdesk or your own help desk, with conversations and ticket status
                synced both ways.
              </p>
              <TextLink href={ctaLinks.bookDemo}>ASK US ABOUT IT</TextLink>
            </div>

            <ul className="grid w-full max-w-[400px] grid-cols-2 gap-4 sm:max-w-none sm:w-auto sm:grid-cols-4">
              {helpdesks.map(({ name, icon }) => (
                <li key={name} className="relative flex h-32 border border-engraved/10 bg-sand px-[1.5px] py-[2.951px] text-center sm:w-[188px]">
                  <div className="flex w-full flex-col items-center justify-center gap-2 bg-[#fff7e4]">
                    <Image src={icon} alt="" className="h-[29px] w-[31px]" />
                    <span className="font-serif text-[22px] max-md:text-[20px] leading-[1.0909] tracking-[-0.88px] whitespace-nowrap text-ink">{name}</span>
                  </div>
                  {studs.map((place) => (
                    <span key={place} aria-hidden className={`pointer-events-none absolute size-[3px] rounded-full bg-gold ${place}`} />
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
