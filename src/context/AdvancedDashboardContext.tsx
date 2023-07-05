import { createContext, useState, useContext, ReactNode } from "react";

export const AdvancedDashboardContext = createContext({
  loading: false,
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLoading: (loading: boolean) => {},
  siteName: "",
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
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
