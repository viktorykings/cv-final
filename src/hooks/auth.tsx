import { useLazyQuery, useMutation } from '@apollo/client'
import { LOGIN, SIGNUP } from '../graphql/queries/authQuery'
import { LoginResult, LoginArgs, SignupResult, SignupArgs } from '../types/queryTypes'

export const useLogin = () => {
  return useLazyQuery<LoginResult, LoginArgs>(LOGIN)
}

export const useSignup = () => {
  return useMutation<SignupResult, SignupArgs>(SIGNUP)
}
