"use client";

/** The Sanity Studio the blog is edited in, served by the site at /studio (app/studio/[[...tool]]/page.tsx). */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "crossword",
  title: "Crossword Blog",
  basePath: "/studio",
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
          ]),
    }),
  ],
  // Only the post and category documents can be created from the Studio's "+" menu (a table lives inside a post).
  document: {
    newDocumentOptions: (prev) => prev.filter(({ templateId }) => templateId === "post" || templateId === "category"),
  },
});
