import type {
  AddCvSkillInput,
  AddProfileLanguageInput,
  AddProfileSkillInput,
  AuthInput,
  AuthResult,
  CreateCvInput,
  Cv,
  Profile,
  UpdateCvInput
} from 'cv-graphql'
import { IUser } from '../../shared/interfaces/IUser'
import { IDepartment } from '../../shared/interfaces/IDepartment'
import { IPosition } from '../../shared/interfaces/IPosition'
import { ISkill } from '../../shared/interfaces/ISkill'
import { ILanguageProficiency } from '../../shared/interfaces/ILanguageProficiency'
import { ICV } from '../../shared/interfaces/ICV'

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

export type skillResult = {
  profile: Profile
}
export type languageArgs = {
  language: AddProfileLanguageInput
}
export type CreateCVArgs = {
  cv: CreateCvInput
}
export type UpdateCVArgs = {
  cv: UpdateCvInput
}
export type CVResult = {
  cv: Cv
}
export type GetCvsResult = {
  cvs: ICV[]
}
export type GetCvResult = {
  cv: ICV
}
export type CvSkillResult = {
  cv: Cv
}
export type CvSkillArgs = {
  skill: AddCvSkillInput
}
