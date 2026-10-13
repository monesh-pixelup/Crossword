/** A dropdown entry; `description` is the Geist 14 line under its title (brand guidelines 11.5). */
export type NavLink = { label: string; href: string; description?: string };

export type NavItem = {
  label: string;
  href: string;
  /** Renders a caret; with `children` it opens a dropdown of those pages. */
  hasMenu?: boolean;
  children?: NavLink[];
};

// TODO: point these at real routes as the pages get built.
export const primaryNav: NavItem[] = [
  {
    label: "Sell",
    href: "/sell",
    hasMenu: true,
    children: [
      { label: "Conversational Interface", href: "/sell", description: "Guides every shopper to the right product" },
      { label: "Dynamic Landing Pages", href: "/dynamic-landing-pages", description: "Pages built around the ad and the shopper" },
      { label: "Search Bar", href: "#search-bar", description: "Answers, right in your search" },
    ],
  },
  { label: "Support", href: "/support", hasMenu: true },
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
    { label: "Conversational Interface", href: "/sell" },
    { label: "Dynamic Landing Pages", href: "/dynamic-landing-pages" },
    { label: "Search Bar", href: "#search-bar" },
  ],
  [
    { label: "Retain" },
    { label: "Support", href: "/support" },
    { label: "Insights", href: "#insights" },
  ],
];
