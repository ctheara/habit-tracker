import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CreateHabit = ({ open, onClose }) => {
  return (
    <>
      <h1>Create Your Habit</h1>
      <TextField fullWidth label="Habit" margin="dense" />
      <TextField fullWidth label="Description" margin="dense" />
      <TextField fullWidth label="Motivation" margin="dense" />
      <TextField fullWidth label="Target Date" margin="dense" />
      <TextField fullWidth label="Duration" type="password" margin="dense" />

      <Button onClick={onClose}>Cancel</Button>
      <Button variant="contained">Create</Button>
    </>
  );
};

export default CreateHabit;
