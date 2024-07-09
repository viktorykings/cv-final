import { useMutation } from '@apollo/client'
import { skillResult, languageArgs } from '../../../../types/queryTypes'
import { DELETE_PROFILE_SKILL } from '../../skills/deleteProfileSkill'

export const useAddProfileSkill = () => {
  return useMutation<skillResult, languageArgs>(DELETE_PROFILE_SKILL)
}
