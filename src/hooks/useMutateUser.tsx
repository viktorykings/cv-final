import { useMutation } from '@apollo/client'
import { UPDATE_USER, UPDATE_USER_PROFILE } from '../graphql/queries/mutateUserQuery'

export const useUpdateUserProfile = () => {
  return useMutation(UPDATE_USER_PROFILE)
}
export const useUpdateUser = () => {
  return useMutation(UPDATE_USER)
}
