import { AccountCircle } from '@mui/icons-material'
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  FormControl,
  Select,
  SelectChangeEvent,
  Avatar
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import LanguageIcon from '@mui/icons-material/Language'
import { Paths } from '../../routes/paths'
import { AUTH_TOKEN, userToken } from '../../constants/constants'

type SidebarProps = {
  toggleDrawer: (newOpen: boolean) => void
}

function HeaderNavAuth({ toggleDrawer }: SidebarProps) {
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  // const [open, setOpen] = useState(false)
  const [lang, setLang] = useState('EN')

  const handleChangeLang = (event: SelectChangeEvent) => {
    setLang(event.target.value)
  }

  // const toggleDrawer = (newOpen: boolean) => () => {
  //   setOpen(newOpen)
  // }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLinkProfile = () => {
    navigate(Paths.PROFILE)
    handleClose()
  }
  const handleLinkSettings = () => {
    navigate(Paths.SETTINGS)
    handleClose()
  }
  const handleLogOut = () => {
    localStorage.removeItem(AUTH_TOKEN)
    userToken('')
    navigate(Paths.AUTH + '/' + Paths.LOGIN)
    handleClose()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary" sx={{ boxShadow: 0 }}>
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LanguageIcon sx={{ fill: '#767676' }} />
            <FormControl variant="standard" sx={{ padding: '16.5px 34px 16.5px 10px' }}>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={lang}
                label="language"
                onChange={handleChangeLang}
                color="secondary"
                disableUnderline
              >
                <MenuItem value={'EN'} defaultChecked>
                  EN
                </MenuItem>
                <MenuItem value={'DE'}>DE</MenuItem>
                <MenuItem value={'RU'}>RU</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ marginRight: 2 }}>name</Typography>
              <Avatar
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="primary"
              >
                <AccountCircle />
              </Avatar>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLinkProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLinkSettings}>Settings</MenuItem>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default HeaderNavAuth
