import { catalog } from "../brands/catalog";
// The source's public/assets files (served at `${import.meta.env.BASE_URL}assets/<name>.png`), as static imports.
import crewneckImage from "@/modules/dynamic-landing-pages/assets/motion/public/northwick-merino-crewneck.png";
import heavyweightImage from "@/modules/dynamic-landing-pages/assets/motion/public/northwick-merino-heavyweight.png";
import aeroPaceTrailImage from "@/modules/dynamic-landing-pages/assets/motion/public/stride-aero-pace-trail.png";
import tempoGlideImage from "@/modules/dynamic-landing-pages/assets/motion/public/stride-tempo-glide.png";

export const sellDynamicProducts = {
  weekender: catalog.trailwellWeekender.image,
  roam: catalog.trailwellRoam.image,
  overnight: catalog.trailwellOvernight.image,
  sleep60: catalog.goodwellSleep60.image,
  sleep28: catalog.goodwellSleep28.image,
  energy: catalog.goodwellEnergy.image,
  focus: catalog.goodwellFocus.image,
  calm: catalog.goodwellCalm.image,
  immunity: catalog.goodwellImmunity.image,
  moonrestSleep: catalog.moonrestSleep.image,
  cream: catalog.sorelleCream.image,
  lotion: catalog.sorelleLotion.image,
  gel: catalog.sorelleGel.image,
  set: catalog.sorelleSet.image,
  crewneck: crewneckImage.src,
  heavyweight: heavyweightImage.src,
  aeroPaceTrail: aeroPaceTrailImage.src,
  tempoGlide: tempoGlideImage.src,
};
