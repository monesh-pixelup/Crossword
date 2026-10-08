import Image from "next/image";
import type { CSSProperties } from "react";
import manPhoto from "../../assets/testimonials/photo-man.webp";
import roomPhoto from "../../assets/testimonials/photo-room.webp";
import frame from "../../assets/testimonials/portrait-frame.svg";
import panel from "../../assets/testimonials/portrait-panel.svg";

/**
 * Tilted portrait "photograph": a coloured card with a gold corner frame and a
 * notched cream panel, through which the photo shows. Built from its Figma
 * parts (not a flat export) so it renders fully at every carousel position.
 * Coordinates are in the 333.398 × 335.819 card, before the 6.85° tilt.
 */
type PortraitCardProps = { color: string; className?: string; style?: CSSProperties };

export function PortraitCard({ color, className, style }: PortraitCardProps) {
  return (
    <div className={`flex h-[373.178px] w-[371.062px] items-center justify-center ${className ?? ""}`} style={style}>
      <div className="relative h-[335.819px] w-[333.398px] flex-none rotate-[6.85deg] overflow-clip" style={{ backgroundColor: color }}>
        <Image src={frame} alt="" className="absolute top-[4.023px] left-[4.85px] max-w-none" />
        <div className="absolute top-[9.69px] left-[9.6875px] flex h-[317.253px] w-[314.023px] items-center justify-center">
          <Image src={panel} alt="" className="h-[314.023px] w-[317.253px] max-w-none flex-none rotate-90" />
        </div>
        {/*
          Photos are clipped to exactly the notched panel (9.69, 9.69, 314 × 317).
          Figma's code export misplaces these masks (and offsets the portrait's by
          47px), which would leave a cream band and expose the backdrop photo.
        */}
        <div
          className="absolute top-[-63.777px] left-[-93.639px] h-[390.713px] w-[693.435px] mask-alpha mask-no-repeat mask-position-[103.327px_73.467px] mask-size-[314.023px_317.253px]"
          style={{ maskImage: `url(${panel.src})` }}
        >
          <Image src={roomPhoto} alt="" fill sizes="694px" className="object-cover" />
        </div>
        <div
          className="absolute top-[-154.4px] left-[-115.23px] h-[879.568px] w-[586.379px] mask-alpha mask-no-repeat mask-position-[124.918px_164.09px] mask-size-[314.023px_317.253px]"
          style={{ maskImage: `url(${panel.src})` }}
        >
          <Image src={manPhoto} alt="" fill sizes="587px" className="object-cover" />
        </div>
      </div>
    </div>
  );
}
