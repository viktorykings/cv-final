import { useMutation } from '@apollo/client'
import { ADD_PROFILE_SKILL } from '../../mutations/addProfileSkill'
import { DELETE_PROFILE_SKILL } from '../../mutations/deleteProfileSkill'
import { skillArgs, skillResult } from '../../../types/queryTypes'

export const useAddProfileSkill = () => {
  return useMutation<skillResult, skillArgs>(ADD_PROFILE_SKILL)
}
export const useUpdateProfileSkill = () => {
  return useMutation<skillResult, skillArgs>(DELETE_PROFILE_SKILL)
}
export const useDeleteProfileSkill = () => {
  return useMutation(DELETE_PROFILE_SKILL)
}
