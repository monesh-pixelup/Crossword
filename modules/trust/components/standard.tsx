import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { RailAccent } from "@/components/ui/rail-accent";
import { cn } from "@/lib/cn";
import { Rails } from "@/modules/marketing/components/rails";
import ccpa from "../assets/badge-ccpa.png";
import gdpr from "../assets/badge-gdpr.png";
import hipaa from "../assets/badge-hipaa.png";
import iso from "../assets/badge-iso-27001.png";
import pipeda from "../assets/badge-pipeda.svg";
import soc2 from "../assets/badge-soc2.png";

/** `mask`: an alpha mask, drawn in ink; otherwise the artwork itself. */
const badges: { label: string; src: StaticImageData; mask?: boolean }[] = [
  { label: "ISO 27001", src: iso, mask: true },
  { label: "SOC 2 Type II", src: soc2, mask: true },
  { label: "HIPAA", src: hipaa, mask: true },
  { label: "GDPR", src: gdpr, mask: true },
  { label: "PIPEDA", src: pipeda },
  { label: "CCPA", src: ccpa, mask: true },
];

/**
 * Figma "Standard" (Trust & security, 4474:39888): the two-line headline (Crimson Light 60/54, ink then maroon), the
 * six certification badges between 0.5px rail rules (64px badges over Geist 12 labels, split by rules), and the two
 * columns on CometChat, 80px apart. Below 1024px the badges sit three across and the columns stack.
 */
export function TrustStandard() {
  return (
    <section aria-labelledby="trust-standard-title" className="relative section-pad bg-cream">
      <Rails />
      <RailAccent className="absolute top-[calc(var(--section-pad)+10px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[152px] w-px max-lg:hidden" />

      <div className="relative flex content-width flex-col gap-20 max-md:gap-12">
        <h2
          id="trust-standard-title"
          className="font-serif text-[length:calc(60px*var(--h2-scale))] leading-[calc(54px*var(--h2-scale))] font-light tracking-[calc(-3px*var(--h2-scale))] text-balance text-ink"
        >
          Trust isn&rsquo;t a talking point.
          <br />
          <span className="text-maroon">It&rsquo;s a standard</span>
        </h2>

        <ul className="grid grid-cols-6 border-y-[0.5px] border-rail py-10 max-lg:grid-cols-3 max-lg:py-0">
          {badges.map((badge, i) => (
            <li
              key={badge.label}
              className={cn(
                "flex flex-col items-center gap-3.5 px-[11px] text-center max-lg:py-8 max-md:px-1 max-md:py-6",
                i > 0 && "lg:border-l-[0.5px] lg:border-rail",
                i % 3 !== 0 && "max-lg:border-l-[0.5px] max-lg:border-rail",
                i >= 3 && "max-lg:border-t-[0.5px] max-lg:border-rail",
              )}
            >
              {badge.mask ? (
                <span
                  aria-hidden
                  className="size-16 bg-ink max-md:size-14"
                  style={{ maskImage: `url(${badge.src.src})`, maskSize: "100% 100%", WebkitMaskImage: `url(${badge.src.src})`, WebkitMaskSize: "100% 100%" } as CSSProperties}
                />
              ) : (
                <Image src={badge.src} alt="" aria-hidden unoptimized className="size-16 max-md:size-14" />
              )}
              <span className="font-sans text-xs leading-4 tracking-[0.48px] text-ink-muted">{badge.label}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 gap-20 max-lg:grid-cols-1 max-lg:gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-2xl leading-7 font-normal tracking-[-0.72px] text-ink">Crossword is brought to you by the team at CometChat</h3>
            <p className="font-sans text-base leading-6 tracking-[-0.32px] text-ink-muted max-md:text-[15px] max-md:leading-[22px]">
              For a decade we&rsquo;ve powered enterprise chat for billions of personal messages a year, in 160+ countries.
            </p>
          </div>
          <p className="font-sans text-sm leading-5 tracking-[-0.28px] text-ink-muted">
            CometChat powers voice, video, and chat messaging for global enterprises. Every second communication between people
            on dating sites, social communities and telehealth platforms is enabled by CometChat, conversations are personal and
            getting them wrong has real consequences. Crossword is built by the same team who has been doing this for years at
            scale.
          </p>
        </div>
      </div>
    </section>
  );
}
