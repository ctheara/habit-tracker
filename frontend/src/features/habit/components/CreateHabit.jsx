import { useState } from "react";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import habitClient from "../api/habit-client";
import HabitForm from "./HabitForm";

const CreateHabitForm = () => {
  const [formData, setFormData] = useState({
    habitName: "",
    description: "",
    motivation: "",
    duration: "",
    targetDate: "",
  });
  const [targetDate, setTargetDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const handleSubmit = async () => {
    const newErrors = {
      habitName: !formData.habitName.trim(),
      description: !formData.description.trim(),
      motivation: !formData.motivation.trim(),
      targetDate: !targetDate,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    const duration = getDuration(targetDate);

    const habitData = {
      ...formData,
      duration,
      targetDate: targetDate.toISOString(),
    };

    try {
      setIsSubmitting(true);
      await habitClient.createHabit(habitData);
      navigate("/dashboard");
    } catch (err) {
      setApiError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDuration = (targetDate) => {
    const now = dayjs();
    const days = targetDate.diff(now, "day");
    return `${days} days`;
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Create New Habit
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Start building a new habit and track your progress
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <HabitForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          apiError={apiError}
          setApiError={setApiError}
          targetDate={targetDate}
          setTargetDate={setTargetDate}
          isSubmitting={isSubmitting}
        />

        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 4 }}
        >
          <Button
            variant="outlined"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Habit"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateHabitForm;
