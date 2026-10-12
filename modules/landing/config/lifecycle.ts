/** Motion visual shown in the panel while a feature is open (see components/motion). */
export type LifecycleVisual =
  | "gift-journey"
  | "dynamic-landing-page"
  | "sleep-search"
  | "service-resolution"
  | "retention-growth";

export type LifecycleFeature = {
  label: string;
  title: string;
  body: string;
  href: string;
  visual: LifecycleVisual;
};

export type LifecycleStage = {
  number: string;
  name: string;
  features: LifecycleFeature[];
};

// Sell's first feature mirrors the Webflow build; labels follow the motion visuals.
// TODO: final copy for the other features and real "Learn more" links.
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
        visual: "gift-journey",
      },
      {
        label: "Dynamic landing page",
        title: "Dynamic landing page title",
        body: "Placeholder copy for the Dynamic landing page feature. Replace it with the final story.",
        href: "#",
        visual: "dynamic-landing-page",
      },
      {
        label: "Search bar",
        title: "Search bar title",
        body: "Placeholder copy for the Search bar feature. Replace it with the final story.",
        href: "#",
        visual: "sleep-search",
      },
    ],
  },
  {
    number: "02",
    name: "Support",
    features: [
      {
        label: "Service & resolution",
        title: "Support feature title",
        body: "Placeholder copy for the Support stage. Replace it with the final story, and duplicate this block for each additional Support feature.",
        href: "#",
        visual: "service-resolution",
      },
    ],
  },
  {
    number: "03",
    name: "Retain",
    features: [
      {
        label: "Retention & growth",
        title: "Retain feature title",
        body: "Placeholder copy for the Retain stage. Replace it with the final story, and duplicate this block for each additional Retain feature.",
        href: "#",
        visual: "retention-growth",
      },
    ],
  },
];
