import { useMutation } from '@apollo/client'
import { skillResult, skillArgs } from '../../../types/queryTypes'
import { ADD_PROFILE_SKILL } from '../addProfileSkill'

export const useAddProfileSkill = () => {
  return useMutation<skillResult, skillArgs>(ADD_PROFILE_SKILL)
}
