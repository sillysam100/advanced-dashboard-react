import FullWidthProgress from "./FullWidthProgress";
import { useAdvancedDashboardProvider } from "../context/AdvancedDashboardContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faFloppyDisk,
  faLocation,
  faAt,
  faWheelchair,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { logUserOut } from "../auth/auth";
import Alerts from "./Alerts";

export default function Navbar() {
  const { siteName, showEditButton, setShowEditPage, showEditPage, location } =
    useAdvancedDashboardProvider();

  return (
    <nav className="shadow-lg">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <FullWidthProgress />
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="-ml-2 mr-2 flex items-center">
              <Link to="/home" className="text-2xl font-bold">
                III Admin
              </Link>
              <h1 className="breadcrumbs ml-5 rounded-md bg-gray-100 p-3 text-sm">
                <ul>
                  <li>
                    <Link to="/home" className="">
                      Home
                    </Link>
                  </li>
                  <li>{location}</li>
                </ul>
              </h1>
            </div>
          </div>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">{siteName}</h1>
          </div>

          <div className="flex items-center">
            {showEditButton && (
              <label className="swap btn-ghost swap-flip btn">
                <input type="checkbox" />
                <div
                  className={`swap-off`}
                  onClick={() => setShowEditPage(true)}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </div>
                <div
                  className={`swap-on`}
                  onClick={() => setShowEditPage(false)}
                >
                  <FontAwesomeIcon icon={faFloppyDisk} />
                </div>
              </label>
            )}

            <div className="flex-none">
              <Alerts />
              <ul className="menu menu-horizontal px-1">
                <li>
                  <details>
                    <summary>Menu</summary>
                    <ul className="bg-base-100 p-2">
                      <li>
                        <a onClick={logUserOut}>Logout</a>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
