import { Link } from "react-router-dom";
import { useAdvancedDashboardProvider } from "../context/AdvancedDashboardContext";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGun, faSliders, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const { setLocation } = useAdvancedDashboardProvider();

  useEffect(() => {
    setLocation("");
  }, []);
  return (
    <>
      <div className="m-5 grid grid-cols-10 gap-5">
        <Link to="/iiicontrol/dashboard" className="btn-primary btn col-span-2">
          III Control <FontAwesomeIcon icon={faSliders} />
        </Link>
        <Link
          to="/iiicustomers/dashboard"
          className="btn-primary btn col-span-2"
        >
          III Customers <FontAwesomeIcon icon={faUsers} />
        </Link>
        <Link to="/tdaps/dashboard" className="btn-primary btn col-span-3">
          Threat Detection And Prevention System(TDAPS){" "}
          <FontAwesomeIcon icon={faGun} />
        </Link>
      </div>
    </>
  );
}
