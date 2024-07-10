import { useMutation } from '@apollo/client'
import { DELETE_PROFILE_CV } from '../deleteCv'

export const useDeleteCv = () => {
  return useMutation(DELETE_PROFILE_CV)
}
