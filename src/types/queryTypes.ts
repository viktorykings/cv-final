import type {
  AddProfileLanguageInput,
  AddProfileSkillInput,
  AuthInput,
  AuthResult,
  Profile
} from 'cv-graphql'
import { IUser } from '../interfaces/IUser'
import { IDepartment } from '../interfaces/IDepartment'
import { IPosition } from '../interfaces/IPosition'
import { ISkill } from '../interfaces/ISkill'
import { ILanguageProficiency } from '../interfaces/ILanguageProficiency'

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

export type getSkillsCategories = {
  skillCategories: string[]
}
export type getSkills = {
  skills: ISkill[]
}
export type getLanguages = {
  languages: ILanguageProficiency[]
}

export type skillArgs = {
  skill: AddProfileSkillInput
}
export type languageArgs = {
  skill: AddProfileLanguageInput
}

export type skillResult = {
  profile: Profile
}
