import { useMutation } from '@apollo/client'
import { CvSkillResult, CvSkillArgs } from '../../types/queryTypes'
import { UPDATE_CV_SKILL } from '../updateCvSkill'

export const useUpdateCvSkill = () => {
  return useMutation<CvSkillResult, CvSkillArgs>(UPDATE_CV_SKILL)
}
