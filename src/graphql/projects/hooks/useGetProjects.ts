import { useQuery } from '@apollo/client'
import { GetProjectsResult } from '../../types/queryTypes'
import { GET_PROJECTS } from '../getAllProjects'

export const useGetProjects = () => {
  return useQuery<GetProjectsResult>(GET_PROJECTS)
}
