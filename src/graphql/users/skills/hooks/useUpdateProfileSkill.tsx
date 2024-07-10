import { useMutation } from '@apollo/client'
import { skillResult, skillArgs } from '../../../types/queryTypes'
import { UPDATE_PROFILE_SKILL } from '../updateProfileSkill'

export const useUpdateProfileSkill = () => {
  return useMutation<skillResult, skillArgs>(UPDATE_PROFILE_SKILL)
}
