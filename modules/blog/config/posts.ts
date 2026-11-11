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

/** One titled part of a post: its anchor (for the Index), its heading, its paragraphs and, optionally, a table after them. */
export type BlogSection = {
  id: string;
  title: string;
  paragraphs: string[];
  /** A table under the paragraphs: `head` is the header row (its first cell over the row labels), each row starts with its label. */
  table?: { head: string[]; rows: string[][] };
};

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
    slug: "the-help-me-choose-problem",
    title: "The “Help Me Choose” Problem",
    category: "Commerce",
    details: [],
    date: "11 November 2026",
    summary:
      "Online stores are good at helping shoppers find products and weak at helping them choose. See how conversational AI closes the gap between shortlist and cart.",
    intro: [
      "There is a moment in online shopping that most e-commerce websites are not very good at handling. The customer has found what they were looking for. Maybe they searched for running shoes, a laptop, a sofa, or a jacket. They used the filters, looked through the results, opened a few product pages, and narrowed the list down.",
      "Now they have three or four options that all seem reasonable.",
      "And they are still not sure what to buy.",
      "At this point, another filter doesn’t really help. Neither does another page of product specifications. They are not looking for more products. They are trying to work out which of the products in front of them makes the most sense.",
      "That is the part of shopping that e-commerce has largely left to the customer.",
      "Online shopping has spent twenty years getting better at narrowing a catalog. Search is faster, filters are deeper, product pages carry more detail and reviews are everywhere. A shopper can get from ten thousand products to a handful in minutes.",
      "But narrowing a catalog and making a decision are different jobs. Once a shopper is down to two or three solid options, another filter has nothing left to filter, and another spec table only adds more to compare. The shopper knows their own situation. What they can’t easily do is translate it into the right product. A desk’s “height range,” a mattress’s “firmness rating” and a lens’s “focal length” are all numbers the shopper has to interpret on their own.",
    ],
    sections: [
      {
        id: "more-choices-can-make-the-decision-worse",
        title: "More choices can make the decision worse",
        paragraphs: [
          "It’s tempting to assume that showing more relevant products always helps. The research says otherwise.",
          "A field experiment on an Alibaba retail platform sent follow-up recommendation messages to 1.6 million consumers, each message showing between one and four products.",
          "Showing two products led to more purchases than showing one. Showing three or four led to fewer purchases than showing two.",
          "The researchers found that as much as 64% of that drop came from shoppers not even starting to look at the recommendations.",
          "So a long list of “recommended for you” items can be a burden. Even a short list doesn’t say why one item beats the others, and that “why” is what the shopper is actually missing.",
        ],
      },
      {
        id: "what-a-useful-recommendation-sounds-like",
        title: "What a useful recommendation sounds like",
        paragraphs: [
          "Take two products, one with better materials and one with stronger reviews. A comparison table lays out every difference. It can’t tell the shopper which differences matter to them.",
          "Here is what Tom would want to hear:",
          "Tom: I’ve narrowed it to two standing desks. Which one should I get?",
          "Crossword: You mentioned you’re 6'3\" and short on space. The Ridge raises to 51 inches, so you’ll stand comfortably. The Loft stops at 46 and would leave you hunched. If you were under 5'10\", the Loft would do the job and save you the money.",
          "Tom didn’t need a ranking. He needed the trade-off explained in terms of his own situation. Preferences also shift during that process. A shopper who opens with “cheapest” and later says durability matters more doesn’t want the first statement forgotten. A good assistant keeps both in mind, and the shopper can change course without starting over.",
        ],
      },
      {
        id: "help-with-the-decision",
        title: "Help with the decision, but leave the decision to the shopper",
        paragraphs: [
          "None of this means handing the purchase to a machine, and shoppers are clear about that. A Gartner survey of 322 US consumers in January 2026 found that only 11% would let AI make a purchase decision, even in low-stakes categories like personal care and household supplies. Far more were open to AI narrowing their options: 31% for household supplies and 28% for electronics.",
          "A second Gartner survey of 846 consumers explains some of the caution. Among shoppers who used generative AI in a recent purchase, 54% had to double-check everything it told them, and 62% said the information wasted their time. If an assistant is going to explain trade-offs, its answers must come from the brand’s own product information, not from guesses.",
        ],
      },
      {
        id: "the-conversation-may-not-start-on-your-site",
        title: "The conversation may not start on your site",
        paragraphs: [
          "Tom could have narrowed his shortlist inside ChatGPT or with a personal AI agent before ever visiting a store. That’s where shoppers are heading. Adobe found that AI-referred traffic to US retail sites grew 393% year over year in Q1 2026, and those visitors converted 42% better in March.",
          "That raises a new question for brands. If the shortlist is built somewhere else, does the assistant building it understand your products correctly? Adobe scored the average retail product page at only 66% machine-readable, which means the assistant may be working from incomplete information. And when the shopper does arrive, will your site pick up where that conversation left off, or ask them to begin again at a search bar?",
        ],
      },
      {
        id: "where-crossword-fits",
        title: "Where Crossword fits",
        paragraphs: [
          "Crossword is built for this stage of shopping, when the shopper has a list and needs help choosing.",
          "It starts with the shopper’s own words. Say Tom asks for a desk that works for someone tall in a small apartment. Crossword turns that into the attributes that matter, like height range and footprint, using the brand’s own catalog. If something important is missing, it asks one focused follow-up question instead of presenting a wall of filters.",
          "Then it helps with the choice. It compares two products, says whether the pricier one is worth it for this shopper, and explains why in plain language.",
          "Crossword keeps track of what the shopper has said, both within a conversation and across visits. When Tom comes back for a monitor arm, it already knows he’s tall and short on space. Shoppers stay in control, because their preferences come only from what they chose to share, and they can change them just by saying so.",
          "Crossword doesn’t stop at the brand’s website. It acts as the AI agent for your brand, connecting ChatGPT, Gemini, Claude and shoppers’ personal agents directly to your store, with your catalog enriched so they get your product information accurately and completely. The shopper gets the same knowledgeable help wherever they happen to be asking.",
          "For the brand, every conversation shows what shoppers are trying to do, which trade-offs make them hesitate, and which questions the product pages never answered. It’s feedback that click data alone can’t give you.",
          "The goal isn’t to replace browsing or to turn every visit into a chat. It’s to help cover the step that online stores have long left to the shopper: choosing easily.",
        ],
      },
      {
        id: "what-brands-can-do-now",
        title: "What brands can do now",
        paragraphs: [
          "Start with three questions:",
          "1. Where do shoppers stall? Look at product pages with high views and low add-to-cart. Those are the places where shoppers are stuck choosing.",
          "2. Is your brand readable to the AI assistants shoppers already use? Complete attributes, live pricing and inventory, and content that answers real questions are what let an assistant represent you correctly.",
        ],
      },
      {
        id: "frequently-asked-questions",
        title: "Frequently asked questions",
        paragraphs: [
          "What is the “help me choose” problem in e-commerce? It’s the gap between finding products and deciding on one. Shoppers can narrow a catalog with search and filters, but most stores offer little help once the shortlist is down to a few similar options.",
          "Why can showing more recommendations hurt sales? In a field experiment with 1.6 million consumers, purchase likelihood first rose and then fell as more recommended products were shown. Much of the drop came from shoppers not engaging with the list at all.",
          "How is an AI shopping assistant different from a recommendation engine? A recommendation engine ranks products. An AI shopping assistant talks with the shopper, asks about their needs, compares options and explains why one fits them better.",
          "What is an AI agent for brands? Crossword represents a brand wherever shoppers ask questions: on its own site, in ChatGPT or through a shopper’s personal agent. It uses the brand’s own product data so the answers are accurate. Talk to the team today.",
        ],
      },
      {
        id: "the-question-to-ask",
        title: "The question to ask",
        paragraphs: [
          "Shoppers can already find your products. The question for any brand now is who helps them choose, and whether that help is based on what you actually sell.",
        ],
      },
    ],
  },
  {
    slug: "how-product-discovery-is-about-to-change",
    title: "How Product Discovery Is About to Change",
    category: "Commerce",
    details: [],
    date: "11 November 2026",
    summary:
      "AI-referred shoppers convert 42% better. See how product discovery is shifting from keywords to needs, and what brands must change to stay visible.",
    intro: [
      "Picture Dan, who is flying to Chicago in January. He doesn’t know what insulation rating he needs, or whether down beats synthetic when it’s wet out. He knows one thing: he doesn’t want to be cold, and he doesn’t want to look like a marshmallow.",
      "Now picture the store he lands on. A search bar. Twelve filters. A category called “Outerwear.”",
      "That mismatch is the story of online shopping right now. Shoppers have a situation, and stores still ask for a keyword.",
    ],
    sections: [
      {
        id: "twenty-years-of-thinking-like-the-catalog",
        title: "Twenty years of thinking like the catalog",
        paragraphs: [
          "For two decades, online discovery worked one way. You typed a keyword, got a list, and filtered your way down. SEO, category pages, site search and filters were all built around that habit. It worked because shoppers learned to think like the catalog.",
          "That habit is breaking, and the numbers are hard to ignore. Adobe Analytics found that AI-referred traffic to US retail sites grew 393% year over year in Q1 2026, on top of the 693% jump it recorded over the 2025 holiday season. Those visitors spent 48% longer on site, viewed 13% more pages and generated 37% more revenue per visit than other traffic. In March, they converted 42% better.",
          "Adobe also surveyed more than 5,000 US consumers. 39% had already used AI for online shopping, and 85% of those shoppers said it improved the experience.",
          "The traffic matters, but what sits behind it matters more. People aren’t only finding products in a new place. They’re describing what they want in a completely different way.",
        ],
      },
      {
        id: "needs-not-keywords",
        title: "Needs, not keywords",
        paragraphs: [
          "Someone typing “moisturizer for oily skin” gives a website one clue. Someone saying they have oily skin, live somewhere humid and want something light enough for every day has given the whole picture.",
          "The first fits a search box. The second is how people actually think, and until recently almost nothing on a brand’s website could do anything with it. Here’s how it plays out with Dan.",
          "Dan: I’m going to Chicago in January and I need a jacket. I get cold easily but I hate bulky.",
          "Crossword: Got it. Will you be outside a lot, or mostly commuting between buildings?",
          "Dan: Mostly walking around the city, a few hours at a time.",
          "Crossword: Then you want a slim down or synthetic-fill jacket with a wind-resistant shell. Here are three that stay warm without the bulk.",
          "Dan never opened a filter, and he never had to learn what “fill power” means.",
          "Comparison works the same way. Most stores put two products side by side and leave the hard part to the shopper. Nobody wants every difference between two pairs of headphones. They want to know which differences matter for how they’ll use them. Is the expensive pair worth it for me? What do I give up with the cheaper one? Those questions decide the purchase, and a spec table can’t answer them.",
        ],
      },
      {
        id: "what-breaks-first",
        title: "What breaks first",
        paragraphs: [
          "Keyword search breaks first. A keyword tells you what someone typed, not what they meant. Baymard’s research keeps finding that most e-commerce sites fall short of basic search expectations. A shopper who searches “trainers” on a site that only says “sneakers” can hit zero results, even though the product is right there. Usually they don’t try again. They leave, which helps explain why Baymard puts average cart abandonment at 70%.",
          "The second break happens off your site entirely. When a shopper researches inside ChatGPT, Gemini or a personal AI agent, the assistant does the browsing and comparing your website used to do. By the time they reach you, they’ve got a shortlist and their reasoning and you never saw any of it.",
          "The third is the one most brands miss. Adobe scored the average retail homepage at 75% machine-readable and the average product page at 66%. A site can look beautiful to a human and still be close to invisible to the systems now recommending products, which means they don’t find you or the accurate information. Personal agents need this information to make recommendations and hence it’s crucial for brands to pivot and provide these details.",
          "The stakes are climbing, too. McKinsey projects that agentic commerce, where AI agents research, compare and buy on a shopper’s behalf, could drive $1 trillion in US retail revenue by 2030. The big platforms are already building for it: the Agentic Commerce Protocol from Stripe and OpenAI, Google’s Universal Commerce Protocol and Universal Cart. Discovery, comparison and checkout are all moving closer to the assistant.",
        ],
      },
      {
        id: "what-crossword-does-about-it",
        title: "What Crossword does about it",
        paragraphs: [
          "Crossword is built for the gap between a shopper’s need and a brand’s catalog. It works in two places and the two are connected.",
          "On your site. A shopper describes their situation in their own words. Crossword uses the brand’s full catalog to narrow the choice, compares products honestly and explains why one fits better than another. The landing page adapts, and questions get answered on the product page.",
          "Off your site. Crossword acts as the AI agent for your brand. It enriches your catalog and connects ChatGPT, Gemini, Claude and shoppers’ personal agents directly to your store. So they pull your product data correctly and completely every time instead of scraping pages and guessing. The brand shows up accurately in the places where shoppers now start.",
          "Across visits. Crossword remembers what a shopper’s priorities, like comfort over price, travel use or a preferred style. The next conversation picks up where the last one left off. Nobody has to explain themselves twice.",
          "There’s another benefit for the brand that often gets overlooked. A click tells you what someone looked at. A conversation tells you why. Over time, that’s a far better picture of your customers than any dashboard.",
          "Browsing isn’t going away, and neither is search. People will always want to explore, and some will always know exactly what they want. But a growing share of shoppers know what they need without knowing what to search for. The brands that meet them there are the ones they come back to.",
        ],
      },
      {
        id: "frequently-asked-questions",
        title: "Frequently asked questions",
        paragraphs: [
          "What is conversational commerce? Conversational commerce is shopping through dialogue. The shopper explains what they need, the system asks follow-up questions, recommends products and answers questions along the way, on a brand’s site or inside an AI assistant.",
          "How is AI product discovery different from keyword search? Keyword search matches the words a shopper types against words in the catalog. AI product discovery works from the shopper’s intent: the occasion, the constraints and the trade-offs they care about.",
          "Why does AI-referred traffic convert better? Shoppers who’ve already talked through a decision tend to arrive with a shortlist and a reason. Adobe measured 42% higher conversion for AI-referred visits in March 2026. The research has largely happened by the time they reach the site.",
          "Does my brand need to be readable by AI? Yes. Assistants recommend what they can understand. Structured product data, complete attributes, and fresh pricing and inventory make a brand easier to find, interpret and recommend.",
          "What is an AI agent for brands? It’s software that represents a brand wherever shoppers ask questions, on its own site, in ChatGPT or through a shopper’s personal agent, using the brand’s own product data. Crossword is built for exactly that. Talk to the team today.",
          "Shoppers are already describing their problems to AI. The practical question is who answers on your behalf, and how well they know your products.",
        ],
      },
    ],
  },
  {
    slug: "acp-ucp-and-mcp-explained-for-brand-marketers",
    title: "ACP, UCP and MCP Explained for Brand Marketers",
    category: "Commerce",
    details: [],
    date: "11 November 2026",
    summary:
      "ACP, UCP and MCP are the three acronyms shaping how AI agents shop. A plain-English guide for brand marketers, plus what to do about them now.",
    intro: [
      "Three acronyms keep showing up in e-commerce meetings: ACP, UCP and MCP. If you’ve nodded along without being sure which is which, this is for you.",
      "Here’s the short version.",
      "ACP (Agentic Commerce Protocol): a standard from OpenAI and Stripe for how AI agents and stores exchange product feeds and handle checkout.",
      "UCP (Universal Commerce Protocol): a Google-led standard that covers the whole shopping trip, from discovery to buying to support after the sale.",
      "MCP (Model Context Protocol): a general standard that lets AI agents connect to outside tools and data. It isn’t built for shopping specifically.",
      "Picture an AI agent walking into your store. ACP is the checkout paperwork. UCP is the rulebook for the whole visit. MCP is the phone line that lets the agent talk to your systems at all.",
    ],
    sections: [
      {
        id: "why-these-exist",
        title: "Why these exist",
        paragraphs: [
          "Without shared standards, every AI platform would need its own separate integration with every retailer. That keeps agentic commerce fragmented. Protocols fix that by giving agents and stores a common language. They matter to marketers because they decide how your products reach an AI shopper, and what that shopper can do once it finds them.",
        ],
      },
      {
        id: "acp",
        title: "ACP: the one that got a reality check",
        paragraphs: [
          "OpenAI and Stripe launched ACP on September 29, 2025, alongside Instant Checkout in ChatGPT. Stripe describes it as open source and Apache 2.0 licensed. It covers three things: how merchants publish products, how agents place orders and how payments are handled.",
          "The checkout part didn’t last. In March 2026, OpenAI said the first version of Instant Checkout didn’t offer the flexibility it wanted, so merchants now use their own checkout while ChatGPT focuses on product discovery. Walmart reported that purchases completed inside ChatGPT converted at about a third of the rate of shoppers who clicked through to its own site.",
          "So what’s left of ACP? ACP is still used to share product feeds, and retailers such as Target, Sephora and Best Buy supply their products to ChatGPT this way. For marketers, the lesson is useful. The product feed is the part that kept mattering.",
        ],
      },
      {
        id: "ucp",
        title: "UCP: Google’s full-journey standard",
        paragraphs: [
          "Google announced UCP at the National Retail Federation show in January 2026, co-developed with Shopify. More than 20 retailers and platforms were expected to use it, and it lets Shopify merchants sell directly in Google’s AI Mode and the Gemini app. It covers the full journey: discovery, buying and post-purchase support.",
          "UCP is also built to work alongside other standards. It can run over REST, MCP, Agent Payments Protocol (AP2) and Agent2Agent (A2A). That’s a hint of where things are heading. The standards will overlap more than they compete.",
        ],
      },
      {
        id: "mcp",
        title: "MCP: the connector",
        paragraphs: [
          "Anthropic introduced MCP in November 2024 as a universal, open standard for connecting AI applications to external systems. In December 2025, Anthropic donated MCP to the Agentic AI Foundation, a Linux Foundation fund co-founded by Anthropic, Block and OpenAI.",
          "MCP isn’t a commerce protocol. It connects AI agents to data sources, tools and systems in general. In shopping, that matters because it gives an agent a direct line into a store’s catalog instead of making it read web pages and guess.",
        ],
      },
      {
        id: "side-by-side",
        title: "Side by side",
        paragraphs: [],
        table: {
          head: ["", "ACP", "UCP", "MCP"],
          rows: [
            ["Led by", "OpenAI and Stripe", "Google and Shopify", "Anthropic, now under the Linux Foundation"],
            ["Covers", "Product feeds, checkout, payments", "Discovery, buying, post-purchase", "Connecting agents to tools and data"],
            ["Commerce-specific", "Yes", "Yes", "No"],
            ["Marketer takeaway", "Feed quality still matters", "Plan for Google’s AI surfaces", "Direct access beats scraping"],
          ],
        },
      },
      {
        id: "what-this-means-for-brand-marketers",
        title: "What this means for brand marketers",
        paragraphs: [
          "You don’t need to become a protocol expert. You need to be present wherever shoppers are asking with product data an agent can trust. That’s the part Crossword handles.",
          "Be on more than one surface. No single integration covers everything, so betting on one assistant or one standard is a risk. Crossword puts your brand agent inside ChatGPT, Claude, Perplexity and others from one setup, so a new protocol winning doesn’t mean a new project for you.",
          "Get your product data agent-ready. Every protocol runs on complete, accurate and current product data. Missing attributes, stale prices and wrong stock counts hurt you under any standard. Stripe’s message to merchants is that parts of commerce that used to be user-experience problems are now protocol problems. Crossword works from your catalog, so the data agents see is the data you maintain.",
          "Show up before the channel matures. McKinsey estimates that by 2030, US B2C retail could see up to $1 trillion in orchestrated revenue from agentic commerce. That’s a projection, not a certainty, but brands that are already present when it grows will have the head start.",
        ],
      },
      {
        id: "with-crossword-you-can-do-it-all",
        title: "With Crossword you can do it all",
        paragraphs: [
          "Protocols will keep changing. What doesn’t change is what an agent needs from your brand: complete, correct product information and a direct way to get it.",
          "Crossword handles both for you. We enrich your catalog so every product is described fully and consistently. Then we connect the agent, or the LLM a shopper is using, directly to your store. It pulls the right information, completely, every time, instead of scraping pages and searching for it. The result is an AI agent that represents your brand accurately on your site, in ChatGPT and in personal AI agents, without your team chasing every new standard.",
        ],
      },
      {
        id: "frequently-asked-questions",
        title: "Frequently asked questions",
        paragraphs: [
          "Do I need to support all three? No. Most brands will meet these standards through their platform or partners. Focus on clean product data first.",
          "Is ACP dead since Instant Checkout was scaled back? No. The checkout part changed, but ACP still carries product feeds into ChatGPT’s discovery experience.",
          "How is MCP different from an API? An API is a specific connection to one system. MCP is a shared standard that lets any compatible AI agent connect to many systems the same way.",
        ],
      },
    ],
  },
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
