import { Eyebrow } from "@/components/ui/eyebrow";
import { GiltPanel, Studs } from "@/modules/dynamic-landing-pages/components/shared/livery";
import { SectionTick } from "@/modules/dynamic-landing-pages/components/shared/section-tick";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { helpdeskIntegrations, helpdeskThread } from "../../config/helpdesk";
import { InboxMock } from "./inbox-mock";

const tag = "font-open-sans text-[12px] leading-[0.9] font-semibold tracking-[1.44px] uppercase";
const title = "font-serif text-(length:--h6-size) leading-[1.2] font-light tracking-[-0.03em]";
const body = "max-w-[480px] font-sans text-base leading-6 tracking-[-0.02em]";

/**
 * The two helpdesk options side by side: Crossword’s own desk on a maroon damask panel (the
 * guidelines’ scroll damask) with its inbox, and the integration on a studded cream card with the
 * helpdesks as tiles, set like the web kit’s integrations grid (`.wk-int`: 1px engraved tiles,
 * every other one sand, Crimson 20 names). On wide screens the two panels share a height.
 */
export function HelpdeskOptions() {
  const [ask, answer] = helpdeskThread;

  return (
    <section aria-labelledby="helpdesk-title" className="relative section-pad-band">
      <DividerBand glyph="gear" />
      <SectionTick />

      <div className="flex content-width flex-col gap-section">
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Helpdesk</Eyebrow>
            <SectionTitle id="helpdesk-title" initial="Y" firstLine="our helpdesk," secondLine="or ours" width={430} />
          </div>
          <p className="max-w-[477px] font-sans text-base leading-6 tracking-[-0.02em] text-ink-muted">
            Run support from Crossword&rsquo;s own helpdesk, or keep the one your team already works in. Both options
            are available.
          </p>
        </div>

        <div className="grid w-full gap-6 lg:grid-cols-2">
          <GiltPanel tone="scroll" className="flex flex-col gap-8 p-8 md:p-12">
            <div className="relative flex flex-col items-start gap-4">
              <p className={`${tag} text-gold`}>Crossword helpdesk</p>
              <h3 className={`${title} text-cream`}>A free help desk, with unlimited seats</h3>
              <p className={`${body} text-on-dark`}>
                Give your team one place to see, assign, and resolve customer conversations.
              </p>
            </div>

            <figure className="relative mt-auto flex flex-col gap-3">
              <blockquote className="ml-auto max-w-[85%] rounded-[13.57px] rounded-br-[4px] bg-wine px-3 py-2.5 font-sans text-[14px] leading-[1.45] tracking-[-0.02em] text-white shadow-[inset_0_0_0_0.5px_rgba(224,190,96,0.4)]">
                {ask.text}
              </blockquote>
              <InboxMock />
              <figcaption className="font-sans text-[14px] leading-5 tracking-[-0.02em] text-on-dark">{answer.text}</figcaption>
            </figure>
          </GiltPanel>

          <div className="relative flex flex-col gap-8 bg-cream p-8 shadow-[inset_0_0_0_1px_var(--color-engraved)] md:p-12">
            <Studs inset={7} />
            <div className="flex flex-col items-start gap-4">
              <p className={`${tag} text-label-olive`}>Helpdesk integration</p>
              <h3 className={`${title} text-ink`}>Keep the helpdesk you already have</h3>
              <p className={`${body} text-ink-muted`}>
                Connect Crossword to Zendesk, Gorgias, Freshdesk, or the helpdesk you already use, with conversations
                and ticket status synced both ways.
              </p>
            </div>

            <ul className="mt-auto grid grid-cols-2 gap-3 md:gap-4">
              {helpdeskIntegrations.map((desk) => (
                <li
                  key={desk.name}
                  className="flex min-h-[104px] flex-col items-center justify-center gap-2 p-3 text-center shadow-[inset_0_0_0_1px_var(--color-engraved)] odd:bg-sand md:min-h-32"
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
          </div>
        </div>
      </div>
    </section>
  );
}
