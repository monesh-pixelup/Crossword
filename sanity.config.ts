"use client";

/**
 * The Sanity Studio the blog is edited in. It is served by the site at /studio (app/studio/[[...tool]]/page.tsx) and
 * also hosted by Sanity at crossword-website.sanity.studio (`npm run studio:deploy`), which builds it with
 * SANITY_STUDIO_BASE_PATH=/ so it lives at the root of that domain.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "crossword",
  title: "Crossword Blog",
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
          ]),
    }),
  ],
  // Only the post, category and author documents can be created from the Studio's "+" menu (a table lives inside a post).
  document: {
    newDocumentOptions: (prev) => prev.filter(({ templateId }) => ["post", "category", "author"].includes(templateId)),
  },
});
