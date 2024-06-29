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
import { GetUsersResult } from '../../types/queryTypes'
import { IUser } from '../../interfaces/IUser'
import SearchBar from '../Search'
import { useState } from 'react'

const filterData = (query: string, data: IUser[] | undefined) => {
  if (!query) {
    return data
  } else {
    if (!data) return
    return data.filter(d => d.profile.full_name?.toLowerCase().includes(query))
  }
}

// function stringToColor(string: string) {
//     let hash = 0;
//     let i;

//     /* eslint-disable no-bitwise */
//     for (i = 0; i < string.length; i += 1) {
//       hash = string.charCodeAt(i) + ((hash << 5) - hash);
//     }

//     let color = '#';

//     for (i = 0; i < 3; i += 1) {
//       const value = (hash >> (i * 8)) & 0xff;
//       color += `00${value.toString(16)}`.slice(-2);
//     }
//     /* eslint-enable no-bitwise */

//     return color;
//   }

// function stringAvatar(name: string | undefined) {
//     if (!name) return 'NN'
//     return {
//       sx: {
//         bgcolor: stringToColor(name),
//       },
//       children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//     };
//   }
const headerCells = ['', 'First Name', 'Last Name', 'Email', 'Department', 'Position', '']

const UsersTable = ({ users }: GetUsersResult) => {
  const [searchQuery, setSearchQuery] = useState('')
  const dataFiltered = filterData(searchQuery, users)

  return (
    <TableContainer component={Paper} sx={{ background: 'transparent' }}>
      <SearchBar setSearchQuery={setSearchQuery} />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headerCells.map((el, i) => (
              <TableCell key={i}>{el}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataFiltered &&
            dataFiltered.map(row => (
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
                <TableCell align="left">{row.position_name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UsersTable
