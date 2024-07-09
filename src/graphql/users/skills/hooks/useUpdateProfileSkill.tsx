import { useMutation } from '@apollo/client'
import { skillResult, skillArgs } from '../../../../types/queryTypes'
import { DELETE_PROFILE_SKILL } from '../deleteProfileSkill'

export const useUpdateProfileSkill = () => {
  return useMutation<skillResult, skillArgs>(DELETE_PROFILE_SKILL)
}
