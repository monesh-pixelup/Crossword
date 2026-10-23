import type { StaticImageData } from "next/image";
import aeroPaceTrail from "../../../../retain/assets/motion/scenarios/outbound/aero-pace-trail.jpg";
import driftDaily from "../../../../retain/assets/motion/scenarios/outbound/drift-daily.jpg";
import tempoGlide from "../../../../retain/assets/motion/scenarios/outbound/tempo-glide.jpg";
import chatgptIcon from "../../../assets/hero/parallax/icon-chatgpt.svg";
import claudeIcon from "../../../assets/hero/parallax/icon-claude.svg";
import geminiIcon from "../../../assets/hero/parallax/icon-gemini.svg";
import grokIcon from "../../../assets/hero/parallax/icon-grok.svg";
import instagramIcon from "../../../assets/hero/parallax/icon-instagram.svg";
import instinctIcon from "../../../assets/hero/parallax/icon-instinct.svg";
import museIcon from "../../../assets/hero/parallax/icon-muse.svg";
import websiteIcon from "../../../assets/hero/parallax/icon-website.svg";
import lTheanineMagnesium from "../../../assets/motion/l-theanine-magnesium.webp";
import magnesiumGlycinate from "../../../assets/motion/magnesium-glycinate.webp";
import moisturizer from "../../../assets/motion/moisturizer.webp";

export type Platform = {
  label: string;
  icon: StaticImageData;
  /** The icon's box, and the glyph drawn in it (offset by `inset`). */
  box: [number, number];
  glyph: [number, number];
  inset?: [number, number];
};

/** Figma "Platform Pills" (3090:16372) plus the original four: every card on the wheel names a different surface. */
const platforms = {
  chatgpt: { label: "ChatGPT", icon: chatgptIcon, box: [11.32, 11.22], glyph: [11.32, 11.22] },
  gemini: { label: "Gemini", icon: geminiIcon, box: [15.7, 15.7], glyph: [15.7, 15.7] },
  claude: { label: "Claude", icon: claudeIcon, box: [15.7, 15.56], glyph: [15.7, 15.56] },
  grok: { label: "Grok", icon: grokIcon, box: [15.7, 15.12], glyph: [15.7, 15.12] },
  instinct: { label: "Instinct", icon: instinctIcon, box: [13.78, 13.66], glyph: [13.78, 13.66] },
  instagram: { label: "Instagram DM", icon: instagramIcon, box: [15.7, 15.56], glyph: [15.7, 15.56] },
  muse: { label: "Muse", icon: museIcon, box: [15.7, 15.56], glyph: [15.7, 10.41], inset: [0, 2.57] },
  website: { label: "Brand Website", icon: websiteIcon, box: [15.7, 15.56], glyph: [15.7, 15.56] },
} satisfies Record<string, Platform>;

export type Entry = { id: string; platform: Platform; query: string };

/**
 * The entry points the stack cycles through: where a shopper reached the assistant, and what they asked. Eight
 * entries on eight different platforms, so no pill shows twice in the visible wheel (it shows six at a time).
 * The five top-section conversations of the homepage doc, interleaved with the same doc's AI-assistant,
 * personal-agent and search-bar conversations.
 */
export const entries: Entry[] = [
  { id: "running", platform: platforms.chatgpt, query: "I need running shoes. I’ve never really run before." },
  { id: "backpack", platform: platforms.gemini, query: "Is this leather backpack really worth the price?" },
  { id: "refund", platform: platforms.instagram, query: "The jacket isn’t perfect. Can I get a refund?" },
  { id: "moisturizer", platform: platforms.claude, query: "I’m looking for a moisturizer for dry skin, under $50." },
  { id: "add-to-cart", platform: platforms.muse, query: "I’ll take the navy one, size M." },
  { id: "sweater", platform: platforms.instinct, query: "My user wants a warm wool sweater for winter, under $90." },
  { id: "cart", platform: platforms.website, query: "Grey sofa and cushion set left in cart" },
  { id: "sleep", platform: platforms.grok, query: "Need something for better sleep. Don’t want melatonin." },
];

export type Product = { title: string; subtitle: string; price: string; image: StaticImageData };

export type Turn =
  | { kind: "assistant"; text: string }
  | { kind: "user"; text: string }
  /** Figma's "Chat shell + Prod" (2825:53): the assistant's line heads the card and the product rows follow. */
  | { kind: "products"; intro?: string; products: Product[] };

