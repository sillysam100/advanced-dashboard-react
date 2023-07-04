import { useAdvancedDashboardProvider } from "../context/AdvancedDashboardContext";
import { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";

export default function FullWidthProgress() {
  const { loading } = useAdvancedDashboardProvider();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          const newProgress = oldProgress + 10;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 10);

      return () => {
        clearInterval(timer);
      };
    } else {
      setProgress(0);
    }
  }, [loading]);

  if (!loading && progress === 0) return <div className=""></div>;
  return (
    <div className="w-full">
      <LoadingBar
        color="#4285F4"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    </div>
  );
}
