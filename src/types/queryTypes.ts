import type { AuthInput, AuthResult } from 'cv-graphql'

export type LoginArgs = {
  auth: AuthInput
}

export type LoginResult = {
  login: AuthResult
}

export type SignupResult = {
  signup: AuthResult
}
export type SignupArgs = {
  auth: AuthInput
}
