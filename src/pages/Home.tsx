import { Link } from "react-router-dom";
import { useAdvancedDashboardProvider } from "../context/AdvancedDashboardContext";
import { useEffect } from "react";

export default function Home() {
  const { setLocation } = useAdvancedDashboardProvider();

  useEffect(() => {
    setLocation("");
  }, []);
  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold mt-3 flex items-center">
          International Information Index{" "}
          <div className="bg-green-400 rounded-md px-2 py-1 ml-3">
            Home Page
          </div>
        </h1>
      </div>
      <div className="grid grid-cols-5 m-1 gap-1">
        <Link to="/iiicontrol/dashboard" className="btn btn-primary">
          III Control
        </Link>
      </div>
    </>
  );
}
