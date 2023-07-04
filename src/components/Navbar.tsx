import FullWidthProgress from "./FullWidthProgress";
import { useAdvancedDashboardProvider } from "../context/AdvancedDashboardContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { siteName } = useAdvancedDashboardProvider();

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
            <div className="ml-10 flex items-baseline space-x-4">
              <h1 className="text-2xl font-bold">{siteName}</h1>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <details>
                    <summary>Menu</summary>
                    <ul className="p-2 bg-base-100">
                      <li>
                        <a>Logout</a>
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
