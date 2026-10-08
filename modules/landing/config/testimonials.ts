export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Background of the tilted portrait card. */
  cardColor: string;
};

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
