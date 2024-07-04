import { useQuery } from '@apollo/client'
import { GET_POSITIONS } from '../graphql/queries/getPositionsQuery'
import { GetPositionsResult } from '../types/queryTypes'

export const useGetPositions = () => {
  return useQuery<GetPositionsResult>(GET_POSITIONS)
}
