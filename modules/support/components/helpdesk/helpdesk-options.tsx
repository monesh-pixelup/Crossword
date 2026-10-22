import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing/config/navigation";
import { SupportHelpdeskIntegration } from "../motion/helpdesk-integration";
import { SupportScenePanel } from "../motion/support-scene-panel";

/** Figma's tag pill: Geist Medium 14 caps on #ffeec2 in a 0.5px ink/40 hairline, cap-trimmed inside 6px. */
const tag =
  "border-[0.5px] border-black/40 bg-[#ffeec2] p-1.5 font-sans text-[14px] leading-[1.2] font-medium tracking-[-0.28px] text-ink-muted uppercase [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]";
const title = "font-serif text-(length:--h6-size) leading-[1.1] tracking-[-0.04em] text-[#040404]";
const body = "max-w-[462.865px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60";

/**
 * Figma "Library · Numbered panel (Helpdesk)": the eyebrow and headline, then the two options as
 * alternating rows 120px apart (copy left of its maroon panel, then the panel left of its copy),
 * spread across the content width. Each option is a tag, a 32px title, a line of copy and a text
 * link; the panels are the support scenes' maroon frame (row 1 playing the Crossword inbox scene,
 * row 2 the static helpdesk-integration illustration). Opens with the patterned divider band (24px more top padding), so the gold
 * section tick (1px × 180px, as SectionTick) starts 24px lower too.
 */
export function HelpdeskOptions() {
  return (
    <section aria-labelledby="helpdesk-title" className="relative section-pad-band">
      <DividerBand glyph="chat" />
      <RailAccent className="absolute top-(--section-pad) left-[calc(var(--frame-inset)-0.5px)] z-2 h-[180px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Helpdesk</Eyebrow>
          <SectionTitle
            id="helpdesk-title"
            initial="C"
            firstLine="rossword helpdesk"
            secondLine={<span className="font-light">and helpdesk integration</span>}
            width={620}
          />
        </div>

        <div className="flex w-full flex-col gap-16 lg:gap-[120px]">
          {/*
            Row 1: the copy is centred in the top 595px of the 680px row, as in Figma. From 992px a
            grid keeps the copy at least 320px wide; the panel takes the rest, up to its 738px.
          */}
          <div className="flex w-full flex-col gap-10 lg:grid lg:grid-cols-[minmax(320px,1fr)_minmax(0,738px)] lg:items-start lg:gap-8">
            <div className="flex flex-col items-start justify-center gap-16 lg:h-[595px]">
              <div className="flex flex-col items-start gap-4">
                <p className={tag}>Crossword helpdesk</p>
                <h3 className={title}>A free help desk, with unlimited seats.</h3>
                <p className={body}>Give your team one place to see, assign and resolve customer conversations.</p>
              </div>
              <TextLink href={ctaLinks.learnMore}>Learn more</TextLink>
            </div>

            {/*
              The Crossword inbox as a motion scene: a chat in its maroon notched frame (738 × 680). Up to 1.2× its size,
              as Customer support's cards, so stacked (below 992px) the two sections' cards match.
            */}
            <div className="relative aspect-[738/680] w-full">
              <SupportScenePanel slug="merchant-helpdesk" maxScale={1.2} />
            </div>
          </div>

          {/* Row 2: panel first; the copy sits in a 675px column (32px top, 48px bottom) centred on the row, against its right edge. */}
          <div className="flex w-full flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,738px)_minmax(320px,1fr)] lg:items-center lg:gap-8">
            <div className="flex flex-col items-start justify-center lg:order-2 lg:h-[675px] lg:justify-self-end lg:pt-8 lg:pb-12">
              <div className="flex flex-col items-start gap-6">
                <div className="flex flex-col items-start gap-4">
                  <p className={tag}>Helpdesk integration</p>
                  <h3 className={title}>Keep the helpdesk you already have.</h3>
                  <p className={body}>
                    Connect Crossword to Zendesk, Gorgias, Freshdesk or the helpdesk you already use, with
                    conversations and ticket status synced both ways.
                  </p>
                </div>
                <TextLink href={ctaLinks.bookDemo}>Ask us about it</TextLink>
              </div>
            </div>

            {/* The same maroon frame as row 1's (and its 1.2× cap), holding the static helpdesk-integration illustration. */}
            <div className="relative aspect-[738/680] w-full lg:order-1">
              <SupportHelpdeskIntegration maxScale={1.2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
