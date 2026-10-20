import type { StaticImageData } from "next/image";
import chatgptIcon from "../../../assets/hero/parallax/icon-chatgpt.svg";
import instagramIcon from "../../../assets/hero/parallax/icon-instagram.svg";
import museIcon from "../../../assets/hero/parallax/icon-muse.svg";
import websiteIcon from "../../../assets/hero/parallax/icon-website.svg";
import leatherSneakers from "../../../assets/hero/parallax/leather-sneakers.webp";
import sneakers from "../../../assets/hero/parallax/sneakers.webp";

export type Platform = {
  label: string;
  icon: StaticImageData;
  /** The icon's box, and the glyph drawn in it (offset by `inset`). */
  box: [number, number];
  glyph: [number, number];
  inset?: [number, number];
};

const platforms = {
  chatgpt: { label: "ChatGPT", icon: chatgptIcon, box: [11.32, 11.22], glyph: [11.32, 11.22] },
  instagram: { label: "Instagram DM", icon: instagramIcon, box: [15.7, 15.56], glyph: [15.7, 15.56] },
  muse: { label: "Muse", icon: museIcon, box: [15.7, 15.56], glyph: [15.7, 10.41], inset: [0, 2.57] },
  website: { label: "Brand Website", icon: websiteIcon, box: [15.7, 15.56], glyph: [15.7, 15.56] },
} satisfies Record<string, Platform>;

export type Entry = { id: string; platform: Platform; query: string };

/** The entry points the stack cycles through: where a shopper reached the assistant, and what they asked. */
export const entries: Entry[] = [
  { id: "chatgpt", platform: platforms.chatgpt, query: "I need running shoes. I’ve never really run before." },
  { id: "backpack", platform: platforms.website, query: "Is this leather backpack really worth the price?" },
  { id: "instagram", platform: platforms.instagram, query: "The jacket doesn’t fit. I want my money back." },
  { id: "muse", platform: platforms.muse, query: "I’ll take the navy one, size M." },
  { id: "cart", platform: platforms.website, query: "Grey sofa and cushion set left in cart" },
];

export type Product = { title: string; subtitle: string; price: string; image: StaticImageData };

export type Turn =
  | { kind: "assistant"; text: string }
  | { kind: "user"; text: string }
  | { kind: "products"; products: Product[] };

const runners: Product[] = [
  { title: "Cloudrise Daily Trainer", subtitle: "Max cushion · Neutral · Road", price: "$129", image: sneakers },
  { title: "Softstep Comfort Runner", subtitle: "Plush foam · Wide fit · Road", price: "$110", image: leatherSneakers },
  { title: "Easy Miles 2", subtitle: "Cushioned · Lightweight · Road", price: "$95", image: sneakers },
];

/** Each journey's conversation, keyed to the entry it starts from. */
export const journeys: { entry: string; turns: Turn[] }[] = [
  {
    entry: "chatgpt",
    turns: [
      { kind: "assistant", text: "Welcome to the club. Are we starting with a couple of jogs a week, or training for something?" },
      { kind: "user", text: "Just a few jogs. My knees aren’t what they used to be." },
      { kind: "assistant", text: "Then comfort comes first. Here are three with plenty of cushioning, easy on the knees and easy on the budget." },
      { kind: "products", products: runners },
    ],
  },
  {
    entry: "backpack",
    turns: [
      { kind: "assistant", text: "It’s full-grain leather, so it gets better with age instead of wearing out. That’s most of what you’re paying for." },
      { kind: "user", text: "Does it fit a 15-inch laptop?" },
      {
        kind: "assistant",
        text: "Easily, and there’s a padded sleeve for it. Want me to compare it to the cheaper nylon one you previously viewed, so you can judge what the extra gets you?",
      },
    ],
  },
  {
    entry: "instagram",
    turns: [
      {
        kind: "assistant",
        text: "Sorry about that. You’re well within the return window. Would you like a refund or would you rather swap it for another size?",
      },
      { kind: "user", text: "Refund, please." },
      { kind: "assistant", text: "Done. I’ve sent you a return label. Your refund goes back to the original payment method once the jacket reaches us." },
    ],
  },
  { entry: "muse", turns: [{ kind: "assistant", text: "Navy, M. Good pick. It’s in your cart." }] },
  {
    entry: "cart",
    turns: [
      { kind: "assistant", text: "You left something in your cart, the grey sofa and the cushion set. Anything holding you back?" },
      { kind: "user", text: "Delivery time." },
      { kind: "assistant", text: "Fair. It can reach you in five days, and assembly is free if you check out today. Want to pick up where we left off?" },
    ],
  },
];

