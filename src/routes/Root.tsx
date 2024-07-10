import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import HeaderNav from '../components/Navigation/HeaderNav'
import { useReactiveVar } from '@apollo/client'
import { userToken } from '../shared/constants'
import HeaderNavAuth from '../components/Navigation/HeaderNavAuth'
import { Container, Drawer } from '@mui/material'
import SidebarList from '../components/Sidebar'
import { useState } from 'react'

function Root() {
  const isAuth = useReactiveVar(userToken)
  const [open, setOpen] = useState(false)
  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  return (
    <>
      <Header>
        <Container maxWidth="xl" disableGutters>
          {isAuth ? <HeaderNavAuth toggleDrawer={toggleDrawer} /> : <HeaderNav />}
        </Container>
      </Header>
      <Container
        maxWidth="xl"
        sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
      >
        <Outlet />
      </Container>
      <Drawer open={open ?? false} onClose={() => toggleDrawer(false)}>
        <SidebarList toggleDrawer={toggleDrawer} open={open} />
      </Drawer>
    </>
  )
}

export default Root
