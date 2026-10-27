/** Motion visual shown in the panel while a feature is open (see components/motion). */
export type LifecycleVisual =
  | "gift-journey"
  | "ad-journey"
  | "ai-search"
  | "service-resolution"
  | "retention-growth"
  | "ai-assistants"
  | "personal-agents";

export type LifecycleFeature = {
  label: string;
  title: string;
  body: string;
  href: string;
  /** Omit while a feature has no visual yet: its panel shows the empty frame. */
  visual?: LifecycleVisual;
};

export type LifecycleStage = {
  number: string;
  name: string;
  features: LifecycleFeature[];
};

// Labels follow the motion visuals.
// TODO: real "Learn more" links.
export const lifecycleStages: LifecycleStage[] = [
  {
    number: "01",
    name: "Sell",
    features: [
      {
        label: "Conversational interface",
        title: "Where interest becomes intent",
        body: "Crossword turns a need into a confident purchase. Crossword asks the right questions, narrows down the choices, makes recommendations and helps them take the next step.",
        href: "#",
        visual: "gift-journey",
      },
      {
        label: "Dynamic landing page",
        title: "Where every visit finds its direction",
        body: "Crossword connects the context of the ad, campaign or message that brought someone in with what they see next, making the landing experience more relevant from the very first click.",
        href: "#",
        visual: "ad-journey",
      },
      {
        label: "Search bar",
        title: "Where searches become discoveries",
        body: "Crossword turns the search bar into a conversation, helping customers describe what they want in their own words and get relevant products, answers and recommendations in return.",
        href: "#",
        visual: "ai-search",
      },
    ],
  },
  {
    number: "02",
    name: "Support",
    features: [
      {
        label: "Service & resolution",
        title: "Where doubts get answered",
        body: "The conversation doesn’t stop once the order is placed. Crossword remembers the context, answers questions, checks order details and handles routine requests without making customers start over. When something needs a human, it brings one in.",
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
        title: "Where customers become regulars",
        body: "A good conversation shouldn’t be a one-time interaction. Crossword remembers what customers have bought, what they’ve asked for and what they’re interested in, so the next conversation can start from somewhere more useful. That means more relevant recommendations, smarter follow-ups and more reasons to come back.",
        href: "#",
        visual: "retention-growth",
      },
    ],
  },
  {
    number: "04",
    name: "AI Assistants",
    features: [
      {
        label: "AI assistants",
        title: "Where you control the experience inside ChatGPT",
        body: "Your website has banners, collections and bundles. A shopper inside ChatGPT sees none of them. Crossword allows you to control the experience so ChatGPT includes full catalog knowledge, knows your priorities, and stays on brand.",
        href: "#",
        visual: "ai-assistants",
      },
    ],
  },
  {
    number: "05",
    name: "Personal Agents",
    features: [
      {
        label: "Personal agents",
        title: "Where a shopper’s personal agent is fully informed",
        body: "When a shopper’s agent does the browsing, it takes its own path through your store missing offers, exploring partial catalog details, and potentially leaving without the best product. Crossword speaks to that agent directly so it sees your intended journey and you control the offering.",
        href: "#",
        visual: "personal-agents",
      },
    ],
  },
];
