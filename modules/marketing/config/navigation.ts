/** A dropdown entry; `description` is the Geist 12 line under its title in the Platform menu. */
export type NavLink = { label: string; href: string; description?: string };

/** A Platform menu entry; `icons` sets the row of assistant / agent marks beside its title. */
export type PlatformLink = NavLink & { description: string; icons?: "assistants" | "agents" };

/** A Platform menu column, with its small caps label when it has one (e.g. "Sell"). */
export type PlatformColumn = { label?: string; links: PlatformLink[] };

export type NavItem = {
  label: string;
  href: string;
  /** Renders a caret; with `children` it opens a dropdown of those pages. */
  hasMenu?: boolean;
  /** Opens the full-width Platform menu (`platformColumns`) on desktop instead of the list dropdown. */
  mega?: boolean;
  children?: NavLink[];
};

// TODO: point these at real routes as the pages get built.
/** Figma "Navbar": the Platform menu's three columns of products. */
export const platformColumns: PlatformColumn[] = [
  {
    label: "Sell",
    links: [
      { label: "Conversational Interface", href: "/sell", description: "Turns a shopper’s need into a confident purchase." },
      { label: "Dynamic Landing Pages", href: "/dynamic-landing-pages", description: "Carries your ad’s message onto the page it lands on." },
    ],
  },
  {
    links: [
      { label: "Support", href: "/support", description: "Answers routine questions instantly, hands off the rest." },
      { label: "Retain", href: "/retain", description: "Remembers every customer, so the next visit starts warm." },
    ],
  },
  {
    links: [
      { label: "AI Assistants", href: "#ai-assistants", description: "Puts your catalog and offers into AI assistant answers.", icons: "assistants" },
      { label: "Personal Agents", href: "#personal-agents", description: "Gives shoppers’ AI agents your full catalog and offers.", icons: "agents" },
    ],
  },
];

/** The Platform menu's "New" card. */
export const platformFeature = { label: "New", href: "#insights", alt: "Insight: Turning Interest into Action." };

// TODO: point these at real routes as the pages get built.
export const primaryNav: NavItem[] = [
  { label: "Platform", href: "/sell", hasMenu: true, mega: true, children: platformColumns.flatMap((column) => column.links) },
  { label: "AI Assistants", href: "#ai-assistants" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Company",
    href: "#about-us",
    hasMenu: true,
    children: [
      { label: "About Us", href: "#about-us" },
      { label: "Blog", href: "#blog" },
      { label: "Trust & Security", href: "#trust-security" },
    ],
  },
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
