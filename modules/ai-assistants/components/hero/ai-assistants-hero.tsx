import Image from "next/image";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StampButton } from "@/components/ui/stamp-button";
import { ctaLinks } from "@/modules/marketing";
import background from "@/modules/sell/assets/hero/background.webp";

/**
 * Two-line display headline, set like Support's and Retain's (70 / 56 / 48 / 44px, Crimson ExtraLight at
 * 1.1 and -5%) after a 100px swash (1.4286em) at -1%. Figma's box is 175px tall, two 77px lines with the
 * swash pushing line 1 21px (0.3em) taller, which line 1 carries as top padding. The second line is picked
 * out in gold, which the guidelines allow on dark grounds only. Below 768px the lines may wrap.
 */
function Headline({ id, initial, firstLine, secondLine }: { id: string; initial: string; firstLine: ReactNode; secondLine: ReactNode }) {
  return (
    <h1
      id={id}
      className="font-serif text-(length:--display-size) leading-[1.1] font-extralight tracking-[-0.05em] text-cream md:whitespace-nowrap"
    >
      <span className="block pt-[0.3em]">
        <span className="font-script text-[1.4286em] leading-0 font-normal tracking-[-0.01em]">{initial}</span>
        {firstLine}
      </span>
      <span className="block text-gold">{secondLine}</span>
    </h1>
  );
}

/**
 * Section · Hero (Figma 3305:54), the Layout/Hero Photo variant as on Sell, sized as the Managed launch hero: the full-bleed photo (the
 * whole viewport width, not capped at the site's 1600px) with the copy pinned to the bottom, the overlay
 * header floating over its top. From 1200px the headline and the CTA column sit side by side,
 * bottom-aligned, the CTA column 482px wide at the right and free to
 * narrow; below that they stack.
 */
export function AiAssistantsHero({
  id = "ai-assistants-hero-title",
  eyebrow = "AI assistants",
  initial = "Y",
  firstLine = "our customers are already",
  secondLine = "asking ChatGPT about you.",
  aside = "Crossword helps you own the experience",
  asideWidth = 482,
}: {
  id?: string;
  eyebrow?: ReactNode;
  /** The 100px swash capital opening line 1; the rest of line 1, then the gold line 2. */
  initial?: string;
  firstLine?: ReactNode;
  secondLine?: ReactNode;
  /** The line under BOOK A DEMO. */
  aside?: ReactNode;
  /** The CTA column's width in Figma (it narrows to fit). */
  asideWidth?: number;
}) {
  return (
    <section aria-labelledby={id} className="relative bg-night">
      {/* The photo runs the full viewport width, out past the site's 1600px cap on wide screens (SiteShell clips the overrun). */}
      <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-night">
        <Image
          src={background}
          alt=""
          fill
          sizes="100vw"
          preload
          className="object-cover object-[70%_center] lg:object-center"
        />
      </div>

      {/*
        Sized as the Managed launch hero: the screen below 760px, then the 1440 x 863 frame at full width, capped at the
        screen. From 760px the copy's last line sits 10.25% of the frame above the frame's foot, or 88.5px (scaled) above
        the screen's when the frame runs past it. The top padding keeps the copy clear of the fixed 72.5px header (48px,
        rounded up to a whole 121px so the eyebrow's frame stays on whole pixels): where the stacked copy is taller than
        the frame leaves room for (760–1199px), the hero grows rather than running it under the header.
      */}
      <div className="relative flex min-h-svh content-width flex-col justify-end pt-[121px] pb-16 min-[760px]:min-h-[min(calc(100vw*863/1440),100svh)] min-[760px]:pb-[max(min(88.5px,100vw*88.5/1440),calc(min(100vw*863/1440,100svh)_-_100vw*863*0.8975/1440))]">
        <div className="flex w-full flex-col items-start gap-8 min-[1200px]:flex-row min-[1200px]:items-end min-[1200px]:justify-between">
          {/* Figma sets the eyebrow 12px above the headline here (24px on the other heroes). */}
          <div className="flex flex-col items-start gap-3">
            <Eyebrow surface="green" className="h-8">
              {eyebrow}
            </Eyebrow>
            <Headline id={id} initial={initial} firstLine={firstLine} secondLine={secondLine} />
          </div>

          <div className="flex max-w-full min-w-0 flex-col items-start gap-4" style={{ width: asideWidth }}>
            <StampButton href={ctaLinks.bookDemo} variant="wine">
              BOOK A DEMO
            </StampButton>
            <p className="font-sans text-base leading-6 tracking-[-0.32px] text-cream">{aside}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
