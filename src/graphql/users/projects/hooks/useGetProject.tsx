import { useQuery } from '@apollo/client'
import { GetProjectResult } from '../../../types/queryTypes'
import { GET_PROJECT } from '../getProject'

export const useGetProject = (id: string | null) => {
  return useQuery<GetProjectResult>(GET_PROJECT, { variables: { id } })
}
