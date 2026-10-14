import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import railAccent from "@/modules/landing/assets/hero/decor/rail-accent.svg";
import { DividerBand } from "@/modules/landing/components/shared/divider-band";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { storefrontCards } from "../../config/storefront";

/**
 * Three equal cards (413.33px at 1280px, 20px apart, stretched to the tallest): purple damask art
 * in a gold hairline frame (411.33 × 330), then the title and description on #fdf4de.
 */
export function StorefrontPresence() {
  return (
    <section aria-labelledby="storefront-title" className="relative section-pad-band">
      <DividerBand glyph="chat" />
      <Image
        src={railAccent}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[131.26px] left-[calc(var(--frame-inset)-0.5px)]"
      />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Storefront presence</Eyebrow>
          <SectionTitle
            id="storefront-title"
            initial="W"
            firstLine="herever they shop, it's"
            secondLine="the same concierge."
            width={575.414}
          />
        </div>

        <ul className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {storefrontCards.map((card) => (
            <li
              key={card.title}
              className="flex flex-col items-start gap-6 overflow-clip border border-black/10 bg-[#fdf4de]"
            >
              <Image
                src={card.image}
                alt=""
                sizes="(min-width: 992px) 412px, (min-width: 768px) 50vw, 100vw"
                className="aspect-[411.333/330] h-auto w-full object-cover"
              />
              <div className="flex flex-col items-start gap-2 px-5 pb-5">
                <h3 className="font-serif text-[24px] leading-[1.1] font-extralight tracking-[-1.2px] text-ink">{card.title}</h3>
                <p
                  className="font-sans text-[14px] leading-5 tracking-[-0.28px] text-black/60"
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
  );
}
