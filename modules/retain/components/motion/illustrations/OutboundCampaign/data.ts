import tempoGlideImage from "../../../../assets/motion/scenarios/outbound/tempo-glide.jpg";
import aeroPaceTrailImage from "../../../../assets/motion/scenarios/outbound/aero-pace-trail.jpg";
import driftDailyImage from "../../../../assets/motion/scenarios/outbound/drift-daily.jpg";

const tempoGlide = tempoGlideImage.src;
const aeroPaceTrail = aeroPaceTrailImage.src;
const driftDaily = driftDailyImage.src;

// Running shoe product shots generated for this scenario (fictional
// models, no branding), on Messages' own light grey so they sit flush
// in the rich-link media strip.
export const brand = "STRIDE";

export const script = {
  assistantMessage: "Looking for a new pair of running shoes? We've got some new arrivals you might like.",
};

export const campaign = { title: "New arrivals: Running", domain: "3 styles · stride.com" };

export const arrivals = [
  { id: "tempo", title: "Tempo Glide 3", price: "$140", image: tempoGlide },
  { id: "aero", title: "Aero Pace Trail", price: "$155", image: aeroPaceTrail },
  { id: "drift", title: "Drift Daily Trainer", price: "$120", image: driftDaily },
];
