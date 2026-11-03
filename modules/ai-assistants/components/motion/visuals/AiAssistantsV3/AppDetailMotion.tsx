import { useRef, useState, useEffect } from "react";
import { useLandedOnScreen } from "../../components/ill/useLandedOnScreen";
import { useFontsReady } from "../sellDynamicMotion";
import { V3AppDetail } from "./AppDetail";

// 11 · Your brand, inside ChatGPT (motion). One quiet reveal of the static
// page: ChatGPT's chrome is already there, then Sorelle Labs' listing
// settles in top to bottom. CSS only (AppDetailMotion.css); this just
// holds the page until it has landed and fonts are ready, then remounts
// it on every landing so the reveal replays.
export function V3AppDetailMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const landed = useLandedOnScreen(rootRef);
  const fontsReady = useFontsReady();
  const [run, setRun] = useState(0);
  const playing = landed && fontsReady;
  useEffect(() => {
    if (playing) setRun((r) => r + 1);
  }, [playing]);
  return (
    <div ref={rootRef}>
      <V3AppDetail key={run} className={playing ? "apdm apdm--play" : "apdm"} />
    </div>
  );
}
