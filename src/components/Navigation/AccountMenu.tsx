import { Box, Typography, Avatar, Menu } from '@mui/material'
import { MenuItems } from '../../assets/sidebarIcons'
import AccountMenuItem from './AccountMenuItem'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Paths } from '../../routes/paths'
import { userID } from '../../shared/constants'
import { useReactiveVar } from '@apollo/client'
import { logOut } from '../../shared/utils/logOut'
import { useGetUser } from '../../graphql/users/hooks/useGetUser'

const AccountMenu = () => {
  const currentUserID = useReactiveVar(userID)
  const { data: user } = useGetUser(currentUserID)

  const navigate = useNavigate()
  const location = useLocation()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAccountLink = (path: string) => {
    if (path === 'profile') navigate(`/users/${currentUserID}/${path}`)
    else navigate(path)
  }

  const handleLogOut = () => {
    logOut()
    navigate(Paths.AUTH + '/' + Paths.LOGIN)
  }

  useEffect(() => {
    handleClose()
  }, [location.pathname])

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ marginRight: 2 }}>{user?.user.profile.full_name}</Typography>
      <Avatar
        alt={user?.user.profile.full_name}
        src={user?.user.profile.avatar}
        onClick={handleMenu}
      />
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
        open={Boolean(anchorEl) ?? false}
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