export type Move = "intro" | "final" | "user";

/** How the stack travels: on first load, when a journey ends and moves on, and when a card is picked. */
export const moves: Record<Move, { ms: number; easing: string }> = {
  intro: { ms: 400, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
  final: { ms: 700, easing: "cubic-bezier(0.45, 0, 0.15, 1)" },
  user: { ms: 500, easing: "cubic-bezier(0.45, 0, 0.15, 1)" },
};

const INTRO_MS = 700;
const SETTLE_MS = 250;

const entryIndexOf = (journey: number) => entries.findIndex((e) => e.id === journeys[journey].entry);
export const journeyOf = (entryId: string) => journeys.findIndex((j) => j.entry === entryId);

const words = (turn: Turn) => (turn.kind === "products" ? 0 : turn.text.split(/\s+/).length);
/** How long a turn reads before the next one: at least 1.6s, 85ms a word over 1.1s. */
const readMs = (turn: Turn) => Math.max(1600, 1100 + words(turn) * 85);
/** How long the finished conversation holds before moving on. */
const holdMs = (turns: Turn[]) => {
  const last = turns[turns.length - 1];
  return last.kind === "products" ? 4000 : readMs(last) + 1100;
};

type Conversation = { key: number; journey: number; revealed: number };

export type JourneyState = {
  phase: "intro" | "travel" | "talk";
  /** The stack's position (unbounded; wraps over the entries). */
  cursor: number;
  move: Move;
  highlighted: boolean;
  /** The journey the stack is travelling to, or playing. */
  target: number;
  current: Conversation | null;
  outgoing: Conversation | null;
  seq: number;
};

export const initialJourneyState: JourneyState = {
  phase: "intro",
  cursor: entryIndexOf(0),
  move: "intro",
  highlighted: false,
  target: 0,
  current: null,
  outgoing: null,
  seq: 0,
};

const advance = (s: JourneyState): JourneyState => ({ ...s, phase: "travel", cursor: s.cursor + 1, move: "final", highlighted: true });

/** The next step from a state: after how long, whether it leaves the conversation (paused while hovered), and what it does. */
export function nextStep(s: JourneyState): {
  delay: number;
  kind: "auto" | "leave";
  apply: (s: JourneyState) => JourneyState;
} {
  if (s.phase === "intro") return { delay: INTRO_MS, kind: "auto", apply: (x) => ({ ...x, phase: "travel", highlighted: true }) };
  if (s.phase === "travel") {
    return {
      delay: moves[s.move].ms + SETTLE_MS,
      kind: "auto",
      apply: (x) => ({
        ...x,
        phase: "talk",
        seq: x.seq + 1,
        current: { key: x.seq + 1, journey: x.target, revealed: 1 },
        outgoing: null,
      }),
    };
  }
  const current = s.current!;
  const turns = journeys[current.journey].turns;
  if (current.revealed < turns.length) {
    return {
      delay: readMs(turns[current.revealed - 1]),
      kind: "auto",
      apply: (x) => ({ ...x, current: { ...current, revealed: current.revealed + 1 } }),
    };
  }
  return {
    delay: holdMs(turns),
    kind: "leave",
    apply: (x) => advance({ ...x, outgoing: x.current, current: null, target: (x.target + 1) % journeys.length }),
  };
}

/** Picking a card: the stack travels to it and its journey plays next. */
export function selectJourney(s: JourneyState, journey: number, cursor: number): JourneyState {
  if (cursor === s.cursor && s.phase !== "intro") return s;
  return {
    ...s,
    phase: "travel",
    cursor,
    move: "user",
    highlighted: true,
    target: journey,
    outgoing: s.current ?? s.outgoing,
    current: null,
  };
}
