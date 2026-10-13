export type ChannelIcon = "web" | "imessage" | "email" | "whatsapp" | "instagram" | "tiktok" | "sms";

/** Support channels from the content doc, each with a question a shopper might send there. */
export const channels: { icon: ChannelIcon; name: string; message: string; wide?: boolean }[] = [
  { icon: "web", name: "Web chat", message: "Where is my order? It’s been a week.", wide: true },
  { icon: "imessage", name: "iMessage", message: "Can I change the shade before it ships?" },
  { icon: "email", name: "Email", message: "Re: Refund for order #4821" },
  { icon: "whatsapp", name: "WhatsApp", message: "This doesn’t fit. Can I go a size up?" },
  { icon: "instagram", name: "Instagram", message: "Is the serum back in stock?" },
  { icon: "tiktok", name: "TikTok", message: "How much of this should I use?" },
  { icon: "sms", name: "SMS", message: "Where’s my refund?" },
];
