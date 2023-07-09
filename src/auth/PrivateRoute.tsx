import { Navigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import { checkAuth } from "./auth";
import { useAdvancedDashboardProvider } from "../context/AdvancedDashboardContext";
import Navbar from "../components/Navbar";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setIsAdmin } = useAdvancedDashboardProvider();

  useEffect(() => {
    checkAuth()
      .then((res) => {
        setAuthenticated(true);
        setIsAdmin(res.role === "admin");
        setLoading(false);
      })
      .catch(() => {
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? (
    <>
      <Navbar />
      {children}
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
