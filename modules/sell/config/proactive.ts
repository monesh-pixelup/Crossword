/** Shopper behaviours that trigger a proactive message, as Figma's four tabs. */
export const proactiveTriggers: string[] = [
  "Shopper has been on the same product page for 90 seconds without adding to cart",
  "Shopper has viewed three similar laptops in the same category",
  "Shopper has viewed three similar foundations",
  "Shopper has viewed a product, then returned to it twice",
];

/** The motion scene each trigger plays on the stage (by slug); the laptops trigger has none yet. */
export const proactiveTriggerScenes: (string | null)[] = [
  "proactive-intervention",
  null,
  "comparison-guidance",
  "return-visit-comparison",
];
