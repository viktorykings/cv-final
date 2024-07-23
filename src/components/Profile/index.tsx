import { useParams } from 'react-router-dom'
import { Box, Typography, Avatar, styled, Button } from '@mui/material'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import { useReactiveVar } from '@apollo/client'
import { useGetUser } from '../../graphql/users/hooks/useGetUser'
import { userID } from '../../shared/constants'
import ProfileUpdateForm from './ProfileUpdateForm'
import { useTranslation } from 'react-i18next'

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
const Profile = () => {
  const { id } = useParams()
  const { data } = useGetUser(id as string)
  const currentUserID = useReactiveVar(userID)
  const { t } = useTranslation()

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
                    <FileUploadOutlinedIcon />
                    {t('profile.uploadFile')}
                  </Typography>
                  <Typography component={'h6'}>{t('profile.uploadFileInfo')}</Typography>
                  <VisuallyHiddenInput type="file" />
                </Button>
              )}
            </Box>

            <Typography component={'h5'} variant="h5">
              {data.user.profile.full_name}
            </Typography>
            <Typography component={'p'}>{data.user.email}</Typography>
            <Typography component={'p'}>
              {t('profile.intlDateTime', {
                val: new Date(parseInt(data.user.created_at)),
                formatParams: {
                  val: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
                }
              })}
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
