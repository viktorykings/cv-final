import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import HeaderNav from '../components/Navigation/HeaderNav'
import { useReactiveVar } from '@apollo/client'
import { userToken } from '../constants/constants'
import HeaderNavAuth from '../components/Navigation/HeaderNavAuth'
import { Container } from '@mui/material'
function Root() {
  const isAuth = useReactiveVar(userToken)

  return (
    <>
      <Header>
        <Container maxWidth="xl" disableGutters>
          {isAuth ? <HeaderNavAuth /> : <HeaderNav />}
        </Container>
      </Header>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </>
  )
}

export default Root
