import { useMutation } from '@apollo/client'
import { skillResult, languageArgs } from '../../../types/queryTypes'
import { ADD_PROFILE_LANGUAGE } from '../addProfileLanguage'

export const useAddProfileLang = () => {
  return useMutation<skillResult, languageArgs>(ADD_PROFILE_LANGUAGE)
}
