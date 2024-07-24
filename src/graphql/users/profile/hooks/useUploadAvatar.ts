import { useMutation } from '@apollo/client'
import { UPLOAD_USER_AVATAR } from '../uploadAvatar'

export const useUploadAvatar = () => {
  return useMutation(UPLOAD_USER_AVATAR)
}
