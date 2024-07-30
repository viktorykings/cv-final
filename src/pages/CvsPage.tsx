import { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Box, Button } from '@mui/material'
import CvForm from '../components/Profile/CvsTable/CvForm'
import { useGetUser } from '../graphql/users/hooks/useGetUser'
import SearchBar from '../shared/components/Search'
import CustomTable from '../shared/components/Table'
import { userID } from '../shared/constants'
import { useGetAllCvs } from '../graphql/cvs/hooks/useGetCvs'
import AddIcon from '@mui/icons-material/Add'
import { useTranslation } from 'react-i18next'

const menuItems = [
  {
    label: 'Details',
    path: 'details'
  },
  {
    label: 'Delete CV'
  }
]

const CvsPage = () => {
  const { data } = useGetAllCvs()

  const currentUserID = useReactiveVar(userID)
  const { data: user } = useGetUser(currentUserID as string)
  const { t } = useTranslation()

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
          <AddIcon /> {t('buttons.addCv')}
        </Button>
      </Box>
      <CustomTable
        data={data.cvs.map(({ name, description, user, id }) => ({
          name,
          description,
          email: user && user.email,
          id
        }))}
        constextMenu={menuItems}
        searchQuery={searchQuery}
      />

      {user && <CvForm open={open} handleClose={handleClose} label="addCv" user={user.user} />}
    </>
  )
}
export default CvsPage
