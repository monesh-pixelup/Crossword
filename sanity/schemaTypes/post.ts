import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

/** A journal post at /blog/<slug>. */
export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "URL",
      description: "The post's address: crossword.ai/blog/<this>. Click “Generate” to make it from the title.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publication date",
      description: "Shown on the post. The journal lists the newest first.",
      type: "date",
      options: { dateFormat: "D MMMM YYYY" },
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      description: "One or two sentences: shown on the home page and in Google results and link previews.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      description: "Optional. Without one, the post uses the journal's maroon cover art. Best at 2:1 (e.g. 1600 × 800).",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Feature on the home page",
      description: "Shows this post in the large card of the home page's Blog section.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "details",
      title: "Extra details",
      description: "Optional words shown after the category on the journal's card, e.g. “5 min read”.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "body",
      title: "Article",
      description:
        "Paragraphs before the first “Section heading” are the introduction. Each “Section heading” starts a new part, listed in the post's Index.",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Section heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullets", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) => rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({ type: "table" }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [{ title: "Newest first", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", category: "category.title", date: "publishedAt", media: "cover" },
    prepare: ({ title, category, date, media }) => ({ title, subtitle: [category, date].filter(Boolean).join(" · "), media }),
  },
});
