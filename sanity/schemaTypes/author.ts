import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

/** Who wrote a post: shown in the post's byline, under its title. */
export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "role",
      title: "Role",
      description: "Shown beside the name, e.g. “Head of Product, Crossword”.",
      type: "string",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      description: "Optional. A square headshot works best. Without one, the byline shows the author's initials.",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
