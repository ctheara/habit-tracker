import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../src/assets/App.css";
import Message from "../src/features/test-delete/Message";
import CreateHabit from "../src/features/test-delete/SetupHabit";
import MainDashboard from "../src/features/test-delete/MainDashboard";

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
          <Route path="/" element={<Message />} />
          <Route path="/create-habit" element={<CreateHabit />} />
          <Route path="/dashboard" element={<MainDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
