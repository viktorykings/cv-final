import { Box, Button, Typography } from '@mui/material'
import { useErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { resetBoundary } = useErrorBoundary()
  return (
    <Box sx={{ position: 'absolute', top: '40%', left: '40%', height: '100px' }}>
      <Typography>{t('globalError')}</Typography>
      <Button
        color="secondary"
        onClick={() => {
          resetBoundary()
          navigate('users')
        }}
      >
        {t('buttons.goHome')}
      </Button>
    </Box>
  )
}

export default ErrorPage
