import { useQuery } from '@apollo/client'
import { GET_USER } from '../../queries/getUserQuery'
import { GetUserResult } from '../../../types/queryTypes'

export const useGetUser = (id: string) => {
  return useQuery<GetUserResult>(GET_USER, { variables: { id } })
}
