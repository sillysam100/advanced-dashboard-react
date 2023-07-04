import { useParams } from "react-router-dom";
import { Site } from "../types/Site";
import { getSite } from "../api/site";
import { getRegisters } from "../api/register";
import { Register } from "../types/Register";
import { useEffect, useState } from "react";
import { useAdvancedDashboardProvider } from "../context/AdvancedDashboardContext";

export default function SitePage() {
  const [registers, setRegisters] = useState<Register[]>([]);
  const { id } = useParams<{ id: string }>();
  const { setLoading, setSiteName } = useAdvancedDashboardProvider();

  if (!id) {
    return <div>Invalid site id</div>;
  }

  useEffect(() => {
    setLoading(true);
    Promise.all([getSite(id), getRegisters(id)])
      .then(([siteData, registerData]) => {
        setSiteName(siteData.name);
        setRegisters(registerData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // get token from where you've stored it
    const ws = new WebSocket(`ws://localhost:3001/?token=${token}`);

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setRegisters((prevRegisters) =>
        prevRegisters.map((register) =>
          register._id === data.registerId
            ? { ...register, value: data.value }
            : register
        )
      );
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="m-3 grid grid-cols-5 gap-3 ">
      {registers.map((register) => (
        <>
          <div className="stats shadow" key={register._id}>
            <div className="stat">
              <div className="stat-title  font-semibold">{register.name}</div>
              <div className="stat-value flex">
                <h1 className="text-3xl">{register.value}</h1>
                <h1 className="text-base ml-1">{register.unit}</h1>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
