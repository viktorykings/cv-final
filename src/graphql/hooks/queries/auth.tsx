import { useLazyQuery, useMutation } from '@apollo/client'
import { LoginResult, LoginArgs, SignupResult, SignupArgs } from '../../../types/queryTypes'
import { LOGIN, SIGNUP } from '../../queries/authQuery'

export const useLogin = () => {
  return useLazyQuery<LoginResult, LoginArgs>(LOGIN)
}

export const useSignup = () => {
  return useMutation<SignupResult, SignupArgs>(SIGNUP)
}
