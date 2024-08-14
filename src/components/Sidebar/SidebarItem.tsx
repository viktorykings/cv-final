import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import sidebarIcons from '../../assets/sidebarIcons'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

export interface INavigationProps {
  text: string
}

const SidebarListItem = (props: INavigationProps) => {
  const { text } = props
  const { t } = useTranslation()
  const getRoute = (str: string) => {
    if (str.toLowerCase() === 'employees' || str.toLowerCase() === 'home') {
      return 'users'
    } else return str.toLowerCase()
  }
  return (
    <NavLink to={getRoute(text)} style={{ display: 'flex', height: '50px', width: '100%' }}>
      {({ isActive }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton
            selected={text !== 'HOME' && isActive}
            sx={{
              '&.Mui-selected': {
                color: 'secondary.main'
              }
            }}
          >
            <ListItemIcon>{sidebarIcons[text.toUpperCase()]}</ListItemIcon>
            <ListItemText primary={t(`sideBar.${text.toLowerCase()}`, 'tableHeadLabels.error')} />
          </ListItemButton>
        </ListItem>
      )}
    </NavLink>
  )
}

export default SidebarListItem
