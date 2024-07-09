import { useLazyQuery } from '@apollo/client'
import { LoginResult, LoginArgs } from '../../../types/queryTypes'
import {} from '../signup'
import { LOGIN } from '../login'

export const useLogin = () => {
  return useLazyQuery<LoginResult, LoginArgs>(LOGIN)
}
