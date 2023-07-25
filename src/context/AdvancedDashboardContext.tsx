import { createContext, useState, useContext, ReactNode } from "react";

export const AdvancedDashboardContext = createContext({
  loading: false,
  siteName: "",
  showEditButton: false,
  showEditPage: false,
  location: "",
  setShowEditPage: (_: boolean) => {},
  setShowEditButton: (_: boolean) => {},
  setLoading: (_: boolean) => {},
  setSiteName: (_: string) => {},
  setLocation: (_: string) => {},
});

type AdvancedDashboardProviderProps = {
  children: ReactNode;
};

export function AdvancedDashboardProvider({
  children,
}: AdvancedDashboardProviderProps) {
  const [loading, setLoading] = useState(false);
  const [siteName, setSiteName] = useState("");
  const [showEditButton, setShowEditButton] = useState(false);
  const [showEditPage, setShowEditPage] = useState(false);
  const [location, setLocation] = useState("");

  return (
    <AdvancedDashboardContext.Provider
      value={{
        showEditPage,
        setShowEditPage,
        showEditButton,
        setShowEditButton,
        loading,
        setLoading,
        siteName,
        setSiteName,
        location,
        setLocation,
      }}
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
