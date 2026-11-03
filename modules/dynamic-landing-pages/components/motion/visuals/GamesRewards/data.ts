import weekenderLandscapeImage from "@/modules/dynamic-landing-pages/assets/motion/scenarios/trailwell-campaign/weekender-split-hero.png";
import { catalog } from "../../brands/catalog";
import * as adDefaults from "../AdJourney/data";
// The source's public/assets file (served at `${import.meta.env.BASE_URL}assets/…`), as a static import.
import trailwellAdCreativeImage from "@/modules/dynamic-landing-pages/assets/motion/public/trailwell-ad-creative-v2.png";

const weekenderLandscape = weekenderLandscapeImage.src;

export type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export const brand = "Trailwell";

// Filler (not in the brief): the ad and landing-page copy, adapted from
// the SuperMush reference. Same Trailwell ad and storefront as Ad journey.
export const ad = {
  handle: "trailwell",
  headline: "Jump. Save.",
  cta: "Play now",
  caption: "Clear 4 hurdles in our mini game to unlock $5 off your next order.",
  tags: "#trailwell #playtosave",
};

export const hero = {
  eyebrow: "Unlock $5 off",
  headline: "Clear 4 hurdles, earn $5 off.",
  sub: "A quick game, then back to the backpacks.",
};

export const invite = "Want $5 off your next order? Clear 4 hurdles to unlock it.";
export const playAction = "Play game";
// Three suggestions as in the reference: two shopping questions (Ad
// journey's Trailwell prompts) and the game.
export const prompts = [
  { id: "laptop", text: "Laptop-friendly?" },
  { id: "carryon", text: "Carry-on size?" },
  { id: "play", text: playAction },
];

// Game scene layouts, in the Figma scene's 425.5x132 space (node
// 3200:3683). 03 waits at the start (Figma's positions); 04 has scrolled
// one hurdle on and is mid-jump over the third, the second behind it.
export const gameScenes = {
  start: { scroll: 0, runnerX: 45.96, lift: 0, hurdles: [165.48, 275.08, 367.96] },
  progress: { scroll: -110, runnerX: 166.3, lift: 44, hurdles: [55.48, 165.48, 275.08, 367.96] },
};
export const hurdles = 4;

export const reward = "You earned $5 off.";

export const product = {
  id: catalog.trailwellWeekender.id,
  title: catalog.trailwellWeekender.title,
  subtitle: "30L · Opens flat",
  image: catalog.trailwellWeekender.image,
  originalPrice: catalog.trailwellWeekender.price,
  price: "$143",
  applied: "$5 game reward applied",
};

// v2 opener (KnockBar): the knock's short line and its two doors.
export const knockLine = "Clear 4 hurdles to unlock $5 off your next order.";
export const knockDoors = [{ label: "Ask me anything" }, { label: playAction, primary: true }];

export const composer = "Ask Trailwell anything…";

export const steps = [
  { id: "00.1", label: "Instagram ad" },
  { id: "00.2", label: "Landing page" },
  { id: "01", label: "Game invitation" },
  { id: "02.1", label: "Transition: game mode activation" },
  { id: "02.2", label: "Transition: symbol expansion" },
  { id: "02.3", label: "Transition: wipe complete" },
  { id: "03.0", label: "Game loading" },
  { id: "03", label: "Game start" },
  { id: "04", label: "Game progress" },
  { id: "05", label: "Reward unlocked" },
];

export const journey = {
  ...adDefaults,
  brand,
  domain: "trailwell.com/backpacks",
  ad,
  page: hero,
  knockLine,
  campaignProducts: [catalog.trailwellWeekender, catalog.trailwellRoam, catalog.trailwellOvernight],
  heroCreative: {
    image: weekenderLandscape,
    alt: "Clear 4 hurdles. Earn $5 off. Play a quick game. Find your next backpack. Trailwell Weekender in a mountain landscape.",
  },
  campaignCreative: {
    image: trailwellAdCreativeImage.src,
    alt: "Trailwell backpacks in cobalt, burnt orange and mustard",
    headline: ad.headline,
    detail: "Clear 4 hurdles. Unlock $5 off.",
  },
};
