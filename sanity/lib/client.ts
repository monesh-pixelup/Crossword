import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Reads published content. It skips Sanity's CDN: the site caches what it reads itself ("use cache") and refetches
 * only when Sanity's webhook says something changed (app/api/revalidate), so it should always get the latest copy.
 */
export const client = createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" });
