import { useMutation } from '@apollo/client'
import { DELETE_USER_AVATAR } from '../deleteAvatar'

export const useDeleteAvatar = () => {
  return useMutation(DELETE_USER_AVATAR)
}
