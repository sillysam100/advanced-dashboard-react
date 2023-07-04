import React, { createContext, useState, useContext, ReactNode } from "react";

export const AdvancedDashboardContext = createContext({
  loading: false,
  setLoading: (loading: boolean) => {},
  siteName: "",
  setSiteName: (siteName: string) => {},
});

type AdvancedDashboardProviderProps = {
  children: ReactNode;
};

export function AdvancedDashboardProvider({
  children,
}: AdvancedDashboardProviderProps) {
  const [loading, setLoading] = useState(false);
  const [siteName, setSiteName] = useState("");

  return (
    <AdvancedDashboardContext.Provider
      value={{ loading, setLoading, siteName, setSiteName }}
    >
      {children}
    </AdvancedDashboardContext.Provider>
  );
}

export function useAdvancedDashboardProvider() {
  const context = useContext(AdvancedDashboardContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}