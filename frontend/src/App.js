import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createContext, useState, useContext } from "react";
import "../src/assets/App.css";
import HomePage from "./components/HomePage";
import CreateHabitForm from "../src/features/habit/components/CreateHabit";
import EditHabit from "../src/features/habit/components/EditHabit";
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
            background: "#1a2233",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000, // Ensures it's above other content
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            {!isLoggedIn && (
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Home
              </Link>
            )}
            {isLoggedIn && (
              <>
                <Link
                  to="/dashboard"
                  style={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/create-habit"
                  style={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Create Habit
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
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "1px solid white",
                color: "white",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "#1a2233";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "none";
                e.target.style.color = "white";
              }}
            >
              Logout
            </button>
          )}
        </nav>

        {/* Add padding to prevent content from being hidden behind the fixed navbar */}
        <div style={{ paddingTop: "50px" }}>
          {/* Routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-habit" element={<CreateHabitForm />} />
            <Route path="/edit-habit/:habitId" element={<EditHabit />} />
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
