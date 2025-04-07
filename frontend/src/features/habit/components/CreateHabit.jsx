import { useState } from "react";
import { TextField, Button, Tooltip, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import habitClient from "../api/habit-client";

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
    setApiError("");
  };

  const getDuration = (targetDate) => {
    const now = dayjs();
    const days = targetDate.diff(now, "day");
    return `${days} days`;
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
      await habitClient.createHabit(habitData);

      navigate("/dashboard");
    } catch (err) {
      setApiError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <h1>Create Habit</h1>
      <TextField
        fullWidth
        required
        label="New Habit"
        name="habitName"
        margin="dense"
        value={formData.habitName}
        onChange={handleChange}
        error={errors.habitName}
        helperText={errors.habitName ? "Field is required" : ""}
      />
      <Tooltip title="Short desciprtion about your habit">
        <TextField
          fullWidth
          required
          label="Description"
          name="description"
          margin="dense"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          helperText={errors.description ? "Description is required" : ""}
        />
      </Tooltip>
      <TextField
        fullWidth
        required
        label="Motivation"
        name="motivation"
        margin="dense"
        value={formData.motivation}
        onChange={handleChange}
        error={errors.motivation}
        helperText={errors.motivation ? "Motivation is required" : ""}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            required
            label="Target Date"
            value={targetDate}
            onChange={(newValue) => setTargetDate(newValue)}
          />
          <Tooltip title="It takes around 60 days for a new habit to stick">
            <IconButton>
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </DemoContainer>
      </LocalizationProvider>

      <br />
      <Button onClick={handleCancel}>Cancel</Button>
      <Button variant="contained" onClick={handleSubmit}>
        Create
      </Button>
    </>
  );
};

export default CreateHabitForm;
