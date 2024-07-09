import { useParams } from 'react-router-dom'
import { useGetUser } from '../../graphql/users/hooks/useGetUser'
import { Box, Typography, Avatar, styled, Button } from '@mui/material'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import ProfileUpdateForm from '../../components/Profile/ProfileUpdateForm'
import { useReactiveVar } from '@apollo/client'
import { userID } from '../../constants/constants'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const ProfilePage = () => {
  const { id } = useParams()
  const { data } = useGetUser(id as string)
  const currentUserID = useReactiveVar(userID)

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
              {currentUserID === data.user.id && (
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  // startIcon={<FileUploadOutlinedIcon />}
                  sx={{
                    background: 'transparent',
                    boxShadow: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '0 auto'
                  }}
                >
                  <Typography component={'h6'}>
                    <FileUploadOutlinedIcon /> Upload file
                  </Typography>
                  <Typography component={'h6'}>png, jpg or gif no more than 0.5MB</Typography>
                  <VisuallyHiddenInput type="file" />
                </Button>
              )}
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
export default ProfilePage
