import espressoMachineImage from "@/modules/personal-agents/assets/motion/products/cutouts/01-brewhaus-pro-espresso-machine.png";
import accessoryBundleImage from "@/modules/personal-agents/assets/motion/products/cutouts/02-brewhaus-coffee-accessory-bundle.png";
import leatherFrameCaseImage from "@/modules/personal-agents/assets/motion/products/cutouts/marais-eyewear-case.png";
import silkScarfImage from "@/modules/personal-agents/assets/motion/products/cutouts/04-marais-gold-tone-silk-scarf.png";
import smartSpeakerImage from "@/modules/personal-agents/assets/motion/products/cutouts/05-waveline-compact-smart-speaker.png";
import wirelessEarbudsImage from "@/modules/personal-agents/assets/motion/products/cutouts/06-aura-wireless-earbuds.png";
import leatherWalletImage from "@/modules/personal-agents/assets/motion/products/cutouts/07-holt-and-co-leather-bifold-wallet.png";
import audenImage from "@/modules/personal-agents/assets/motion/products/cutouts/08-auden-wave-pro-black.png";
import audenIvoryImage from "@/modules/personal-agents/assets/motion/products/cutouts/09-auden-viewed-headphones-ivory.png";
import audenOliveImage from "@/modules/personal-agents/assets/motion/products/cutouts/10-auden-viewed-headphones-olive.png";
import audenMustardImage from "@/modules/personal-agents/assets/motion/products/cutouts/11-auden-viewed-headphones-mustard-gold.png";
import familyAirFryerImage from "@/modules/personal-agents/assets/motion/products/cutouts/12-family-air-fryer.png";
import compactAirFryerImage from "@/modules/personal-agents/assets/motion/products/cutouts/13-compact-air-fryer.png";
import referenceLampImage from "@/modules/personal-agents/assets/motion/products/cutouts/14-shopper-reference-triple-dome-lamp.png";
import tripodLampImage from "@/modules/personal-agents/assets/motion/products/cutouts/15-warm-tripod-table-lamp.png";
import domeLampImage from "@/modules/personal-agents/assets/motion/products/cutouts/16-mod-dome-table-lamp.png";
import bedsideLampImage from "@/modules/personal-agents/assets/motion/products/cutouts/17-copper-rim-bedside-lamp.png";
import foundationImage from "@/modules/personal-agents/assets/motion/products/cutouts/lumen-second-skin-dewy.png";
import cottonShirtImage from "@/modules/personal-agents/assets/motion/products/cutouts/19-marais-relaxed-cotton-shirt.png";
import tailoredTrousersImage from "@/modules/personal-agents/assets/motion/products/cutouts/20-straight-leg-tailored-trousers.png";
import leatherSneakersImage from "@/modules/personal-agents/assets/motion/products/cutouts/21-minimal-leather-sneakers.png";
import aeriaCycloneProVacuumImage from "@/modules/personal-agents/assets/motion/products/cutouts/22-aeria-cyclone-pro-vacuum.png";
import aeriaCycloneMaxVacuumImage from "@/modules/personal-agents/assets/motion/scenarios/product-comparison/aeria-cyclone-max.png";
import oliveCottonShirtImage from "@/modules/personal-agents/assets/motion/products/cutouts/marais-shirt-olive.png";
import blackLeatherSneakersImage from "@/modules/personal-agents/assets/motion/products/cutouts/stride-sneakers-black.png";
import skinVeilFoundationImage from "@/modules/personal-agents/assets/motion/products/cutouts/lumen-skin-veil.png";
import trueMatchFoundationImage from "@/modules/personal-agents/assets/motion/products/cutouts/lumen-true-match.png";
import leatherCardholderImage from "@/modules/personal-agents/assets/motion/products/cutouts/holt-cardholder.png";

const espressoMachine = espressoMachineImage.src;
const accessoryBundle = accessoryBundleImage.src;
const leatherFrameCase = leatherFrameCaseImage.src;
const silkScarf = silkScarfImage.src;
const smartSpeaker = smartSpeakerImage.src;
const wirelessEarbuds = wirelessEarbudsImage.src;
const leatherWallet = leatherWalletImage.src;
const auden = audenImage.src;
const audenIvory = audenIvoryImage.src;
const audenOlive = audenOliveImage.src;
const audenMustard = audenMustardImage.src;
const familyAirFryer = familyAirFryerImage.src;
const compactAirFryer = compactAirFryerImage.src;
const referenceLamp = referenceLampImage.src;
const tripodLamp = tripodLampImage.src;
const domeLamp = domeLampImage.src;
const bedsideLamp = bedsideLampImage.src;
const foundation = foundationImage.src;
const cottonShirt = cottonShirtImage.src;
const tailoredTrousers = tailoredTrousersImage.src;
const leatherSneakers = leatherSneakersImage.src;
const aeriaCycloneProVacuum = aeriaCycloneProVacuumImage.src;
const aeriaCycloneMaxVacuum = aeriaCycloneMaxVacuumImage.src;
const oliveCottonShirt = oliveCottonShirtImage.src;
const blackLeatherSneakers = blackLeatherSneakersImage.src;
const skinVeilFoundation = skinVeilFoundationImage.src;
const trueMatchFoundation = trueMatchFoundationImage.src;
const leatherCardholder = leatherCardholderImage.src;

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
  aeriaCycloneMaxVacuum,
  oliveCottonShirt,
  blackLeatherSneakers,
  skinVeilFoundation,
  trueMatchFoundation,
  leatherCardholder,
};

export const cutoutSrcs: ReadonlySet<string> = new Set(Object.values(cutouts));
