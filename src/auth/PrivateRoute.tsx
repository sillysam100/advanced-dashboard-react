import { Navigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import { checkAuth } from "./auth";
import Navbar from "../components/Navbar";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth().then((res) => {
      setAuthenticated(res);
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
