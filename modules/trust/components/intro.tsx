import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Rails } from "@/modules/marketing/components/rails";
import damask from "../assets/intro-damask.png";
import paper from "../assets/intro-paper.png";
import shadow from "../assets/stamp-shadow.png";
import stamp from "../assets/stamp-quill-red.png";

const youBring = ["Policies and rules", "Brand tone", "Brand priorities"];
const weHandle = [
  "Turning that into rules Crossword follows",
  "Iterative tests and checks on every reply forever",
  "Security, uptime, and data protection",
];

function List({ title, items, marked }: { title: string; items: string[]; marked?: boolean }) {
  return (
    <div className="flex min-w-0 flex-col">
      <h4 className="pb-2 font-serif text-[22px] leading-6 font-normal tracking-[-0.88px] text-ink">{title}</h4>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li
            key={item}
            className="relative border-b border-dashed border-rail py-2.5 pl-[22px] font-sans text-base leading-6 tracking-[-0.32px] text-ink max-md:text-[15px] max-md:leading-[22px]"
          >
            {marked && (
              <span aria-hidden className="absolute top-2.5 left-0 text-maroon max-md:top-2.5">
                &mdash;
              </span>
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Figma "Introduction" (Trust & security, 4474:39264): between the rails, the 860 × 901 paper card turned -0.4° (a
 * 1px 13% black edge, a soft drop shadow, the paper multiplied over white and tinted cream), the Introduction eyebrow,
 * the 24px opening paragraph, then under a rail-coloured rule "How it works", the swash headline and the two lists
 * (what you bring / what we handle, the latter on maroon dashes), the damask strip along its foot and the red quill
 * stamp tucked behind its right edge.
 *
 * Below 1280px the stamp moves into the card's top right corner, smaller; below 768px the card stands straight, is
 * padded in 24px and the lists stack.
 */
export function TrustIntro() {
  return (
    <section aria-labelledby="trust-intro-title" className="relative overflow-x-clip bg-cream pt-[117px] pb-[123px] max-lg:py-24 max-md:py-16">
      <Rails />
      <div className="relative mx-auto w-[calc(100%-2*var(--page-pad))] max-w-[860px]">
        <article className="relative isolate -rotate-[0.4deg] overflow-clip max-md:rotate-0 border border-black/13 bg-white/30 px-[88px] pt-[55px] pb-[150px] shadow-[0_5px_7.7px_rgba(0,0,0,0.08)] max-lg:px-14 max-lg:pb-[130px] max-md:px-6 max-md:pt-8 max-md:pb-[96px]">
          <Image src={paper} alt="" aria-hidden fill sizes="860px" className="-z-1 object-cover object-bottom opacity-49 mix-blend-multiply" />
          <span aria-hidden className="absolute inset-0 -z-1 bg-cream mix-blend-color" />

          <Eyebrow surface="sand" className="-ml-[3.5px]">
            Introduction
          </Eyebrow>
          <p className="mt-[55px] max-w-[683px] font-serif text-2xl leading-7 font-normal tracking-[-0.72px] text-ink max-md:mt-8 max-md:text-[21px] max-md:leading-[26px] max-md:tracking-[-0.6px]">
            Crossword is shopper-facing AI on your website, on AI assistants like Claude, Perplexity or ChatGPT, and on
            Personal Agents like Muse and Instinct. Like a good concierge, before Crossword meets a single guest, it&rsquo;s
            been audited, briefed and given its limits.
          </p>

          <div className="mt-[122px] flex max-w-[683px] flex-col gap-4 border-t border-rail pt-7 max-lg:mt-20 max-md:mt-12">
            <p className="font-sans text-xs leading-[14px] font-semibold tracking-[1.44px] text-label-olive uppercase max-md:text-[10px] max-md:tracking-[1.2px]">
              How it works
            </p>
            <h3
              id="trust-intro-title"
              className="pb-10 font-serif text-[40px] leading-[44px] font-extralight tracking-[-2px] text-ink max-md:pb-7 max-md:text-[32px] max-md:leading-9 max-md:tracking-[-1.5px]"
            >
              <span className="font-script text-[56px] leading-0 font-normal tracking-normal max-md:text-[46px]">Y</span>ou know
              the business. We do the rest.
            </h3>
            <div className="grid grid-cols-2 gap-12 pt-2 max-md:grid-cols-1 max-md:gap-8">
              <List title="You bring" items={youBring} />
              <List title="We handle" items={weHandle} marked />
            </div>
          </div>

          <Image
            src={damask}
            alt=""
            aria-hidden
            sizes="867px"
            className="pointer-events-none absolute bottom-0 left-1/2 h-[87px] w-[867px] max-w-none -translate-x-1/2 object-cover max-md:h-[60px] max-md:w-[598px]"
          />
        </article>

        {/*
          Figma's stamp (a WebGPU emboss shader), shipped as its render with its tilt: from 1280px, tucked behind the
          card's right edge as Figma draws it (the card hides its first 67px, measured against Figma's render), its
          shadow falling on the card beside the edge (the render's shadow, taken from it as a dark layer). Narrower, it
          sits whole on the card's top right corner.
        */}
        <Image
          src={stamp}
          alt=""
          aria-hidden
          unoptimized
          className="pointer-events-none absolute top-[357px] left-[792.5px] z-2 h-[224px] w-[229px] max-w-none select-none [clip-path:inset(0_0_0_67px)] max-xl:top-[-56px] max-xl:right-[-28px] max-xl:left-auto max-xl:h-[140px] max-xl:w-[143px] max-xl:[clip-path:none] max-md:top-[-44px] max-md:right-[-14px] max-md:h-[104px] max-md:w-[106px]"
        />
        <Image
          src={shadow}
          alt=""
          aria-hidden
          unoptimized
          className="pointer-events-none absolute top-[374px] left-[806.5px] z-2 h-[160px] w-[53px] max-w-none select-none max-xl:hidden"
        />
      </div>
    </section>
  );
}
