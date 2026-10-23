export type UpsellFeature = {
  /** The motion scene the panel plays while this feature is open (by slug). */
  scene: "upsell-upgrade" | "cross-sell" | "bundle-building" | "browse-upsell";
  /** The icon tile's glyph: Figma's 16.36px line icon, as path data on its 22.5px tile. */
  icon: string;
  title: string;
  description: string;
};

/** Upsell & cross-sell, as Figma's tabbed panel (node 2914:36238): each feature's glyph, copy and scene. */
export const upsellFeatures: UpsellFeature[] = [
  {
    scene: "upsell-upgrade",
    icon: "M4.79459 5.88621V17.8862H18.7946M7.79459 13.8862L11.7946 9.88621L14.7946 11.8862L18.7946 6.88621M18.7946 10.8862V6.88621H14.7946",
    title: "Upselling to increase AOV",
    description: "Suggests the better version, when it fits the customer’s needs.",
  },
  {
    scene: "cross-sell",
    icon: "M6.79459 8.38621V6.88621C6.79459 5.88621 7.29459 5.38621 8.29459 5.38621C9.29459 5.38621 9.79459 5.88621 9.79459 6.88621V8.38621M15.7946 5.38621V9.38621M13.7946 7.38621H17.7946M5.29459 8.38621H11.2946V18.3862H5.29459V8.38621ZM13.2946 12.3862H18.2946V18.3862H13.2946V12.3862Z",
    title: "Cross-sell / complete-the-look",
    description: "Adds what naturally goes with what they picked as well as their previous orders.",
  },
  {
    scene: "bundle-building",
    icon: "M4.79459 8.38621V15.3862L11.7946 18.8862L18.7946 15.3862V8.38621L11.7946 4.88621L4.79459 8.38621ZM18.7946 8.38621L11.7946 11.8862M11.7946 18.8862V11.8862M4.79459 8.38621L11.7946 11.8862M8.29459 6.63621L15.2946 10.1362",
    title: "Bundle building",
    description: "Groups products into a bundle worth buying together.",
  },
  {
    scene: "browse-upsell",
    icon: "M4.79459 8.88621H18.7946M6.79459 6.88621H7.79459M9.79459 6.88621H10.7946M11.7946 16.8862V10.8862M14.2946 13.3862L11.7946 10.8862L9.29459 13.3862M5.79459 4.88621H17.7946C18.4613 4.88621 18.7946 5.21954 18.7946 5.88621V17.8862C18.7946 18.5529 18.4613 18.8862 17.7946 18.8862H5.79459C5.12792 18.8862 4.79459 18.5529 4.79459 17.8862V5.88621C4.79459 5.21954 5.12792 4.88621 5.79459 4.88621Z",
    title: "Browse upselling",
    description: "Notices what they're looking at and nudges accordingly.",
  },
];
