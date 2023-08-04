import { useRef, useEffect, useState, useCallback } from "react";
import Register from "./Register";
import { useAdvancedDashboardProvider } from "../../context/AdvancedDashboardContext";
import ReloadPagePopup from "./ReloadPagePopup";
import { IPage } from "../../types/iiicontrol/Page";
import { IValue } from "../../types/iiicontrol/Values";
import { ILayoutEntry } from "../../types/iiicontrol/Page";
import { IRegister } from "../../types/Register";
import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddRegisterToPageModal from "./AddRegisterToPageModal";

interface PageProps {
  pageId: string;
  page: IPage;
  refreshPage: () => void;
  siteId: string;
}

export default function Page({ pageId, page, refreshPage, siteId }: PageProps) {
  const [showReloadPagePopup, setShowReloadPagePopup] = useState(false);
  const [showAddRegisterModal, setShowAddRegisterModal] = useState(false);
  const [values, setValues] = useState<IValue[]>([]);
  const { setLoading, setSiteName, showEditPage } =
    useAdvancedDashboardProvider();
  const ws = useRef<WebSocket | null>(null);

  if (!pageId) {
    return <div>Invalid site id</div>;
  }

  useEffect(() => {
    setLoading(true);
    setLoading(false);
  }, [pageId, setLoading, setSiteName]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    ws.current = new WebSocket(`ws://localhost:3001/?token=${token}`);

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
      setShowReloadPagePopup(false);

      // Sending the "subscribe" message over WebSocket
      const registerIds = page.layout.map((layout) => layout.registerId);
      const subscribeMessage = JSON.stringify({
        type: "subscribe",
        registerIds,
      });
      ws.current?.send(subscribeMessage);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error observed:", error);
    };

    ws.current.onmessage = (event) => {
      // Handling incoming WebSocket messages
      const data: IValue = JSON.parse(event.data);

      console.log("WebSocket message received:");
      console.log(data);

      setValues((prevValues) => {
        const index = prevValues.findIndex(
          (value) => value.registerId === data.registerId
        );
        if (index === -1) {
          // If the registerId doesn't exist in the array yet, add it.
          return [...prevValues, data];
        } else {
          // Otherwise, update the existing value.
          const newValues = [...prevValues];
          newValues[index] = data;
          return newValues;
        }
      });
    };

    ws.current.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      setShowReloadPagePopup(true);
    };

    return () => {
      ws.current?.close();
    };
  }, [page.layout]);

  const handleReloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  const handleRegisterChange = (changedRegister: IRegister) => {
    const changeMessage = JSON.stringify({
      type: "change",
      register: changedRegister,
    });
    ws.current?.send(changeMessage);
  };

  return (
    <div className="m-3 grid grid-cols-10 gap-3">
      {showReloadPagePopup && <ReloadPagePopup reloadPage={handleReloadPage} />}
      {page.layout
        .sort((a, b) => a.position - b.position)
        .map((layout: ILayoutEntry) => (
          <Register
            key={layout.registerId}
            layout={layout}
            edit={showEditPage}
            onChange={handleRegisterChange}
            pageId={pageId}
            refreshPage={refreshPage}
            value={values.find(
              (value) => value.registerId === layout.registerId
            )}
          />
        ))}
      {showEditPage && <AddRegisterToPageModal siteId={siteId} />}
    </div>
  );
}
