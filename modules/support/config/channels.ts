import type { StaticImageData } from "next/image";
import email from "../assets/channels/email.svg";
import imessage from "../assets/channels/imessage.svg";
import instagram from "../assets/channels/instagram.svg";
import sms from "../assets/channels/sms.svg";
import tiktok from "../assets/channels/tiktok.svg";
import webChat from "../assets/channels/web-chat.svg";
import whatsapp from "../assets/channels/whatsapp.svg";

/** Support channels, as Figma's integrations grid: each name with its 32px maroon mark. */
export const channels: { name: string; icon: StaticImageData }[] = [
  { name: "Web chat / widget", icon: webChat },
  { name: "iMessage", icon: imessage },
  { name: "Email", icon: email },
  { name: "TikTok", icon: tiktok },
  { name: "Instagram", icon: instagram },
  { name: "WhatsApp", icon: whatsapp },
  { name: "SMS", icon: sms },
];
