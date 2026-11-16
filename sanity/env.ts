/**
 * Where the blog's content lives in Sanity. The project ID and dataset are public (they appear in every request the
 * site makes), so they default here; set NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET to point elsewhere.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mxq2kdxw";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
/** The Sanity API date this code is written against (see sanity.io/docs/api-versioning). */
export const apiVersion = "2026-11-01";
