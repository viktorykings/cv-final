import { useQuery } from '@apollo/client'
import { getSkills } from '../../types/queryTypes'
import { GET_SKILLS } from '../getAllSkills'

export const useGetSkills = () => {
  return useQuery<getSkills>(GET_SKILLS)
}
