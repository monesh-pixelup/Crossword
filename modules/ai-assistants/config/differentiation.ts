export type DifferentiationRow = {
  /** The moment in the shopper's journey (first column). */
  experience: string;
  /** What happens in the AI assistant on its own. */
  without: string;
  /** What happens with Crossword connected (the featured column). */
  with: string;
};

/** Being mentioned is not the same as being there (Figma 3305:797). */
export const differentiationRows: DifferentiationRow[] = [
  {
    experience: "When a shopper explores via AI platforms",
    without:
      "Products appear through the assistant’s standard answers and shopping results. Products may be limited or no longer available.",
    with: "Products show accurately from your catalog with interactive product views.",
  },
  {
    experience: "When the shopper needs to choose a product",
    without: "The shopper needs to visit your store to make selections resulting in dropoff.",
    with: "The shopper compares options and selects variants in the connected interface.",
  },
  {
    experience: "When a shopper explains their preferences",
    without: "The assistant may understand the shopper’s preferences, but your brand loses that context.",
    with: "Your brand gets visibility into the conversation and learns more about your shopper through the interaction.",
  },
  {
    experience: "As a brand, if you want the customer to build a basket",
    without: "Recommendations don’t lead into your brand’s bundle or offer workflow.",
    with: "Your workflow determines what is shown - Crossword can show complementary products, eligible offers, and a prepared cart.",
  },
  {
    experience: "If the customer needs account-related help",
    without: "The assistant provides a generic answer about your policies as easily found on your website.",
    with: "After authorization, Crossword retrieves orders and completes enabled service actions specific to the customer and their situation.",
  },
  {
    experience: "If a shopper asks for an update on a product",
    without:
      "The assistant relies on the customer point in time prompt, and the shopper isn’t updated when stock, prices, or order details change in the future.",
    with: "Crossword informs customers regarding restock, price, order details, and support updates in ChatGPT.",
  },
  {
    experience: "As a brand, if you want to measure outcomes",
    without: "Your visibility is limited to a mention or referral.",
    with: "You have tracking on requests, conversations and actions with attributable outcomes where available.",
  },
];
