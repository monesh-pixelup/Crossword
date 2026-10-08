export type LifecycleFeature = {
  label: string;
  title: string;
  body: string;
  href: string;
};

export type LifecycleStage = {
  number: string;
  name: string;
  features: LifecycleFeature[];
};

// Copy mirrors the Webflow build. TODO: final Support/Retain copy and real "Learn more" links.
export const lifecycleStages: LifecycleStage[] = [
  {
    number: "01",
    name: "Sell",
    features: [
      {
        label: "Conversational interface",
        title: "Where interest becomes intent",
        body: "Crossword turns a need into a confident purchase. A customer might start with a simple request, a product question, or just a search for inspiration.",
        href: "#",
      },
    ],
  },
  {
    number: "02",
    name: "Support",
    features: [
      {
        label: "Feature tag",
        title: "Support feature title",
        body: "Placeholder copy for the Support stage. Replace it with the final story, and duplicate this block for each additional Support feature.",
        href: "#",
      },
    ],
  },
  {
    number: "03",
    name: "Retain",
    features: [
      {
        label: "Feature tag",
        title: "Retain feature title",
        body: "Placeholder copy for the Retain stage. Replace it with the final story, and duplicate this block for each additional Retain feature.",
        href: "#",
      },
    ],
  },
];
