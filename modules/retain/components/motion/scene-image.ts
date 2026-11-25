import { getImageProps } from "next/image";

/**
 * The motion scenes' photos (product shots, the in-chat pictures, brand marks, the WhatsApp wallpaper) are the source
 * build's full-size PNGs: 0.5–2 MB each for a picture drawn a few hundred pixels wide, and fetched only as the message
 * carrying it appears, so on a phone they arrived seconds after their bubble. Through the image optimizer the same
 * picture is a resized AVIF/WebP of a few dozen KB, picked for the screen by `sizes`.
 *
 * Returns the `src`, `srcSet` and `sizes` to spread on an <img> (or to preload, see `preloadSceneImages`). SVGs and
 * anything that isn't one of the build's own images pass through untouched.
 */
export type SceneImage = { src: string; srcSet?: string; sizes?: string };

/** A picture inside a scene: under half a phone's width once the scene is scaled to it, about 400px on a desktop. */
export const PHOTO_SIZES = "(max-width: 767px) 45vw, 400px";
/** A brand's round mark. */
export const MARK_SIZES = "64px";
/** A backdrop across the whole chat window. */
export const BACKDROP_SIZES = "(max-width: 767px) 100vw, 800px";

const cache = new Map<string, SceneImage>();

export function sceneImage(src: string, sizes: string = PHOTO_SIZES): SceneImage {
  if (!src.startsWith("/_next/static/media/") || !/\.(png|jpe?g|webp|avif)$/i.test(src)) return { src };
  const key = `${sizes}|${src}`;
  const hit = cache.get(key);
  if (hit) return hit;
  // Width and height only satisfy the API for a plain URL: the scene's stylesheet sizes the picture.
  const { props } = getImageProps({ src, alt: "", width: 640, height: 640, sizes });
  const image = { src: props.src, srcSet: props.srcSet, sizes: props.sizes };
  cache.set(key, image);
  return image;
}

const preloaded = new Set<string>();

/** Fetches scene pictures ahead of the scene that shows them (the same URLs its <img>s will ask for), once each. */
export function preloadSceneImages(images: SceneImage[]) {
  for (const { src, srcSet, sizes } of images) {
    const key = `${sizes}|${src}`;
    if (preloaded.has(key)) continue;
    preloaded.add(key);
    const img = new Image();
    img.decoding = "async";
    if (sizes) img.sizes = sizes;
    if (srcSet) img.srcset = srcSet;
    img.src = src;
  }
}
