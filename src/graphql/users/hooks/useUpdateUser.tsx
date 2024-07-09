import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../updateUser'

export const useUpdateUser = () => {
  return useMutation(UPDATE_USER)
}
