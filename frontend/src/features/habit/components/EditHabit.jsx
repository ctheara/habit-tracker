import { useState, useEffect } from "react";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import habitClient from "../api/habit-client";
import HabitForm from "./HabitForm";

const EditHabit = () => {
  const { habitId } = useParams();
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadHabitData();
  }, [habitId]);

  const loadHabitData = async () => {
    try {
      setLoading(true);
      const response = await habitClient.getHabitById(habitId);
      const habit = response.data;

      setFormData({
        habitName: habit.habitName || "",
        description: habit.description || "",
        motivation: habit.motivation || "",
        duration: habit.duration || "",
        targetDate: habit.targetDate || "",
      });

      if (habit.targetDate) {
        setTargetDate(dayjs(habit.targetDate));
      }
    } catch (error) {
      console.error("Failed to load habit:", error);
      setApiError("Failed to load habit data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      setSaving(true);
      await habitClient.updateHabit(habitId, habitData);
      navigate("/dashboard");
    } catch (err) {
      setApiError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const getDuration = (targetDate) => {
    const now = dayjs();
    const days = targetDate.diff(now, "day");
    return `${days} days`;
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      try {
        setSaving(true);
        await habitClient.deleteHabit(habitId);
        navigate("/dashboard");
      } catch (err) {
        setApiError("Failed to delete habit. Please try again.");
        console.error(err);
      } finally {
        setSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h6">Loading habit...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleCancel}
          sx={{ mb: 2 }}
        >
          Back to Dashboard
        </Button>

        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Edit Habit
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Update your habit details and goals
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
          isSubmitting={saving}
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            disabled={saving}
          >
            Delete Habit
          </Button>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="outlined" onClick={handleCancel} disabled={saving}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditHabit;
