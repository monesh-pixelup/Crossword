import { ThListIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

/** A table in a post's body. The first row is the header; each row's first cell is its label. */
export const table = defineType({
  name: "table",
  title: "Table",
  type: "object",
  icon: ThListIcon,
  fields: [
    defineField({
      name: "rows",
      title: "Rows",
      description: "The first row is the header row. Every row needs the same number of cells.",
      type: "array",
      of: [
        defineArrayMember({
          name: "tableRow",
          title: "Row",
          type: "object",
          fields: [defineField({ name: "cells", title: "Cells", type: "array", of: [{ type: "string" }] })],
          preview: {
            select: { cells: "cells" },
            prepare: ({ cells }: { cells?: string[] }) => ({ title: (cells ?? []).join(" · ") || "Empty row" }),
          },
        }),
      ],
      validation: (rule) => rule.min(2).error("Add a header row and at least one more."),
    }),
  ],
  preview: {
    select: { rows: "rows" },
    prepare: ({ rows }: { rows?: { cells?: string[] }[] }) => ({
      title: "Table",
      subtitle: (rows?.[0]?.cells ?? []).join(" · "),
    }),
  },
});
