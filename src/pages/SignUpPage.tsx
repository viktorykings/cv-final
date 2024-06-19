import { Box, Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import Form from '../components/Form/Form'
import { FieldValues, FormProvider, useForm } from "react-hook-form";

const SignUpPage = () => {
    const methods = useForm();
    const onSubmit = (data: FieldValues) => console.log(data);

    return (
        <Box
            onSubmit={methods.handleSubmit(onSubmit)}
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
            <Typography variant="h4" gutterBottom align="center" >
                Register Now            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center">
                Welcome! Sign up to continue.            </Typography>
            <FormProvider {...methods} >
                <Form />
            </FormProvider>

            <Button variant="contained" color="secondary" type="submit">Sign up</Button>
            <Button variant="text" color="secondary" component={Link} to="/auth/login">I have an account</Button>
        </Box>
    );
}
export default SignUpPage;