/** Shopper behaviours that trigger a proactive message, as Figma's tabs (the laptops one is dropped until it has a scene). */
export const proactiveTriggers: string[] = [
  "Shopper has been on the same product page for 90 seconds without adding to cart",
  "Shopper has viewed three similar items",
  "Shopper has viewed a product, then returned to it twice",
];

/** The motion scene each trigger plays on the stage (by slug). */
export const proactiveTriggerScenes: (string | null)[] = [
  "proactive-intervention",
  "comparison-guidance",
  "return-visit-comparison",
];
