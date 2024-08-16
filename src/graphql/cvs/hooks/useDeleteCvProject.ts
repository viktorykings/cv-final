import { useMutation } from '@apollo/client'
import { CvSkillResult, DeleteCvProjectArgs } from '../../types/queryTypes'
import { DELETE_CV_PROJECT } from '../deleteCvProject'
import { GET_USER } from '../../users/getUser'
import { GET_CV } from '../getCv'

export const useDeleteCvProject = (id: string, cvId: string | undefined) => {
  return useMutation<CvSkillResult, DeleteCvProjectArgs>(DELETE_CV_PROJECT, {
    refetchQueries: [
      {
        query: GET_USER,
        variables: { id: id }
      },
      {
        query: GET_CV,
        variables: { id: cvId }
      }
    ]
  })
}
