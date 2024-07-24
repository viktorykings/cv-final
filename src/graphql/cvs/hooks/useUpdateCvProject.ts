import { useMutation } from '@apollo/client'
import { CvSkillResult, CvProjectArgs } from '../../types/queryTypes'
import { UPDATE_CV_PROJECT } from '../updateCvProject'

export const useUpdateCvProject = () => {
  return useMutation<CvSkillResult, CvProjectArgs>(UPDATE_CV_PROJECT)
}
