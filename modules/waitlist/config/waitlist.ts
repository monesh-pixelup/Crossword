/** Copy for the waitlist page (/waitlist) and where its signups go. */
export const waitlist = {
  eyebrow: "Early-stage program",
  intro:
    "If you’re an early-stage ecommerce brand doing under $1M in annual online revenue, join the waitlist for free access to Crossword. We’ll be in touch.",
  fields: {
    name: { label: "Name", placeholder: "Jane Smith" },
    email: { label: "Work email", placeholder: "jane@yourstore.com" },
    storeUrl: { label: "Store URL", placeholder: "yourstore.com" },
  },
  submit: "JOIN THE WAITLIST",
  sending: "SENDING…",
  thanks: {
    title: "You’re on the list.",
    body: "Thanks for signing up. We’ll email you when there’s a spot for your store.",
  },
  error: "Something went wrong and your details weren’t sent. Please try again, or email anant@crossword.ai.",
};

/** Who gets each signup, and the address it comes from (a sender on a domain set up in Cloudflare Email Service). */
export const waitlistEmail = {
  to: "anant@crossword.ai",
  from: { email: "waitlist@crossword.ai", name: "Crossword waitlist" },
};
