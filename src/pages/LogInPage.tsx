import { useEffect } from 'react'
import Form from '../components/Form/Form'
import { useLogin } from '../hooks/auth'
import { AUTH_TOKEN, USER_EMAIL, userToken } from '../constants/constants'
import { useNavigate } from 'react-router-dom'

const LogInPage = () => {
  const [login, { data }] = useLogin()
  const navigate = useNavigate()
  useEffect(() => {
    if (data) {
      localStorage.setItem(AUTH_TOKEN, data.login.access_token)
      localStorage.setItem(USER_EMAIL, data.login.user.email)
      userToken(data.login.access_token)
      navigate(`/users`)
    }
  }, [data, navigate])
  return <Form isRegisterForm={false} login={login} />
}
export default LogInPage
