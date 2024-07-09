import { useQuery } from '@apollo/client'
import { GET_SKILL_CATEGORIES } from '../getskillsCategories'
import { getSkillsCategories } from '../../../types/queryTypes'

export const useGetSkillCategory = () => {
  return useQuery<getSkillsCategories>(GET_SKILL_CATEGORIES)
}
