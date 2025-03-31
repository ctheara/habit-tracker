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

const SignupForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
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

  const handleSignup = async () => {
    const newErrors = {
      firstName: !formData.firstName.trim(),
      lastName: !formData.lastName.trim(),
      email: !formData.email.trim(),
      password: !formData.password.trim(),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    try {
      const response = await authClient.signupUser(formData);
      if (response.status === 201) {
        console.log("Signup successful");
        onClose();
        navigate("/create-habit");
      } else if (response.status === 409) {
        setApiError("Email already exists");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      setApiError("An error occurred. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          margin="dense"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          helperText={errors.firstName ? "First name is required" : ""}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          margin="dense"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          helperText={errors.lastName ? "Last name is required" : ""}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="dense"
          value={formData.email}
          onChange={handleChange}
          error={errors.email || Boolean(apiError)}
          helperText={errors.email ? "Email is required" : apiError}
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
        <Button variant="contained" onClick={handleSignup}>
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignupForm;
