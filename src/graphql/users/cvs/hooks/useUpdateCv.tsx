import { useMutation } from '@apollo/client'
import { CVResult, UpdateCVArgs } from '../../../types/queryTypes'
import { UPDATE_PROFILE_CV } from '../updateCv'

export const useUpdateCv = () => {
  return useMutation<CVResult, UpdateCVArgs>(UPDATE_PROFILE_CV)
}
