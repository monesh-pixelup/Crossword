import type { CSSProperties } from "react";
import registry from "./registry.json";
import goodwellMarkImage from "../../../assets/motion/brands/goodwell-mark.svg";
import suppliedAmberAndOakMarkImage from "../../../assets/motion/brands/supplied/amber-and-oak-mark.svg";
import suppliedAuraMarkImage from "../../../assets/motion/brands/supplied/aura-mark.svg";
import suppliedAureliaMarkImage from "../../../assets/motion/brands/supplied/aurelia-mark.svg";
import suppliedAurelleMarkImage from "../../../assets/motion/brands/supplied/aurelle-mark.svg";
import suppliedBrewhausMarkImage from "../../../assets/motion/brands/supplied/brewhaus-mark.svg";
import suppliedCrestlineMarkImage from "../../../assets/motion/brands/supplied/crestline-mark.svg";
import suppliedDusklightMarkImage from "../../../assets/motion/brands/supplied/dusklight-mark.svg";
import suppliedGoodwellMarkImage from "../../../assets/motion/brands/supplied/goodwell-mark.svg";
import suppliedMaraisMarkImage from "../../../assets/motion/brands/supplied/marais-mark.svg";
import suppliedMoonrestMarkImage from "../../../assets/motion/brands/supplied/moonrest-mark.svg";
import suppliedProteinmaxMarkImage from "../../../assets/motion/brands/supplied/proteinmax-mark.svg";
import suppliedSorelleLabsMarkImage from "../../../assets/motion/brands/supplied/sorelle-labs-mark.svg";
import suppliedStrideMarkImage from "../../../assets/motion/brands/supplied/stride-mark.svg";
import suppliedTrailwellMarkImage from "../../../assets/motion/brands/supplied/trailwell-mark.svg";
import placeholderAmberAndOakMarkImage from "../../../assets/motion/brands/placeholders/amber-and-oak-mark.svg";
import placeholderAureliaMarkImage from "../../../assets/motion/brands/placeholders/aurelia-mark.svg";
import placeholderAurelleMarkImage from "../../../assets/motion/brands/placeholders/aurelle-mark.svg";
import placeholderBrewhausMarkImage from "../../../assets/motion/brands/placeholders/brewhaus-mark.svg";
import placeholderCrestlineMarkImage from "../../../assets/motion/brands/placeholders/crestline-mark.svg";
import placeholderDusklightMarkImage from "../../../assets/motion/brands/placeholders/dusklight-mark.svg";
import placeholderMoonrestMarkImage from "../../../assets/motion/brands/placeholders/moonrest-mark.svg";
import placeholderSorelleLabsMarkImage from "../../../assets/motion/brands/placeholders/sorelle-labs-mark.svg";

const goodwellMark = goodwellMarkImage.src;

export type BrandId = keyof typeof registry;

const normalise = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

export function getBrand(name: string) {
  const entry = (
    Object.entries(registry) as [BrandId, (typeof registry)[BrandId]][]
  ).find(
    ([id, brand]) => id === name || normalise(brand.name) === normalise(name),
  );
  if (!entry) throw new Error(`Unregistered demo brand: ${name}`);
  return { id: entry[0], ...entry[1] };
}

type BrandVariables = CSSProperties &
  Record<
    `--brand-${"ink" | "paper" | "plate" | "font" | "tracking" | "case"}`,
    string
  >;

export function brandStyle(name: string): BrandVariables {
  const brand = getBrand(name);
  return {
    "--brand-ink": brand.ink,
    "--brand-paper": brand.paper,
    "--brand-plate": brand.plate,
    "--brand-font": brand.font,
    "--brand-tracking": brand.tracking,
    "--brand-case": brand.wordmarkCase,
  };
}

const marks: Record<Exclude<BrandId, "aurelle" | "goodwell">, string> = {
  aurelia: "M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z",
  marais: "M5 19V5l7 9 7-9v14M8 19V12m8 7v-7",
  "sorelle-labs":
    "M12 20V9m0 7C5 16 4 10 4 7c6 0 8 3 8 7m0-3c0-5 4-7 8-7 0 5-2 9-8 9",
  moonrest: "M17 4a8.5 8.5 0 1 0 3 14A9 9 0 0 1 17 4Z",
  "amber-and-oak": "M4 12 8 5h8l4 7H4Zm8 0v7m-4 0h8",
  dusklight: "M5 17h14M7 14a5 5 0 0 1 10 0M12 3v3M4 7l2 2m14-2-2 2",
  crestline: "M3 19 10 5l4 8 3-5 5 11H3Zm5-9 2 3 2-3",
  brewhaus:
    "M5 9h12v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Zm12 1h1a3 3 0 0 1 0 6h-1M8 3v3m5-3v3",
  waveline: "M3 8c3-6 6 6 9 0s6 6 9 0M3 16c3-6 6 6 9 0s6 6 9 0",
  aura: "M7 5a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H5V8a3 3 0 0 1 2-3Zm10 0a3 3 0 0 1 2 3v6h-2a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3ZM7 14v5m10-5v5",
  "holt-and-co": "M5 5v14m8-14v14M5 12h8m7-5c-4-2-5 8 0 8",
  auden: "M4 15v-3a8 8 0 0 1 16 0v3M4 12h3v7H4v-7Zm13 0h3v7h-3v-7Z",
  lumen:
    "M12 3v3m0 12v3M3 12h3m12 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z",
  trailwell: "M3 19 9 7l4 8 3-6 5 10H3ZM12 3v4",
  stride: "m4 8 12-4-3 6 7 1-12 9 3-7-7-1Z",
  vela: "M5 5 12 20 19 5M9 5l3 7 3-7",
  formwork: "M7 4h10v9H7V4Zm-2 9h14v4H5v-4Zm3 4v4m8-4v4",
  proteinmax: "m12 3 8 5v8l-8 5-8-5V8l8-5ZM8 16V8h5a3 3 0 0 1 0 6H8",
  "echo-and-co":
    "M8 4a8 8 0 0 0 0 16m4-13a5 5 0 0 0 0 10m4-7a2 2 0 0 0 0 4m5-2h-1",
  hearthware: "M5 20V10l7-6 7 6v10H5Zm5-3c-3-3 3-4 2-7 5 4 4 7 0 8",
  aeria: "M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h5",
};

