import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import Form from '../components/Form/Form'

const LogInPage = () => {
  const methods = useForm()
  const onSubmit = (data: FieldValues) => console.log(data)

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
        '& > :not(style)': { width: '560px' }
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
      <FormProvider {...methods}>
        <Form />
      </FormProvider>
      <Button variant="contained" color="secondary" type="submit">
        Sign in
      </Button>
      <Button variant="text" color="secondary" component={Link} to="/auth/signup">
        I don't have an account
      </Button>
    </Box>
  )
}
export default LogInPage
