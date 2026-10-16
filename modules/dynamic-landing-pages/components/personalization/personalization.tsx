import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import panelAubergine from "@/modules/sell/assets/human-mode/panel-aubergine.webp";

/**
 * Figma "ALT · User-level personalization (wide panel)", as Human mode on Sell: the eyebrow and a
 * one-line headline on the left (set as the page's others), and on the right, top-aligned, 477px of
 * Geist Light copy in four blocks a line apart; then 80px below a 1280 × 599 aubergine panel (the
 * damask in its notched gold frame with a ring in each corner, the same Figma frame as Human mode).
 * A 232px gold tick sits on the left rail beside the eyebrow.
 */
export function Personalization() {
  return (
    <section aria-labelledby="stranger-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>User-level personalization</Eyebrow>
            <SectionTitle id="stranger-title" initial="T" firstLine="he stranger problem" width={520} variant="display" />
          </div>

          <div className="flex max-w-[477.244px] flex-col gap-6 font-sans text-base leading-6 font-light tracking-[-0.32px] text-black/60">
            <p>
              A customer who&rsquo;s bought from you three times, has told you their size, and has told you their color
              preference sees exactly the same product page as someone who arrived ten seconds ago. That&rsquo;s because
              everything you know stays in a database instead of on the page.
            </p>
            <p>
              Now you have a solution
              <br />
              Crossword turns customer understanding into a more personal shopping experience. It brings together what a
              shopper has told you, what they&rsquo;ve bought before, what they care about and what they&rsquo;re looking
              for right now, and uses that context to change how your products are presented.
            </p>
            <p>
              The headline speaks to their purpose and the most relevant benefits come first. Reviews focus on the
              questions they care about, while comparisons reflect their priorities. Size, fit, color and budget are
              carried through the experience. And recommendations take into account what customers already own.
            </p>
            <p>A shopping experience that feels like it was made for them.</p>
          </div>
        </div>

        <div aria-hidden className="relative aspect-[1280/599] w-full overflow-hidden">
          <Image src={panelAubergine} alt="" fill sizes="(min-width: 1440px) 1280px, 100vw" className="object-fill" />
        </div>
      </div>
    </section>
  );
}
