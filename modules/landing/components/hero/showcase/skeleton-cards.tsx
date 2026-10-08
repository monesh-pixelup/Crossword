/**
 * The faded placeholder cards that surround the live widgets in the hero
 * showcase. Coordinates are in the 1854×956 showcase canvas (Figma units);
 * bones are positioned inside each card's padding box.
 */

type Bone = { x: number; y: number; w: number; h: number; pill?: boolean };
type SkeletonCardSpec = { x: number; y: number; w: number; h: number; bones: Bone[] };

const sideStack = (y: number, h: number, rows: number, portrait = false): SkeletonCardSpec => ({
  x: 13,
  y,
  w: 269,
  h,
  bones: [
    { x: 12.24, y: 38.96, w: 240.417, h: 99.061 },
    ...(portrait ? [{ x: 82.77, y: 14.77, w: 174, h: 117 }] : []),
    ...Array.from({ length: rows }, (_, i) => ({ x: 84.77, y: 145.77 + i * 27, w: 174, h: 17 })),
  ],
});

const farRightStack = (y: number): SkeletonCardSpec => ({
  x: 1560,
  y,
  w: 269,
  h: 323,
  bones: [
    { x: 12.24, y: 38.96, w: 240.417, h: 99.061 },
    { x: 11.77, y: 147.77, w: 241, h: 158 },
    { x: 82.77, y: 14.77, w: 174, h: 117 },
    ...Array.from({ length: 4 }, (_, i) => ({ x: 84.77, y: 145.77 + i * 27, w: 174, h: 17 })),
  ],
});

/** Cards painted beneath the chat window, in Figma layer order. */
export const backgroundCards: SkeletonCardSpec[] = [
  {
    x: 1196.62,
    y: 540.99,
    w: 348.383,
    h: 178.087,
    bones: [
      { x: 15.716, y: 14.603, w: 116.87, h: 103.513 },
      { x: 140.377, y: 14.603, w: 185.878, h: 26.713 },
      { x: 140.377, y: 50.22, w: 185.878, h: 26.713 },
      { x: 140.377, y: 85.837, w: 185.878, h: 26.713 },
      { x: 14.603, y: 128.133, w: 311.652, h: 35.617 },
    ],
  },
  {
    x: 296.16,
    y: 227.11,
    w: 361.739,
    h: 152.487,
    bones: [
      { x: 12.24, y: 17.81, w: 173.637, h: 24.487 },
      ...Array.from({ length: 4 }, (_, i) => ({ x: 12.24, y: 58.99 + i * 21.147, w: 329.461, h: 12.243 })),
      { x: 318.33, y: 17.81, w: 25.597, h: 24.487, pill: true },
    ],
  },
  {
    x: 292.83,
    y: 733,
    w: 208.139,
    h: 152.487,
    bones: [
      { x: 11.13, y: 10.02, w: 180.313, h: 43.409 },
      { x: 11.13, y: 60.1, w: 180.313, h: 43.409 },
    ],
  },
  {
    x: 513.21,
    y: 733,
    w: 467.478,
    h: 152.487,
    bones: [
      { x: 14.47, y: 12.24, w: 90.157, h: 103.513 },
      { x: 116.87, y: 12.24, w: 333.913, h: 25.6 },
      { x: 116.87, y: 45.64, w: 333.913, h: 25.6 },
      { x: 116.87, y: 77.91, w: 333.913, h: 25.6 },
    ],
  },
  {
    x: 991.82,
    y: 733,
    w: 269.357,
    h: 152.487,
    bones: [
      { x: 12.24, y: 14.47, w: 90.157, h: 36.73 },
      { x: 116.87, y: 14.47, w: 135.791, h: 36.73 },
    ],
  },
  {
    x: 297.28,
    y: 59.06,
    w: 269.357,
    h: 152.487,
    bones: [{ x: 12.24, y: 38.96, w: 240.417, h: 99.061 }],
  },
  sideStack(229, 257, 4, true),
  sideStack(499, 216, 2),
  sideStack(733, 216, 2),
  sideStack(-2, 216, 2),
  {
    x: 575.54,
    y: 59.06,
    w: 609.948,
    h: 152.487,
    bones: [
      { x: 11.13, y: 37.84, w: 91.27, h: 99.061 },
      { x: 113.53, y: 93.5, w: 467.478, h: 43.409 },
      { x: 113.53, y: 42.3, w: 467.478, h: 43.409 },
    ],
  },
  {
    x: 1195.51,
    y: 59.06,
    w: 348.383,
    h: 152.487,
    bones: [0, 108.62, 217.23].map((x) => ({ x: 14.603 + x, y: 35.623, w: 101.94, h: 103.513 })),
  },
  {
    x: 1275.64,
    y: 733,
    w: 269.357,
    h: 152.487,
    bones: [0, 1, 2].flatMap((row) =>
      [0, 1, 2].map((col) => ({
        x: 14.603 + col * 84.962,
        y: 14.603 + row * 25.526,
        w: 73.832,
        h: 13.357,
      })),
    ),
  },
];

/** Cards painted above the chat window, in Figma layer order. */
export const foregroundCards: SkeletonCardSpec[] = [
  farRightStack(227),
  farRightStack(-111),
  {
    x: 1560,
    y: 566,
    w: 269,
    h: 299,
    bones: [
      { x: 14.603, y: 14.603, w: 241, h: 101 },
      { x: 14.603, y: 126.603, w: 241, h: 47 },
      { x: 14.603, y: 184.603, w: 241, h: 47 },
      { x: 14.603, y: 242.603, w: 241, h: 47 },
      { x: 82.77, y: 14.77, w: 174, h: 117 },
      ...Array.from({ length: 4 }, (_, i) => ({ x: 84.77, y: 145.77 + i * 27, w: 174, h: 17 })),
    ],
  },
];

export function SkeletonCards({ cards }: { cards: SkeletonCardSpec[] }) {
  return cards.map((card, i) => (
    <div
      key={i}
      className="absolute rounded-[9.13px] border-[2.226px] border-black/5 bg-parchment opacity-30"
      style={{ left: card.x, top: card.y, width: card.w, height: card.h }}
    >
      {card.bones.map((bone, j) => (
        <div
          key={j}
          className={`absolute hairline-[0.289px] outline-rose-line bg-bone ${bone.pill ? "rounded-[37.843px]" : "rounded-[8.105px]"}`}
          style={{ left: bone.x, top: bone.y, width: bone.w, height: bone.h }}
        />
      ))}
    </div>
  ));
}
