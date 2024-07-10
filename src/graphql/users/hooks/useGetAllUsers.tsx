import { useQuery } from '@apollo/client'
import { GET_USERS } from '../getAllUsers'
import { GetUsersResult } from '../../types/queryTypes'

export const useGetAllUsers = () => {
  return useQuery<GetUsersResult>(GET_USERS)
}
