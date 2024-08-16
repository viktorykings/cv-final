import { ILanguageProficiency } from './ILanguageProficiency'
import { IProject } from './IProject'
import { ISkillMastery } from './ISkillMastery'
import { IUser } from './IUser'

export interface ICV {
  id: string
  created_at: string
  name: string
  education?: string
  description: string
  user: IUser
  projects?: ICvProject[]
  skills: ISkillMastery[]
  languages: ILanguageProficiency[]
}

interface ICvProject {
  id: number
  project: IProject
  name: string
  internal_name: string
  description: string
  domain: string
  start_date: string
  end_date?: string
  roles: string[]
  responsibilities: string[]
}
