import { createContext, useContext, type ReactNode } from "react";
export const colorVariants = ["crimson", "aubergine", "green"] as const;
export type ColorVariant = (typeof colorVariants)[number];
const Context = createContext<ColorVariant>("crimson");
export const useColorContext = () => useContext(Context);
export function ColorContext({
  variant,
  children,
  className = "",
}: {
  variant?: ColorVariant;
  children: ReactNode;
  className?: string;
}) {
  const inherited = useColorContext();
  const active = variant ?? inherited;
  return (
    <Context.Provider value={active}>
      <div className={`cw-context ${className}`} data-color={active}>
        {children}
      </div>
    </Context.Provider>
  );
}
