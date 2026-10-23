// The product photos live in public/images/landing/sell-dynamic (as lossless WebP).
const asset = (name: string) => `/images/landing/sell-dynamic/${name}.webp`;

export const sellDynamicProducts = {
  weekender: asset("trailwell-weekender"),
  roam: asset("trailwell-roam"),
  overnight: asset("trailwell-overnight"),
  sleep60: asset("goodwell-sleep-60"),
  sleep28: asset("goodwell-sleep-28"),
  energy: asset("goodwell-energy"),
  focus: asset("goodwell-focus"),
  calm: asset("goodwell-calm"),
  immunity: asset("goodwell-immunity"),
  cream: asset("sorelle-hydration-cream"),
  lotion: asset("sorelle-barrier-lotion"),
  gel: asset("sorelle-cloud-gel"),
  set: asset("sorelle-hydration-set"),
  crewneck: asset("northwick-merino-crewneck"),
  heavyweight: asset("northwick-merino-heavyweight"),
  aeroPaceTrail: asset("stride-aero-pace-trail"),
  tempoGlide: asset("stride-tempo-glide"),
};
