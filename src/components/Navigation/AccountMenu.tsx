import { Box, Typography, Avatar, Menu, MenuItem, IconButton } from '@mui/material'
import sidebarIcons, { MenuItems } from '../../assets/sidebarIcons'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { Paths } from '../../routes/paths'
import { userID } from '../../shared/constants'
import { useReactiveVar } from '@apollo/client'
import { logOut } from '../../shared/utils/logOut'
import { useGetUser } from '../../graphql/users/hooks/useGetUser'
import { useTranslation } from 'react-i18next'

const AccountMenu = () => {
  const currentUserID = useReactiveVar(userID)
  const { data: user } = useGetUser(currentUserID)
  const { t } = useTranslation()

  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(() => null)
    console.log('anchor after click handle close', anchorEl, 'is menu open', open)
  }

  const handleLogOut = () => {
    logOut()
    navigate(Paths.AUTH + '/' + Paths.LOGIN)
    handleClose()
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ marginRight: 2 }}>{user?.user.profile.full_name}</Typography>
      <IconButton onClick={handleMenu}>
        <Avatar alt={user?.user.profile.full_name} src={user?.user.profile.avatar} />
      </IconButton>
      <Menu
        id="account-menu"
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
        open={open}
        onClose={handleClose}
        // onClick={() => navigate('settings')}
        onClick={handleClose}
      >
        {/* если внутри айтема есть ссылка меню при клике не закрывается */}
        <MenuItem
          key={'profile'}
          // onClick={(e) => {
          //   e.preventDefault()
          //   navigate(`/users/${currentUserID}/profile`)
          // }}
        >
          <Link to={`/users/${currentUserID}/profile`}>
            {sidebarIcons[MenuItems.PROFILE]}
            {t('contextMenu.profile', '')}
          </Link>
        </MenuItem>
        {/* если ссылки нет закрывается */}
        <MenuItem
          key={'settings'}
          onClick={e => {
            e.preventDefault()
            navigate(`settings`)
          }}
        >
          {/* <Link to={`/settings`}> */}
          {sidebarIcons[MenuItems.SETTINGS]}
          {t('contextMenu.settings', '')}
          {/* </Link> */}
        </MenuItem>
        <MenuItem key={'logout'} onClick={handleLogOut}>
          {sidebarIcons[MenuItems.LOGOUT]}
          {t('contextMenu.logout')}
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default AccountMenu
