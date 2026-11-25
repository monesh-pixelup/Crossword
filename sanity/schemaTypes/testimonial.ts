import { CommentIcon } from "@sanity/icons/Comment";
import { defineField, defineType } from "sanity";

/** The pages that show a testimonial carousel. The blog page shows the home page's. */
export const testimonialPages = [
  { title: "Home (and the blog page)", value: "home" },
  { title: "Conversational Interface", value: "sell" },
  { title: "Support", value: "support" },
  { title: "Retain", value: "retain" },
];

/** The portrait card's colours, the brand's maroon and its two greens. */
export const testimonialCardColors = [
  { title: "Maroon", value: "#7d0034" },
  { title: "Forest green", value: "#00331a" },
  { title: "Green", value: "#004c27" },
];

/**
 * A customer testimonial: one slide of the carousel on the pages chosen for it. A page shows its testimonials in
 * `order`; a page with none in Sanity shows the site's built-in placeholders.
 */
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      description: "What they said, without quotation marks (the site adds them). About 40 words at most reads best.",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Role", description: "e.g. “Senior Director of Global Support”.", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({
      name: "photo",
      title: "Photo",
      description: "Optional. A portrait, roughly square. Without one the card shows the site's own photograph.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "cardColor",
      title: "Portrait card colour",
      type: "string",
      options: { list: testimonialCardColors, layout: "radio" },
      initialValue: "#7d0034",
    }),
    defineField({
      name: "pages",
      title: "Show on",
      description: "The pages whose carousel includes this testimonial.",
      type: "array",
      of: [{ type: "string" }],
      options: { list: testimonialPages },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Position in the carousel",
      description: "1 is first. On load the carousel opens on the second one, with the first to its left.",
      type: "number",
      validation: (rule) => rule.integer().min(1),
    }),
  ],
  orderings: [{ title: "Position in the carousel", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", role: "role", company: "company", quote: "quote", media: "photo" },
    prepare: ({ title, role, company, quote, media }) => ({
      title: [title, company].filter(Boolean).join(", "),
      subtitle: quote || role,
      media,
    }),
  },
});
