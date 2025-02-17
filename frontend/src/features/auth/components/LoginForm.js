import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const LoginForm = () => {
    return (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <TextField
                required
                id="outlined-required"
                label="Email"
                defaultValue=""
            />
            <TextField
                required
                id="outlined-required"
                label="Password"
                defaultValue=""
            />
            <Button variant="contained">Submit</Button>
        </Box>
    );
};

export default LoginForm;
