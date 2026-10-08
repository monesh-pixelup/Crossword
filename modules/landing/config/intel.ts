import type { StaticImageData } from "next/image";
import cxm from "../assets/intel/logo-cxm.svg";
import mckinsey from "../assets/intel/logo-mckinsey.svg";
import salesforce from "../assets/intel/logo-salesforce.svg";

/*
 * Customer intelligence memory graph (Figma storyboard 1927:1011: frames
 * Memory, Signal, Decisions, Outcome). Every block, connector and focus card
 * has its own box per frame on a 1279 × 684 stage; the graph glides between
 * frames. Values match the Webflow build.
 */

export const GRAPH_W = 1279;
export const GRAPH_H = 684;

export type FrameKey = "m" | "s" | "d" | "o";
export type CardState = "memory" | "signal" | "decisions" | "outcome";

export const STATES: CardState[] = ["memory", "signal", "decisions", "outcome"];
export const FRAME_ORDER: FrameKey[] = ["m", "s", "d", "o"];
export const KEY: Record<CardState, FrameKey> = { memory: "m", signal: "s", decisions: "d", outcome: "o" };

/** ms each state rests. */
export const HOLD = 3600;
/** ms of a full state change on autoplay. */
export const TRANS = 1450;
/** ms of a state change asked for by hover or tap. */
export const TRANS_HOVER = 650;
/** A hovered block opens its card once the cursor rests on it this long. */
export const INTENT = 90;

/** [x, y, w, h] */
export type Rect = [number, number, number, number];
/** [x, y, w, h, opacity] */
export type Box = [number, number, number, number, number];

/** Card bodies: where a block becomes a card. */
export const BODY: Record<CardState, Rect> = {
  memory: [229, 118, 257, 256.51],
  signal: [750, 344, 338, 185.69],
  decisions: [558.31, 211, 332, 206.68],
  outcome: [872, 131, 311, 184.69],
};

/** Card sprite boxes (the images, including icon, label and glow). */
export const SPRITE: Record<CardState, Rect> = {
  memory: [180.5, 65, 324.5, 329],
  signal: [705.5, 292, 401.5, 257],
  decisions: [513, 159, 396.5, 278],
  outcome: [830, 78.5, 372, 256.5],
};

export type NodeKind = "soft" | "pill" | "solid" | "warm";

export type GraphNode = {
  id: string;
  kind: NodeKind;
  /** Box per frame; null = not in that frame. */
  frames: Record<FrameKey, Box | null>;
  /** The card this block turns into. */
  own?: CardState;
};

const steady = (box: Box): Record<"s" | "d" | "o", Box> => ({ s: box, d: box, o: box });

/** Blocks in paint order (also the entrance stagger order). */
export const NODES: GraphNode[] = [
  { id: "254", kind: "soft", frames: { m: [644, 362, 169, 49, 0.62], s: [641, 364.59, 157, 45.65, 0.62], d: null, o: null } },
  { id: "266", kind: "pill", frames: { m: [421, 374, 78, 22, 0.5], ...steady([434, 375.59, 72, 21, 0.5]) } },
  { id: "267", kind: "pill", frames: { m: [378, 179, 77, 23, 0.5], ...steady([394, 195.59, 72, 21, 0.5]) } },
  { id: "268", kind: "pill", frames: { m: [1161, 343, 78, 23, 0.5], ...steady([1121, 347.59, 72, 21, 0.5]) } },
  { id: "269", kind: "soft", frames: { m: [1200, 499, 77, 23, 0.5], ...steady([1157, 492.59, 72, 21, 0.5]) } },
  { id: "259", kind: "soft", frames: { m: [399, 489, 169, 49, 0.62], ...steady([414, 483.59, 157, 45.65, 0.62]) } },
  { id: "260", kind: "soft", frames: { m: [803, 243, 169, 49, 0.5], ...steady([789, 254.59, 157, 45.65, 0.5]) } },
  { id: "261", kind: "soft", frames: { m: [1047, 428, 170, 49, 0.5], ...steady([1016, 425.59, 157, 45.65, 0.5]) } },
  {
    id: "262",
    kind: "soft",
    frames: { m: [633, 120, 169, 49, 0.62], s: [631, 140.59, 157, 45.65, 0.62], d: [637, 119, 157, 45.65, 0.62], o: [637, 119, 157, 45.65, 0.62] },
  },
  {
    id: "256",
    kind: "solid",
    frames: { m: [1005, 286, 169, 49, 0.62], s: null, d: [976, 294.59, 157, 45.65, 0.62], o: [976, 294.59, 157, 45.65, 0.62] },
  },
  { id: "257", kind: "solid", frames: { m: [421, 222, 169, 49, 0.62], ...steady([434, 235.59, 157, 45.65, 0.62]) } },
  {
    id: "255",
    kind: "warm",
    frames: { m: [760, 388, 350, 144, 0.5], s: null, d: [749, 389.59, 325, 133, 0.5], o: [749, 389.59, 325, 133, 0.5] },
    own: "signal",
  },
  {
    id: "264",
    kind: "warm",
    frames: { m: [936, 152, 346, 112, 0.5], s: [913, 169.59, 320, 104, 0.5], d: [913, 169.59, 320, 104, 0.5], o: null },
    own: "outcome",
  },
  {
    id: "263",
    kind: "warm",
    frames: { m: [566, 240, 301, 91, 0.5], s: [562, 188, 279, 85, 0.5], d: null, o: null },
    own: "decisions",
  },
  { id: "258", kind: "warm", frames: { m: [3, 441, 301, 71, 0.5], ...steady([46, 438.59, 280, 66, 0.5]) } },
  {
    id: "mem",
    kind: "warm",
    frames: { m: null, s: [216, 298, 279, 85, 0.5], d: [152, 271, 232, 57, 0.5], o: [152, 271, 232, 57, 0.5] },
    own: "memory",
  },
];

