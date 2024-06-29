import { ICV } from './ICV'
import { IDepartment } from './IDepartment'
import { IPosition } from './IPosition'
import { IProfile } from './IProfile'

export interface IUser {
  id: string
  created_at: string
  email: string
  is_verified?: boolean
  profile: IProfile
  cvs?: ICV[]
  department?: IDepartment
  department_name?: string
  position?: IPosition
  position_name?: string
  role: string
}
