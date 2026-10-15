/** Figma's alpha table for the noise: the darker 51% of the turbulence passes, the rest is clear. */
const table = [...Array(51).fill(1), ...Array(49).fill(0)].join(" ");

/**
 * Figma's "Noise" effect on the Aubergine steps ground, as Figma exports it: a flat fill with a
 * fine fractal-noise grain (base frequency 2, 3 octaves, seed 7413) laid over it in black at 25%,
 * filling its (relative) parent. It is a static SVG filter, so it paints once, at any size.
 */
export function NoiseGround({ id, color }: { id: string; color: string }) {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 size-full">
      <filter id={id} x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves={3} seed={7413} result="noise" />
        <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
        <feComponentTransfer in="alphaNoise" result="coloredNoise">
          <feFuncA type="discrete" tableValues={table} />
        </feComponentTransfer>
        <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="noiseClipped" />
        <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="flood" />
        <feComposite operator="in" in="flood" in2="noiseClipped" result="grain" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="grain" />
        </feMerge>
      </filter>
      <rect width="100%" height="100%" fill={color} filter={`url(#${id})`} />
    </svg>
  );
}
