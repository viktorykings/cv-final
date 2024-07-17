import { Box, Button } from '@mui/material'
import SearchBar from '../../shared/components/Search'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import CustomTable from '../../shared/components/Table'
import { useGetAllUsers } from '../../graphql/users/hooks/useGetAllUsers'
import AddIcon from '@mui/icons-material/Add'
import { useReactiveVar } from '@apollo/client'
import { useGetUser } from '../../graphql/users/hooks/useGetUser'
import { userID } from '../../shared/constants'
import CvForm from '../Profile/CvsTable/CvForm'
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
  const { id } = useParams()
  const { data: user } = useGetUser(id as string)
  const currentUserID = useReactiveVar(userID)
  const isCurrentUserProfile = currentUserID === user?.user.id

  const { data } = useGetAllUsers()

  const [searchQuery, setSearchQuery] = useState('')

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  if (!data) return <>no data</>
  if (!data.users) return <>no users</>
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchBar setSearchQuery={setSearchQuery} />

        <Button color="secondary" onClick={handleClickOpen}>
          <AddIcon /> Create CV
        </Button>
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

      {user && isCurrentUserProfile && (
        <CvForm open={open} handleClose={handleClose} label="Add CV" user={user.user} />
      )}
    </>
  )
}

export default UsersTable
