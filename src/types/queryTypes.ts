import type { AuthInput, AuthResult } from 'cv-graphql'

export type LoginArgs = {
  auth: AuthInput
}

export type LoginResult = {
  login: AuthResult
}
