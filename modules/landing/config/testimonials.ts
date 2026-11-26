export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Background of the tilted portrait card. */
  cardColor: string;
  /** Their portrait's URL (e.g. under /media); without it the card shows the site's own photograph. */
  photo?: string | null;
};

/*
 * The real slides live in the Notion Testimonials database (see modules/landing/lib/testimonials.ts). This file keeps
 * only the type, the carousel's opening slide, and the Figma placeholder the carousel falls back to when given none.
 */

// Figma uses the same placeholder testimonial on every slide.
const placeholder = {
  quote: "By the third visit, Crossword knew our customers better than our CRM did.",
  name: "John Edward",
  role: "Senior Director of Global Support",
  company: "Shopify",
};

export const testimonials: Testimonial[] = [
  { ...placeholder, cardColor: "#7d0034" },
  { ...placeholder, cardColor: "#00331a" },
  { ...placeholder, cardColor: "#004c27" },
];

/** Slide shown in the centre on load (as in Figma). */
export const initialTestimonial = 1;
