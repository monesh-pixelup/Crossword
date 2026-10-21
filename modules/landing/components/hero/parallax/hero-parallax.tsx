"use client";

import { type ReactNode, type RefObject, useEffect, useMemo, useRef, useState } from "react";
import bg from "../../../assets/hero/parallax/01-bg.webp";
import plant from "../../../assets/hero/parallax/02-plant.webp";
import deskFascia from "../../../assets/hero/parallax/03-desk-fascia.webp";
import notebook from "../../../assets/hero/parallax/04-notebook.webp";
import concierge from "../../../assets/hero/parallax/05-concierge.webp";
import foregroundLeft from "../../../assets/hero/parallax/06-foreground-left.webp";
import foregroundRight from "../../../assets/hero/parallax/07-foreground-right.webp";
import bell from "../../../assets/hero/parallax/08-bell.webp";
import { Conversation } from "./conversation";
import { EntryStack } from "./entry-stack";
import { HeroScene, type SceneLayer, type SceneState } from "./hero-scene";
import { initialJourneyState, journeyOf, journeys, nextStep, selectJourney } from "./journeys";

/** The layer canvas: the frame's width, a little taller, so the photo overruns the frame's foot. */
const LAYER_SIZE: [number, number] = [1671, 941];

/** Back to front, each boxed on the canvas with its parallax depth; the concierge glitches. */
const LAYERS: SceneLayer[] = [
  { src: bg, box: [-96, -96, 1863, 1133], depth: { x: 6, y: 3 } },
  { src: plant, box: [69, 214, 329, 444], depth: { x: -2, y: 0 } },
  { src: deskFascia, box: [32, 633, 1605, 404], depth: { x: -1, y: 0 } },
  { src: notebook, box: [542, 615, 443, 44], depth: { x: 0, y: 0 } },
  { src: concierge, box: [590, 219, 479, 430], depth: { x: 0, y: 0 }, glitch: true },
  { src: foregroundLeft, box: [-96, 68, 344, 969], depth: { x: -30, y: -12 } },
  { src: foregroundRight, box: [1348, 16, 419, 1021], depth: { x: -30, y: -12 } },
  { src: bell, box: [425, 570, 109, 93], depth: { x: 0, y: 0 } },
];

/** True while the scene is at least 30% on screen and the tab is visible. */
function usePlaying(ref: RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onVisibility = () => setVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, [ref]);
  return inView && visible;
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
 * The home hero's scene, from the hero parallax export: the concierge at the desk in cursor-driven
 * parallax (the concierge glitching as a HoloMosaic), the entry points cycling on the left and each
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
        scaleBelow={1440}
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
          // .hero-scene--compact), with a fade to black behind it so it reads over the conversation.
          if (placement === "stacked")
            return (
              <>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-[calc(100%_-_100svh)] z-10 h-[45svh] bg-linear-to-b from-black/0 via-black/70 via-40% to-black/90"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-[calc(100%_-_100svh_+_24px)] z-10">{copy}</div>
              </>
            );
          return (
            <>
              {/*
                Shade behind the copy, under the UI: Figma's 1644 × 353 multiply band, black from 29.75% up, blurred
                17px, 86px past each side and 49px below the frame (raised with the copy when the frame runs past the
                first screen).
              */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-[calc(-5.69%_+_max(0px,100%_-_100svh_/_var(--scene-scale,1)))] -left-[5.975%] h-[40.91%] w-[114.17%] bg-linear-to-t from-black from-[29.752%] to-transparent mix-blend-multiply blur-[17px]"
              />
              {/*
                The copy's last line sits where Figma's row ends: 88.5px above the 863px frame's bottom, or 88.5px above
                the first screen's bottom when the frame is taller than the viewport, so it shows on load. It spans the
                page's width (not the frame's, which can be narrower), so its content column lines up with the other
                sections' headings.
              */}
              <div className="pointer-events-none absolute z-10 bottom-[max(10.25%,calc(100%_-_100svh_/_var(--scene-scale,1)_+_88.5px))] left-1/2 w-[min(var(--scene-page-w),2000px)] -translate-x-1/2">
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
