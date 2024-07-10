import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { GetUsersResult } from '../../graphql/types/queryTypes'
import { IUser } from '../../shared/interfaces/IUser'
import SearchBar from '../../shared/components/Search'
import { useState } from 'react'
import { Paths } from '../../routes/paths'
import { Link } from 'react-router-dom'

const filterData = (query: string, data: IUser[] | undefined) => {
  if (!data) return

  if (!query) {
    return data
  } else {
    return data.filter(d => d.profile.full_name?.toLowerCase().includes(query))
  }
}

type SortKey = 'email' | 'department_name' | 'first_name' | 'last_name' | 'position_name' | null
type SortOrder = 'asc' | 'desc'

const sort = (valueA: string | undefined, valueB: string | undefined, sortOrder: string) => {
  if (valueA === valueB) return 0

  if (!valueA) return 1

  if (!valueB) return -1
  if (sortOrder === 'asc') return valueA < valueB ? -1 : 1
  else return valueA > valueB ? -1 : 1
}
const sortData = (data: IUser[] | undefined, sortKey: SortKey, sortOrder: SortOrder) => {
  if (!data) return
  if (!sortKey) return data
  const dataToSort = [...data]
  switch (sortKey) {
    case 'email':
    case 'department_name':
    case 'position_name':
      return dataToSort.sort((a, b) => sort(a[sortKey], b[sortKey], sortOrder))

    case 'first_name':
    case 'last_name':
      return dataToSort.sort((a, b) => sort(a.profile[sortKey], b.profile[sortKey], sortOrder))

    default:
      return dataToSort
  }
}

const headerCells = [
  { header: null, value: '' },
  { header: 'First Name', value: 'first_name' },
  { header: 'Last Name', value: 'last_name' },
  { header: 'Email', value: 'email' },
  { header: 'Department', value: 'department_name' },
  { header: 'Position', value: 'position_name' },
  { header: null, value: '' }
]

const UsersTable = ({ users }: GetUsersResult) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortValue, setSortValue] = useState<SortKey>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const dataFiltered = filterData(searchQuery, users)
  const dataSorted = sortData(dataFiltered, sortValue, sortOrder)
  return (
    <TableContainer component={Paper} sx={{ background: 'transparent' }}>
      <SearchBar setSearchQuery={setSearchQuery} />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headerCells.map((el, i) => (
              <TableCell
                key={i}
                onClick={() => {
                  setSortValue(el.value as SortKey)
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                }}
              >
                {el.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSorted &&
            dataSorted.map(row => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">
                  <Avatar alt={row.profile.first_name?.slice(0, 1)} src={row.profile.avatar} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.profile.first_name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.profile.last_name}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.department_name}</TableCell>
                <TableCell align="left">{row.position_name}</TableCell>
                <TableCell align="left">
                  <Link to={`${row.id}/${Paths.PROFILE}`}>click</Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UsersTable
