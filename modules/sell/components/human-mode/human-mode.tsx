import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import panelAubergine from "../../assets/human-mode/panel-aubergine.webp";

/**
 * Figma "Library · Wide panel (Human mode)", as Audiences on Retain: the eyebrow and a two-line
 * headline on the left, three paragraphs of Geist Light top-aligned on the right, then 80px below a
 * 1280 × 599 aubergine panel (the damask in its notched gold frame with a ring in each corner,
 * exported from Figma as one image). A 232px gold tick sits on the left rail beside the eyebrow.
 */
export function HumanMode() {
  return (
    <section aria-labelledby="human-mode-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Human mode</Eyebrow>
            <SectionTitle
              id="human-mode-title"
              initial="A"
              firstLine=" concierge that"
              secondLine="knows when to step in"
              width={614.744}
            />
          </div>

          <div className="flex max-w-[477.244px] flex-col gap-6 font-sans text-base leading-6 font-light tracking-[-0.32px] text-black/60">
            <p>
              Most AI shopping assistants wait for the customer to ask, but Crossword does more. It notices when someone
              is exploring a product, offers a useful answer, goes deeper when they have questions, suggests something
              that completes the purchase, and steps in when they seem stuck. It knows when to help, and when to stay out
              of the way.
            </p>
            <p>
              For instance: A shopper spends time looking at a serum. Crossword surfaces the key details: &ldquo;Want to
              know if this works for sensitive skin?&rdquo; If they&rsquo;re comparing two serums, it helps them choose.
              If they&rsquo;re ready, it adds the right one to their cart.
            </p>
            <p>We call this being polite and helpful.</p>
          </div>
        </div>

        <div aria-hidden className="relative aspect-[1280/599] w-full overflow-hidden">
          <Image src={panelAubergine} alt="" fill sizes="(min-width: 1440px) 1280px, 100vw" className="object-fill" />
        </div>
      </div>
    </section>
  );
}
