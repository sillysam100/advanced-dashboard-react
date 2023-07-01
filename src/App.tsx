import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import SitePage from "./pages/Site";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";


function App() {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/site/:id"
          element={
            <PrivateRoute>
              <SitePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
