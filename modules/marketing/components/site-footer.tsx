import Image from "next/image";
import Link from "next/link";
import { StampButton } from "@/components/ui/stamp-button";
import grainTile from "../assets/footer/grain-tile.webp";
import monogramFrame from "../assets/footer/monogram-frame.svg";
import stamp from "../assets/footer/stamp.webp";
import { ctaLinks, type FooterLink, footerCompanyLinks, footerPlatformGroups } from "../config/navigation";
import { FooterFrame } from "./footer-frame";

const heading = "font-serif text-[14px] leading-[1.3] tracking-[0.14px] whitespace-nowrap text-[rgba(223,227,210,0.47)]";
const linkText = "h-4 w-full font-sans text-[12px] leading-[1.3] tracking-[-0.36px] whitespace-nowrap";

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (!link.href) {
    return (
      <li className={`${linkText} ${link.muted ? "text-[rgba(223,227,210,0.36)]" : "text-[#dfe3d2]"}`}>{link.label}</li>
    );
  }
  return (
    <li className={linkText}>
      <Link href={link.href} className="text-[#dfe3d2] transition-colors hover:text-white">
        {link.label}
      </Link>
    </li>
  );
}

/** Company + platform link columns. */
function FooterNav() {
  return (
    <nav
      aria-label="Footer"
      className="flex flex-wrap items-start gap-x-8 gap-y-10 xs:gap-x-12 md:gap-x-[126px] lg:mr-9"
    >
      <div className="flex w-[91px] flex-col items-start gap-[37px]">
        <h2 className={heading}>{"{ COMPANY }"}</h2>
        <ul className="flex w-full flex-col items-start gap-3">
          {footerCompanyLinks.map((link) => (
            <FooterLinkItem key={link.label} link={link} />
          ))}
        </ul>
      </div>

      <div className="flex w-[151px] flex-col items-start gap-[35.28px]">
        <h2 className={heading}>{"{ PLATFORM }"}</h2>
        <div className="flex w-full flex-col items-start gap-8">
          {footerPlatformGroups.map((group) => (
            <ul key={group[0].label} className="flex w-full flex-col items-start gap-3">
              {group.map((link) => (
                <FooterLinkItem key={link.label} link={link} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </nav>
  );
}

/** "Crossword is the concierge desk for your brand." with the framed C monogram. */
function Tagline() {
  return (
    <p className="relative h-[107.201px] w-[518.004px] font-serif text-[49.1px] leading-[0.9] font-extralight tracking-[-2.455px] whitespace-nowrap text-[#dfe3d2]">
      <span aria-hidden className="absolute top-[-0.12px] left-[0.81px] h-[107.7px] w-[90.661px]">
        <span className="absolute top-[17.81px] left-[18px] h-[79.404px] w-[40.604px] font-script text-[74.023px] leading-[1.1] tracking-[-3.7012px]">
          C
        </span>
        <Image src={monogramFrame} alt="" className="absolute top-0 left-0 max-w-none" />
      </span>
      <span className="sr-only">C</span>
      <span className="absolute top-[14.38px] left-[96.32px]">{"rossword is the concierge "}</span>
      <span className="absolute top-[62.82px] left-[96.32px]">desk for your brand.</span>
    </p>
  );
}

/**
 * Site footer: deep green with the grain tile and a gilt notched frame. Layout follows the
 * Webflow build: logo and link columns across the top, tagline and button along the bottom;
 * both rows stack below 992px. Stacked, the stamp and the button sit near the frame's corners,
 * so 96px of padding keeps them clear of its notches.
 */
export function SiteFooter() {
  return (
    <footer className="relative overflow-clip pt-24 pb-24 lg:pt-[126.13px] lg:pb-[96.34px]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#00331a]" />
        <div
          className="absolute inset-0 bg-size-[172.82454997301102px_172.82454997301102px] bg-top-left opacity-40 mix-blend-soft-light"
          style={{ backgroundImage: `url(${grainTile.src})` }}
        />
      </div>
      <FooterFrame />

      <div className="relative content-width max-w-[1280px]">
        <div className="flex flex-col px-6 xs:px-4 md:px-0 lg:pr-[6.76px]">
          <div className="flex flex-col items-start gap-12 lg:min-h-[277.9px] lg:flex-row lg:justify-between lg:gap-0">
            {/*
              Guilloché stamp: a Figma WebGPU shader, so it ships as a 3x export
              cut out along its outline; the image box starts (-14.54, -10.255)
              from the stamp's own box because it includes the drop shadow.
            */}
            <div className="relative h-[79.489px] w-[83.817px] shrink-0">
              <Image
                src={stamp}
                alt=""
                sizes="114px"
                className="absolute top-[-10.255px] left-[-14.54px] h-[109.333px] w-[113.667px] max-w-none"
              />
            </div>
            <FooterNav />
          </div>

          <div className="mt-16 flex flex-col items-start gap-12 lg:mt-0 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div className="flex flex-col items-start gap-6">
              {/* Drawn at 49.1px and zoomed with the breakpoint (42 / 36 / 28px), then to fit if needed. */}
              <div className="fit-to-container [--fit-width:calc(518px*var(--tag-scale))] [--tag-scale:1] max-lg:[--tag-scale:0.8554] max-md:[--tag-scale:0.7332] max-xs:[--tag-scale:0.5703]">
                <div className="[zoom:var(--tag-scale)]">
                  <Tagline />
                </div>
              </div>
              <p className="flex flex-wrap items-center gap-x-3.5 gap-y-1 font-sans text-[12px] leading-[1.3] tracking-[-0.36px] whitespace-nowrap text-[rgba(223,227,210,0.6)] xs:flex-nowrap">
                <span>Crossword, Inc. © 2026</span>
                <span aria-hidden>|</span>
                <span>A CometChat Product</span>
              </p>
            </div>
            <StampButton href={ctaLinks.bookDemo} variant="wine">
              BOOK A DEMO
            </StampButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
