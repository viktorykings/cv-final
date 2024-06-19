import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText
} from '@mui/material'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormData } from '../../types/formType'

const Form = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<FormData>()
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  return (
    <>
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
    </>
  )
}

export default Form
