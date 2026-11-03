import { useLayoutEffect, useState, type RefObject } from "react";

export interface SkeletonShape {
  kind: "bar" | "block" | "outline";
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
}

// Elements that read as one solid shape (a control, marker, swatch or
// thumbnail) — drawn as a block and never descended into.
const BLOCK = ".ill-chip, .ill-button, .ill-thumbnail, .ill-support-step__marker, .ill-support-shade__swatch, svg, img";

// Support panels hold six different layouts (steps row, swap tiles, shade
// compare, refund figure…), so the skeleton is read off the real,
// always-rendered content rather than hand-drawn per scenario: each line of
// text becomes a bar at its own rect, each control a block, each bordered
// tile an outline. The overlay therefore lands on exactly the boxes the
// resolved panel occupies. Re-measured when the panel resizes and once
// fonts settle, since both change line boxes.
export function useMeasuredSkeleton(
  panel: RefObject<HTMLElement | null>,
  overlayClass: string,
  enabled: boolean,
): SkeletonShape[] {
  const [shapes, setShapes] = useState<SkeletonShape[]>([]);

  useLayoutEffect(() => {
    const root = panel.current;
    if (!enabled || !root) return;

    const measure = () => {
      const o = root.getBoundingClientRect();
      // Back to the panel's own CSS px: the site zooms each visual to fit
      // its panel, and getBoundingClientRect reports zoomed values. 1 (a
      // no-op) at the visual's drawn size.
      const zoom = root.offsetWidth ? o.width / root.offsetWidth : 1;
      const ox = o.left / zoom + root.clientLeft;
      const oy = o.top / zoom + root.clientTop;
      const out: SkeletonShape[] = [];
      const rect = (z: DOMRect, kind: SkeletonShape["kind"], radius: number, inset = 0) => {
        const r = { left: z.left / zoom, top: z.top / zoom, width: z.width / zoom, height: z.height / zoom };
        out.push({ kind, x: r.left - ox, y: r.top - oy + inset, w: r.width, h: r.height - inset * 2, r: radius });
      };

      const walk = (el: Element) => {
        if (el.classList.contains(overlayClass)) return;
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") return;
        const radius = parseFloat(cs.borderTopLeftRadius) || 0;

        if (el.matches(BLOCK)) {
          rect(el.getBoundingClientRect(), "block", radius);
          return;
        }

        // A tile reads as a tile by its border or its fill (the return
        // conditions are fill-only).
        const bg = cs.backgroundColor.match(/[\d.]+/g);
        const hasFill = !!bg && (bg.length < 4 || parseFloat(bg[3]) > 0);
        const isTile = (parseFloat(cs.borderTopWidth) > 0 || hasFill) && el.children.length > 0;
        if (isTile) rect(el.getBoundingClientRect(), "outline", radius);

        const ownText = [...el.childNodes].filter((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim());
        if (ownText.length) {
          const barH = Math.round(parseFloat(cs.fontSize) * 0.8);
          const lines = new Map<number, DOMRect>();
          for (const node of ownText) {
            const range = document.createRange();
            range.selectNodeContents(node);
            for (const r of range.getClientRects()) {
              const key = Math.round(r.top);
              const prev = lines.get(key);
              lines.set(key, prev ? new DOMRect(Math.min(prev.left, r.left), prev.top, Math.max(prev.right, r.right) - Math.min(prev.left, r.left), prev.height) : r);
            }
          }
          for (const r of lines.values()) {
            const inset = Math.max((r.height / zoom - barH) / 2, 0);
            rect(r, "bar", 4, inset);
          }
        }

        for (const child of el.children) walk(child);
      };

      for (const child of root.children) walk(child);
      setShapes(out);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [panel, overlayClass, enabled]);

  return shapes;
}
