export type NavItem = {
  label: string;
  href: string;
  /** Renders a caret; the dropdown menu is wired up once it's designed. */
  hasMenu?: boolean;
};

// TODO: point these at real routes as the pages get built.
export const primaryNav: NavItem[] = [
  { label: "Sell", href: "/sell", hasMenu: true },
  { label: "Support", href: "#support", hasMenu: true },
  { label: "Retain", href: "#retain", hasMenu: true },
  { label: "Managed Launch", href: "#managed-launch" },
  { label: "Insights", href: "#insights", hasMenu: true },
  { label: "Pricing", href: "#pricing" },
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
  { label: "Managed Launch", href: "#managed-launch" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
  { label: "Book a Demo", href: ctaLinks.bookDemo },
  { label: "Privacy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
];

/** Platform links in two groups; Figma fades only the "Sell" label. */
export const footerPlatformGroups: FooterLink[][] = [
  [
    { label: "Sell", muted: true },
    { label: "Conversational Interface", href: "#conversational-interface" },
    { label: "Dynamic Landing Pages", href: "#dynamic-landing-page" },
    { label: "Search Bar", href: "#search-bar" },
  ],
  [
    { label: "Retain" },
    { label: "Support", href: "#support" },
    { label: "Insights", href: "#insights" },
  ],
];
