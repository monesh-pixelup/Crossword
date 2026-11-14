import type { OutboundMessage } from "./messages";

export type Campaign = { title: string; description: string; message: OutboundMessage };

/**
 * Campaigns & outbound (content doc). The doc’s comments are still deciding whether to keep these
 * five examples alongside the audience builder. TODO: confirm with the Crossword team.
 *
 * Each `message.text` is read out in place of the campaign's motion visual (campaign-tabs.tsx), so it is the message
 * that visual shows (the 15 November 2026 handoff's: coffee, lamps, luggage, sleep gummies, earbuds).
 */
export const campaigns: Campaign[] = [
  {
    title: "Outbound campaigns",
    description: "Broadcasts a message across the channel your customer is most active on.",
    message: {
      when: "iMessage · Their most active channel",
      text: "Looking to make more coffee at home? We’ve got a few brewing essentials you might like.",
      attachment: { name: "New arrivals: running", meta: "12 new styles" },
    },
  },
  {
    title: "Segmented & triggered campaigns",
    description: "Sends a targeted message to the relevant group, automatically.",
    message: {
      when: "iMessage · Skincare browsers",
      text: "Based on the lighting you’ve been looking at, I’ve shortlisted three table lamps for your space.",
      attachment: { name: "Your shortlist", meta: "3 picks for your routine" },
    },
  },
  {
    title: "Post-purchase follow-up",
    description: "Checks in after delivery, not just to sell again.",
    message: {
      when: "iMessage · After delivery",
      text: "How is your new Weekender working out? If you’d like, I can show you a few travel pieces that work well with it.",
    },
  },
  {
    title: "Win-back campaigns",
    description: "Brings back the customers who’ve gone quiet.",
    message: {
      when: "iMessage · After a quiet spell",
      text: "It’s been a while since your last order. Daily Sleep Gummies are now available in a 60-count jar if you’d like a longer supply.",
      attachment: { name: "The new version", meta: "Of one you used to buy" },
    },
  },
  {
    title: "Review & feedback solicitation",
    description: "Asks for a review when the experience is still fresh.",
    message: {
      when: "iMessage · Once it’s been used",
      text: "How did everything work out with your new earbuds? If you have a minute, we’d love to hear what you think.",
    },
  },
];
