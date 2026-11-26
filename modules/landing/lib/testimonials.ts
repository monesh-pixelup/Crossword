import {
  retainTestimonials,
  sellTestimonials,
  supportTestimonials,
  type Testimonial,
  testimonials as homeTestimonials,
} from "../config/testimonials";

/** The pages with a carousel (the blog page shows the home page's). */
export type TestimonialPage = "home" | "sell" | "support" | "retain";

/**
 * The testimonial carousels' slides, from config/testimonials.ts. (They were in Sanity until 2026-11-26; Sanity held
 * the same placeholders as that file.) To change one, edit the file, or open an issue asking for the change.
 */
const byPage: Record<TestimonialPage, Testimonial[]> = {
  home: homeTestimonials,
  sell: sellTestimonials,
  support: supportTestimonials,
  retain: retainTestimonials,
};

/** A page's testimonials, in carousel order. */
export async function getTestimonials(page: TestimonialPage): Promise<Testimonial[]> {
  return byPage[page];
}
