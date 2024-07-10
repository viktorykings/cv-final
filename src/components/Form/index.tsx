import {
  Box,
  Typography,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { LoginArgs, LoginResult, SignupArgs, SignupResult } from '../../graphql/types/queryTypes'
import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  LazyQueryExecFunction,
  MutationFunctionOptions
} from '@apollo/client'

type TFormData = {
  email: string
  password: string
}

interface IForm {
  isRegisterForm: boolean
  login?: LazyQueryExecFunction<LoginResult, LoginArgs>
  signup?: (
    options?: // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    MutationFunctionOptions<SignupResult, SignupArgs, DefaultContext, ApolloCache<any>> | undefined
  ) => Promise<FetchResult<SignupResult>>
}

const Form = ({ isRegisterForm, login, signup }: IForm) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TFormData>()

  const onSubmit: SubmitHandler<TFormData> = async formData => {
    console.log(formData)
    if (signup) await signup({ variables: { auth: formData } })
    if (login) await login({ variables: { auth: formData } })
  }

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
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
        {isRegisterForm ? 'Register Now' : 'Welcome Back'}
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center">
        {isRegisterForm ? 'Welcome! Sign up to continue.' : 'Hello again! Sign in to continue.'}
      </Typography>

      <TextField
        id="email"
        label="Email"
        helperText={errors.email?.message}
        variant="outlined"
        color="secondary"
        type="email"
        InputLabelProps={{ style: { color: 'primary' } }}
        error={!!errors.email}
        {...register('email', {
          required: { value: true, message: 'Email is required' },
          pattern: { value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Enter valid email' }
        })}
        aria-invalid={errors.email ? 'true' : 'false'}
      />
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password" color="secondary">
          Password
        </InputLabel>
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
          error={!!errors.password}
          {...register('password', {
            required: { value: true, message: 'At least 8 characters' },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              message: 'At least one number, uppercase and lowercase char'
            }
          })}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {!!errors.password && (
          <FormHelperText error id="password-error">
            {errors.password.message}
          </FormHelperText>
        )}
      </FormControl>

      <Button variant="contained" color="secondary" type="submit">
        Sign in
      </Button>
      <Button variant="text" color="secondary" component={Link} to="/auth/signup">
        {isRegisterForm ? 'I have an account' : "I don't have an account"}
      </Button>
      <ToastContainer />
    </Box>
  )
}
export default Form
