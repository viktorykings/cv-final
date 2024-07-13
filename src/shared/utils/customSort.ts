import { ICV } from '../interfaces/ICV'
import { IUser } from '../interfaces/IUser'
import { TCvsTableHeaderProps, TUsersTableHeaderProps } from '../interfaces/TSort'
import { SortOrder } from '../interfaces/TSortOrder'
import { isCVsSortKeys, isUsersArr } from './typePredicates'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator<Key extends keyof TCvsTableHeaderProps>(
  order: SortOrder,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function customSort(
  arr: ICV[] | IUser[],
  order: SortOrder,
  orderBy: keyof TCvsTableHeaderProps | keyof TUsersTableHeaderProps
) {
  console.log(!isUsersArr(arr), isCVsSortKeys(orderBy))
  if (!isUsersArr(arr) && isCVsSortKeys(orderBy))
    return arr.slice().sort(getComparator(order, orderBy))
}
export default customSort
