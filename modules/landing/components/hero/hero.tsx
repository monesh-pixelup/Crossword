import Image, { getImageProps, type StaticImageData } from "next/image";
import { StampButton } from "@/components/ui/stamp-button";
import { ctaLinks } from "@/modules/marketing";
import flourishLeft from "../../assets/hero/decor/flourish-left.png";
import flourishRight from "../../assets/hero/decor/flourish-right.png";
import railAccent from "../../assets/hero/decor/rail-accent.svg";
import { HeroShowcase } from "./showcase/hero-showcase";
import { TrustedBy } from "./trusted-by";

/**
 * Headline, intro and buttons. 510px wide on desktop; the headline steps down with the h1 size
 * (69 / 56 / 44 / 40px), centres below 992px and the intro's line break drops below 768px.
 */
function HeroCopy() {
  return (
    <div className="flex w-[510px] max-w-full flex-col items-center">
      <h1
        id="hero-title"
        className="w-full pr-5 text-center font-serif text-(length:--h1-size) leading-0 font-extralight text-ink md:whitespace-nowrap lg:text-left"
      >
        <span className="font-script text-[1.3667em] leading-[1.18] font-normal tracking-[0.05em]">Y</span>
        <span className="leading-[1.1] tracking-[-0.05em]">our best hire, yet.</span>
      </h1>
      <p className="mt-3 w-[480px] max-w-full text-center text-base leading-6 tracking-[-0.32px] text-black/55 md:-mt-2.5 lg:self-end">
        <span className="md:block">Crossword is an AI shopper assistant that remembers,</span> recommends, resolves, and
        reports - all within your guardrails.
      </p>

      <div className="mt-[27px] flex flex-wrap items-start justify-center gap-3">
        <StampButton href={ctaLinks.bookDemo}>BOOK A DEMO</StampButton>
        <StampButton href={ctaLinks.learnMore} variant="outline">
          LEARN MORE
        </StampButton>
      </div>
    </div>
  );
}

const BLANK_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/**
 * On desktop the flourish is the largest above-the-fold image (the LCP), so it
 * loads eagerly at high priority. It's hidden on mobile, where the <picture>
 * source doesn't match and nothing is downloaded.
 */
function FlourishImage({ src }: { src: StaticImageData }) {
  const {
    props: { srcSet, sizes, ...img },
  } = getImageProps({ src, alt: "", fill: true, sizes: "279px", loading: "eager", fetchPriority: "high" });

  return (
    <picture>
      <source media="(min-width: 992px)" srcSet={srcSet} sizes={sizes} />
      <img {...img} src={BLANK_GIF} alt="" />
    </picture>
  );
}

/** Ornamental scrollwork either side of the headline. */
function Flourish({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";

  return (
    <div
      aria-hidden
      className={`absolute top-[80.5px] hidden h-[344.213px] w-[360.514px] -translate-x-1/2 items-center justify-center mix-blend-luminosity lg:flex ${
        isLeft ? "left-[calc(50%-376.79px)]" : "left-[calc(50%+376.31px)]"
      }`}
    >
      <div className={isLeft ? "flex-none rotate-[36.01deg] -scale-y-100" : "flex-none rotate-[143.99deg]"}>
        <div className="relative h-[215.397px] w-[289.124px] opacity-52">
          <div className={`absolute right-0 bottom-0 left-[3.66%] ${isLeft ? "top-[8.21%]" : "top-[8.32%]"}`}>
            <FlourishImage src={isLeft ? flourishLeft : flourishRight} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative pt-28 pb-[124px] md:pt-[147.5px] lg:pt-[99.5px]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[110.5px]">
        <Image src={railAccent} alt="" className="absolute top-0 left-[calc(var(--frame-inset)-0.5px)]" />
        <Image src={railAccent} alt="" className="absolute top-0 right-[calc(var(--frame-inset)-0.5px)]" />
      </div>
      <Flourish side="left" />
      <Flourish side="right" />

      <div className="relative flex content-width justify-center">
        <HeroCopy />
      </div>

      {/* Full-bleed; below 768px the mock-up is zoomed in on the chat and cropped at the sides. */}
      <div className="mt-[22px] flex justify-center overflow-hidden">
        <HeroShowcase />
      </div>

      <TrustedBy className="mt-[92px]" />
    </section>
  );
}
