"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** The page's lazy images, as yet unloaded. */
const LAZY = 'img[loading="lazy"]';

/**
 * Fetches every lazy image on the page in the background once the page has loaded, so they're ready before they're
 * scrolled to. Left lazy (next/image's default), the browser starts each one only as it nears the screen, and a fast
 * scroll reaches sections before their images arrive: they pop in late. The images below the hero are small (well
 * under a megabyte together), so loading them all early costs little and never competes with the first paint: it
 * waits for the page's load and an idle moment, then switches them to eager. Images mounted later (a tab's panel, a
 * section shown on scroll) are switched as they appear. Re-run on every route.
 */
export function EagerImages() {
  const pathname = usePathname();

  useEffect(() => {
    const eager = (root: ParentNode) => {
      for (const img of root.querySelectorAll<HTMLImageElement>(LAZY)) {
        img.decoding = "async";
        img.loading = "eager";
      }
    };

    let observer: MutationObserver | undefined;
    let idle = 0;
    const hasIdle = typeof window.requestIdleCallback === "function";
    const start = () => {
      const run = () => {
        eager(document);
        observer = new MutationObserver((records) => {
          for (const record of records) {
            for (const node of record.addedNodes) {
              if (!(node instanceof Element)) continue;
              if (node.matches(LAZY)) eager(node.parentElement ?? document);
              else eager(node);
            }
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      };
      // requestIdleCallback is missing in older Safari; a short timeout stands in for it.
      idle = hasIdle ? window.requestIdleCallback(run, { timeout: 2000 }) : window.setTimeout(run, 300);
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
