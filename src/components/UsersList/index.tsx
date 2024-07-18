import { Box } from '@mui/material'
import SearchBar from '../../shared/components/Search'
import { useState } from 'react'
import CustomTable from '../../shared/components/Table'
import { useGetAllUsers } from '../../graphql/users/hooks/useGetAllUsers'
const menuItems = [
  {
    label: 'Profile',
    path: 'profile'
  },
  {
    label: 'UpdateUser'
  },
  {
    label: 'Delete User'
  }
]

const UsersTable = () => {
  const { data } = useGetAllUsers()

  const [searchQuery, setSearchQuery] = useState('')

  if (!data) return <>no data</>
  if (!data.users) return <>no users</>
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchBar setSearchQuery={setSearchQuery} />
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
        constextMenu={menuItems}
      />
    </>
  )
}

export default UsersTable
