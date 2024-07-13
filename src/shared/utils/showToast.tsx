import { toast } from 'react-toastify'
import Msg from '../components/ToastMsg'

const showToast = (msg: string) => {
  toast(<Msg message={msg} />, {
    position: 'top-left',
    hideProgressBar: true,
    closeButton: false,
    style: { height: 'content-height', background: 'transparent', boxShadow: 'none', padding: 0 }
  })
}
export default showToast
