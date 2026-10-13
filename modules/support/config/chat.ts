/**
 * Who a message in a mock conversation comes from:
 * - `user`: the shopper.
 * - `crossword`: the agent, replying to the shopper.
 * - `human`: someone on the brand's team, replying to the shopper.
 * - `toHuman` / `fromHuman`: private notes between the agent and the team; the shopper never sees them.
 * - `brand`: someone on the brand's team asking Crossword about the desk itself.
 */
export type ChatRole = "user" | "crossword" | "human" | "toHuman" | "fromHuman" | "brand";

export type ChatMessage = { from: ChatRole; text: string };
