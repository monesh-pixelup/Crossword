import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { humanModeScene } from "../motion/human-mode";
import { ScenePanel } from "../motion/scene-panel";

/**
 * Figma "Library · Wide panel (Human mode)", as Audiences on Retain: the eyebrow and a two-line
 * headline (1.18) on the left, a 723px column of Geist Light (two paragraphs, no gap) bottom-aligned
 * on the right, overlapping the headline's 614.7px box by 57.8px as in Figma, then 80px below a
 * 1280 × 599 panel playing the Human mode motion (three chat shells on the aubergine damask art),
 * zoomed to the content width, up as well as down. A 232px gold tick sits on the left rail beside the eyebrow.
 */
export function HumanMode() {
  return (
    <section aria-labelledby="human-mode-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        {/*
          Side by side only once the row has Figma's 1280px (from 1440px): the 723px copy column fits beside the headline
          there. Narrower, it would be squeezed into a tall, narrow block, so the copy stacks under the headline instead.
        */}
        <div className="flex w-full flex-col items-start gap-8 min-[1440px]:flex-row min-[1440px]:items-end min-[1440px]:justify-between min-[1440px]:gap-0">
          <div className="flex shrink-0 flex-col items-start gap-6 min-[1440px]:-mr-[57.848px]">
            <Eyebrow>Human mode</Eyebrow>
            <SectionTitle
              id="human-mode-title"
              initial="A"
              firstLine=" concierge that"
              secondLine="knows when to step in"
              width={614.744}
              weight="light"
            />
          </div>

          <div className="relative max-w-[723.103px] font-sans text-base leading-6 tracking-[-0.32px] text-black/60 min-[1440px]:w-[723.103px]">
            <p>
              Most AI shopping assistants wait for the customer to ask, but Crossword does more. It notices when someone
              is exploring a product, offers a useful answer, goes deeper when they have questions, suggests something
              that completes the purchase, and steps in when they seem stuck. It knows when to help, and when to stay out
              of the way. For instance: A shopper spends time looking at a serum. Crossword surfaces the key details:
              &ldquo;Want to know if this works for sensitive skin?&rdquo; If they&rsquo;re comparing two serums, it helps
              them choose. If they&rsquo;re ready, it adds the right one to their cart.
            </p>
            <p>We call this being polite and helpful.</p>
          </div>
        </div>

        {/*
          Fills the content width (past its drawn 1280px on wide screens), edge to edge with the heading above. Scaled
          with a transform: zoomed down to a phone's width its text would hit the browser's minimum font size and overflow.
        */}
        <div className="relative aspect-[1280/599] w-full overflow-hidden">
          <ScenePanel scene={humanModeScene} maxScale={Infinity} transform />
        </div>
      </div>
    </section>
  );
}
