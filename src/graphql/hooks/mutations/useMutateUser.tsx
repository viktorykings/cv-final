import { useMutation } from '@apollo/client'
import { UPDATE_USER, UPDATE_USER_PROFILE } from '../../mutations/mutateUserQuery'

export const useUpdateUserProfile = () => {
  return useMutation(UPDATE_USER_PROFILE)
}
export const useUpdateUser = () => {
  return useMutation(UPDATE_USER)
}
