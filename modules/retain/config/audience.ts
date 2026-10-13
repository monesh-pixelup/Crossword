/**
 * Turn customer patterns into your audience (content doc): the brand describes a segment in plain
 * language and Crossword builds it from past conversations. The criteria chips restate the
 * prompt; the shopper count is mock-up detail.
 */
export const audience = {
  prompt:
    "Find shoppers who told us what they wanted, but we didn’t have a suitable product then and whose requests match this week’s new arrivals. Exclude anyone who has since bought a suitable alternative from us.",
  criteria: [
    { label: "Asked for something we didn’t have", kind: "include" },
    { label: "Request matches this week’s arrivals", kind: "include" },
    { label: "Bought a suitable alternative since", kind: "exclude" },
  ] as const,
  count: "214 shoppers",
  reply: "Here’s your audience. Should I send them all a personalized message with a relevant launch product link?",
  confirm: "Yes!",
};
