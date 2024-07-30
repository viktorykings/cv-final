import { MenuItem } from '@mui/material'
import { Paths } from '../../routes/paths'
import sidebarIcons from '../../assets/sidebarIcons'
import { INavigationProps } from '../../shared/interfaces/INavigationProps'
import { useTranslation } from 'react-i18next'

const AccountMenuItem = (props: INavigationProps) => {
  const { text, handleLink } = props
  const { t } = useTranslation()
  return (
    <MenuItem onClick={() => handleLink(Paths[text as keyof typeof Paths])}>
      {sidebarIcons[text.toUpperCase()]}
      {t(`contextMenu.${text.toLowerCase()}`, '')}
    </MenuItem>
  )
}

export default AccountMenuItem
