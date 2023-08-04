import { createContext, useState, useContext, ReactNode } from "react";
import { IAlert } from "../types/Alert";

export const AdvancedDashboardContext = createContext({
  loading: false,
  siteName: "",
  showEditButton: false,
  showEditPage: false,
  location: "",
  alerts: [] as IAlert[] | null,
  setShowEditPage: (_: boolean) => {},
  setShowEditButton: (_: boolean) => {},
  setLoading: (_: boolean) => {},
  setSiteName: (_: string) => {},
  setAlerts: (_: IAlert[] | null) => {},
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
  const [alerts, setAlerts] = useState<IAlert[] | null>([]);

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
        alerts,
        setAlerts,
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
