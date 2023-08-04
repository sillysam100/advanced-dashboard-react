import React, { useRef, useEffect } from "react";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAdvancedDashboardProvider } from "../context/AdvancedDashboardContext";
import { Link } from "react-router-dom";

declare global {
  interface Window {
    my_modal_1: any;
  }
}

export default function Alerts() {
  const { alerts, setAlerts } = useAdvancedDashboardProvider();
  const modalRef = useRef(null);

  useEffect(() => {
    window.my_modal_1 = modalRef.current;
  }, []);

  function clearAlert(id: string) {
    if (!alerts) return;
    const newAlerts = alerts.filter((alert) => alert.id !== id);
    setAlerts(newAlerts);
  }

  return (
    <>
      <div
        className={`indicator mr-3 ${alerts && alerts?.length > 0 && "mb-2"}`}
      >
        {alerts && alerts?.length > 0 && (
          <>
            <span className="indicator-item indicator-bottom badge badge-primary">
              {alerts.length}
            </span>
          </>
        )}
        <button
          className={`btn btn-success ${
            alerts && alerts?.length > 0 ? "btn-warning" : "btn-success"
          }`}
          onClick={() => window.my_modal_1.showModal()}
        >
          <FontAwesomeIcon icon={faTriangleExclamation} /> Alerts{" "}
        </button>
      </div>

      <dialog ref={modalRef} className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-xl mb-3">Alerts</h3>
          {!alerts && (
            <div className="w-full flex items-center justify-center mt-3">
              <h3 className="badge badge-success badge-lg">No Alerts</h3>
            </div>
          )}
          {alerts?.map((alert) => {
            return (
              <div
                className={`rounded w-full p-3 flex justify-between items-center border`}
              >
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="mr-2 bg-warning p-3 rounded"
                  />
                  <h1 className="text-xl">{alert.title}</h1>
                </div>
                <div className="flex flex-row">
                  {alert.action.type == "link" && (
                    <Link className="link link-primary" to={alert.action.url}>
                      {alert.action.name}
                    </Link>
                  )}
                  <button
                    className="link link-error ml-3"
                    onClick={() => clearAlert(alert.id)}
                  >
                    Clear
                  </button>
                </div>
              </div>
            );
          })}
          <div className="modal-action">
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
