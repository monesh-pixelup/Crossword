import { useLayoutEffect, useState, type RefObject } from "react";

// Number of rendered lines in the element matched by `selector` inside
// `root` — lets a skeleton draw as many text bars as the real copy wraps
// to, so the swap never changes the card's height. Counts distinct line
// tops from a Range (an element's own height can't tell a 2-line title
// from a taller line-height) and re-measures when the element resizes.
export function useLineCount(root: RefObject<HTMLElement | null>, selector: string, max = Infinity) {
  const [lines, setLines] = useState(1);

  useLayoutEffect(() => {
    const el = root.current?.querySelector<HTMLElement>(selector);
    if (!el) return;
    const measure = () => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const tops = new Set([...range.getClientRects()].map((r) => Math.round(r.top)));
      setLines(Math.min(Math.max(tops.size, 1), max));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [root, selector, max]);

  return lines;
}
