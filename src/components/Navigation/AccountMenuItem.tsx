import { MenuItem } from '@mui/material'
import { Paths } from '../../routes/paths'
import sidebarIcons from '../../assets/sidebarIcons'
import { convertText } from '../utils/convertText'
import { INavigationProps } from '../../shared/interfaces/INavigationProps'

const AccountMenuItem = (props: INavigationProps) => {
  const { text, handleLink } = props
  return (
    <MenuItem onClick={() => handleLink(Paths[text as keyof typeof Paths])}>
      {sidebarIcons[text.toUpperCase()]}
      {convertText(text)}
    </MenuItem>
  )
}

export default AccountMenuItem
