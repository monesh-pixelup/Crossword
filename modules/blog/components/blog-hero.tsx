import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import { Rails } from "@/modules/marketing/components/rails";

/**
 * Figma "Blog" hero (1660:792), under the site's cream header: 96.5px down, the eyebrow 24px over a two-line swash
 * headline (Parisienne 82 at 1.18, Crimson ExtraLight 60 at 1.1, a 405px box) on the left, and a 477px line of Geist
 * Light bottom-aligned on the right. A gold tick sits on the left rail. Below 1280px the copy goes under the headline.
 */
export function BlogHero() {
  return (
    <section aria-labelledby="blog-hero-title" className="relative bg-cream pt-[96.5px] pb-1 max-md:pt-16">
      {/*
        The page's rails, drawn by the hero itself: it stays put while the journal slides up over it (the hero curtain),
        so the page's own rails start at its foot and never reach it.
      */}
      <Rails />
      <RailAccent className="absolute top-[96.4px] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.9px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col items-start gap-8 min-[1280px]:flex-row min-[1280px]:items-end min-[1280px]:justify-between min-[1280px]:gap-10">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Blog</Eyebrow>
          <SectionTitle
            as="h1"
            id="blog-hero-title"
            initial="E"
            firstLine="very shopper"
            secondLine="gets a reason to buy"
            width={405}
            weight="extralight"
          />
        </div>
        <p className="max-w-[477.244px] font-sans text-base leading-6 font-light tracking-[-0.32px] text-black/60 min-[1280px]:w-[477.244px]">
          From the first question to the final click, Crossword guides every shopper toward the product that&rsquo;s
          perfect for them.
        </p>
      </div>
    </section>
  );
}
