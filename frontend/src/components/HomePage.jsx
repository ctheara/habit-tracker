import { useState } from "react";
import Button from "@mui/material/Button";
import LoginForm from "../features/auth/components/LoginForm";
import SignupForm from "../features/auth/components/SignupForm";
import Typography from "@mui/material/Typography";

function Message() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSingupOpen] = useState(false);

  return (
    <>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        HabitForge
      </Typography>
      <Button variant="contained" onClick={() => setSingupOpen(true)}>
        Sign Up
      </Button>
      <Button variant="contained" onClick={() => setLoginOpen(true)}>
        Login
      </Button>

      <SignupForm open={isSignupOpen} onClose={() => setSingupOpen(false)} />
      <LoginForm open={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}

export default Message;
