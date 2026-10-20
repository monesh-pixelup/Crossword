import type { StaticImageData } from "next/image";
import espressoMachine from "../../assets/motion/01-brewhaus-pro-espresso-machine.png";
import accessoryBundle from "../../assets/motion/02-brewhaus-coffee-accessory-bundle.png";
import leatherFrameCase from "../../assets/motion/03-marais-leather-frame-case.png";
import silkScarf from "../../assets/motion/04-marais-gold-tone-silk-scarf.png";
import smartSpeaker from "../../assets/motion/05-waveline-compact-smart-speaker.png";
import wirelessEarbuds from "../../assets/motion/06-aura-wireless-earbuds.png";
import leatherWallet from "../../assets/motion/07-holt-and-co-leather-bifold-wallet.png";
import auden from "../../assets/motion/08-auden-wave-pro-black.png";
import audenIvory from "../../assets/motion/09-auden-viewed-headphones-ivory.png";
import audenOlive from "../../assets/motion/10-auden-viewed-headphones-olive.png";
import audenMustard from "../../assets/motion/11-auden-viewed-headphones-mustard-gold.png";
import familyAirFryer from "../../assets/motion/12-family-air-fryer.png";
import compactAirFryer from "../../assets/motion/13-compact-air-fryer.png";
import referenceLamp from "../../assets/motion/14-shopper-reference-triple-dome-lamp.png";
import tripodLamp from "../../assets/motion/15-warm-tripod-table-lamp.png";
import domeLamp from "../../assets/motion/16-mod-dome-table-lamp.png";
import bedsideLamp from "../../assets/motion/17-copper-rim-bedside-lamp.png";
import foundation from "../../assets/motion/18-lumen-second-skin-foundation.png";
import cottonShirt from "../../assets/motion/19-marais-relaxed-cotton-shirt.png";
import tailoredTrousers from "../../assets/motion/20-straight-leg-tailored-trousers.png";
import leatherSneakers from "../../assets/motion/21-minimal-leather-sneakers.png";

/*
 * The shared product cutouts (800 × 800 transparent PNGs, served as-is).
 * <Media> letterboxes these on the subtle background instead of cropping.
 */
export const productImages = {
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
} satisfies Record<string, StaticImageData>;

export const productCutouts: ReadonlySet<StaticImageData> = new Set(Object.values(productImages));
