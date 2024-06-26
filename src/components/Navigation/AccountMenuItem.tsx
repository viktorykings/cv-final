import { MenuItem } from '@mui/material'
import { Paths } from '../../routes/paths'
import sidebarIcons from '../../assets/sidebarIcons'
import { SidebarItemProps } from '../Sidebar.tsx/types'
import { convertText } from '../../utils/convertText'

const AccountMenuItem = (props: SidebarItemProps) => {
  const { text, handleLink } = props
  return (
    <MenuItem onClick={() => handleLink(Paths[text as keyof typeof Paths])}>
      {sidebarIcons[text.toUpperCase()]}
      {convertText(text)}
    </MenuItem>
  )
}

export default AccountMenuItem
