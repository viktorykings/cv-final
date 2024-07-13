import { useQuery } from '@apollo/client'
import { GET_USER } from '../getUser'
import { GetUserResult } from '../../types/queryTypes'

export const useGetUser = (id: string) => {
  return useQuery<GetUserResult>(GET_USER, { variables: { id } })
}
