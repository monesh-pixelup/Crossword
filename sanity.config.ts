"use client";

/**
 * The Sanity Studio the blog and the testimonials are edited in. It is served by the site at /studio (app/studio/[[...tool]]/page.tsx) and
 * also hosted by Sanity at crossword-website.sanity.studio (`npm run studio:deploy`), which builds it with
 * SANITY_STUDIO_BASE_PATH=/ so it lives at the root of that domain.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "crossword",
  title: "Crossword",
  basePath: process.env.SANITY_STUDIO_BASE_PATH || "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("post").title("Blog posts"),
            S.documentTypeListItem("category").title("Categories"),
            S.documentTypeListItem("author").title("Authors"),
            S.divider(),
            S.documentTypeListItem("testimonial").title("Testimonials"),
          ]),
    }),
  ],
  // Only the post, category, author and testimonial documents can be created from the Studio's "+" menu (a table lives inside a post).
  document: {
    newDocumentOptions: (prev) => prev.filter(({ templateId }) => ["post", "category", "author", "testimonial"].includes(templateId)),
  },
});
