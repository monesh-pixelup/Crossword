import { Eyebrow } from "@/components/ui/eyebrow";
import { NotchedPanel } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { TextLink } from "@/modules/dynamic-landing-pages/components/shared/text-link";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { ctaLinks } from "@/modules/marketing/config/navigation";
import { helpdeskIntegrations, helpdeskThread } from "../../config/helpdesk";
import { InboxMock } from "./inbox-mock";

/** Figma's tag pill: Geist Medium 14 caps on #ffeec2 in a 0.5px ink/40 hairline, cap-trimmed inside 6px. */
const tag =
  "border-[0.5px] border-black/40 bg-[#ffeec2] p-1.5 font-sans text-[14px] leading-[1.2] font-medium tracking-[-0.28px] text-ink-muted uppercase [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]";
const title = "font-serif text-[32px] leading-[1.1] font-light tracking-[-1.28px] text-[#040404]";
const body = "max-w-[462.865px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60";

/** The home page's maroon card (scroll damask 14px in, notched gold corners, a ring in each): 738 × 680 from 992px. */
const panel = "flex w-full flex-col justify-center gap-6 p-10 md:p-14 lg:h-[680px] lg:w-[738px] lg:shrink-0 lg:px-16";

/**
 * Figma "Library · Numbered panel (Helpdesk)": the eyebrow and headline, then the two options as
 * alternating rows 120px apart (copy left of its maroon panel, then the panel left of its copy),
 * spread across the content width. Each option is a tag, a 32px title, a line of copy and a text
 * link; the panels hold the Crossword inbox and the helpdesks it syncs with. Opens with the
 * patterned divider band (24px more top padding), so the gold section tick (1px × 180px, as
 * SectionTick) starts 24px lower too.
 */
export function HelpdeskOptions() {
  const [ask, answer] = helpdeskThread;

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
          {/* Row 1: the copy is centred in the top 595px of the 680px row, as in Figma. */}
          <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <div className="flex flex-col items-start justify-center gap-16 lg:h-[595px]">
              <div className="flex flex-col items-start gap-4">
                <p className={tag}>Crossword helpdesk</p>
                <h3 className={title}>A free help desk, with unlimited seats.</h3>
                <p className={body}>Give your team one place to see, assign and resolve customer conversations.</p>
              </div>
              <TextLink href={ctaLinks.learnMore}>Learn more</TextLink>
            </div>

            <NotchedPanel tone="scroll" inset={14} radius={46} rings className={panel}>
              <figure className="relative flex w-full max-w-[520px] flex-col gap-3 self-center">
                <blockquote className="ml-auto max-w-[85%] rounded-[13.57px] rounded-br-[4px] bg-wine px-3 py-2.5 font-sans text-[14px] leading-[1.45] tracking-[-0.02em] text-white shadow-[inset_0_0_0_0.5px_rgba(224,190,96,0.4)]">
                  {ask.text}
                </blockquote>
                <InboxMock />
                <figcaption className="font-sans text-[14px] leading-5 tracking-[-0.02em] text-on-dark">{answer.text}</figcaption>
              </figure>
            </NotchedPanel>
          </div>

          {/* Row 2: panel first; the copy sits in a 675px column (32px top, 48px bottom) centred on the row. */}
          <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="flex flex-col items-start justify-center lg:order-2 lg:h-[675px] lg:pt-8 lg:pb-12">
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

            <NotchedPanel tone="scroll" inset={14} radius={46} rings className={`${panel} lg:order-1`}>
              <ul className="relative grid w-full max-w-[520px] grid-cols-2 gap-3 self-center md:gap-4">
                {helpdeskIntegrations.map((desk) => (
                  <li
                    key={desk.name}
                    className="flex min-h-[104px] flex-col items-center justify-center gap-2 p-3 text-center shadow-[inset_0_0_0_1px_var(--color-engraved)] odd:bg-sand even:bg-cream md:min-h-32"
                  >
                    <span className="font-serif text-[20px] leading-[1.15] tracking-[-0.03em] text-ink">{desk.name}</span>
                    <span className="flex items-center gap-1 font-sans text-[12px] leading-none tracking-[-0.03em] text-ink-muted">
                      <svg aria-hidden viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-3">
                        <path d="M2.5 6h10l-2.5-2.5M13.5 10h-10l2.5 2.5" />
                      </svg>
                      {desk.note}
                    </span>
                  </li>
                ))}
              </ul>
            </NotchedPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
