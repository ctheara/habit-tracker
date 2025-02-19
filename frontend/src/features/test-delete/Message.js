import { useState } from "react";
import Button from "@mui/material/Button";
import LoginForm from "../auth/components/LoginForm";
import SignupForm from "../auth/components/SignupForm";

function Message() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSingupOpen] = useState(false);
  const name = "";

  if (name) {
    return <h1>Hello {name}</h1>;
  }
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
