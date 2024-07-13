import { ICV } from './ICV'
import { IUser } from './IUser'

export type TArray = IUser[] | ICV[]
export type TUsersTableHeaderProps = Pick<IUser['profile'], 'full_name'>
export type TCvsTableHeaderProps = Pick<ICV, 'id' | 'name' | 'description'>
