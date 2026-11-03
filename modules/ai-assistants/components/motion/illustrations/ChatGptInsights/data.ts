import { catalog } from "../../brands/catalog";

// AI Assistants 15 — "You see what happened": Sorelle Labs' Insights
// dashboard, reporting what shoppers did inside ChatGPT. The figures and
// shopper names are illustrative; the Maya R. journey is the brief's.
export const chatGptInsights = {
  query: "What did shoppers do in ChatGPT this week?",
  thought: "Thought for 3s",
  card: {
    title: "Sorelle Labs · Last 7 days",
    metrics: [
      { label: "AI conversations", value: "1,284" },
      { label: "Carts created", value: "312" },
      { label: "Orders placed", value: "146" },
      { label: "Attributed revenue", value: "$8,920" },
    ],
    recentLabel: "Recent from ChatGPT",
    interactions: [
      { shopper: "Maya R.", request: "Moisturizer for dry skin under $50", outcome: "Ordered", amount: "$55", age: "12m" },
      { shopper: "Jordan K.", request: "Gentle cleanser for sensitive skin", outcome: "In cart", amount: "$28", age: "40m" },
      { shopper: "Aisha B.", request: "Is the Vitamin C serum fragrance-free?", outcome: "Answered", amount: "", age: "1h" },
      { shopper: "Leo T.", request: "An SPF that sits well under makeup", outcome: "Ordered", amount: "$34", age: "2h" },
    ],
  },
  journey: {
    shopper: "Maya R.",
    meta: "ChatGPT · Today, 2:14 pm",
    steps: [
      { kind: "asked", label: "Asked", text: "“Moisturizer for dry skin, under $50?”", link: "Conversation" },
      {
        kind: "recommended",
        label: "Recommended",
        product: { name: "Deep Hydration Cream", price: "$42", image: catalog.sorelleCream.image },
        link: "Product",
      },
      {
        kind: "chose",
        label: "Chose instead",
        product: { name: "Deep Hydration Set", price: "$55", image: catalog.sorelleSet.image },
        link: "Cart",
      },
      { kind: "ordered", label: "Order completed", text: "Free gift applied · $55", link: "Order #SL-20481" },
    ],
  },
  saved: [
    "Which products do shoppers ask ChatGPT about most?",
    "Show conversations that ended without a cart.",
  ],
  recent: [
    { text: "Top requests for dry skin this month", age: "1d" },
    { text: "How did the Hydration Set launch perform?", age: "3d" },
  ],
};
