import { useEffect, useRef, useState } from "react";
import { AiStatusIcon } from "./AiStatusIcon";

// ILL/Module/Assistant/Status (node 2246:3411) — the AI "thinking" row:
// AiStatus icon + a short status label. Purely presentational: it takes
// `label`/`visible` and crossfades between them on its own, but which
// label to show and for how long is entirely owned by whatever renders
// it (a conversation's own sequencer) — this component has no timer.
//
// `icon` is an opt-in override for the icon slot, defaulting to
// `<AiStatusIcon />` so every existing call site renders byte-identical.
// Added for ServiceResolutionMotion's human-agent "typing" beats: that
// scenario has two distinct speakers (the AI assistant and a human
// support agent), and the default icon is Figma's literal "ai-status"
// glyph — reusing it unchanged for a human would visually claim the
// agent is the AI. Everything else here (row layout, label crossfade,
// enter/exit transitions) is genuinely shared and stays exactly as-is.
export function AiStatus({
  label,
  visible = true,
  icon,
}: {
  label: string;
  visible?: boolean;
  icon?: React.ReactNode;
}) {
  // Keeps the previous label mounted (fading out) for one extra render
  // when `label` changes, so the swap crossfades instead of the old text
  // vanishing the instant the new one appears. No timer — purely derived
  // from the `label` prop changing.
  const [current, setCurrent] = useState(label);
  const [previous, setPrevious] = useState<string | null>(null);
  const currentRef = useRef(current);

  useEffect(() => {
    if (label !== currentRef.current) {
      setPrevious(currentRef.current);
      setCurrent(label);
      currentRef.current = label;
    }
  }, [label]);

  return (
    <div className={`sdm-ill-ai-status${visible ? "" : " sdm-ill-ai-status--hidden"}`}>
      {icon ?? <AiStatusIcon />}
      <span className="sdm-ill-ai-status__label-stack">
        {previous && previous !== current && (
          <span className="sdm-ill-ai-status__label sdm-ill-ai-status__label--exiting" aria-hidden="true">
            {previous}
          </span>
        )}
        <span className="sdm-ill-ai-status__label" key={current}>
          {current}
        </span>
      </span>
    </div>
  );
}
