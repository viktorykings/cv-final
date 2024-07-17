import { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Box, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import CvForm from '../components/Profile/CvsTable/CvForm'
import { useGetUser } from '../graphql/users/hooks/useGetUser'
import SearchBar from '../shared/components/Search'
import CustomTable from '../shared/components/Table'
import { userID } from '../shared/constants'
import { useGetAllCvs } from '../graphql/cvs/hooks/useGetCvs'
import AddIcon from '@mui/icons-material/Add'

const menuItems = [
  {
    label: 'Details',
    path: 'cvs'
  },
  {
    label: 'Delete CV'
  }
]

const CvsPage = () => {
  const { data } = useGetAllCvs()

  const { id } = useParams()
  const { data: user } = useGetUser(id as string)
  const currentUserID = useReactiveVar(userID)
  const isCurrentUserProfile = currentUserID === user?.user.id

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [searchQuery, setSearchQuery] = useState('')

  if (!data) return <>no data</>

  // TODO fix refetch cvs after create/delete
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchBar setSearchQuery={setSearchQuery} />

        <Button color="secondary" onClick={handleClickOpen}>
          <AddIcon /> Create CV
        </Button>
      </Box>
      <CustomTable
        data={data.cvs.map(({ name, description, id }) => ({ name, description, id }))}
        constextMenu={menuItems}
        searchQuery={searchQuery}
      />

      {user && isCurrentUserProfile && (
        <CvForm open={open} handleClose={handleClose} label="Add CV" user={user.user} />
      )}
    </>
  )
}
export default CvsPage
