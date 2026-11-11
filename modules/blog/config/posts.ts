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

// The journal's posts, newest first.
export const blogPosts: BlogPost[] = [
  {
    slug: "what-makes-an-e-commerce-brand-ai-discoverable",
    title: "What Makes an E-Commerce Brand AI-Discoverable?",
    category: "Commerce",
    details: [],
    date: "11 November 2026",
    summary:
      "AI recommends the products it can read and trust. Learn what makes an e-commerce brand AI-discoverable, from product data to presence beyond your site.",
    intro: [
      "Ask ChatGPT for “a fragrance-free moisturizer for dry, sensitive skin under $40.” You won’t get ten blue links. You’ll get a short list of products.",
      "If your brand isn’t on that list, the shopper never finds out you exist.",
      "That’s the new test for online stores. It’s no longer only about ranking on page one of Google. It’s whether an AI can find your products, understand them and trust what you say about them. That’s what it means to be AI-discoverable.",
    ],
    sections: [
      {
        id: "shoppers-are-already-asking",
        title: "Shoppers are already asking",
        paragraphs: [
          "McKinsey’s survey found that 50% of consumers now intentionally use AI-powered search tools to guide purchase decisions. Among people who use AI search, 44% say it’s their primary and preferred source of insight, ahead of traditional search at 31%.",
          "So the question is no longer whether shoppers use AI search. It’s whether your brand shows up when they do.",
        ],
      },
      {
        id: "make-your-product-data-easy-to-read",
        title: "1. Make your product data easy to read",
        paragraphs: [
          "Maya is shopping for a moisturizer. She asks ChatGPT for one that’s fragrance-free, good for dry skin and under $40.",
          "Brand A’s product page says, “Our glow-getter bestseller, loved by thousands.” Brand B’s page lists skin type, ingredients, fragrance-free status, size, price and whether it’s in stock.",
          "An AI can only recommend what it can read. Brand B gets named. Brand A doesn’t.",
          "This is why structured data, schema markup and complete product data matter. Titles, prices, availability, sizes and materials should be written as clear fields, not buried in a paragraph.",
        ],
      },
      {
        id: "describe-products-the-way-people-ask",
        title: "2. Describe products the way people ask",
        paragraphs: [
          "Shoppers don’t type “hydrating cream 1.7 oz.” They ask, “What’s good for dry skin in winter?”",
          "Your descriptions should answer that kind of question. Say who the product is for, what problem it solves and when to use it. Plain language beats clever copy. This is the heart of answer engine optimization (AEO): write answers an AI can lift straight into a response.",
        ],
      },
      {
        id: "keep-it-fresh-and-consistent",
        title: "3. Keep it fresh and consistent",
        paragraphs: [
          "Out-of-date prices and wrong stock status are fast ways to lose an AI’s trust. OpenAI’s product feed specification, for example, asks merchants to refresh structured product data as often as every 15 minutes. The same source also advises keeping your feed data in line with the structured markup on your site.",
          "If your site says $38, your feed says $42 and a retailer lists $35, the AI has no good way to know which is right.",
        ],
      },
      {
        id: "show-up-beyond-your-own-website",
        title: "4. Show up beyond your own website",
        paragraphs: [
          "This one surprises most brands. McKinsey found that a brand’s own site often makes up only 5 to 10 percent of the sources AI search references. The rest comes from reviews, forums, publishers and affiliate pages.",
          "That means being discoverable includes the reviews customers leave, the articles that mention you and the conversations happening on Reddit and YouTube. It’s also worth knowing where you stand. McKinsey reports that just 16% of brands systematically track their AI search performance.",
        ],
      },
      {
        id: "dont-lock-the-door",
        title: "5. Don’t lock the door",
        paragraphs: [
          "Some stores block AI crawlers by accident, through their robots.txt file or security settings. If an AI search crawler such as OpenAI’s OAI-SearchBot can’t reach your pages, it can’t recommend what’s on them. It’s a five-minute check with a big payoff.",
        ],
      },
      {
        id: "found-is-only-half-the-job",
        title: "Found is only half the job",
        paragraphs: [
          "Everything above gets your products found. The next test starts when the conversation does.",
          "A shopper asks a follow-up: “Is it okay for sensitive skin?” Now the AI has to answer, and it can go about it two ways. Without a direct connection to your store, it has to scrape your website and search through pages, hoping it lands on the right line. A fact inside an image, a spec on another tab or a size that just went out of stock can slip through, and the shopper gets a vague or wrong answer.",
          "The other way is to pull the answer straight from your store’s data. That’s the gap Crossword is built to close, and it works in two parts.",
          "We enrich your catalog. Product data is rarely as complete as it should be. Attributes are missing, naming is inconsistent and key details are buried in paragraphs. Crossword fills in and organizes that information so every product is described fully and in the same way.",
          "We connect the agent directly to your store. Instead of scraping and searching, the agent (or the LLM a shopper is using) pulls from your catalog. It gets the right information, completely, every time.",
          "The same agent then works on your site, in ChatGPT and in personal AI agents, speaking in your brand’s voice. Wherever a shopper asks, the answer is accurate, complete and sounds like you.",
        ],
      },
      {
        id: "frequently-asked-questions",
        title: "Frequently asked questions",
        paragraphs: [
          "What does AI-discoverable mean? It means AI assistants like ChatGPT can find your products, understand them and confidently recommend them when a shopper asks.",
          "Is this the same as SEO? Not exactly. SEO helps pages rank in search results. Generative engine optimization (GEO) and answer engine optimization (AEO) focus on being cited and recommended inside AI answers. Good SEO helps, but it’s not enough on its own.",
          "Where should a brand start? Ask ChatGPT for the kind of product you sell and see what comes back. Then check your product data, your descriptions and your robots.txt.",
        ],
      },
      {
        id: "the-question-to-ask",
        title: "The question to ask",
        paragraphs: [
          "Shoppers are asking AI for recommendations every day. The brands that get found will be the ones that made it easy to be understood. Crossword is your brand AI agent that can represent your brand, the way you envision.",
        ],
      },
    ],
  },
];

/** The post at `slug`, if there is one. */
export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
