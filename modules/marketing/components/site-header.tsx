import Image from "next/image";
import Link from "next/link";
import { StampButton } from "@/components/ui/stamp-button";
import caretDown from "../assets/caret-down.svg";
import crosswordMark from "../assets/crossword-mark.svg";
import { ctaLinks, primaryNav } from "../config/navigation";
import { MobileMenu } from "./mobile-menu";

const navText =
  "font-serif text-base leading-[22.356px] tracking-[-0.48px] text-black/80 whitespace-nowrap";

export function SiteHeader() {
  return (
    // Hairline drawn as an overlay so the header is exactly 72.5px as in Figma.
    <header className="relative z-50 flex justify-center pb-[0.5px] after:absolute after:inset-x-0 after:bottom-0 after:h-[0.5px] after:bg-black/20">

      <div className="flex content-width items-center justify-between py-4">
        <div className="flex items-center gap-8">
          <Link href="/" aria-label="Crossword home" className="relative size-10 shrink-0">
            {/* The mark's artwork bleeds ~0.27px past its 40px box. */}
            <Image
              src={crosswordMark}
              alt=""
              loading="eager"
              className="absolute -top-[0.27px] -left-[0.27px] max-w-none"
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 transition-colors hover:text-black ${navText}`}
                  >
                    {item.label}
                    {item.hasMenu && <Image src={caretDown} alt="" className="size-3.5" />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hidden items-center gap-3 self-stretch lg:flex">
          <Link
            href={ctaLinks.signUp}
            className={`flex h-full items-center px-3 py-[3px] drop-shadow-[0px_1.35px_1.013px_rgba(0,0,0,0.25)] transition-colors hover:text-black ${navText}`}
          >
            SIGN UP
          </Link>
          <StampButton href={ctaLinks.bookDemo} variant="primary-soft">
            BOOK A DEMO
          </StampButton>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
