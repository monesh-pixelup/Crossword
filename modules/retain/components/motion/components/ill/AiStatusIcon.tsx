
// Inline render of ai-status.svg (ILL/Primitive/Icon, node 1960:80, used
// inside ILL/Module/Assistant/Status, node 2246:3411) — paths copied
// verbatim from src/assets/ill-icons/ai-status.svg. Inlined (rather than
// loaded as an <img>) so the shape can be split into independently
// animated groups.
//
// Four layers: an outer group owns the shared bloom/rotate/exit (one
// loop: bloom -> spin -> exit -> repeat); two inner sibling groups
// (spokes, ticks) each converge/expand on their own, different-speed
// pulse within the spin window, for a layered "burst and think" feel;
// the center square pulses too, but inverted — it grows a touch exactly
// when the spokes converge, as if the motion is absorbing into the
// center. See AiStatusIcon.css.
//
// Every stroke carries vectorEffect="non-scaling-stroke" so the scale()
// transforms (bloom/exit on the outer group, the converge/expand pulses
// on spokes/ticks) only shorten/lengthen each line — stroke-width stays
// visually constant throughout, it never gets thinner as strokes shrink.
export function AiStatusIcon() {
  return (
    <svg
      className="ill-ai-status-icon"
      width="16"
      height="16"
      viewBox="0 0 10.0015 10.0015"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="ill-ai-status-icon__shape">
        <g className="ill-ai-status-icon__spokes">
          <path d="M5.16982 1.36618e-08L5.16982 3.58808" strokeWidth="0.625092" stroke="#462160" vectorEffect="non-scaling-stroke" />
          <path d="M5.16982 6.41338L5.16982 10.0015" strokeWidth="0.625092" stroke="#462160" vectorEffect="non-scaling-stroke" />
          <path d="M10.0015 4.87603L6.48029 4.87603" strokeWidth="0.625092" stroke="#462160" vectorEffect="non-scaling-stroke" />
          <path d="M3.52148 4.87603L0.000305653 4.87603" strokeWidth="0.625092" stroke="#462160" vectorEffect="non-scaling-stroke" />
        </g>
        <g className="ill-ai-status-icon__ticks">
          <path d="M3.76818 3.63487L2.62108 2.48778" strokeWidth="0.625092" strokeLinecap="round" stroke="#462160" vectorEffect="non-scaling-stroke" />
          <path d="M7.56878 7.45211L6.42169 6.30502" strokeWidth="0.625092" strokeLinecap="round" stroke="#462160" vectorEffect="non-scaling-stroke" />
          <path d="M6.41942 3.6349L7.56651 2.48781" strokeWidth="0.625092" strokeLinecap="round" stroke="#462160" vectorEffect="non-scaling-stroke" />
          <path d="M2.62359 7.4521L3.77069 6.30501" strokeWidth="0.625092" strokeLinecap="round" stroke="#462160" vectorEffect="non-scaling-stroke" />
        </g>
        <rect className="ill-ai-status-icon__center" x="4.40987" y="4.27743" width="1.40034" height="1.40034" fill="#462160" />
      </g>
    </svg>
  );
}
