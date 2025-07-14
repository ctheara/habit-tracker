import { TextField, Tooltip, IconButton, Box, Alert } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const HabitForm = ({
  formData,
  setFormData,
  errors,
  setErrors,
  apiError,
  setApiError,
  targetDate,
  setTargetDate,
  isSubmitting = false,
}) => {
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

  const validateForm = () => {
    const newErrors = {
      habitName: !formData.habitName.trim(),
      description: !formData.description.trim(),
      motivation: !formData.motivation.trim(),
      targetDate: !targetDate,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const getFormDataForSubmission = () => {
    const duration = getDuration(targetDate);
    return {
      ...formData,
      duration,
      targetDate: targetDate.toISOString(),
    };
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {apiError && <Alert severity="error">{apiError}</Alert>}

      <TextField
        fullWidth
        required
        label="Habit Name"
        name="habitName"
        value={formData.habitName}
        onChange={handleChange}
        error={errors.habitName}
        helperText={errors.habitName ? "Habit name is required" : ""}
        disabled={isSubmitting}
      />

      <TextField
        fullWidth
        required
        label="Description"
        name="description"
        multiline
        rows={3}
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        helperText={errors.description ? "Description is required" : ""}
        disabled={isSubmitting}
      />

      <TextField
        fullWidth
        required
        label="Motivation"
        name="motivation"
        multiline
        rows={2}
        value={formData.motivation}
        onChange={handleChange}
        error={errors.motivation}
        helperText={errors.motivation ? "Motivation is required" : ""}
        disabled={isSubmitting}
      />

      <Box sx={{ position: "relative", zIndex: 0 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DatePicker
              required
              label="Target Date"
              value={targetDate}
              onChange={(newValue) => setTargetDate(newValue)}
              sx={{ flexGrow: 1 }}
              disabled={isSubmitting}
            />
            <Tooltip title="It takes around 60 days for a new habit to stick">
              <IconButton disabled={isSubmitting}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export default HabitForm;
