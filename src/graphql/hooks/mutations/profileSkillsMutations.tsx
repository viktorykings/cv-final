import { useMutation } from '@apollo/client'
import { ADD_PROFILE_SKILL } from '../../mutations/addProfileSkill'
import { DELETE_PROFILE_SKILL } from '../../mutations/deleteProfileSkill'

export const useAddProfileSkill = () => {
  return useMutation(ADD_PROFILE_SKILL)
}
export const useUpdateProfileSkill = () => {
  return useMutation(DELETE_PROFILE_SKILL)
}
export const useDeleteProfileSkill = () => {
  return useMutation(DELETE_PROFILE_SKILL)
}
