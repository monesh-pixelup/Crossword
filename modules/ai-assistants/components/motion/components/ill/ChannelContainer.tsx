import textureImage from "@/modules/ai-assistants/assets/motion/scenarios/channel-deployment/texture.webp";

const texture = textureImage.src;

// The kit's one standard aubergine/textured presentation container
// (first built for CompleteChannelDeployment's `ChannelFrame`, now the
// shared box every scenario that needs this treatment reuses — per
// review, "use the same container" rather than each scenario authoring
// its own near-identical copy). `ChannelFrame.tsx` renders its tray +
// shell slot on top of this; any other caller just drops its own content
// in as `children`, typically wrapped in `ScaleToFit` if that content
// wasn't built at this box's own scale.
export function ChannelContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={["ill-channel-container", className].filter(Boolean).join(" ")}>
      <img className="ill-channel-container__texture" src={texture} alt="" aria-hidden="true" />
      {children}
    </div>
  );
}
