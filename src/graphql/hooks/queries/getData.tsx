import { useQuery } from '@apollo/client'
import { GET_USERS } from '../../queries/getDataQuery'
import { GetUsersResult } from '../../../types/queryTypes'

export const useGetUsers = () => {
  return useQuery<GetUsersResult>(GET_USERS)
}
