import { useMutation } from '@apollo/client'
import { SignupResult, SignupArgs } from '../../../types/queryTypes'
import { SIGNUP } from '../signup'

export const useSignup = () => {
  return useMutation<SignupResult, SignupArgs>(SIGNUP)
}
