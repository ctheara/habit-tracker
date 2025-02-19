// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';

// const LoginForm = () => {
//     return (
//         <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
//             <TextField
//                 required
//                 id="outlined-required"
//                 label="Email"
//                 defaultValue=""
//             />
//             <TextField
//                 required
//                 id="outlined-required"
//                 label="Password"
//                 defaultValue=""
//             />
//             <Button variant="contained">Submit</Button>
//         </Box>
//     );
// };

// export default LoginForm;

import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const LoginForm = ({ open, onClose }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = () => {
    onClose(); // Close the dialog
    navigate("/create-habit"); // Navigate to the CreateHabit page
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Email" margin="dense" />
        <TextField fullWidth label="Password" type="password" margin="dense" />
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
