"use client";

import { type ReactNode, type RefObject, useEffect, useMemo, useRef, useState } from "react";
import { HERO_COVER_EVENT } from "@/modules/marketing/components/hero-curtain";
import banner from "../../../assets/hero/parallax/banner-desktop.webp";
import bannerMobile from "../../../assets/hero/parallax/banner-mobile.webp";
import concierge from "../../../assets/hero/parallax/scene-concierge.webp";
import { Conversation } from "./conversation";
import { EntryStack } from "./entry-stack";
import { HeroScene, type SceneLayer, type SceneState } from "./hero-scene";
import { initialJourneyState, journeyOf, journeys, nextStep, selectJourney } from "./journeys";

/** The layer canvas: the frame's width, a little taller, so the photo overruns the frame's foot. */
const LAYER_SIZE: [number, number] = [1671, 941];

/**
 * The hero banner (hero-banners handoff, 11 November 2026): the scene photo with page-specific extensions either side,
 * 3000 × 864 at 3x (9000 × 2592), with the concierge over it to glitch: his 814 × 731 cutout of that same photo, so at
 * rest he sits on it seamlessly. Boxed on the canvas (1671 canvas units to the frame's 1440px). The banner is
 * registered to the concierge (matched on his opaque pixels: banner px 3862, 552 at 1.5011x his cutout), which puts it
 * at -786.70, 0.32, 2997.81 × 863.37 in frame px: the old 1440-frame photo where it was, the extensions running out
 * past the frame, shown on screens wider than 1440px (hero-parallax.css).
 */
const LAYERS: SceneLayer[] = [
  { src: banner, box: [-912.894, 0.37, 3478.71, 1001.87] },
  { src: concierge, box: [579.858, 213.731, 472.223, 424.195], glitch: true },
];

/**
 * Phones: the phone banner (780 × 1688, a 390 × 844 hero at 2x, the concierge centred, a dark foot for the copy) as
 * one layer on its own canvas, with the concierge over it to glitch, registered the same way (banner px -38, 362 at
 * 0.9735x his cutout).
 */
const COMPACT_LAYER_SIZE: [number, number] = [780, 1688];
const COMPACT_LAYERS: SceneLayer[] = [
  { src: bannerMobile, box: [0, 0, 780, 1688] },
  { src: concierge, box: [-38, 362, 792.43, 711.63], glitch: true },
];

/** The v3 export's tuning: a slower, softer, wider glitch, calm over the face. */
const GLITCH = {
  auto: true,
  interval: 3.7,
  peak: 0.55,
  faceCalm: 0.9,
  cursor: { radius: 212, strength: 0.82, rest: 0.87, motion: 1, warp: 0.8 },
};

/** True while the scene is at least 30% on screen, not covered by the page and the tab is visible. */
function usePlaying(ref: RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(true);
  const [covered, setCovered] = useState(false);
  useEffect(() => {
    const onVisibility = () => setVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    // The hero is sticky (HeroCurtain), so it never scrolls out of view: it's covered by the sections sliding over it
    // instead, which HeroCurtain announces on the hero section.
    const hero = ref.current?.closest("section");
    const onCover = (event: Event) => setCovered((event as CustomEvent<boolean>).detail);
    hero?.addEventListener(HERO_COVER_EVENT, onCover);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
      hero?.removeEventListener(HERO_COVER_EVENT, onCover);
    };
  }, [ref]);
  return inView && visible && !covered;
}

/**
 * Runs the journeys on timers: each step waits its delay, pausing (and keeping what's left) while
 * off screen, and holding a finished conversation while `hold` (hovered or keyboard-focused).
 */
function useJourneys(ref: RefObject<HTMLElement | null>, hold: boolean) {
  const [state, setState] = useState(initialJourneyState);
  const playing = usePlaying(ref);
  const step = useMemo(() => nextStep(state), [state]);
  const remaining = useRef(0);
  const paused = !playing || (hold && step.kind === "leave");

  useEffect(() => {
    remaining.current = step.delay;
  }, [step]);

  useEffect(() => {
    if (paused) return;
    const started = performance.now();
    const timer = window.setTimeout(() => setState(step.apply), remaining.current);
    return () => {
      window.clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (performance.now() - started));
    };
  }, [step, paused]);

  return { state, select: (journey: number, cursor: number) => setState((s) => selectJourney(s, journey, cursor)) };
}

const hasJourney = (entry: { id: string }) => journeyOf(entry.id) >= 0;

