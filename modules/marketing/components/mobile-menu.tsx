"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { StampButton } from "@/components/ui/stamp-button";
import { cn } from "@/lib/cn";
import caretDown from "../assets/caret-down.svg";
import { ctaLinks, primaryNav } from "../config/navigation";

const navText = "font-serif text-base leading-[22.356px] tracking-[-0.48px] text-black/80 whitespace-nowrap";

/**
 * Below 992px the header's links and buttons fold into a menu button; the menu opens as a
 * panel under the bar (links stacked, then the buttons), as in the Webflow build. `tone` colours
 * the menu button for the bar it sits on (light on the dark overlay header).
 */
export function MobileMenu({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const wide = window.matchMedia("(min-width: 992px)");
    const reset = () => wide.matches && setOpen(false);
    window.addEventListener("keydown", close);
    wide.addEventListener("change", reset);
    return () => {
      window.removeEventListener("keydown", close);
      wide.removeEventListener("change", reset);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex size-10 cursor-pointer items-center justify-center",
          tone === "light" ? "text-cream" : "-mr-2 text-ink",
        )}
      >
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          )}
        </svg>
      </button>

      <div
        id={id}
        hidden={!open}
        className="absolute inset-x-0 top-full z-50 border-b-[0.5px] border-black/20 bg-cream px-(--page-pad) pt-6 pb-8"
      >
        <nav aria-label="Primary">
          <ul className="flex flex-col items-start gap-5">
            {primaryNav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-1 transition-colors hover:text-maroon ${navText}`}
                >
                  {item.label}
                  {item.hasMenu && <Image src={caretDown} alt="" className="size-3.5" />}
                </Link>
              </li>
            ))}
            <li>
              <Link href={ctaLinks.signUp} onClick={() => setOpen(false)} className={`transition-colors hover:text-maroon ${navText}`}>
                SIGN UP
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-8 flex gap-3">
          <StampButton href={ctaLinks.bookDemo} variant="primary-soft">
            BOOK A DEMO
          </StampButton>
        </div>
      </div>
    </div>
  );
}