const runners: Product[] = [
  { title: "Drift Daily Trainer", subtitle: "Max cushion · Neutral · Road", price: "$120", image: driftDaily },
  { title: "Tempo Glide 3", subtitle: "Plush foam · Lightweight · Road", price: "$140", image: tempoGlide },
  { title: "Aero Pace Trail", subtitle: "Cushioned · Grippy · Trail", price: "$155", image: aeroPaceTrail },
];

/** Each journey's conversation, keyed to the entry it starts from, in the homepage doc's words. */
export const journeys: { entry: string; turns: Turn[] }[] = [
  {
    entry: "running",
    turns: [
      { kind: "assistant", text: "Welcome to the club. Are we starting with a couple of jogs a week, or training for something?" },
      { kind: "user", text: "Just a few jogs. My knees aren’t what they used to be." },
      {
        kind: "products",
        intro: "Then comfort comes first. Here are three with plenty of cushioning, easy on the knees and easy on the budget.",
        products: runners,
      },
    ],
  },
  {
    entry: "backpack",
    turns: [
      { kind: "assistant", text: "It’s full-grain leather, so it gets better with age instead of wearing out. That’s most of what you’re paying for." },
      { kind: "user", text: "Does it fit a 15-inch laptop?" },
      {
        kind: "assistant",
        text: "Easily, and there’s a padded sleeve for it. Want me to compare it to the cheaper nylon one you previously viewed, so you can judge what the extra cost gets you?",
      },
    ],
  },
  {
    entry: "refund",
    turns: [
      { kind: "assistant", text: "You’re well within the return window. I can process a return or show you other sizes and colors." },
      { kind: "user", text: "Refund, please." },
      { kind: "assistant", text: "Done. I’ve sent you a return label. Your refund goes back to the original payment method once the jacket reaches us." },
    ],
  },
  {
    entry: "moisturizer",
    turns: [
      {
        kind: "products",
        intro: "Here are three options in your range. The Deep Hydration Cream at $42. Reviewers love that it is super moisturizing without feeling sticky.",
        products: [{ title: "Deep Hydration Cream", subtitle: "Dry skin · Non-sticky · 50ml", price: "$42", image: moisturizer }],
      },
      { kind: "user", text: "I’ll go with the Deep Hydration Cream." },
      {
        kind: "assistant",
        text: "For $13 more, the Deep Hydration Set adds a night mask and a travel-size cleanser. Our Winter Glow Special also launches this week with a free gift on orders over $50.",
      },
    ],
  },
  { entry: "add-to-cart", turns: [{ kind: "assistant", text: "Navy, M. Good pick. It’s in your cart." }] },
  {
    entry: "sweater",
    turns: [
      {
        kind: "assistant",
        text: "The Alpine Merino Crewneck at $85 fits the budget. There’s also the Alpine Merino Heavyweight at $98. It’s $13 more, but the knit is thicker and holds its shape longer.",
      },
      { kind: "user", text: "Any current offers?" },
      {
        kind: "assistant",
        text: "Yes. The Winter Knit Edit launches this week, with a free travel-size wool wash on orders over $95. It’s valid until November 30.",
      },
    ],
  },
  {
    entry: "cart",
    turns: [
      {
        kind: "assistant",
        text: "You left the grey sofa and the cushion set in your cart. It would go great with your previously purchased dining table. Anything I can clarify?",
      },
      { kind: "user", text: "Delivery time." },
      { kind: "assistant", text: "It’s in stock, ready to ship, and assembly is free. If you order today, it will be there next Wednesday." },
    ],
  },
  {
    entry: "sleep",
    turns: [
      { kind: "assistant", text: "Sure. Here are a few melatonin-free options. Want me to narrow them down by ingredients, format or price?" },
      { kind: "user", text: "Ingredients. And nothing too complicated." },
      {
        kind: "products",
        intro: "Then I’d start with these two. Here’s what’s in each and how they differ.",
        products: [
          { title: "Magnesium Glycinate", subtitle: "Relaxation & winding down · Capsules", price: "$24", image: magnesiumGlycinate },
          { title: "L-Theanine + Magnesium", subtitle: "Stress-related sleep support · Gummies", price: "$32", image: lTheanineMagnesium },
        ],
      },
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

const words = (turn: Turn) =>
  (turn.kind === "products" ? (turn.intro ?? "") : turn.text).split(/\s+/).filter(Boolean).length;
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
