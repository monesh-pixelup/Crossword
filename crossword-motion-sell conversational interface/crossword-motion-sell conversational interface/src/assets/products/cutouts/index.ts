import espressoMachine from "./01-brewhaus-pro-espresso-machine.png";
import accessoryBundle from "./02-brewhaus-coffee-accessory-bundle.png";
import leatherFrameCase from "./03-marais-leather-frame-case.png";
import silkScarf from "./04-marais-gold-tone-silk-scarf.png";
import smartSpeaker from "./05-waveline-compact-smart-speaker.png";
import wirelessEarbuds from "./06-aura-wireless-earbuds.png";
import leatherWallet from "./07-holt-and-co-leather-bifold-wallet.png";
import auden from "./08-auden-wave-pro-black.png";
import audenIvory from "./09-auden-viewed-headphones-ivory.png";
import audenOlive from "./10-auden-viewed-headphones-olive.png";
import audenMustard from "./11-auden-viewed-headphones-mustard-gold.png";
import familyAirFryer from "./12-family-air-fryer.png";
import compactAirFryer from "./13-compact-air-fryer.png";
import referenceLamp from "./14-shopper-reference-triple-dome-lamp.png";
import tripodLamp from "./15-warm-tripod-table-lamp.png";
import domeLamp from "./16-mod-dome-table-lamp.png";
import bedsideLamp from "./17-copper-rim-bedside-lamp.png";
import foundation from "./18-lumen-second-skin-foundation.png";
import cottonShirt from "./19-marais-relaxed-cotton-shirt.png";
import tailoredTrousers from "./20-straight-leg-tailored-trousers.png";
import leatherSneakers from "./21-minimal-leather-sneakers.png";
import aeriaCycloneProVacuum from "./22-aeria-cyclone-pro-vacuum.png";
import dysonV15Vacuum from "./23-dyson-v15-vacuum.png";

// Transparent, square product cutouts (soft shadow baked in). Media keys
// off this set to letterbox them instead of cropping with object-fit: cover.
export const cutouts = {
  espressoMachine,
  accessoryBundle,
  leatherFrameCase,
  silkScarf,
  smartSpeaker,
  wirelessEarbuds,
  leatherWallet,
  auden,
  audenIvory,
  audenOlive,
  audenMustard,
  familyAirFryer,
  compactAirFryer,
  referenceLamp,
  tripodLamp,
  domeLamp,
  bedsideLamp,
  foundation,
  cottonShirt,
  tailoredTrousers,
  leatherSneakers,
  aeriaCycloneProVacuum,
  dysonV15Vacuum,
};

export const cutoutSrcs: ReadonlySet<string> = new Set(Object.values(cutouts));
