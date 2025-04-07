import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../src/assets/App.css";
import HomePage from "./components/HomePage";
import CreateHabitForm from "../src/features/habit/components/CreateHabit";
import MainDashboard from "./components/MainDashboard";

function App() {
  return (
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
        }}
      >
        <Link to="/" style={{ textDecoration: "none", fontWeight: "bold" }}>
          Home
        </Link>
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
        <Link
          to="/dashboard"
          style={{ textDecoration: "none", fontWeight: "bold" }}
        >
          User Profile
        </Link>
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
  );
}

export default App;
