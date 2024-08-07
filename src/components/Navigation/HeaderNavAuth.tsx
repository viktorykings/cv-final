import { Box, AppBar, Toolbar, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountMenu from './AccountMenu'
import LanguageSwitch from './LanguageSwitch'
import { useCallback, useState } from 'react'
import SideBar from '../Sidebar'

function HeaderNavAuth() {
  const [open, setOpen] = useState(false)

  const toggleDrawer = useCallback(
    (newOpen: boolean) => () => {
      setOpen(newOpen)
    },
    []
  )
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="secondary"
        sx={{ boxShadow: 0, backgroundColor: 'primary.main' }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <LanguageSwitch />
          <AccountMenu />
          <SideBar open={open} toggleDrawer={() => toggleDrawer(false)} />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default HeaderNavAuth
