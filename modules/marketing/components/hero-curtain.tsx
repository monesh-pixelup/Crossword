"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/** Fired on the hero section as the sections finish covering it (`detail` true) and as it's uncovered (false). */
export const HERO_COVER_EVENT = "herocover";

/**
 * The page's hero: the first section in `main`, labelled by its `…hero-title` heading (every page's hero is). A page
 * opts out with `data-no-curtain` on its `main` (the journal and its posts): its hero scrolls away with the page as usual.
 */
const HERO = 'main:not([data-no-curtain]) > section[aria-labelledby$="hero-title"]:first-child';
/** The hero of a page that opts out of the curtain. */
const PLAIN_HERO = 'main[data-no-curtain] > section[aria-labelledby$="hero-title"]:first-child';

/**
 * Keeps the scroll "curtain" (globals.css, "Hero curtain") measured: the hero stays put while the sections after it
 * slide up over it. Sets two variables on <html>:
 *
 * - `--hero-stick`: where the hero sticks. 0 when it fits the screen; when it's taller, minus the overflow, so it
 *   first scrolls until its foot is in view (its copy never hidden), then holds.
 * - `--rails-top`: where the page's frame rails start, the hero's foot, so they run beside the sections sliding up
 *   without drawing over the hero. Unset (the rails' own -72.5px) on a page without a hero.
 * - `--rails-shown`: `visible` once `--rails-top` is measured. On a page with a hero the rails stay hidden until then
 *   (globals.css, "Rails on a hero page"), so on load they never flash down the hero's sides at their -72.5px start.
 *
 * Re-measured on every route, resize and change in the page's height. Measured in a layout effect, before the browser
 * paints: switching pages in the app, the new page would otherwise paint once with the last page's `--rails-top` (a
 * cream hero's 304px, say, over a 788px photo hero), the rails flashing down the new hero's sides.
 */
export function HeroCurtain() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const main = document.querySelector("main");
    const hero = document.querySelector<HTMLElement>(HERO);
    if (!main || !hero) {
      root.style.removeProperty("--hero-stick");
      root.style.removeProperty("--rails-top");
      root.style.removeProperty("--rails-shown");
      // A page without the curtain (the journal and its posts) still keeps its rails off its hero: they're drawn over the page,
      // so they start at the hero's foot there too.
      const plain = document.querySelector<HTMLElement>(PLAIN_HERO);
      const next = plain?.nextElementSibling;
      const box = main?.parentElement;
      if (!plain || !next || !box) return;
      const place = () => {
        root.style.setProperty("--rails-top", `${Math.round(next.getBoundingClientRect().top - box.getBoundingClientRect().top)}px`);
        root.style.setProperty("--rails-shown", "visible");
      };
      place();
      const observer = new ResizeObserver(place);
      observer.observe(plain);
      observer.observe(main!);
      return () => {
        observer.disconnect();
        root.style.removeProperty("--rails-top");
      root.style.removeProperty("--rails-shown");
      };
    }
    // Variables on <html> restyle the whole page when they change, so each is written only when its value does.
    const set = (name: string, value: string) => {
      if (root.style.getPropertyValue(name) !== value) root.style.setProperty(name, value);
    };
    // The screen's height with the phone browser's bars showing (100svh), read off a probe. Not `innerHeight`: on a
    // phone that grows as the address bar slides away mid-scroll, which moved where the hero sticks and made it jump
    // just as the next section slid over it. The small height never changes while scrolling.
    const probe = document.createElement("div");
    probe.style.cssText = "position:fixed;top:0;left:0;width:0;height:100svh;visibility:hidden;pointer-events:none";
    document.body.appendChild(probe);
    const measure = () => {
      set("--hero-stick", `${Math.min(0, (probe.offsetHeight || window.innerHeight) - hero.offsetHeight)}px`);
      // The hero's foot, as where the next section starts in the rails' box (their positioned parent).
      const next = hero.nextElementSibling as HTMLElement | null;
      const box = main.parentElement;
      if (next && box) {
        set("--rails-top", `${Math.round(next.getBoundingClientRect().top - box.getBoundingClientRect().top)}px`);
        set("--rails-shown", "visible");
      }
    };
    // Once the sections have slid all the way over it, the hero is hidden: otherwise, stuck in view behind them, its
    // motion visuals, blurs and animations keep painting under every section the whole way down the page, which makes
    // scrolling stutter and flicker. It shows again as soon as its foot comes back on screen.
    let frame = 0;
    let covered = false;
    const cover = () => {
      frame = 0;
      const next = hero.nextElementSibling as HTMLElement | null;
      const now = !!next && next.getBoundingClientRect().top <= 0;
      if (now === covered) return;
      covered = now;
      hero.style.visibility = now ? "hidden" : "";
      // Opacity too: a child that sets its own `visibility: visible` (the home hero's WebGL canvas) ignores the
      // hero's `hidden`, and the black hero then showed through as a hairline at the envelope section's foot.
      hero.style.opacity = now ? "0" : "";
      // So its motion (which only pauses off screen, and a sticky hero never is) can pause too.
      hero.dispatchEvent(new CustomEvent(HERO_COVER_EVENT, { detail: now }));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(cover);
    };
    const update = () => {
      measure();
      cover();
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(hero);
    observer.observe(main);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      probe.remove();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", onScroll);
      hero.style.visibility = "";
      hero.style.opacity = "";
      if (covered) hero.dispatchEvent(new CustomEvent(HERO_COVER_EVENT, { detail: false }));
      root.style.removeProperty("--hero-stick");
      root.style.removeProperty("--rails-top");
      root.style.removeProperty("--rails-shown");
    };
  }, [pathname]);

  return null;
}
