import { createContext, useState, useContext, ReactNode } from "react";

export const AdvancedDashboardContext = createContext({
  loading: false,
  siteName: "",
  isAdmin: false,
  showEditButton: false,
  showEditPage: false,
  setShowEditPage: (_: boolean) => {},
  setShowEditButton: (_: boolean) => {},
  setLoading: (_: boolean) => {},
  setIsAdmin: (_: boolean) => {},
  setSiteName: (_: string) => {},
});

type AdvancedDashboardProviderProps = {
  children: ReactNode;
};

export function AdvancedDashboardProvider({
  children,
}: AdvancedDashboardProviderProps) {
  const [loading, setLoading] = useState(false);
  const [siteName, setSiteName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [showEditPage, setShowEditPage] = useState(false);

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
        isAdmin,
        setIsAdmin,
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
