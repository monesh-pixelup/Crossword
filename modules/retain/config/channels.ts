/**
 * Channel sequencing, from the doc's example ("iMessage first, then email, then SMS, instead of all
 * at once"). The step notes are mock copy. TODO: confirm them with the Crossword team.
 */
export const sequence = [
  { channel: "iMessage", tag: "First", body: "Starts where the conversation is most personal." },
  { channel: "Email", tag: "If it hasn’t landed", body: "Follows up with the detail, only if the first message went unread." },
  { channel: "SMS", tag: "Last", body: "A short final nudge, then Crossword stops." },
];

/** WhatsApp / SMS / Email outbound: the channels named in the doc. */
export const outboundChannels = ["WhatsApp", "SMS", "Email", "iMessage"];