/** Below this frame width the copy at the frame's foot would run into the cards and the conversation. */
const COPY_AT_FOOT_FROM = 1160;

/**
 * Where the copy goes: over the frame's foot when the frame is wide enough (and before it's
 * measured), above the frame between that and the compact layout, and last in the compact stack.
 */
function copyPlacement({ width, compact }: SceneState): "foot" | "above" | "stacked" {
  if (compact) return "stacked";
  return width === null || width >= COPY_AT_FOOT_FROM ? "foot" : "above";
}

/**
 * The home hero's scene, from the hero parallax export: the concierge at the desk (glitching as a
 * HoloMosaic), the entry points cycling on the left and each
 * one's conversation playing on the right. `copy` (the headline and buttons) sits over the photo,
 * centred at its foot (see copyPlacement for narrower frames).
 */
export function HeroParallax({ copy }: { copy: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const { state, select } = useJourneys(root, hovered || focused);
  const conversations = [state.outgoing, state.current].filter((c) => c !== null);

  return (
    <div ref={root} className="hero-journeys">
      <HeroScene
        layers={LAYERS}
        layerSize={LAYER_SIZE}
        compactLayers={COMPACT_LAYERS}
        compactLayerSize={COMPACT_LAYER_SIZE}
        glitch={GLITCH}
        scaleBelow={1440}
        // Down to the phone layout the hero stays as tall as on a wide screen: the photo crops at the sides, the UI zooms down.
        holdHeight
        uiMaxWidth={1440}
        aboveFrame={(scene) =>
          copyPlacement(scene) === "above" && (
            <div className="w-full pt-28 pb-10">
              {copy}
            </div>
          )
        }
        overlayContent={(scene) => {
          const placement = copyPlacement(scene);
          if (placement === "above") return null;
          // Phones: the copy is pinned 24px above the first screen's bottom so it shows on load, over the stack (see
          // .hero-scene--compact), with a fade to black behind it so it reads over the conversation. On a short screen
          // (an iPhone SE) that would pull it up over the concierge, so it never sits higher than 54px above the
          // scene's foot, where it lands on a tall phone (an iPhone 16 Pro): under the desk, as there.
          if (placement === "stacked")
            return (
              <>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-[min(calc(100%_-_100svh),30px)] z-10 h-[45svh] bg-linear-to-b from-black/0 via-black/70 via-40% to-black/90"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-[min(calc(100%_-_100svh_+_24px),54px)] z-10">{copy}</div>
              </>
            );
          return (
            <>
              {/*
                Shade behind the copy, under the UI: Figma's 1644 × 353 multiply band, black from 29.75% up, blurred
                17px, 49px below the frame, and 86px past each side of the banner (which runs past the frame on wide
                screens) (raised with the copy when the frame runs past the
                first screen).
              */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-[calc(-5.69%_+_max(0px,100%_-_min(100svh,1200px)_/_var(--scene-scale,1)))] -left-[60.607%] h-[40.91%] w-[220.13%] bg-linear-to-t from-black from-[29.752%] to-transparent mix-blend-multiply blur-[17px]"
              />
              {/*
                The copy's last line sits where Figma's row ends: 88.5px above the 863px frame's bottom, or 88.5px above
                the first screen's bottom when the frame is taller than the viewport, so it shows on load. It spans the
                page's width (not the frame's, which can be narrower), so its content column lines up with the other
                sections' headings.
              */}
              <div className="pointer-events-none absolute z-10 bottom-[max(10.25%,calc(100%_-_min(100svh,1200px)_/_var(--scene-scale,1)_+_88.5px))] left-1/2 w-[min(var(--scene-page-w),1440px)] -translate-x-1/2">
                {copy}
              </div>
            </>
          );
        }}
      >
        {({ compact }) => (
          <div
            className="hero-journeys__zone"
            onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
            onBlur={() => setFocused(false)}
          >
            <EntryStack
              cursor={state.cursor}
              highlighted={state.highlighted}
              move={state.move}
              compact={compact}
              selectable={hasJourney}
              onSelect={(cursor, entry) => select(journeyOf(entry.id), cursor)}
            />
            <div className="conversation-slot">
              {conversations.map((c) => (
                <Conversation
                  key={c.key}
                  turns={journeys[c.journey].turns}
                  revealed={c.revealed}
                  leaving={c === state.outgoing}
                />
              ))}
            </div>
          </div>
        )}
      </HeroScene>
    </div>
  );
}
