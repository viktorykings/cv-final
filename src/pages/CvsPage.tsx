import { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Box, Button, CircularProgress } from '@mui/material'
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
    label: 'details',
    path: 'details'
  }
]

const CvsPage = () => {
  const { data, refetch } = useGetAllCvs()

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
  if (!data) {
    return (
      <CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />
    )
  }
  // cv with id 94 doesnt have user so filtered
  const isUserNonNull = data.cvs.filter(el => el.id !== '94').every(el => el.user !== null)
  if (!isUserNonNull) {
    refetch()
  }
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <Button color="secondary" onClick={handleClickOpen}>
          <AddIcon /> {t('buttons.addCv')}
        </Button>
      </Box>
      <CustomTable
        data={data.cvs.map(({ name, description, user, id }) => ({
          name,
          description,
          email: user && user.email,
          id,
          userId: user && user.id
        }))}
        constextMenu={menuItems}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {user && <CvForm open={open} handleClose={handleClose} label="addCv" user={user.user} />}
    </>
  )
}
export default CvsPage
