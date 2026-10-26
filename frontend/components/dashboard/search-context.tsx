"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type DashboardSearchContextValue = {
  query: string;
  setQuery: (value: string) => void;
  clearQuery: () => void;
};

const DashboardSearchContext =
  createContext<DashboardSearchContextValue | null>(null);

export function DashboardSearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");

  const value = useMemo(
    () => ({
      query,
      setQuery,
      clearQuery: () => setQuery(""),
    }),
    [query],
  );

  return (
    <DashboardSearchContext.Provider value={value}>
      {children}
    </DashboardSearchContext.Provider>
  );
}

export function useDashboardSearch() {
  const context = useContext(DashboardSearchContext);

  if (!context) {
    throw new Error(
      "useDashboardSearch must be used inside DashboardSearchProvider",
    );
  }

  return context;
}
