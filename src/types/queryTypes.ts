import type { AuthInput, AuthResult } from 'cv-graphql'
import { IUser } from '../interfaces/IUser'

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

export type GetUsersResult = {
  users: IUser[] | undefined
}
