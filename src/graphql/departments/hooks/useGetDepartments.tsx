import { useQuery } from '@apollo/client'
import { GET_DEPARTMENTS } from '../getAllDepartments'
import { GetDepatrmentsResult } from '../../types/queryTypes'

export const useGetDepartments = () => {
  return useQuery<GetDepatrmentsResult>(GET_DEPARTMENTS)
}
