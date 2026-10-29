/** A dropdown entry; `description` is the Geist 12 line under its title in the Platform menu. */
export type NavLink = { label: string; href: string; description?: string };

/** A Platform menu entry: a Crimson title (with its arrow) over a Geist 12 line. */
export type PlatformLink = NavLink & { description: string };

/** A Platform menu channel: as a PlatformLink, with its "Examples" chips and its line's Figma width. */
export type PlatformChannel = PlatformLink & { examples: "assistants" | "agents"; descriptionWidth: number };

export type NavItem = {
  label: string;
  href: string;
  /** Renders a caret; with `children` it opens a dropdown of those pages. */
  hasMenu?: boolean;
  /** Opens the full-width Platform menu (`platformMenu`) on desktop instead of the list dropdown. */
  mega?: boolean;
  children?: NavLink[];
};

// TODO: point these at real routes as the pages get built.
/** Figma "Platform menu · v2" (3572:53): the Website column, the AI channels and the Insight card. */
export const platformMenu = {
  website: { title: "Website", description: "Your brand’s agent, on your storefront." },
  sell: {
    label: "Sell",
    links: [
      { label: "Conversational shopping", href: "/sell", description: "Help shoppers find the right products." },
      { label: "Dynamic landing pages", href: "/dynamic-landing-pages", description: "Match each visit to a relevant experience." },
    ],
  },
  /** The Website column's products after Sell. */
  more: [
    { label: "Customer support", href: "/support", description: "Resolve questions and hand off with context." },
    { label: "Retention", href: "/retain", description: "Bring customers back with timely outreach." },
  ],
  channels: [
    {
      label: "AI Assistants",
      href: "/ai-assistants",
      description: "Connect your brand to the assistants shoppers already use.",
      descriptionWidth: 237.539,
      examples: "assistants",
    },
    {
      label: "Personal Agents",
      href: "/personal-agents",
      description: "Connect with agents that help customers shop and manage tasks.",
      descriptionWidth: 213.086,
      examples: "agents",
    },
  ],
  feature: { href: "#insights", alt: "Insight: Turning Interest into Action.", cta: "Read more" },
} satisfies {
  website: { title: string; description: string };
  sell: { label: string; links: PlatformLink[] };
  more: PlatformLink[];
  channels: PlatformChannel[];
  feature: { href: string; alt: string; cta: string };
};

// TODO: point these at real routes as the pages get built, and fill out Resources once Figma lists its pages.
export const primaryNav: NavItem[] = [
  {
    label: "Platform",
    href: "/sell",
    hasMenu: true,
    mega: true,
    children: [...platformMenu.sell.links, ...platformMenu.more, ...platformMenu.channels],
  },
  { label: "Managed Launch", href: "/managed-launch" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "#blog", hasMenu: true, children: [{ label: "Blog", href: "#blog" }] },
];

export const ctaLinks = {
  signUp: "#sign-up",
  bookDemo: "#book-a-demo",
  learnMore: "#learn-more",
} as const;

export type FooterLink = {
  label: string;
  /** Omitted for group labels (e.g. "Sell"). */
  href?: string;
  /** Rendered at the faded label colour, as in Figma. */
  muted?: boolean;
};

// TODO: point these at real routes as the pages get built.
export const footerCompanyLinks: FooterLink[] = [
  { label: "Managed Launch", href: "/managed-launch" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "#blog" },
  { label: "Book a Demo", href: ctaLinks.bookDemo },
  { label: "Privacy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
];

/** Platform links in two groups; Figma fades only the "Sell" label. */
export const footerPlatformGroups: FooterLink[][] = [
  [
    { label: "Sell", muted: true },
    { label: "Conversational Interface", href: "/sell" },
    { label: "Dynamic Landing Pages", href: "/dynamic-landing-pages" },
    { label: "Search Bar", href: "#search-bar" },
  ],
  [
    { label: "Retain", href: "/retain" },
    { label: "Support", href: "/support" },
    { label: "Insights", href: "#insights" },
  ],
];
