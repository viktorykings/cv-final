import { useEffect } from 'react'
import Form from '../components/Form'
import { useSignup } from '../graphql/auth/hooks/useSignup'
import { AUTH_TOKEN, USER_EMAIL, userToken } from '../shared/constants'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const [signup, { data }] = useSignup()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      localStorage.setItem(AUTH_TOKEN, data.signup.access_token)
      localStorage.setItem(USER_EMAIL, data.signup.user.email)
      userToken(data.signup.access_token)
      navigate(`/users`)
    }
  }, [data, navigate])
  return <Form isRegisterForm={true} signup={signup} />
}
export default SignUpPage
