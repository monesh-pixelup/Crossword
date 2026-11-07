import Image from "next/image";
import type { ReactNode } from "react";
import { AiaScenePanel } from "../motion/aia-scene-panel";
import type { MotionSlug } from "../motion/motion-scenes";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { SectionTitle } from "@/modules/landing/components/shared/section-title";
import panelForest from "@/modules/retain/assets/audience/panel-forest.webp";

/**
 * A "Library · Wide panel": the eyebrow and a swash headline (Crimson Light 60 at 1.1), then 80px below the 1280 × 599 forest damask
 * panel with its gold corner-notched frame and studs: Retain's Audiences panel export, scaled with the column.
 * A 232px gold tick sits on the left rail beside the eyebrow (98px down in Figma). Personal agents' "The case"
 * (3308:352) uses it with a two-line headline in a 1030px box, playing its motion visual (`scene`, 1280 × 599) in the
 * panel; AI Assistants' Campaigns now has its own layout (UseCaseCampaigns).
 */
export function AssistantCampaigns({
  id = "ai-campaigns-title",
  eyebrow = "Campaigns",
  initial = "R",
  firstLine = "eaches them first",
  secondLine,
  width = 614.744,
  mobileWidth,
  copy,
  scene,
}: {
  id?: string;
  eyebrow?: ReactNode;
  initial?: string;
  firstLine?: ReactNode;
  secondLine?: ReactNode;
  /** The headline's Figma text-box width (the copy line keeps to it too). */
  width?: number;
  /** The headline's width below 768px, where its lines are re-broken shorter (see SectionTitle). */
  mobileWidth?: number;
  /** The line under the headline, as in Possibilities; none by default. */
  copy?: ReactNode;
  /** The motion visual the panel plays (1280 × 599); the bare panel without one. */
  scene?: MotionSlug;
}) {
  return (
    <section aria-labelledby={id} className="relative section-pad">
      <RailAccent className="absolute top-[calc(var(--section-pad)-22px)] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[232px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col gap-section">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <SectionTitle id={id} initial={initial} firstLine={firstLine} secondLine={secondLine} width={width} mobileWidth={mobileWidth} weight="light" />
          {copy && (
            <p className="font-sans text-base leading-6 tracking-[-0.32px] text-black/59" style={{ maxWidth: width }}>
              {copy}
            </p>
          )}
        </div>

        <div className="relative aspect-[1280/599] w-full overflow-clip bg-forest">
          {scene ? (
            // Fills the content width (past its drawn 1280px on wide screens); a transform, so it shrinks cleanly on phones.
            <AiaScenePanel slug={scene} fill transform />
          ) : (
            <Image src={panelForest} alt="" fill sizes="(min-width: 1440px) 1280px, 100vw" className="object-cover" />
          )}
        </div>
      </div>
    </section>
  );
}
