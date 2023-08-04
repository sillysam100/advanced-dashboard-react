import { useEffect } from "react";
import { useAdvancedDashboardProvider } from "../../context/AdvancedDashboardContext";

export default function TDAPSDashboard() {
  const { setLocation } = useAdvancedDashboardProvider();

  useEffect(() => {
    setLocation("TDAPS");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-3 text-2xl font-bold">TDAPS</h1>
      <div className="mt-4 grid h-full w-full grid-cols-2 gap-4">
        <div className="h-full w-full text-center">
          <h1 className="rounded-md bg-secondary p-4 text-lg font-bold">
            Interplanetary Communication System
          </h1>
          <div className="grid grid-cols-4 gap-4">
            <div className="rounded bg-base-300">
              <h1>Local Transponder</h1>
              <h1 className="badge badge-success badge-lg">Active</h1>
            </div>
          </div>
        </div>
        <div className="h-full w-full text-center">
          <h1 className="rounded-md bg-secondary p-4 text-lg font-bold">
            Local Airborne Threath Detection
          </h1>
        </div>
      </div>
    </div>
  );
}
