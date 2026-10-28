import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import cardArt from "@/modules/retain/assets/returns/card-art.webp";
import { journeyCards } from "../../config/launch";

/** The panel at 1280px (413.33 × 331.47, the art's 823:660), in which the frame below is drawn. */
const W = 413.33;
const H = 331.47;
/** Frame inset from the panel's edges, the radius of its scooped corners and the rings' centre offset, as the Journey panel above. */
const I = 10;
const R = 20;
const RING = 14;

/**
 * The gilt notched frame of the Journey panel (and the home page's Managed launch one): a 1px gold
 * rule 10px in, each corner scooped by a concave 20px arc, with an 8px gold ring tucked into every
 * notch, and plain aubergine outside the rule so the damask shows only within it. Drawn in the panel's own 823:660 proportions, so it scales evenly with the card and the
 * arcs never stretch; strokes stay 1px at any size.
 */
function NotchedFrame() {
  const frame = `M${I + R} ${I}H${W - I - R}A${R} ${R} 0 0 0 ${W - I} ${I + R}V${H - I - R}A${R} ${R} 0 0 0 ${W - I - R} ${H - I}H${I + R}A${R} ${R} 0 0 0 ${I} ${H - I - R}V${I + R}A${R} ${R} 0 0 0 ${I + R} ${I}Z`;
  const rings = [
    [RING, RING],
    [W - RING, RING],
    [W - RING, H - RING],
    [RING, H - RING],
  ];
  return (
    <svg aria-hidden viewBox={`0 0 ${W} ${H}`} fill="none" className="absolute inset-0 size-full">
      {/* Plain aubergine outside the frame (the margin and the notches), so the damask shows only inside it. */}
      <path d={`M0 0H${W}V${H}H0Z${frame}`} fill="var(--color-aubergine)" fillRule="evenodd" />
      <path d={frame} stroke="var(--color-gold)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
      {rings.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={3.5} stroke="#d2b75c" strokeWidth={1} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

/**
 * Figma "Library · Three-card row (Journeys)", as Return reduction on Retain: the eyebrow, a
 * two-line headline and a line of 14px copy, then 80px below three equal cards (413.33px at 1280px,
 * 20px apart) on #fdf4de in a black/10 hairline: the 330px textured aubergine panel (the Figma
 * art's purple damask, as Return reduction's, its straight inner rule zoomed out of view) in the Journey panel's gilt notched frame and
 * corner rings, then 20px below the journey's name in Crimson ExtraLight 24 over its steps in Geist 14.
 * A 209px gold tick sits on the left rail beside the eyebrow.
 */
export function ChooseJourney() {
  return (
    <section aria-labelledby="choose-journey-title" className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-12.74px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.94px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col items-start gap-section">
        <div className="flex max-w-[575px] flex-col items-start gap-6">
          <Eyebrow>How it works</Eyebrow>
          <SectionTitle id="choose-journey-title" initial="C" firstLine="hoose" secondLine="the journey" width={300} />
          <p className="font-sans text-[14px] leading-5 tracking-[-0.28px] text-black/60">
            You don&rsquo;t need to dream up an AI experience from scratch. We start with a proven journey framework and
            adapt it to the job at hand. Whether it&rsquo;s product discovery, support, product Q&amp;A, or something else,
            we design and tune the experience.
          </p>
        </div>

        <ul className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {journeyCards.map((card) => (
            <li key={card.title} className="flex flex-col gap-5 overflow-clip border border-black/10 bg-[#fdf4de]">
              <div className="relative aspect-[823/660] w-full overflow-clip bg-aubergine">
                {/* The art's own straight gold rule sits ~4.5% in; zoomed 1.12× from the centre it falls outside the panel. */}
                <Image src={cardArt} alt="" fill sizes="(min-width: 992px) 463px, (min-width: 768px) 54vw, 108vw" className="scale-[1.12] object-cover" />
                <NotchedFrame />
              </div>
              <div className="flex flex-col items-start gap-2 px-5 pb-5">
                <h3 className="font-serif text-[24px] leading-[1.1] font-extralight tracking-[-1.2px] text-ink">{card.title}</h3>
                <p className="font-sans text-[14px] leading-5 tracking-[-0.28px] text-black/60">{card.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
