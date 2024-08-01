import { Button, Box, CircularProgress, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import SearchBar from '../../../shared/components/Search'
import { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { useGetUser } from '../../../graphql/users/hooks/useGetUser'
import { userID } from '../../../shared/constants'
import AddIcon from '@mui/icons-material/Add'
import CvForm from './CvForm'
import CustomTable from '../../../shared/components/Table'
import { useTranslation } from 'react-i18next'

const menuItems = [
  {
    label: 'details',
    path: 'details'
  },
  {
    label: 'deleteCv',
    path: 'deleteCv'
  }
]

const CvsTable = () => {
  const { id } = useParams()
  const { data: user } = useGetUser(id as string)
  const currentUserID = useReactiveVar(userID)
  const isCurrentUserProfile = currentUserID === user?.user.id
  const [searchQuery, setSearchQuery] = useState('')
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  if (!user || !user.user || !user.user.cvs)
    return (
      <CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />
    )
  if (!user.user.cvs.length)
    return (
      <Typography sx={{ display: 'flex', justifyContent: 'center' }} color={'text.secondary'}>
        {t('cvs.noCvs')}
      </Typography>
    )
  // TODO fix refetch cvs after create/delete
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchBar setSearchQuery={setSearchQuery} />

        {isCurrentUserProfile && (
          <Button color="secondary" onClick={handleClickOpen}>
            <AddIcon /> {t('buttons.addCv')}
          </Button>
        )}
      </Box>
      <CustomTable
        data={user.user.cvs.map(({ name, description, id }) => ({ name, description, id }))}
        searchQuery={searchQuery}
        constextMenu={menuItems}
      />
      {user && isCurrentUserProfile && (
        <CvForm open={open} handleClose={handleClose} label="addCv" user={user.user} />
      )}
    </>
  )
}

export default CvsTable
