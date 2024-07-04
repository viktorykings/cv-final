import { Outlet } from 'react-router-dom'
import ProfileTabs from './Profile/ProfileTabs'
import { Box } from '@mui/material'

const ProfileLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 'xl' }}>
      <ProfileTabs />
      <Outlet />
    </Box>
  )
}
export default ProfileLayout
