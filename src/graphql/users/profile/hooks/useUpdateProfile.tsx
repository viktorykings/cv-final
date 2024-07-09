import { useMutation } from '@apollo/client'
import { UPDATE_USER_PROFILE } from '../updateProfile'

export const useUpdateUserProfile = () => {
  return useMutation(UPDATE_USER_PROFILE)
}
