import Sites from "../components/Sites";
import { getSites } from "../api/site";
import { ISite } from "../types/Site";
import { SetStateAction, useEffect, useState } from "react";
import { useAdvancedDashboardProvider } from "../context/AdvancedDashboardContext";

const DashboardPage = () => {
  const [sites, setSites] = useState<ISite[]>([]);
  const { setLoading, setSiteName } = useAdvancedDashboardProvider();

  useEffect(() => {
    setLoading(true);
    setSiteName("");
    getSites().then((res: SetStateAction<ISite[]>) => {
      setSites(res);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Sites sites={sites} />
    </div>
  );
};

export default DashboardPage;
