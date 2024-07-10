import { useMutation } from '@apollo/client'
import { DELETE_PROFILE_LANGUAGE } from '../deleteProfileLanguage'

export const useDeleteProfileLang = () => {
  return useMutation(DELETE_PROFILE_LANGUAGE)
}
