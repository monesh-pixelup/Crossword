import type { StaticImageData } from "next/image";
import cover1 from "../assets/covers/cover-1-maroon.webp";
import cover2 from "../assets/covers/cover-2-cream-aubergine.webp";
import cover3 from "../assets/covers/cover-3-aubergine.webp";
import cover4 from "../assets/covers/cover-4-cream-maroon.webp";
import cover5 from "../assets/covers/cover-5-forest.webp";
import cover6 from "../assets/covers/cover-6-cream-forest.webp";

/**
 * The journal's own cover art (Figma "Blog Templates", 4062:22847), 761 × 296 exported at 3x: the damask "A" cover and
 * the cream "B" cover with the chat window, each in maroon, aubergine and forest green, exported without their title
 * (the post's own title is set on them in HTML, see post-cover.tsx). Posts without a cover of their own take these in
 * turn, A and B alternating: A maroon, B aubergine, A aubergine, B maroon, A forest, B forest.
 */
export const coverArt: StaticImageData[] = [cover1, cover2, cover3, cover4, cover5, cover6];

const slot = (coverIndex: number) => ((coverIndex % coverArt.length) + coverArt.length) % coverArt.length;

/** The cover art for a post's place in the journal (`coverIndex`, counted from the oldest post). */
export function coverArtFor(coverIndex: number): StaticImageData {
  return coverArt[slot(coverIndex)];
}

/** Which template that art is: "a" (damask, title in the gilt box) or "b" (cream, title at the foot). */
export function coverLayoutFor(coverIndex: number): "a" | "b" {
  return slot(coverIndex) % 2 === 0 ? "a" : "b";
}
