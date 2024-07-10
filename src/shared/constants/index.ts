import { makeVar } from '@apollo/client'

export const AUTH_TOKEN = 'auth-token'
export const USER_ID = 'user-id'
export const USER_NAME = 'user-name'
export const USER_EMAIL = 'user-email'

export const userToken = makeVar(localStorage.getItem(AUTH_TOKEN) || '')
export const userID = makeVar(localStorage.getItem(USER_ID) || '')
export const userName = makeVar(localStorage.getItem(USER_NAME) || '')
export const userEmail = makeVar(localStorage.getItem(USER_EMAIL) || '')
