import { Alert } from '@mui/material'
import { ToastContentProps } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type toastProps = {
  message: string
}

const Msg = ({ closeToast, message }: Partial<ToastContentProps> & toastProps) => (
  <Alert severity="error" onClose={closeToast}>
    {message}
  </Alert>
)
export default Msg
