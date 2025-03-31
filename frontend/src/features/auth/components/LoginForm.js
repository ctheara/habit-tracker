import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

import authClient from "../api/auth-client";

const LoginForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
    setApiError("");
  };

  const handleLogin = async () => {
    const newErrors = {
      email: !formData.email.trim(),
      password: !formData.password.trim(),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    try {
      const response = await authClient.loginUser(formData);

      if (response.status === 200) {
        onClose();
        navigate("/dashboard");
      }
    } catch (error) {}
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="dense"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email ? "Email is required" : ""}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="dense"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          helperText={errors.password ? "Password is required" : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginForm;
