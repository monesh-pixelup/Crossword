"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { StampButton } from "@/components/ui/stamp-button";
import { cn } from "@/lib/cn";
import caretDown from "../assets/caret-down.svg";
import { ctaLinks, primaryNav } from "../config/navigation";

const navText = "font-serif text-base leading-[22.356px] tracking-[-0.48px] text-black/80 whitespace-nowrap";

/** One easing for the whole menu: quick to start, soft to settle. */
const ease = "ease-[cubic-bezier(0.32,0.72,0,1)]";

/** Menu contents cascade in one after another on open, and leave together on close. */
function stagger(open: boolean, i: number) {
  return {
    className: cn(
      "transition-[opacity,translate] duration-300 motion-reduce:transition-none",
      ease,
      open ? "translate-y-0 opacity-100" : "-translate-y-1.5 opacity-0",
    ),
    style: { transitionDelay: open ? `${90 + i * 40}ms` : "0ms" },
  };
}

/** Hamburger lines that fold into an X when open. */
function MenuIcon({ open }: { open: boolean }) {
  const line = cn(
    "origin-center transition-[rotate,translate,scale,opacity] duration-300 [transform-box:fill-box] motion-reduce:transition-none",
    ease,
  );
  return (
    <svg viewBox="0 0 24 24" className="size-6 overflow-visible" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
        <path d="M4 7h16" className={cn(line, open && "translate-y-[5px] rotate-45")} />
        <path d="M4 12h16" className={cn(line, open && "scale-x-0 opacity-0")} />
        <path d="M4 17h16" className={cn(line, open && "-translate-y-[5px] -rotate-45")} />
      </g>
    </svg>
  );
}

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
        <MenuIcon open={open} />
      </button>

      {/* Unrolls from under the bar on open and rolls back up on close; inert (and hidden once closed). */}
      <div
        id={id}
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full z-50 border-b-[0.5px] border-black/20 bg-cream px-(--page-pad) pt-6 pb-8",
          "transition-[clip-path,opacity,translate,visibility] duration-350 motion-reduce:transition-none",
          ease,
          open
            ? "visible translate-y-0 opacity-100 [clip-path:inset(0_0_0_0)]"
            : "invisible -translate-y-2 opacity-0 [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <nav aria-label="Primary">
          <ul className="flex flex-col items-start gap-5">
            {primaryNav.map((item, i) => (
              <li key={item.label} {...stagger(open, i)}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-1 transition-colors hover:text-maroon ${navText}`}
                >
                  {item.label}
                  {item.hasMenu && <Image src={caretDown} alt="" className="size-3.5" />}
                </Link>
                {item.children && (
                  <ul className="mt-3 flex flex-col gap-3 border-l-[0.5px] border-[#b7ae9a] pl-4">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className={`transition-colors hover:text-maroon ${navText.replace("text-black/80", "text-black/60")}`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li {...stagger(open, primaryNav.length)}>
              <Link href={ctaLinks.signUp} onClick={() => setOpen(false)} className={`transition-colors hover:text-maroon ${navText}`}>
                SIGN UP
              </Link>
            </li>
          </ul>
        </nav>
        <div {...stagger(open, primaryNav.length + 1)}>
          <div className="mt-8 flex gap-3">
            <StampButton href={ctaLinks.bookDemo} variant="primary-soft">
              BOOK A DEMO
            </StampButton>
          </div>
        </div>
      </div>
    </div>
  );
}
