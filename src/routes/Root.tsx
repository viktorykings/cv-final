import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import HeaderNav from '../components/Navigation/HeaderNav'
import { useReactiveVar } from '@apollo/client'
import { userToken } from '../shared/constants'
import HeaderNavAuth from '../components/Navigation/HeaderNavAuth'
import { CircularProgress, Container } from '@mui/material'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from '../pages/ErrorPage'

function Root() {
  const isAuth = useReactiveVar(userToken)
  return (
    <>
      <Header>
        <Container maxWidth="xl" disableGutters>
          {isAuth ? <HeaderNavAuth /> : <HeaderNav />}
        </Container>
      </Header>
      <Suspense
        fallback={
          <CircularProgress
            color="secondary"
            sx={{ position: 'absolute', top: '50%', left: '50%' }}
          />
        }
      >
        <Container
          maxWidth="xl"
          sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
        >
          <ErrorBoundary fallback={<ErrorPage />}>
            <Outlet />
          </ErrorBoundary>
        </Container>
      </Suspense>
    </>
  )
}

export default Root
