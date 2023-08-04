import LoginPage from "./pages/Login";
import DashboardPage from "./pages/iiicontrol/ControlDashboard";
import CustomersDashboardPage from "./pages/iiicustomers/CustomersDashboard";
import SitePage from "./pages/iiicontrol/Site";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import { AdvancedDashboardProvider } from "./context/AdvancedDashboardContext";
import Home from "./pages/Home";
import TDAPSDashboard from "./components/tdaps/TdapsDashboard";

function App() {
  return (
    <div className="h-screen w-screen">
      <AdvancedDashboardProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/iiicontrol/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/iiicontrol/site/:id"
            element={
              <PrivateRoute>
                <SitePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/iiicustomers/dashboard"
            element={
              <PrivateRoute>
                <CustomersDashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tdaps/dashboard"
            element={
              <PrivateRoute>
                <TDAPSDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AdvancedDashboardProvider>
    </div>
  );
}

export default App;
