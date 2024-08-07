import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import HeaderNav from '../components/Navigation/HeaderNav'
import { useReactiveVar } from '@apollo/client'
import { userToken } from '../shared/constants'
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
      <Container
        maxWidth="xl"
        sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
      >
        <Outlet />
      </Container>
    </>
  )
}

export default Root
