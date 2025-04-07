import { useState } from "react";
import Button from "@mui/material/Button";
import LoginForm from "../features/auth/components/LoginForm";
import SignupForm from "../features/auth/components/SignupForm";

function Message() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSingupOpen] = useState(false);

  return (
    <>
      <h1>HabitForge</h1>
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
