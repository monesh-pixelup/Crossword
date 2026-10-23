import type { StaticImageData } from "next/image";
import outboundIcon from "../assets/channels/outbound-icon.svg";
import sequencingIcon from "../assets/channels/sequencing-icon.svg";

/** Retention channels, as Figma's node diagram: the two ways Crossword reaches out, each with its wine icon tile. */
export const retentionChannels: { icon: StaticImageData; title: string; body: string }[] = [
  {
    icon: sequencingIcon,
    title: "Channel sequencing",
    body: "Decides the right order to reach out, for instance iMessage first, then email, then SMS - instead of all at once.",
  },
  { icon: outboundIcon, title: "WhatsApp / SMS / Email Outbound", body: "Delivered wherever they’re most likely to see it." },
];
