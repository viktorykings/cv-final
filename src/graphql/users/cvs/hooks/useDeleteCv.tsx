import { useMutation } from '@apollo/client'
import { DELETE_PROFILE_CV } from '../deleteCv'
import { GET_USER } from '../../getUser'
import { GET_CVS } from '../../../cvs/getCvs'

export const useDeleteCv = (id: string) => {
  return useMutation(DELETE_PROFILE_CV, {
    refetchQueries: [
      {
        query: GET_USER,
        variables: { id: id }
      },
      {
        query: GET_CVS
      }
    ]
  })
}
