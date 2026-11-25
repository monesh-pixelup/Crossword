"use client";

import { useEffect } from "react";

/** Pictures: an image, an inline SVG, a canvas, or anything inside one. */
const PICTURE = "img, svg, picture, canvas, video";

/**
 * Stops the site's pictures being dragged off the page. The stylesheet (globals.css, "No dragging or selecting
 * pictures") covers Chrome and Safari; Firefox has no style for it, so a drag that starts on a picture is cancelled
 * here, as is one on a link that holds only a picture (the header's mark, a logo): dragging that would lift the
 * picture too. Links with text still drag as links, and text selection is untouched.
 *
 * Mounted with the site's shell, so the Sanity Studio (which moves images by dragging them) is left alone.
 */
export function NoImageDrag() {
  useEffect(() => {
    const onDragStart = (event: DragEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const pictureLink = target instanceof HTMLAnchorElement && !target.textContent?.trim() && !!target.querySelector(PICTURE);
      if (target.closest(PICTURE) || pictureLink) event.preventDefault();
    };
    document.addEventListener("dragstart", onDragStart);
    return () => document.removeEventListener("dragstart", onDragStart);
  }, []);
  return null;
}
