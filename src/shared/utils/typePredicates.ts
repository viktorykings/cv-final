import { IUser } from '../interfaces/IUser'
import { TArray, TCvsTableHeaderProps, TUsersTableHeaderProps } from '../interfaces/TSort'

export function isUsersArr(arr: TArray): arr is IUser[] {
  return (arr as IUser[])[0].profile !== undefined
}

export function isCVsSortKeys(
  key: keyof TCvsTableHeaderProps | keyof TUsersTableHeaderProps
): key is keyof TCvsTableHeaderProps {
  return key !== 'full_name'
}
