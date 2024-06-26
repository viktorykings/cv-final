import { useLazyQuery } from '@apollo/client'
import { LOGIN } from '../graphql/queries/auth'
import { LoginResult, LoginArgs } from '../types/queryTypes'

export const useLogin = () => {
  return useLazyQuery<LoginResult, LoginArgs>(LOGIN)
}
