import { Navigate, useRoutes } from 'react-router-dom'
import { PrivateRoutes } from './routes/PrivateRoutes'
import { PublicRoutes } from './routes/PublicRoutes'
import { useReactiveVar } from '@apollo/client'
import { userToken } from './constants/constants'
import { Paths } from './routes/paths'

const App = () => {
  const isAuthorised = useReactiveVar(userToken)
  const content = useRoutes(isAuthorised ? PrivateRoutes : PublicRoutes)
  const defaultRoute = isAuthorised ? Paths.EMPLOYEES : `${Paths.AUTH}/${Paths.LOGIN}`
  return content ? content : <Navigate to={defaultRoute} />
}
export default App
