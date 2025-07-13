import { useEffect } from "react";

const baseURL = process.env.REACT_APP_API_BASE_URL ?? "http://localhost:5000";

function KeepAlivePing() {
  useEffect(() => {
    const pingBackend = () => {
      fetch(`${baseURL}/`)
        .then((res) => {
          if (!res.ok) {
            console.error("Ping failed:", res.status);
          } else {
            console.log(`Backend is alive at ${baseURL}`);
          }
        })
        .catch((err) => {
          console.error("Ping error:", err);
        });
    };

    pingBackend();

    // Set interval to ping every 5 minutes
    const intervalId = setInterval(pingBackend, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return null;
}

export default KeepAlivePing;
