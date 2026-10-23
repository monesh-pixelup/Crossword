import type { StaticImageData } from "next/image";
import ccpa from "../assets/trust/badge-ccpa.webp";
import gdpr from "../assets/trust/badge-gdpr.webp";
import hipaa from "../assets/trust/badge-hipaa.webp";
import iso from "../assets/trust/badge-iso.webp";
import pipeda from "../assets/trust/badge-pipeda.webp";
import soc2 from "../assets/trust/badge-soc2.webp";

export type Certification = {
  name: string;
  badge: StaticImageData;
  /** Badge width in Figma (all are 70px tall). */
  badgeWidth: number;
  href: string;
};

// TODO: link "Details" to the real trust/compliance pages.
export const certifications: Certification[] = [
  { name: "ISO 27001", badge: iso, badgeWidth: 70, href: "#iso-27001" },
  { name: "SOC 2 Type II", badge: soc2, badgeWidth: 69.079, href: "#soc-2" },
  { name: "HIPAA", badge: hipaa, badgeWidth: 70, href: "#hipaa" },
  { name: "GDPR", badge: gdpr, badgeWidth: 70, href: "#gdpr" },
  { name: "PIPEDA", badge: pipeda, badgeWidth: 70, href: "#pipeda" },
  { name: "CCPA", badge: ccpa, badgeWidth: 70, href: "#ccpa" },
];
