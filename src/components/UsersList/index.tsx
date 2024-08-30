import { Box, CircularProgress } from '@mui/material'
import SearchBar from '../../shared/components/Search'
import { useState } from 'react'
import CustomTable from '../../shared/components/Table'
import { useGetAllUsers } from '../../graphql/users/hooks/useGetAllUsers'
const menuItems = [
  {
    label: 'Profile',
    path: 'profile'
  }
]

const UsersTable = () => {
  const { data } = useGetAllUsers()

  const [searchQuery, setSearchQuery] = useState('')

  if (!data || !data.users)
    return (
      <CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />
    )
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Box>
      <CustomTable
        data={data.users.map(
          ({
            profile: { avatar, first_name, last_name },
            email,
            department_name,
            position_name,
            id
          }) => ({ avatar, first_name, last_name, email, department_name, position_name, id })
        )}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        constextMenu={menuItems}
      />
    </>
  )
}

export default UsersTable
