import { useParams } from 'react-router-dom'
import { Box, Typography, Avatar, Button } from '@mui/material'
import { useReactiveVar } from '@apollo/client'
import { useGetUser } from '../../graphql/users/hooks/useGetUser'
import { userID } from '../../shared/constants'
import ProfileUpdateForm from './ProfileUpdateForm'
import FileUploadButton from './AvatarUploadBtn'
import ClearIcon from '@mui/icons-material/Clear'
import { useDeleteAvatar } from '../../graphql/users/profile/hooks/useDeleteAvatar'

const Profile = () => {
  const { id } = useParams()
  const { data } = useGetUser(id as string)
  const currentUserID = useReactiveVar(userID)
  const [deleteAvatar] = useDeleteAvatar()

  const handleDeleteAvatar = () => {
    deleteAvatar({
      variables: {
        avatar: {
          userId: currentUserID
        }
      }
    })
  }

  return (
    <Box
      sx={{
        maxWidth: 'md',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        padding: '32px 0'
      }}
    >
      {data && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'stretch',
            maxWidth: '852px'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex' }}>
              <Avatar
                alt={data.user.profile.full_name}
                src={data.user.profile.avatar}
                sx={{ width: 120, height: 120 }}
              />
              <Button onClick={handleDeleteAvatar}>
                <ClearIcon />
              </Button>
              {currentUserID === data.user.id && <FileUploadButton />}
            </Box>
            <Typography component={'h5'} variant="h5">
              {data.user.profile.full_name}
            </Typography>
            <Typography component={'p'}>{data.user.email}</Typography>
            <Typography component={'p'}>
              A member since {new Date(parseInt(data.user.created_at)).toDateString()}
            </Typography>
          </Box>
          <Box>
            <ProfileUpdateForm data={data.user} />
          </Box>
        </Box>
      )}
    </Box>
  )
}
export default Profile
