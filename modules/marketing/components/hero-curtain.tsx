"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** The page's hero: the first section in `main`, labelled by its `…hero-title` heading (every page's hero is). */
const HERO = 'main > section[aria-labelledby$="hero-title"]:first-child';

/**
 * Keeps the scroll "curtain" (globals.css, "Hero curtain") measured: the hero stays put while the sections after it
 * slide up over it. Sets two variables on <html>:
 *
 * - `--hero-stick`: where the hero sticks. 0 when it fits the screen; when it's taller, minus the overflow, so it
 *   first scrolls until its foot is in view (its copy never hidden), then holds.
 * - `--rails-top`: where the page's frame rails start, the hero's foot, so they run beside the sections sliding up
 *   without drawing over the hero. Unset (the rails' own -72.5px) on a page without a hero.
 *
 * Re-measured on every route, resize and change in the page's height.
 */
export function HeroCurtain() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const main = document.querySelector("main");
    const hero = document.querySelector<HTMLElement>(HERO);
    if (!main || !hero) {
      root.style.removeProperty("--hero-stick");
      root.style.removeProperty("--rails-top");
      return;
    }
    const measure = () => {
      root.style.setProperty("--hero-stick", `${Math.min(0, window.innerHeight - hero.offsetHeight)}px`);
      // The hero's foot, as where the next section starts in the rails' box (their positioned parent).
      const next = hero.nextElementSibling as HTMLElement | null;
      const box = main.parentElement;
      if (next && box) root.style.setProperty("--rails-top", `${next.getBoundingClientRect().top - box.getBoundingClientRect().top}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(hero);
    observer.observe(main);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      root.style.removeProperty("--hero-stick");
      root.style.removeProperty("--rails-top");
    };
  }, [pathname]);

  return null;
}
