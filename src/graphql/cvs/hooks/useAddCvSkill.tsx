import { useMutation } from '@apollo/client'
import { ADD_CV_SKILL } from '../addCvSkill'
import { CvSkillResult, CvSkillArgs } from '../../types/queryTypes'

export const useAddCvSkill = () => {
  return useMutation<CvSkillResult, CvSkillArgs>(ADD_CV_SKILL)
}
