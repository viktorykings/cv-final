import { useMutation } from '@apollo/client'
import { UPDATE_PROFILE_LANGUAGE } from '../updateProfileLanguage'

export const useUpdateProfileLang = () => {
  return useMutation(UPDATE_PROFILE_LANGUAGE)
}
