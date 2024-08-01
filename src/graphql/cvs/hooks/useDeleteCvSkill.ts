import { useMutation } from '@apollo/client'
import { CvSkillResult, DeleteCvSkill } from '../../types/queryTypes'
import { DELETE_CV_SKILL } from '../deleteCvSkill'

export const useDeleteCvSkill = () => {
  return useMutation<CvSkillResult, DeleteCvSkill>(DELETE_CV_SKILL)
}
