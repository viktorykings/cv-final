import { TArray } from '../interfaces/TSort'
import { isUsersArr } from './typePredicates'

function customFilter(arr: TArray | undefined, searchQuery: string) {
  if (!arr) return arr

  if (!searchQuery) {
    return arr
  }

  if (isUsersArr(arr)) {
    return arr.filter(d => d.profile.full_name?.toLowerCase().includes(searchQuery))
  } else {
    return arr.filter(
      d =>
        d.name?.toLowerCase().includes(searchQuery) ||
        d.description?.toLowerCase().includes(searchQuery)
    )
  }
}

export default customFilter
