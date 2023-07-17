import FullWidthProgress from "./FullWidthProgress";
import { useAdvancedDashboardProvider } from "../context/AdvancedDashboardContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { logUserOut } from "../auth/auth";

export default function Navbar() {
  const { siteName, isAdmin, showEditButton, setShowEditPage, showEditPage } =
    useAdvancedDashboardProvider();

  return (
    <nav className="shadow-lg">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <FullWidthProgress />
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="-ml-2 mr-2 flex items-center">
              <Link to="/" className="text-2xl font-bold">
                Dashboard
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">{siteName}</h1>
          </div>

          <div className="flex items-center">
            {showEditButton && isAdmin && (
              <label className="swap swap-flip btn btn-ghost">
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
              <ul className="menu menu-horizontal px-1">
                <li>
                  <details>
                    <summary>Menu</summary>
                    <ul className="p-2 bg-base-100">
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
