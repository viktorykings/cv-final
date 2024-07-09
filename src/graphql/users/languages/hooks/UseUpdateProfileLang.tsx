import { useMutation } from '@apollo/client'
import { languageArgs, skillResult } from '../../../../types/queryTypes'
import { UPDATE_PROFILE_LANGUAGE } from '../updateProfileLanguage'

export const useAddProfileLang = () => {
  return useMutation<skillResult, languageArgs>(UPDATE_PROFILE_LANGUAGE)
}
