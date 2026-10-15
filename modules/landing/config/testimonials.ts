export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Background of the tilted portrait card. */
  cardColor: string;
  /** Set the quote at 24px instead of the h5 size, for quotes too long for the card (Retain). */
  smallQuote?: boolean;
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

// Sell (Figma "Testimonial carousel", Client testimonial): the same placeholder on every slide.
const sellPlaceholder = {
  quote:
    "We didn’t expect a chatbot to actually sell. Crossword doesn’t wait for questions, it answers the ones shoppers didn’t even know to ask.",
  name: "Name",
  role: "Title",
  company: "Company",
};

export const sellTestimonials: Testimonial[] = [
  { ...sellPlaceholder, cardColor: "#7d0034" },
  { ...sellPlaceholder, cardColor: "#00331a" },
  { ...sellPlaceholder, cardColor: "#004c27" },
];

// Support (Figma "Testimonial carousel", Client testimonial): the same placeholder on every slide.
const supportPlaceholder = {
  quote:
    "We were worried an AI would make support feel colder. It’s done the opposite. Customers get answered instantly, and when it can’t solve something, it hands off to our team with full context.",
  name: "Name",
  role: "Title",
  company: "Company",
};

export const supportTestimonials: Testimonial[] = [
  { ...supportPlaceholder, cardColor: "#7d0034" },
  { ...supportPlaceholder, cardColor: "#00331a" },
  { ...supportPlaceholder, cardColor: "#004c27" },
];

// Retain (Figma "Testimonial carousel", Client testimonial): a longer quote, set smaller to fit the card.
const retainPlaceholder = {
  quote:
    "Crossword helps customers make better decisions before they buy. It answers the questions they’d normally have to figure out themselves, recommends products based on what they’re looking for, and helps them feel confident about what they’re choosing. We started seeing fewer wrong-fit purchases almost immediately.",
  name: "Name",
  role: "Title",
  company: "Company",
  smallQuote: true,
};

export const retainTestimonials: Testimonial[] = [
  { ...retainPlaceholder, cardColor: "#7d0034" },
  { ...retainPlaceholder, cardColor: "#00331a" },
  { ...retainPlaceholder, cardColor: "#004c27" },
];
