import type { Icon } from "@phosphor-icons/react";
import { ListNumbersIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react/ssr";

/** Retention channels, as Figma's node diagram: the two ways Crossword reaches out, each with its maroon icon badge glyph. */
export const retentionChannels: { /** Its Phosphor glyph (phosphoricons.com). */ icon: Icon; title: string; body: string }[] = [
  {
    icon: ListNumbersIcon,
    title: "Channel sequencing",
    body: "Decides the right order to reach out, for instance iMessage first, then email, then SMS - instead of all at once.",
  },
  { icon: PaperPlaneTiltIcon, title: "WhatsApp / SMS / Email Outbound", body: "Delivered wherever they’re most likely to see it." },
];
