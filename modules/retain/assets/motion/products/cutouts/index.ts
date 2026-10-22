import audenImage from "./08-auden-wave-pro-black.png";

const auden = audenImage.src;

// Transparent, square product cutouts (soft shadow baked in). Media keys
// off this set to letterbox them instead of cropping with object-fit: cover.
// The source kit ships 23; the Retain visuals only show this one.
export const cutouts = {
  auden,
};

export const cutoutSrcs: ReadonlySet<string> = new Set(Object.values(cutouts));
