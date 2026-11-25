import { cacheLife, cacheTag } from "next/cache";
import { defineQuery } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  retainTestimonials,
  sellTestimonials,
  supportTestimonials,
  type Testimonial,
  testimonials as homeTestimonials,
} from "../config/testimonials";

/**
 * The testimonial carousels' slides, read from Sanity (edited at /studio, under Testimonials). Cached under the
 * "testimonials" tag until Sanity's webhook (app/api/revalidate) reports a change, as the blog is; without the webhook
 * they refresh on their own about an hour after a change.
 */
export const TESTIMONIALS_TAG = "testimonials";

/** The pages with a carousel (the blog page shows the home page's). */
export type TestimonialPage = "home" | "sell" | "support" | "retain";

/** What a page shows while it has no testimonials in Sanity: the site's built-in ones (config/testimonials.ts). */
const builtIn: Record<TestimonialPage, Testimonial[]> = {
  home: homeTestimonials,
  sell: sellTestimonials,
  support: supportTestimonials,
  retain: retainTestimonials,
};

/** The portrait card's colours: anything else from Sanity falls back to the first (maroon). */
const cardColors = ["#7d0034", "#00331a", "#004c27"];

type RawTestimonial = {
  quote: string | null;
  name: string | null;
  role: string | null;
  company: string | null;
  cardColor: string | null;
  photo: (SanityImageSource & { asset?: unknown }) | null;
};

const testimonialsQuery = defineQuery(
  `*[_type == "testimonial" && $page in pages && defined(quote) && defined(name)] | order(coalesce(order, 9999) asc, _createdAt asc) { quote, name, role, company, cardColor, photo }`,
);

/** A page's testimonials, in carousel order: Sanity's when it has any for the page, the built-in ones otherwise (or if Sanity can't be reached). */
export async function getTestimonials(page: TestimonialPage): Promise<Testimonial[]> {
  "use cache";
  cacheTag(TESTIMONIALS_TAG);
  cacheLife("hours");
  let rows: RawTestimonial[] = [];
  try {
    rows = await client.fetch<RawTestimonial[]>(testimonialsQuery, { page });
  } catch {
    return builtIn[page];
  }
  if (!rows.length) return builtIn[page];
  return rows.map((row, i) => ({
    quote: row.quote ?? "",
    name: row.name ?? "",
    role: row.role ?? "",
    company: row.company ?? "",
    cardColor: row.cardColor && cardColors.includes(row.cardColor) ? row.cardColor : cardColors[i % cardColors.length],
    // The portrait fills the card's 314 × 317 notched panel; twice that for sharp screens.
    photo: row.photo?.asset ? urlFor(row.photo).width(628).height(634).fit("crop").url() : null,
  }));
}
