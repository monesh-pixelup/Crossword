import history from "../../assets/ill-icons/history.svg";
import add from "../../assets/ill-icons/add.svg";
import expand from "../../assets/ill-icons/expand.svg";
import close from "../../assets/ill-icons/close.svg";
import send from "../../assets/ill-icons/send.svg";
import favorite from "../../assets/ill-icons/favorite.svg";
import insight from "../../assets/ill-icons/insight.svg";
import caretDown from "../../assets/ill-icons/caret-down.svg";
import aiStatus from "../../assets/ill-icons/ai-status.svg";
import historyGold from "../../assets/ill-icons/history-gold.svg";
import addGold from "../../assets/ill-icons/add-gold.svg";
import expandGold from "../../assets/ill-icons/expand-gold.svg";
import closeGold from "../../assets/ill-icons/close-gold.svg";
import sendGold from "../../assets/ill-icons/send-gold.svg";
import addMuted from "../../assets/ill-icons/add-muted.svg";
import sparkle from "../../assets/ill-icons/sparkle.svg";
import lock from "../../assets/ill-icons/lock.svg";
import shieldCheck from "../../assets/ill-icons/shield-check.svg";
import checks from "../../assets/ill-icons/checks.svg";
import union from "../../assets/ill-icons/union.svg";
import sourceDot from "../../assets/ill-icons/source-dot.svg";
import money from "../../assets/ill-icons/money.svg";
import userSound from "../../assets/ill-icons/user-sound.svg";
import warning from "../../assets/ill-icons/warning.svg";
import caretRight from "../../assets/ill-icons/caret-right.svg";
import search from "../../assets/ill-icons/search.svg";
import address from "../../assets/ill-icons/address.svg";
import spark from "../../assets/ill-icons/spark.svg";
import usersThree from "../../assets/ill-icons/users-three.svg";
import shoppingCart from "../../assets/ill-icons/shopping-cart.svg";
import funnel from "../../assets/ill-icons/funnel.svg";
import bell from "../../assets/ill-icons/bell.svg";

// ILL/Primitive/Icon (node 1960:80) glyphs, downloaded as-is from Figma.
// Each glyph carries its own literal fill/stroke color baked in by the
// design system (e.g. History/Add/Expand/Close = Accent/Primary #7d0034,
// Send = Accent/Gold #ffb657, Insight = Accent/Secondary #462160,
// Favorite = a literal #5a2f73, Caret-Down = a literal #5c5c5c — none of
// these match named variables) — these are not recolored via currentColor,
// per the source file. AiStatus (node 2246:3389, from ILL/Module/Assistant/
// Status, node 2246:3411) is Accent/Secondary #462160 too.
//
// The `-gold`/`-muted` variants are the same glyphs re-exported from the
// Support V3 "Merchant insight" reference (node 2725:28975 and siblings),
// where History/Add/Expand/Close/Send resolve to Accent/Soft (#e0be60)
// instead of their usual Accent/Primary/Gold — confirmed by diffing the
// exported SVG fills against the defaults, not approximated. `addMuted`
// is the same Plus glyph at Text/Secondary (#606060) for the composer's
// "Upload file" affordance, which never appears at the header's gold
// weight. Scoped to that one scenario; every other call site keeps the
// default glyph.
//
// `sparkle`/`lock`/`shieldCheck` are from Support V3 "Guardrails" (node
// 2706:24532): sparkle is the panel title's glyph (literal Accent/Gold
// #ffb657, unlike every other icon here which carries no named-variable
// fill), lock is each rule row's trailing glyph (Accent/Primary #7d0034),
// shieldCheck is the "Policy Respected" chip's glyph (Text/Body #161719).
//
// `checks`/`union`/`sourceDot` are from ILL/Module/Assistant/Insight's own
// "Whisper to Crossword" variant (node 2742:33561, same file): checks is
// the footer's "Guidance received." status glyph (literal #000, double
// checkmark), union is that footer's trailing seal/stamp glyph (literal
// Accent/Secondary #462160, same color as `insight`), sourceDot is the
// small separator between the header's two text runs ("Private" ·
// "Whisper to Crossword") — a tiny filled circle (literal #4d4b46), not
// the "·" character the rest of the kit's own "Private · X" phrases use,
// since this node renders it as its own layer.
//
// `money`/`userSound`/`warning`/`caretRight` are from Guardrails' own
// updated rule-row design (node 2743:33835): each rule's own leading
// glyph (literal Accent/Secondary #462160, same color as `insight`) and
// the trailing disclosure glyph shared by all three rows (literal
// #b7ae9a, a muted gold-brown — not a named variable match), replacing
// the row's old shared "lock" trailing glyph.
//
// `usersThree`/`shoppingCart`/`funnel`/`bell` are the Insights landing
// suggestion chips' glyphs (node 2133:6768).
const glyphs = {
  history,
  add,
  expand,
  close,
  send,
  favorite,
  insight,
  caretDown,
  aiStatus,
  historyGold,
  addGold,
  expandGold,
  closeGold,
  sendGold,
  addMuted,
  sparkle,
  lock,
  shieldCheck,
  checks,
  union,
  sourceDot,
  money,
  userSound,
  warning,
  caretRight,
  search,
  address,
  spark,
  usersThree,
  shoppingCart,
  funnel,
  bell,
} as const;

export type IconName = keyof typeof glyphs;

const naturalSize: Record<IconName, { width: number; height: number }> = {
  history: { width: 13.5696, height: 13.5696 },
  add: { width: 13.5696, height: 13.5696 },
  expand: { width: 13.5696, height: 13.5696 },
  close: { width: 13.5696, height: 13.5696 },
  send: { width: 20, height: 20 },
  favorite: { width: 10, height: 10 },
  insight: { width: 16.4468, height: 16.1409 },
  caretDown: { width: 12.1689, height: 12.1689 },
  aiStatus: { width: 10.0015, height: 10.0015 },
  historyGold: { width: 14, height: 14 },
  addGold: { width: 14, height: 14 },
  expandGold: { width: 14, height: 14 },
  closeGold: { width: 14, height: 14 },
  sendGold: { width: 20, height: 20 },
  addMuted: { width: 18, height: 18 },
  sparkle: { width: 22.6887, height: 22.6887 },
  lock: { width: 19.8527, height: 19.8527 },
  shieldCheck: { width: 12, height: 12 },
  checks: { width: 13.7578, height: 13.7578 },
  union: { width: 24, height: 16.7451 },
  sourceDot: { width: 4.4406, height: 4.4406 },
  money: { width: 24, height: 24 },
  userSound: { width: 24, height: 24 },
  warning: { width: 24, height: 24 },
  caretRight: { width: 24, height: 24 },
  search: { width: 10, height: 10 },
  address: { width: 10, height: 11 },
  spark: { width: 9.64762, height: 9.64762 },
  usersThree: { width: 16, height: 16 },
  shoppingCart: { width: 16, height: 16 },
  funnel: { width: 16, height: 16 },
  bell: { width: 16, height: 16 },
};

export function Icon({ name, size }: { name: IconName; size?: number }) {
  const { width, height } = naturalSize[name];
  const scale = size ? size / width : 1;
  return (
    <img
      src={glyphs[name].src}
      alt=""
      aria-hidden="true"
      width={width * scale}
      height={height * scale}
      style={{ display: "block" }}
    />
  );
}
