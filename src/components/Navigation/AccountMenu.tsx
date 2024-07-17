import { AccountCircle } from '@mui/icons-material'
import { Box, Typography, Avatar, Menu } from '@mui/material'
import { MenuItems } from '../../assets/sidebarIcons'
import AccountMenuItem from './AccountMenuItem'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Paths } from '../../routes/paths'
import { AUTH_TOKEN, userID, userToken } from '../../shared/constants'
import { useReactiveVar } from '@apollo/client'

const AccountMenu = () => {
  const currentUserID = useReactiveVar(userID)

  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleAccountLink = (path: string) => {
    handleClose()
    if (path === 'profile') navigate(`/users/${currentUserID}/${path}`)
    else navigate(path)
  }

  const handleLogOut = () => {
    localStorage.removeItem(AUTH_TOKEN)
    userToken('')
    navigate(Paths.AUTH + '/' + Paths.LOGIN)
    handleClose()
  }
  return (
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
        {[MenuItems.PROFILE, MenuItems.SETTINGS].map(path => (
          <AccountMenuItem
            key={path}
            text={path}
            handleLink={() => handleAccountLink(path.toLowerCase())}
          />
        ))}
        <AccountMenuItem key={'logout'} text="Logout" handleLink={handleLogOut} />
      </Menu>
    </Box>
  )
}

export default AccountMenu
