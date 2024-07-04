import type { AuthInput, AuthResult } from 'cv-graphql'
import { IUser } from '../interfaces/IUser'
import { IDepartment } from '../interfaces/IDepartment'
import { IPosition } from '../interfaces/IPosition'

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
export type GetUserResult = {
  user: IUser
}
export type GetDepatrmentsResult = {
  departments: IDepartment[]
}
export type GetPositionsResult = {
  positions: IPosition[]
}
