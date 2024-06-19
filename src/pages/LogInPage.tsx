import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { FormData } from '../types/formType';


const LogInPage = () => {
    const { register, handleSubmit,
        //  formState: { errors }
         } = useForm<FormData>();
    const onSubmit = handleSubmit(data => console.log(data));

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <Box
            onSubmit={onSubmit}
            component="form"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={'90vh'}
            flexDirection="column"
            gap={'20px'}
            sx={{
                '& > :not(style)': { width: '560px' },
            }}
            noValidate
            autoComplete="on"
        >
            <Typography variant="h4" gutterBottom align="center">
                Welcome Back
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center">
                Hello again! Sign in to continue.
            </Typography>
            <TextField id="email" label="Email" variant="outlined" color="secondary" type="email" InputLabelProps={{ style: { color: 'primary' } }}
                {...register("email")} />
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" color="secondary">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                    color="secondary"
                    {...register("password")}
                />
            </FormControl>

            <Button variant="contained" color="secondary" type="submit">Sign in</Button>
            <Button variant="text" color="secondary" component={Link} to="/auth/signup">I don't have an account</Button>
        </Box>
    );
}
export default LogInPage;