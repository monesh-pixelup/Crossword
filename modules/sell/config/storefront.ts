export type StorefrontCard = {
  /** The motion visual the card plays (by slug, see motion-v2/scenes.ts). */
  scene: "brand-adaptability" | "place-it-wherever" | "complete-channel-deployment";
  title: string;
  description: string;
  /** Figma's description box width, where it wraps narrower than the card. */
  descriptionWidth?: number;
};

export const storefrontCards: StorefrontCard[] = [
  { scene: "brand-adaptability", title: "Your branded widget", description: "Styled to match your brand." },
  {
    scene: "place-it-wherever",
    title: "Place it where it works best",
    description: "Place Crossword wherever it makes the most sense.",
  },
  {
    scene: "complete-channel-deployment",
    title: "Complete channel deployment",
    description:
      "Web widget, email, SMS, iMessage, WhatsApp, Instagram, Facebook, TikTok and everywhere else your customers already are.",
    descriptionWidth: 337.203,
  },
];
