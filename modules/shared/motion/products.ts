import type { StaticImageData } from "next/image";
import espressoMachine from "@/modules/shared/assets/motion/products/cutouts/01-brewhaus-pro-espresso-machine.png";
import accessoryBundle from "@/modules/shared/assets/motion/products/cutouts/02-brewhaus-coffee-accessory-bundle.png";
import leatherFrameCase from "@/modules/shared/assets/motion/sell/03-marais-leather-frame-case.png";
import silkScarf from "@/modules/shared/assets/motion/products/cutouts/04-marais-gold-tone-silk-scarf.png";
import smartSpeaker from "@/modules/shared/assets/motion/products/cutouts/05-waveline-compact-smart-speaker.png";
import wirelessEarbuds from "@/modules/shared/assets/motion/products/cutouts/06-aura-wireless-earbuds.png";
import leatherWallet from "@/modules/shared/assets/motion/products/cutouts/07-holt-and-co-leather-bifold-wallet.png";
import auden from "@/modules/shared/assets/motion/products/cutouts/08-auden-wave-pro-black.png";
import audenIvory from "@/modules/shared/assets/motion/products/cutouts/09-auden-viewed-headphones-ivory.png";
import audenOlive from "@/modules/shared/assets/motion/products/cutouts/10-auden-viewed-headphones-olive.png";
import audenMustard from "@/modules/shared/assets/motion/products/cutouts/11-auden-viewed-headphones-mustard-gold.png";
import familyAirFryer from "@/modules/shared/assets/motion/products/cutouts/12-family-air-fryer.png";
import compactAirFryer from "@/modules/shared/assets/motion/products/cutouts/13-compact-air-fryer.png";
import referenceLamp from "@/modules/shared/assets/motion/products/cutouts/14-shopper-reference-triple-dome-lamp.png";
import tripodLamp from "@/modules/shared/assets/motion/products/cutouts/15-warm-tripod-table-lamp.png";
import domeLamp from "@/modules/shared/assets/motion/products/cutouts/16-mod-dome-table-lamp.png";
import bedsideLamp from "@/modules/shared/assets/motion/products/cutouts/17-copper-rim-bedside-lamp.png";
import foundation from "@/modules/shared/assets/motion/sell/18-lumen-second-skin-foundation.png";
import cottonShirt from "@/modules/shared/assets/motion/products/cutouts/19-marais-relaxed-cotton-shirt.png";
import tailoredTrousers from "@/modules/shared/assets/motion/products/cutouts/20-straight-leg-tailored-trousers.png";
import leatherSneakers from "@/modules/shared/assets/motion/products/cutouts/21-minimal-leather-sneakers.png";
import aeriaCycloneProVacuum from "@/modules/shared/assets/motion/products/cutouts/22-aeria-cyclone-pro-vacuum.png";
import dysonV15Vacuum from "@/modules/shared/assets/motion/sell/23-dyson-v15-vacuum.png";

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
  aeriaCycloneProVacuum,
  dysonV15Vacuum,
} satisfies Record<string, StaticImageData>;

export const productCutouts: ReadonlySet<StaticImageData> = new Set(Object.values(productImages));
