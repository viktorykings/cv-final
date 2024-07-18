import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../getProjects'
import { GetProjectsResult } from '../../../types/queryTypes'

export const useGetProjects = () => {
  return useQuery<GetProjectsResult>(GET_PROJECTS)
}
