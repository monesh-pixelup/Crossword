import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import railAccent from "@/modules/landing/assets/hero/decor/rail-accent.svg";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { storefrontCards } from "../../config/storefront";
import { ScenePanel } from "../motion/scene-panel";
import { SellMotionRoot } from "../motion-v2";
import { storefrontScenes } from "../motion-v2/scenes";

/**
 * Three equal cards (413.33px at 1280px, 20px apart, stretched to the tallest): the card's motion visual
 * (the source's 413 × 402 aubergine panel, its own caption left out, since the card's title says it) filling the
 * card's width, then the title and description on #fdf4de.
 */
export function StorefrontPresence() {
  return (
    <>
      <section aria-labelledby="storefront-title" className="relative section-pad">
        <Image
          src={railAccent}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-[107.26px] left-[calc(var(--frame-inset)-0.5px)]"
        />

        <div className="flex content-width flex-col items-start gap-section">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Storefront presence</Eyebrow>
            <SectionTitle
              id="storefront-title"
              initial="F"
              firstLine="its right into"
              secondLine="your storefront"
              width={575.414}
              variant="dynamic"
              weight="light"
            />
            <p className="font-sans text-base leading-6 tracking-[-0.32px] text-black/60">
              Crossword blends into your website so naturally, it feels like another part of the experience.
            </p>
          </div>

          <ul className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {storefrontCards.map((card) => (
              <li
                key={card.title}
                className="flex flex-col items-start gap-6 overflow-clip border border-black/10 bg-[#fdf4de]"
              >
                <div
                  className="sf-nocap relative w-full"
                  style={{ aspectRatio: `${storefrontScenes[card.scene].width} / ${storefrontScenes[card.scene].height}` }}
                >
                  <ScenePanel scene={storefrontScenes[card.scene]} root={SellMotionRoot} maxScale={Infinity} transform />
                </div>
                <div className="flex flex-col items-start gap-2 px-5 pb-5">
                  <h3 className="font-serif text-[22px] leading-[1.1] tracking-[-0.88px] text-ink">{card.title}</h3>
                  <p
                    className="font-sans text-base leading-6 tracking-[-0.32px] text-black/60"
                    style={card.descriptionWidth ? { maxWidth: card.descriptionWidth } : undefined}
                  >
                    {card.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The closing band (under the bottom padding, before the testimonials) is off while the testimonials are hidden:
      <div className="relative h-6">
        <DividerBand glyph="quill" />
      </div>
      */}
    </>
  );
}
