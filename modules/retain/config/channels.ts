/** Retention channels, as Figma's node diagram: the two ways Crossword reaches out. */
export const retentionChannels: { title: string; body: string }[] = [
  {
    title: "Channel sequencing",
    body: "Decides the right order to reach out, for instance iMessage first, then email, then SMS - instead of all at once.",
  },
  { title: "WhatsApp / SMS / Email Outbound", body: "Delivered wherever they’re most likely to see it." },
];
