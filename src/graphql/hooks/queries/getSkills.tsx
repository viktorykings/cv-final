import { useQuery } from '@apollo/client'
import { GET_SKILLS } from '../../queries/getSkills'
import { GET_SKILL_CATEGORIES } from '../../queries/get skillCategories'
import { getSkillsCategories } from '../../../types/queryTypes'

export const useGetSkills = () => {
  return useQuery(GET_SKILLS)
}
export const useGetSkillCategory = () => {
  return useQuery<getSkillsCategories>(GET_SKILL_CATEGORIES)
}