// Vite's import.meta.glob, spelled out: the marks by their source path.
const suppliedMarks: Record<string, string> = {
  "../assets/brands/supplied/amber-and-oak-mark.svg": suppliedAmberAndOakMarkImage.src,
  "../assets/brands/supplied/aura-mark.svg": suppliedAuraMarkImage.src,
  "../assets/brands/supplied/aurelia-mark.svg": suppliedAureliaMarkImage.src,
  "../assets/brands/supplied/aurelle-mark.svg": suppliedAurelleMarkImage.src,
  "../assets/brands/supplied/brewhaus-mark.svg": suppliedBrewhausMarkImage.src,
  "../assets/brands/supplied/crestline-mark.svg": suppliedCrestlineMarkImage.src,
  "../assets/brands/supplied/dusklight-mark.svg": suppliedDusklightMarkImage.src,
  "../assets/brands/supplied/goodwell-mark.svg": suppliedGoodwellMarkImage.src,
  "../assets/brands/supplied/marais-mark.svg": suppliedMaraisMarkImage.src,
  "../assets/brands/supplied/moonrest-mark.svg": suppliedMoonrestMarkImage.src,
  "../assets/brands/supplied/proteinmax-mark.svg": suppliedProteinmaxMarkImage.src,
  "../assets/brands/supplied/sorelle-labs-mark.svg": suppliedSorelleLabsMarkImage.src,
  "../assets/brands/supplied/stride-mark.svg": suppliedStrideMarkImage.src,
  "../assets/brands/supplied/trailwell-mark.svg": suppliedTrailwellMarkImage.src,
};

const placeholderMarks: Record<string, string> = {
  "../assets/brands/placeholders/amber-and-oak-mark.svg": placeholderAmberAndOakMarkImage.src,
  "../assets/brands/placeholders/aurelia-mark.svg": placeholderAureliaMarkImage.src,
  "../assets/brands/placeholders/aurelle-mark.svg": placeholderAurelleMarkImage.src,
  "../assets/brands/placeholders/brewhaus-mark.svg": placeholderBrewhausMarkImage.src,
  "../assets/brands/placeholders/crestline-mark.svg": placeholderCrestlineMarkImage.src,
  "../assets/brands/placeholders/dusklight-mark.svg": placeholderDusklightMarkImage.src,
  "../assets/brands/placeholders/moonrest-mark.svg": placeholderMoonrestMarkImage.src,
  "../assets/brands/placeholders/sorelle-labs-mark.svg": placeholderSorelleLabsMarkImage.src,
};

export function BrandMark({
  brand: name,
  className = "",
}: {
  brand: string;
  className?: string;
}) {
  const brand = getBrand(name);
  const supplied = suppliedMarks[`../assets/brands/supplied/${brand.id}-mark.svg`];
  return (
    <span
      className={`demo-brand-mark ${className}`}
      style={brandStyle(name)}
      data-brand-id={brand.id}
      data-identity-asset={supplied ? "supplied" : "placeholder"}
      aria-hidden="true"
    >
      {supplied ? (
        <img className="demo-brand-mark__supplied" src={supplied} alt="" />
      ) : brand.id === "aurelle" || brand.id === "goodwell" ? (
        <img
          src={
            brand.id === "aurelle"
              ? placeholderMarks[
                  "../assets/brands/placeholders/aurelle-mark.svg"
                ]
              : goodwellMark
          }
          alt=""
        />
      ) : placeholderMarks[
          `../assets/brands/placeholders/${brand.id}-mark.svg`
        ] ? (
        <span
          className="demo-brand-mark__asset"
          style={{
            maskImage: `url("${placeholderMarks[`../assets/brands/placeholders/${brand.id}-mark.svg`]}")`,
            WebkitMaskImage: `url("${placeholderMarks[`../assets/brands/placeholders/${brand.id}-mark.svg`]}")`,
          }}
        />
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={marks[brand.id]} />
        </svg>
      )}
    </span>
  );
}

export function BrandName({
  brand,
  className = "",
}: {
  brand: string;
  className?: string;
}) {
  const identity = getBrand(brand);
  const displayName = identity.name === identity.name.toUpperCase()
    ? identity.name.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
    : identity.name;
  return (
    <span
      className={`demo-brand-name ${className}`}
      style={brandStyle(brand)}
      data-brand-id={identity.id}
    >
      {displayName}
    </span>
  );
}

export function BrandWordmark({
  brand,
  className = "",
}: {
  brand: string;
  className?: string;
}) {
  return (
    <span className={`demo-brand-wordmark ${className}`}>
      <BrandMark brand={brand} />
      <BrandName brand={brand} />
    </span>
  );
}
