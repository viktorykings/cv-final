import { useQuery } from '@apollo/client'
import { GET_DEPARTMENTS } from '../graphql/queries/getDepartmentsQuery'
import { GetDepatrmentsResult } from '../types/queryTypes'

export const useGetDepartments = () => {
  return useQuery<GetDepatrmentsResult>(GET_DEPARTMENTS)
}
