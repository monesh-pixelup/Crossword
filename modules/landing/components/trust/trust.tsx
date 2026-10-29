import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import arrowRight from "../../assets/trust/arrow-right.svg";
import grainTile from "../../assets/trust/grain-tile.webp";
import { certifications } from "../../config/trust";

/** Gold dashed guides framing the panel, overshooting its corners. Each is a 2px box dashed on both long edges, as in the Webflow build. */
function Guides() {
  const line = "pointer-events-none absolute border-dashed border-[#e0be6042]";
  return (
    <div aria-hidden>
      <span className={cn(line, "-top-5 -left-px h-[calc(100%+43px)] w-0.5 border-x")} />
      <span className={cn(line, "-top-5 -right-px h-[calc(100%+43px)] w-0.5 border-x")} />
      {/* Horizontal guides sit on whole-pixel offsets so their two dashed edges render as one line, matching the side guides. */}
      <span className={cn(line, "-top-px -inset-x-[20.73px] h-0.5 border-y")} />
      <span className={cn(line, "-bottom-px -inset-x-[20.73px] h-0.5 border-y")} />
    </div>
  );
}

function Certifications() {
  return (
    <ul className="grid w-full grid-cols-2 py-[2.7px] xs:grid-cols-3 md:grid-cols-[151.3fr_175.8fr_175.8fr_175.8fr_175.8fr_175.8fr]">
      {certifications.map((cert, i) => (
        <li
          key={cert.name}
          className={cn(
            // Dividers are 0.5px inset shadows (no layout space), between columns from 768px.
            // The phone grids have none for now.
            "flex min-w-0 flex-col items-start gap-6 py-6 md:py-8",
            i > 0 && "md:pl-[24.5px] md:shadow-[inset_0.5px_0_0_rgba(255,255,255,0.1)]",
          )}
        >
          <Image
            src={cert.badge}
            alt={`${cert.name} badge`}
            sizes="70px"
            className="h-[70px] shrink-0"
            style={{ width: cert.badgeWidth }}
          />
          <h3 className="font-sans text-[14px] leading-6 font-semibold tracking-[-0.56px] whitespace-nowrap text-white/80">
            {cert.name}
          </h3>
        </li>
      ))}
    </ul>
  );
}

/** Security & compliance band: dark green, between the page rails like the divider band. */
export function Trust() {
  return (
    <section aria-labelledby="trust-title" className="relative py-12 md:py-16 lg:py-[87px] min-[1440px]:py-[6.04cqw]">
      {/* The green spans the same width as the patterned divider band (inset to the frame rails). */}
      <div aria-hidden className="pointer-events-none absolute inset-x-(--frame-inset) inset-y-0 bg-[#00331a]" />
      {/*
        Card: at least 626px tall with its content centred; padding steps down per breakpoint.
        Past the 1440px Figma frame it keeps Figma's 1280 x 626 proportions (and the band's padding
        and inner gap scale with it) so wide screens don't flatten it.
      */}
      <div className="relative content-width flex min-h-[626px] flex-col min-[1440px]:aspect-[1280/626] items-center justify-center px-5 pt-12 pb-4 shadow-[0_0_2px_rgba(0,0,0,0.25)] md:px-8 md:pt-14 md:pb-6 lg:px-4 lg:pb-4">
        {/* Panel surface: deep green with a soft-light grain tile at 40%. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[#002916]" />
          <div
            className="absolute inset-0 bg-size-[172.82454997301102px_172.82454997301102px] bg-top-left opacity-40 mix-blend-soft-light"
            style={{ backgroundImage: `url(${grainTile.src})` }}
          />
        </div>
        <Guides />

        <div className="relative flex w-full max-w-[1030px] flex-col items-start gap-12 md:gap-16 lg:gap-[120px] min-[1440px]:gap-[8.333cqw]">
          <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:gap-[190px]">
            {/*
              Figma sets both lines at exactly 60px (Crimson Light 60px, a 70px swash, all at -4%).
              Browsers grow line 1 to fit the swash, so each line is its own fixed-height block.
              Figma also sits the glyphs 3px higher within those lines (measured against its render).
              Zoomed with the h2 size: 60 / 48 / 40 / 36px.
            */}
            <h2
              id="trust-title"
              className="relative -top-[3px] w-[303.72px] shrink-0 font-serif text-[0px] leading-[0] font-light tracking-[-2.4px] whitespace-nowrap text-white/85 [zoom:var(--h2-scale)]"
            >
              <span className="block h-[60px]">
                <span className="font-script text-[70px] leading-[60px] font-normal tracking-[-2.8px]">Y</span>
                <span className="text-[60px] leading-[60px]">our data is</span>
              </span>{" "}
              <span className="block text-[60px] leading-[60px]">safe with us</span>
            </h2>
            <div className="flex w-full max-w-[537.055px] min-w-0 flex-col items-start gap-4 lg:flex-[0_1_537px]">
              {/* Figma 3073:22066: one paragraph. */}
              <p className="font-sans text-[14px] leading-[22px] tracking-[-0.56px] text-white/50">
                With a built-in watchtower every response is checked and Crossword improved continuously, so your agent
                gets better every day. It&rsquo;s designed to stay within your guardrails, resist prompt injection, know
                its limitations, and catch gaps before they become problems. Crossword is built by the team behind
                CometChat, a leading provider of user-to-user messaging. For more than a decade, we&rsquo;ve been
                powering billions of messages for enterprises across 160+ countries.
              </p>
              <Link
                href="#trust"
                className="flex items-center gap-2 border-b border-white/30 p-[2px] font-serif text-base leading-[22px] tracking-[-0.48px] whitespace-nowrap text-[#d9dddb] transition-opacity duration-150 hover:opacity-50"
              >
                LEARN MORE
                <Image src={arrowRight} alt="" className="size-4" />
              </Link>
            </div>
          </div>

          <Certifications />
        </div>
      </div>
    </section>
  );
}
