import "./ContentFade.css";

// ILL/Module/Overlay/Content-Fade (node 2006:389). "Leaf illustration-
// content fade; never wrap transcript content... Insert as ABSOLUTE
// without transient Auto Layout reflow." Canonical gradient per the
// component description, read verbatim from the Chat-Conversation
// template instance (node 2006:391). Instance size/position are
// template-specific, not canonical — sized here to this composition.
export function ContentFade() {
  return <div className="ill-content-fade" aria-hidden="true" />;
}
