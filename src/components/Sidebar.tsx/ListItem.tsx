import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Paths } from '../../routes/paths'
import sidebarIcons from '../../assets/sidebarIcons'
import { convertText } from '../../utils/convertText'
import { SidebarItemProps } from './types'

const SidebarListItem = (props: SidebarItemProps) => {
  const { text, handleLink } = props

  return (
    <ListItem key={text} disablePadding>
      <ListItemButton
        onClick={() => {
          handleLink(Paths[text as keyof typeof Paths])
        }}
      >
        <ListItemIcon>{sidebarIcons[text.toUpperCase()]}</ListItemIcon>
        <ListItemText primary={convertText(text)} />
      </ListItemButton>
    </ListItem>
  )
}

export default SidebarListItem
