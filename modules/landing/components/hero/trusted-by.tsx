import Image, { type StaticImageData } from "next/image";
import { Fragment } from "react";
import { cn } from "@/lib/cn";
import divider from "../../assets/hero/decor/logo-divider.svg";
import accordion from "../../assets/hero/logos/accordion.svg";
import bloomEnergy from "../../assets/hero/logos/bloomenergy.svg";
import branch from "../../assets/hero/logos/branch.png";
import favor from "../../assets/hero/logos/favor.png";
import helix from "../../assets/hero/logos/helix.svg";
import uniphore from "../../assets/hero/logos/uniphore.png";

type Logo = { name: string; src: StaticImageData; width: number; height: number; cover?: boolean };

const logos: Logo[] = [
  { name: "Uniphore", src: uniphore, width: 99.225, height: 19.361, cover: true },
  { name: "Accordion", src: accordion, width: 107.9, height: 13 },
  { name: "Bloom Energy", src: bloomEnergy, width: 109.718, height: 22.275 },
  { name: "Helix", src: helix, width: 83.035, height: 20.25 },
  { name: "Favor", src: favor, width: 89.1, height: 24.475, cover: true },
  { name: "Branch", src: branch, width: 67.838, height: 24.557, cover: true },
];

function LogoRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className={cn(
        // A 2- then 3-column grid on phones (repeat row hidden); a row from 768px, divided from 992px.
        "grid-cols-2 justify-items-center gap-x-6 gap-y-8 xs:grid-cols-3 md:flex md:items-center md:justify-center md:gap-10 lg:gap-[35px]",
        duplicate ? "hidden" : "grid w-full md:w-auto",
      )}
    >
      {logos.map((logo, i) => (
        <Fragment key={logo.name}>
          {i > 0 && (
            <li aria-hidden className="relative hidden h-[52px] w-0 lg:block">
              <Image src={divider} alt="" className="absolute inset-y-0 -left-[0.527px] h-full w-[1.054px] max-w-none" />
            </li>
          )}
          <li className="shrink-0 mix-blend-luminosity">
            <Image
              src={logo.src}
              alt={duplicate ? "" : logo.name}
              width={logo.width}
              height={logo.height}
              className={cn("block max-w-none", logo.cover && "object-cover")}
              style={{ width: logo.width, height: logo.height }}
            />
          </li>
        </Fragment>
      ))}
    </ul>
  );
}

export function TrustedBy({ className }: { className?: string }) {
  return (
    <div className={cn("flex content-width flex-col items-center gap-10", className)}>
      <p className="text-center text-base leading-6 font-light tracking-[-0.32px] text-black/60">
        Trusted by 300+ d2c brands in 120+ countries
      </p>
      <LogoRow />
      <LogoRow duplicate />
    </div>
  );
}
