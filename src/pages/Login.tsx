import { logUserIn } from "../auth/auth";
import { useState } from "react";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
import { useAdvancedDashboardProvider } from "../context/AdvancedDashboardContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<boolean>(false);
  const { setIsAdmin } = useAdvancedDashboardProvider();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    logUserIn(username, password)
      .then((res) => {
        setIsAdmin(res.role === "admin");
        navigate("/");
      })
      .catch(() => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      });
  };

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      {error && (
        <Toast message="Login failed. Please check your credentials." />
      )}
      <div className="w-full p-6 m-auto rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full input input-bordered"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a href="#" className="text-xs hover:underline hover:text-blue-600">
            Forget Password?
          </a>
          <div>
            <button className="btn btn-block">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
