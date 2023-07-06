import { useRef, useEffect, useState, useCallback } from "react";
import { getRegisters } from "../api/page";
import { IRegister } from "../types/Register";
import Register from "../components/Register";
import { useAdvancedDashboardProvider } from "../context/AdvancedDashboardContext";
import ReloadPagePopup from "../components/ReloadPagePopup";
import { IPage } from "../types/Page";

interface PageProps {
  pageId: string;
  page: IPage;
}

export default function Page({ pageId, page }: PageProps) {
  const [registers, setRegisters] = useState<IRegister[]>([]);
  const [showReloadPagePopup, setShowReloadPagePopup] = useState(false);
  const { setLoading, setSiteName } = useAdvancedDashboardProvider();
  const ws = useRef<WebSocket | null>(null);

  if (!pageId) {
    return <div>Invalid site id</div>;
  }

  useEffect(() => {
    setLoading(true);
    getRegisters(pageId)
      .then((registerData) => {
        setRegisters(registerData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [pageId, setLoading, setSiteName]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    ws.current = new WebSocket(`ws://localhost:3001/?token=${token}`);

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
      setShowReloadPagePopup(false);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error observed:", error);
    };

    ws.current.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        setRegisters((prevRegisters) =>
          prevRegisters.map((register) =>
            register._id === data.registerId
              ? { ...register, value: data.value }
              : register
          )
        );
      } catch (e) {
        console.error(e);
      }
    };

    ws.current.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      setShowReloadPagePopup(true);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const handleRegisterChange = useCallback((register: IRegister) => {
    if (ws.current) {
      ws.current.send(JSON.stringify(register));
    }
  }, []);

  const handleReloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    registers.forEach((register) => {
      page.layout.forEach((layout) => {
        console.log(register._id, layout.registerId);
        if (register._id === layout.registerId) {
          console.log("CONNECTION");
        }
      });
    });
  }, [registers, page.layout]);

  return (
    <div className="m-3 grid grid-cols-10 gap-3">
      {showReloadPagePopup && <ReloadPagePopup reloadPage={handleReloadPage} />}
      {registers.map((register) => (
        <Register
          key={register._id}
          register={register}
          layout={page.layout.find(
            (layout) => layout.registerId === register._id
          )}
          onChange={handleRegisterChange}
        />
      ))}
    </div>
  );
}
