import { TagIcon } from "@sanity/icons/Tag";
import { defineField, defineType } from "sanity";

/** A journal filter (Logistics, Fintech, …). The filters run in `order`, after "All". */
export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({ name: "title", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "order",
      title: "Position in the filters",
      description: "1 is first, after “All”.",
      type: "number",
      validation: (rule) => rule.integer().min(1),
    }),
  ],
  orderings: [{ title: "Position in the filters", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
