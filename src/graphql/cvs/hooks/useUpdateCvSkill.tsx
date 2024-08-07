import { useMutation } from '@apollo/client'
import { CvSkillResult, UpdateCvSkillArgs } from '../../types/queryTypes'
import { UPDATE_CV_SKILL } from '../updateCvSkill'

export const useUpdateCvSkill = () => {
  return useMutation<CvSkillResult, UpdateCvSkillArgs>(UPDATE_CV_SKILL)
}
