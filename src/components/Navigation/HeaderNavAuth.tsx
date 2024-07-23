import { Box, AppBar, Toolbar, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountMenu from './AccountMenu'
import LanguageSwitch from './LanguageSwitch'

type SidebarProps = {
  toggleDrawer: (newOpen: boolean) => void
}

function HeaderNavAuth({ toggleDrawer }: SidebarProps) {
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
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <LanguageSwitch />
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default HeaderNavAuth
