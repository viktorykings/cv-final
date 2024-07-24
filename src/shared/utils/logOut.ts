import { AUTH_TOKEN, userToken } from '../constants'

export const logOut = () => {
  localStorage.removeItem(AUTH_TOKEN)
  userToken('')
}
