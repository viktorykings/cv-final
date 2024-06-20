import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import HeaderNav from '../components/Navigation/Navigation'

function Root() {
  return (
    <>
      <Header>
        <HeaderNav />
      </Header>
      <Outlet />
    </>
  )
}

export default Root
