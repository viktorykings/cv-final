import { makeVar } from '@apollo/client'

export const AUTH_TOKEN = 'auth-token'

export const userToken = makeVar(localStorage.getItem(AUTH_TOKEN) || '')