/** Warm blocks are lighter in the Memory frame (#cab587 at 40% vs 70%). */
export const FILL: Record<FrameKey, number> = { m: 0.4, s: 0.7, d: 0.7, o: 0.7 };

/** [x0, y0, x1, y1] or a curve [x0, y0, c1x, c1y, c2x, c2y, x1, y1]; null where the frame has none. */
export type LinePoints = number[];

export const LINES: { id: string; frames: Record<FrameKey, LinePoints | null> }[] = [
  {
    id: "808",
    frames: {
      m: [367, 292, 389.26, 274.82, 401.74, 265.18, 424, 248],
      s: [386.81, 298.41, 407.25, 282.38, 416.15, 274.78, 436.6, 258.75],
      d: [384.25, 299.79, 404.69, 283.76, 416.16, 274.78, 436.6, 258.75],
      o: [384.25, 299.79, 404.69, 283.76, 416.16, 274.78, 436.6, 258.75],
    },
  },
  {
    id: "809",
    frames: {
      m: [137, 441, 228, 371],
      s: [170.96, 439.02, 253.5, 382.79],
      d: [170.96, 439.02, 263.61, 328.18],
      o: [170.96, 439.02, 263.61, 328.18],
    },
  },
  { id: "810", frames: { m: [367, 292, 425, 384], s: null, d: [384.2, 299.77, 558, 326], o: [384.2, 299.77, 437.42, 386.16] } },
  {
    id: "811",
    frames: { m: [304, 480, 400, 513], s: [326, 474.55, 415.24, 505.48], d: [326, 474.55, 415.24, 505.48], o: [326, 474.55, 415.24, 505.48] },
  },
  {
    id: "812",
    frames: {
      m: [571, 520, 760, 454],
      s: [573.66, 511.12, 749.02, 450.59],
      d: [573.66, 511.12, 749.02, 450.59],
      o: [573.66, 511.12, 749.02, 450.59],
    },
  },
  {
    id: "813",
    frames: {
      m: [1110, 466, 1281, 204],
      s: [1089.68, 442.47, 1232.4, 218.16],
      d: [1073.68, 461.35, 1205.18, 273.44],
      o: [1073.68, 461.35, 1147.67, 315.36],
    },
  },
  {
    id: "814",
    frames: {
      m: [485, 301, 760, 454],
      s: [493.77, 308.75, 748.8, 450.43],
      d: [683.87, 396.23, 748.8, 450.43],
      o: [590.98, 261.01, 748.8, 450.43],
    },
  },
  {
    id: "815",
    frames: {
      m: [867, 293, 937, 209],
      s: [840.56, 239.83, 913.15, 223.14],
      d: [828.51, 299.35, 913.15, 223.14],
      o: [590.84, 260.51, 944.97, 213.75],
    },
  },
  { id: "816", frames: { m: [485, 301, 566, 289], s: [493.79, 308.74, 563.56, 270.81], d: null, o: null } },
];

/** Gold gradient overlays on the lines into the memory card (Memory and Signal frames). */
export const GLOW: { id: string; frames: Record<FrameKey, number>; /** Glow starts at the line's end. */ end: boolean }[] = [
  { id: "809", frames: { m: 0.6, s: 0.6, d: 0, o: 0 }, end: true },
  { id: "808", frames: { m: 0.6, s: 0.6, d: 0, o: 0 }, end: false },
  { id: "810", frames: { m: 0.6, s: 0, d: 0, o: 0 }, end: false },
];

export const DOTS: Record<FrameKey, number> = { m: 1, s: 0, d: 0, o: 0 };

export type Stat = {
  logo: StaticImageData;
  logoAlt: string;
  /** Logo width in px. */
  logoWidth: number;
  figure: string;
  label: string;
  text: string;
};

export const stats: Stat[] = [
  {
    logo: mckinsey,
    logoAlt: "McKinsey & Company",
    logoWidth: 105.84,
    figure: "28%",
    label: "of Gen Z",
    text: "use AI tools for shopping. These consumers are already using generative AI tools specifically for shopping tasks.",
  },
  {
    logo: cxm,
    logoAlt: "CXM",
    logoWidth: 75.31,
    figure: "12.3%",
    label: "conversion rate",
    text: "for shoppers using AI agents. That’s nearly 4× the 3.1% baseline for shoppers who browse without engaging.",
  },
  {
    logo: salesforce,
    logoAlt: "Salesforce",
    logoWidth: 56.99,
    figure: "76%",
    label: "of buyers",
    text: "expect personalized recommendations. They want brands to understand their individual needs, positioning the digital concierge as a retail necessity.",
  },
];
