import { useMutation } from '@apollo/client'
import { CvSkillResult, CvProjectArgs } from '../../types/queryTypes'
import { ADD_CV_PROJECT } from '../addCvProject'

export const useAddCvProject = () => {
  return useMutation<CvSkillResult, CvProjectArgs>(ADD_CV_PROJECT)
}
