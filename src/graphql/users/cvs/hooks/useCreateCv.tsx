import { useMutation } from '@apollo/client'
import { CreateCVArgs, CVResult } from '../../../types/queryTypes'
import { CREATE_PROFILE_CV } from '../createCv'
import { GET_USER } from '../../getUser'
import { GET_CVS } from '../../../cvs/getCvs'

export const useCreateCv = (id: string) => {
  return useMutation<CVResult, CreateCVArgs>(CREATE_PROFILE_CV, {
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
