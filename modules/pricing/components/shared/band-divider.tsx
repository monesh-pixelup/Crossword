import { DividerBand } from "@/modules/landing/components/shared/divider-band";

/**
 * Figma's 75px Divider Band instance between sections (the 24px damask strip centred in it, under
 * the 75px badge), opening the section that follows. The section adds the 75px (56px below 768px)
 * to its top padding with `pt-[calc(var(--section-pad)+75px)] max-md:pt-[calc(var(--section-pad)+56px)]`.
 */
export function BandDivider({ glyph }: { glyph: Parameters<typeof DividerBand>[0]["glyph"] }) {
  return (
    <div className="absolute inset-x-0 top-[25.5px] max-md:top-[19px]">
      <DividerBand glyph={glyph} />
    </div>
  );
}
