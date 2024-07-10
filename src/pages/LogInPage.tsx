import { useEffect } from 'react'
import Form from '../components/Form'
import { AUTH_TOKEN, USER_EMAIL, USER_ID, userID, userToken } from '../shared/constants'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../graphql/auth/hooks/useLogin'

const LogInPage = () => {
  const [login, { data }] = useLogin()
  const navigate = useNavigate()
  useEffect(() => {
    if (data) {
      localStorage.setItem(AUTH_TOKEN, data.login.access_token)
      localStorage.setItem(USER_EMAIL, data.login.user.email)
      localStorage.setItem(USER_ID, data.login.user.id)
      userToken(data.login.access_token)
      userID(data.login.user.id)
      navigate(`/users`)
    }
  }, [data, navigate])
  return <Form isRegisterForm={false} login={login} />
}
export default LogInPage
