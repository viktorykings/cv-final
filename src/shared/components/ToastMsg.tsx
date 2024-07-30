import { Alert } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ToastContentProps } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type toastProps = {
  message: string
}

const Msg = ({ closeToast, message }: Partial<ToastContentProps> & toastProps) => {
  const { t } = useTranslation()
  console.log(message)
  return (
    <Alert severity="error" onClose={closeToast}>
      {t(`toasts.${message}`, message)}
    </Alert>
  )
}
export default Msg
