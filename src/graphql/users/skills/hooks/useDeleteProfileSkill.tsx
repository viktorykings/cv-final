import { useMutation } from '@apollo/client'
import { DELETE_PROFILE_SKILL } from '../deleteProfileSkill'

export const useDeleteProfileSkill = () => {
  return useMutation(DELETE_PROFILE_SKILL)
}
