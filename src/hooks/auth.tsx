import { useLazyQuery } from '@apollo/client'
import { GET_CVS, LOGIN } from '../queries/auth'
import { LoginResult, LoginArgs } from '../types/queryTypes'

export const useLogin = () => {
  return useLazyQuery<LoginResult, LoginArgs>(LOGIN)
}
export const useCvs = () => {
  return useLazyQuery(GET_CVS)
}
