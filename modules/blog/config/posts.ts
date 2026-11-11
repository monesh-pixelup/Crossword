/** The journal's industry filters, in Figma's order (after "All", see JournalIndex). */
export const blogCategories = [
  "Logistics",
  "Fintech",
  "Healthcare",
  "Commerce",
  "Industrial",
  "Insurance",
  "Software",
  "Staffing",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

/** One titled part of a post: its anchor (for the Index), its heading and its paragraphs. */
export type BlogSection = { id: string; title: string; paragraphs: string[] };

export type BlogPost = {
  /** The post's URL segment, under /blog. */
  slug: string;
  title: string;
  category: BlogCategory;
  /** The line of details under the title (Geist Mono caps), after the category. */
  details: string[];
  /** Publication date, shown on the post as written. */
  date: string;
  /** One line for search results and link previews. */
  summary: string;
  /** The paragraphs before the first section (the Index's "Introduction"). */
  intro: string[];
  sections: BlogSection[];
};

/**
 * The sample article every placeholder post carries until the real posts are written: the intro, then its sections in
 * the order the Index lists them.
 */
const sampleIntro = [
  "Most teams judge their AI assistant by a dashboard: conversations handled, deflection rate, revenue attributed. Those numbers tell you that something happened. They don't tell you whether the assistant did the right thing, for the right shopper, at the right moment.",
  "The answer is in the transcript. Every conversation Crossword has is kept in full, with the decision behind each reply alongside it, and the outcome that followed is logged against that same conversation. So when a number moves, you can read exactly why.",
];

const sampleSections: BlogSection[] = [
  {
    id: "every-answer-leaves-a-record",
    title: "Every answer leaves a record",
    paragraphs: [
      "A shopper asks whether a jacket runs small. The assistant checks the size chart, the reviews that mention fit and the shopper's past orders, then recommends a size. All of that is in the transcript: what was asked, what was looked up, and what was said back.",
      "Nothing is summarised away. If a reply was cautious, you can see the policy it was following. If it suggested a second product, you can see which signal made it think that would help.",
    ],
  },
  {
    id: "reading-the-transcript",
    title: "Reading the transcript, not the dashboard",
    paragraphs: [
      "Dashboards average things out. A 4% lift in conversion can hide an assistant that is excellent on one category and quietly unhelpful on another. Reading a handful of transcripts from each segment shows you the difference in minutes.",
      "That is why the transcript is the first thing your team sees when they open a conversation, with the metrics around it rather than in place of it.",
    ],
  },
  {
    id: "where-judgement-shows-up",
    title: "Where judgement shows up",
    paragraphs: [
      "The interesting moments are the ones where the assistant had a choice: offer a discount or hold the price, answer directly or hand over to a person, suggest an upgrade or leave the basket alone. Those decisions are marked in the transcript, with the reason given at the time.",
      "When a decision looks wrong, you can correct the rule behind it, and the next conversation that meets the same situation follows the new rule.",
    ],
  },
  {
    id: "logging-the-outcome",
    title: "Logging the outcome against it",
    paragraphs: [
      "A conversation doesn't end when the chat window closes. The order that followed, the return that didn't happen and the ticket that never needed opening are all tied back to the conversation that led to them.",
      "So attribution isn't a model's guess. It's a line from a specific reply to a specific result, which you can open and read.",
    ],
  },
  {
    id: "what-changes-for-the-team",
    title: "What changes for the team",
    paragraphs: [
      "Merchandisers stop asking whether the assistant is working and start asking where it could do better. Support leads review the handovers that mattered instead of sampling at random. And the people who set the rules can see their rules being applied, conversation by conversation.",
    ],
  },
  {
    id: "conclusion",
    title: "Conclusion",
    paragraphs: [
      "An assistant you can't read is an assistant you can't improve. Keep the judgement in the transcript and the outcome logged against it, and every conversation becomes something you can learn from.",
    ],
  },
];

const placeholderTitle = "The judgement is in the transcript, and the outcome is logged against it.";

// The journal's posts. Placeholders from Figma (1660:935) until the real posts are written: every card shares the
// "Turning Interest into Action." cover, this title and the sample article, each at its own address.
export const blogPosts: BlogPost[] = Array.from({ length: 6 }, (_, i) => ({
  slug: i === 0 ? "judgement-in-the-transcript" : `judgement-in-the-transcript-${i + 1}`,
  title: placeholderTitle,
  category: "Logistics" as const,
  details: ["Series C", "180 people", "Northeast"],
  date: "26 April 2026",
  summary: "Why the transcript, not the dashboard, is where you find out whether your AI assistant made the right call.",
  intro: sampleIntro,
  sections: sampleSections,
}));

/** The post at `slug`, if there is one. */
export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
