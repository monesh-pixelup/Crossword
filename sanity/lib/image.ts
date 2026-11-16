import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

/** A Sanity image's URL builder (crop and hotspot applied), e.g. `urlFor(post.cover).width(1600).url()`. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}
