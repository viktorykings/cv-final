import { useMutation } from '@apollo/client'
import { CvSkillResult, CvProjectArgs } from '../../types/queryTypes'
import { DELETE_CV_PROJECT } from '../deleteCvProject'

export const useDeleteCvProject = () => {
  return useMutation<CvSkillResult, CvProjectArgs>(DELETE_CV_PROJECT)
}
