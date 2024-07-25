import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Paths } from '../../routes/paths'
import sidebarIcons from '../../assets/sidebarIcons'
import { INavigationProps } from '../../shared/interfaces/INavigationProps'
import { useTranslation } from 'react-i18next'

const SidebarListItem = (props: INavigationProps) => {
  const { text, handleLink } = props
  const { t } = useTranslation()

  return (
    <ListItem key={text} disablePadding>
      <ListItemButton
        onClick={() => {
          handleLink(Paths[text as keyof typeof Paths])
        }}
      >
        <ListItemIcon>{sidebarIcons[text.toUpperCase()]}</ListItemIcon>
        <ListItemText primary={t(`sideBar.${text.toLowerCase()}`, 'tableHeadLabels.error')} />
      </ListItemButton>
    </ListItem>
  )
}

export default SidebarListItem
