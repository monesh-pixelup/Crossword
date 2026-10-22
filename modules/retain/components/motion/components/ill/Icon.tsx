import historyImage from "../../../../assets/motion/ill-icons/history.svg";
import addImage from "../../../../assets/motion/ill-icons/add.svg";
import expandImage from "../../../../assets/motion/ill-icons/expand.svg";
import closeImage from "../../../../assets/motion/ill-icons/close.svg";
import sendImage from "../../../../assets/motion/ill-icons/send.svg";
import favoriteImage from "../../../../assets/motion/ill-icons/favorite.svg";
import insightImage from "../../../../assets/motion/ill-icons/insight.svg";
import caretDownImage from "../../../../assets/motion/ill-icons/caret-down.svg";
import aiStatusImage from "../../../../assets/motion/ill-icons/ai-status.svg";
import historyGoldImage from "../../../../assets/motion/ill-icons/history-gold.svg";
import addGoldImage from "../../../../assets/motion/ill-icons/add-gold.svg";
import expandGoldImage from "../../../../assets/motion/ill-icons/expand-gold.svg";
import closeGoldImage from "../../../../assets/motion/ill-icons/close-gold.svg";
import sendGoldImage from "../../../../assets/motion/ill-icons/send-gold.svg";
import addMutedImage from "../../../../assets/motion/ill-icons/add-muted.svg";
import sparkleImage from "../../../../assets/motion/ill-icons/sparkle.svg";
import lockImage from "../../../../assets/motion/ill-icons/lock.svg";
import shieldCheckImage from "../../../../assets/motion/ill-icons/shield-check.svg";
import checksImage from "../../../../assets/motion/ill-icons/checks.svg";
import unionImage from "../../../../assets/motion/ill-icons/union.svg";
import sourceDotImage from "../../../../assets/motion/ill-icons/source-dot.svg";
import moneyImage from "../../../../assets/motion/ill-icons/money.svg";
import userSoundImage from "../../../../assets/motion/ill-icons/user-sound.svg";
import warningImage from "../../../../assets/motion/ill-icons/warning.svg";
import caretRightImage from "../../../../assets/motion/ill-icons/caret-right.svg";
import searchImage from "../../../../assets/motion/ill-icons/search.svg";
import addressImage from "../../../../assets/motion/ill-icons/address.svg";
import sparkImage from "../../../../assets/motion/ill-icons/spark.svg";
import usersThreeImage from "../../../../assets/motion/ill-icons/users-three.svg";
import shoppingCartImage from "../../../../assets/motion/ill-icons/shopping-cart.svg";
import funnelImage from "../../../../assets/motion/ill-icons/funnel.svg";
import bellImage from "../../../../assets/motion/ill-icons/bell.svg";

const history = historyImage.src;
const add = addImage.src;
const expand = expandImage.src;
const close = closeImage.src;
const send = sendImage.src;
const favorite = favoriteImage.src;
const insight = insightImage.src;
const caretDown = caretDownImage.src;
const aiStatus = aiStatusImage.src;
const historyGold = historyGoldImage.src;
const addGold = addGoldImage.src;
const expandGold = expandGoldImage.src;
const closeGold = closeGoldImage.src;
const sendGold = sendGoldImage.src;
const addMuted = addMutedImage.src;
const sparkle = sparkleImage.src;
const lock = lockImage.src;
const shieldCheck = shieldCheckImage.src;
const checks = checksImage.src;
const union = unionImage.src;
const sourceDot = sourceDotImage.src;
const money = moneyImage.src;
const userSound = userSoundImage.src;
const warning = warningImage.src;
const caretRight = caretRightImage.src;
const search = searchImage.src;
const address = addressImage.src;
const spark = sparkImage.src;
const usersThree = usersThreeImage.src;
const shoppingCart = shoppingCartImage.src;
const funnel = funnelImage.src;
const bell = bellImage.src;

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
      src={glyphs[name]}
      alt=""
      aria-hidden="true"
      width={width * scale}
      height={height * scale}
      style={{ display: "block" }}
    />
  );
}
