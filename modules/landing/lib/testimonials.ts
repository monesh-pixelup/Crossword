import type { Testimonial } from "../config/testimonials";
import generated from "../content/testimonials.generated.json";

/** The pages with a carousel (the blog page shows the home page's). */
export type TestimonialPage = "home" | "sell" | "support" | "retain";

/**
 * The testimonial carousels' slides. They are edited in the Notion Testimonials database; the sync copies them into
 * content/testimonials.yml, and scripts/blog/build.mjs turns that into testimonials.generated.json before every build.
 * (They were in Sanity until 2026-11-26.)
 */
const byPage = generated as Record<TestimonialPage, Testimonial[]>;

/** A page's testimonials, in carousel order. */
export async function getTestimonials(page: TestimonialPage): Promise<Testimonial[]> {
  return byPage[page] ?? [];
}
