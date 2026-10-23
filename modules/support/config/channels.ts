import type { StaticImageData } from "next/image";
import email from "../assets/channels/email.svg";
import imessage from "../assets/channels/imessage.svg";
import instagram from "../assets/channels/instagram.svg";
import sms from "../assets/channels/sms.svg";
import tiktok from "../assets/channels/tiktok.svg";
import webChat from "../assets/channels/web-chat.svg";
import whatsapp from "../assets/channels/whatsapp.svg";

/** Support channels, in Figma's integrations row order: each name with its 30.9 × 29.1 gold-and-maroon mark. */
export const channels: { name: string; icon: StaticImageData }[] = [
  { name: "Web chat / widget", icon: webChat },
  { name: "TikTok", icon: tiktok },
  { name: "SMS", icon: sms },
  { name: "Instagram", icon: instagram },
  { name: "WhatsApp", icon: whatsapp },
  { name: "iMessage", icon: imessage },
  { name: "Email", icon: email },
];
