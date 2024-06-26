import { ReactElement } from 'react'
import { SvgIconProps } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import FolderCopyIcon from '@mui/icons-material/FolderCopy'
import ContactPageIcon from '@mui/icons-material/ContactPage'
import BusinessIcon from '@mui/icons-material/Business'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import MovingIcon from '@mui/icons-material/Moving'
import TranslateIcon from '@mui/icons-material/Translate'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

interface IIcons {
  [key: string]: ReactElement<SvgIconProps>
}
export enum MenuItems {
  HOME = 'HOME',
  EMPLOYEES = 'EMPLOYEES',
  PROJECTS = 'PROJECTS',
  CVS = 'CVS',
  DEPARTMENTS = 'DEPARTMENTS',
  POSITIONS = 'POSITIONS',
  SKILLS = 'SKILLS',
  LANGUAGES = 'LANGUAGES',
  PROFILE = 'PROFILE',
  SETTINGS = 'SETTINGS',
  LOGOUT = 'LOGOUT'
}

const sidebarIcons: IIcons = {
  [MenuItems.HOME]: <HomeIcon />,
  [MenuItems.EMPLOYEES]: <PeopleIcon />,
  [MenuItems.PROJECTS]: <FolderCopyIcon />,
  [MenuItems.CVS]: <ContactPageIcon />,
  [MenuItems.DEPARTMENTS]: <BusinessIcon />,
  [MenuItems.POSITIONS]: <WorkOutlineIcon />,
  [MenuItems.SKILLS]: <MovingIcon />,
  [MenuItems.LANGUAGES]: <TranslateIcon />,
  [MenuItems.PROFILE]: <PersonIcon />,
  [MenuItems.SETTINGS]: <SettingsIcon />,
  [MenuItems.LOGOUT]: <LogoutIcon />
}

export default sidebarIcons
