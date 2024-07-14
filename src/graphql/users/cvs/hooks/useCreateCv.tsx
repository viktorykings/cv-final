import { useMutation } from '@apollo/client'
import { CreateCVArgs, CVResult } from '../../../types/queryTypes'
import { CREATE_PROFILE_CV } from '../createCv'

export const useCreateCv = () => {
  return useMutation<CVResult, CreateCVArgs>(CREATE_PROFILE_CV)
}
