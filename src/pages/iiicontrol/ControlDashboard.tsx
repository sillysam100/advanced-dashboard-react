import Sites from "../../components/iiicontrol/Sites";
import { getSites } from "../../api/iiicontrol/site";
import { ISite } from "../../types/iiicontrol/Site";
import { SetStateAction, useEffect, useState } from "react";
import { useAdvancedDashboardProvider } from "../../context/AdvancedDashboardContext";

const DashboardPage = () => {
  const [sites, setSites] = useState<ISite[]>([]);
  const { setLoading, setSiteName, setLocation } =
    useAdvancedDashboardProvider();

  async function loadSites() {
    setLoading(true);
    setSiteName("");
    setLocation("III Control");
    getSites().then((res: SetStateAction<ISite[]>) => {
      setSites(res);
      setLoading(false);
    });
  }

  useEffect(() => {
    loadSites();
  }, []);

  return (
    <div>
      <Sites sites={sites} reloadTrigger={loadSites} />
    </div>
  );
};

export default DashboardPage;
