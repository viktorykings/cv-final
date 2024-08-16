import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const error = useRouteError()
  let errorMessage: string = ''

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    errorMessage = 'Unknown error'
    console.error(error)
  }
  return (
    <Box sx={{ position: 'absolute', top: '40%', left: '40%', height: '100px' }}>
      <Typography>{t('globalError')}</Typography>
      <Typography>{errorMessage}</Typography>
      <Button
        color="secondary"
        onClick={() => {
          navigate('users')
        }}
      >
        {t('buttons.goHome')}
      </Button>
    </Box>
  )
}

export default ErrorPage
