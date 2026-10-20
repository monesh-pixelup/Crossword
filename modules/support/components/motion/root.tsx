import type { ReactNode } from "react";

import { MotionRoot } from "@/modules/sell/components/motion/primitives";

import "./scenes.css";

/** `.ill-sell .ill-support` scope for the support motion scenes (scenes.css is prefixed with it). */
export function SupportMotionRoot({ children }: { children: ReactNode }) {
  return <MotionRoot className="ill-support">{children}</MotionRoot>;
}
