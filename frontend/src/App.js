import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createContext, useState, useContext } from "react";
import "../src/assets/App.css";
import HomePage from "./components/HomePage";
import CreateHabitForm from "../src/features/habit/components/CreateHabit";
import MainDashboard from "./components/MainDashboard";
import authClient from "./features/auth/api/auth-client";
import KeepAlivePing from "./utils/keep-backend-alive";

// Auth Context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    try {
      await authClient.logoutUser();
      setIsLoggedIn(false);
      console.log("logout successful");
      window.location.href = "/";
    } catch (error) {
      console.warn(`logout unsuccessful. error: ${JSON.stringify(error)}`);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

function App() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  return (
    <>
      <KeepAlivePing />
      <Router>
        {/* Fixed Navigation Bar */}
        <nav
          style={{
            display: "flex",
            gap: "1rem",
            padding: "10px",
            background: "#f5f5f5",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000, // Ensures it's above other content
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            {!isLoggedIn && (
              <Link
                to="/"
                style={{ textDecoration: "none", fontWeight: "bold" }}
              >
                Home
              </Link>
            )}
            {isLoggedIn && (
              <>
                <Link
                  to="/create-habit"
                  style={{ textDecoration: "none", fontWeight: "bold" }}
                >
                  Create Habit
                </Link>
                <Link
                  to="/dashboard"
                  style={{ textDecoration: "none", fontWeight: "bold" }}
                >
                  Dashboard
                </Link>
                {/* <Link
                to="/dashboard"
                style={{ textDecoration: "none", fontWeight: "bold" }}
              >
                User Profile
              </Link> */}
              </>
            )}
          </div>
          {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </nav>

        {/* Add padding to prevent content from being hidden behind the fixed navbar */}
        <div style={{ paddingTop: "50px" }}>
          {/* Routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-habit" element={<CreateHabitForm />} />
            <Route path="/dashboard" element={<MainDashboard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default function AppWithProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
