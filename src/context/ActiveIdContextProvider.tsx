import { createContext } from "react";
import { useActiveJobId } from "../lib/hooks";

type ActiveIdContextProps = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContextProps | null>(null);

type ActiveIdContextProviderProps = {
  children: React.ReactNode;
};

export function ActiveIdContextProvider({ children }: ActiveIdContextProviderProps) {
  const activeId = useActiveJobId();

  return <ActiveIdContext.Provider value={{ activeId }}>{children}</ActiveIdContext.Provider>;
}
