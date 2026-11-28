import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/components/ui/rail-accent";
import { SectionTitle } from "@/components/ui/section-title";
import { Rails } from "@/modules/marketing/components/rails";
import ornament from "../assets/card-ornament.png";
import paper from "../assets/intro-paper.png";

const cards = [
  { initial: "E", title: "very reply checked", body: "The watchtower checks each reply against your rules." },
  {
    initial: "A",
    title: "nswers only from what you’ve approved",
    body: "If the answer isn’t in your catalog, policies or order data, Crossword says so and hands the shopper to your team.",
  },
  {
    initial: "T",
    title: "ested on the hard cases",
    body: "Before launch, we run practice conversations. We run them again whenever your policies change.",
  },
  {
    initial: "S",
    title: "hoppers can’t rewrite the rules",
    body: "“Ignore your instructions” and similar attempts are screened out before Crossword responds.",
  },
  { initial: "A", title: "ccess only to what you connect", body: "Crossword reads only the systems and permissions you grant." },
  {
    initial: "E",
    title: "very conversation on the record",
    body: "Full transcripts and reply logs, so your team can review any exchange.",
  },
];

/**
 * Figma "The details" (Trust & security, 4474:39650): the eyebrow over the one-line swash headline, then 80px under it
 * six paper cards three across (408px, 28px apart, 300px tall at least): an aubergine swash title (multiplied into the
 * paper), a hairline, Geist 16/24 in ink muted, and at the foot the card's Parisienne numeral over the damask ornament,
 * over a 5px aubergine bar drawn above it all. Two across below 1024px, one below 768px.
 */
export function TrustDetails() {
  return (
    <section aria-labelledby="trust-details-title" className="relative section-pad bg-cream">
      <Rails />
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="relative content-width">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>The details</Eyebrow>
          <SectionTitle id="trust-details-title" initial="H" firstLine="ow Crossword stays inside the lines" width={920} variant="compact" weight="light" />
        </div>

        <ol className="mt-20 grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-md:mt-12 max-md:grid-cols-1 max-md:gap-5">
          {cards.map((card, i) => (
            <li
              key={card.title}
              className="relative isolate flex min-h-[300px] flex-col justify-between overflow-clip bg-white shadow-[0_4.075px_6.276px_rgba(0,0,0,0.08)] max-md:min-h-[260px]"
            >
              <Image src={paper} alt="" aria-hidden fill sizes="408px" className="-z-1 object-cover mix-blend-multiply" />
              <span aria-hidden className="absolute inset-0 -z-1 bg-cream mix-blend-color" />

              <div className="flex flex-col gap-[18px] px-7 pt-7 max-md:px-6 max-md:pt-6">
                <h3 className="font-serif text-2xl leading-7 font-normal tracking-[-0.72px] text-aubergine mix-blend-multiply">
                  <span className="font-script text-[34px] leading-7 tracking-normal">{card.initial}</span>
                  {card.title}
                </h3>
                <span aria-hidden className="h-px bg-black/10" />
                <p className="font-sans text-base leading-6 tracking-[-0.32px] text-ink-muted max-md:text-[15px] max-md:leading-[22px]">{card.body}</p>
              </div>

              <div aria-hidden className="relative mt-6">
                <p className="relative z-2 -mb-11 px-7 font-script text-[56px] leading-[52px] text-aubergine mix-blend-multiply max-md:px-6">
                  {i + 1}
                </p>
                <Image src={ornament} alt="" sizes="408px" className="h-14 w-full object-cover object-left" />
              </div>

              {/* The 5px aubergine bar along the foot: an overlay over every layer (paper, tint, ornament), as Figma draws it. */}
              <span aria-hidden className="pointer-events-none absolute inset-0 z-3 shadow-[inset_0_-5px_0_var(--color-aubergine)]" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
