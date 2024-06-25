import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import FolderCopyIcon from '@mui/icons-material/FolderCopy'
import ContactPageIcon from '@mui/icons-material/ContactPage'
import BusinessIcon from '@mui/icons-material/Business'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import MovingIcon from '@mui/icons-material/Moving'
import TranslateIcon from '@mui/icons-material/Translate'
import { ReactElement } from 'react'
import { SvgIconProps } from '@mui/material'

interface IIcons {
  [key: string]: ReactElement<SvgIconProps>
}
export enum Icons {
  HOME = 'HOME',
  EMPLOYEES = 'EMPLOYEES',
  PROJECTS = 'PROJECTS',
  CVS = 'CVS',
  DEPARTMENTS = 'DEPARTMENTS',
  POSITIONS = 'POSITIONS',
  SKILLS = 'SKILLS',
  LANGUAGES = 'LANGUAGES'
}

const sidebarIcons: IIcons = {
  [Icons.HOME]: <HomeIcon />,
  [Icons.EMPLOYEES]: <PeopleIcon />,
  [Icons.PROJECTS]: <FolderCopyIcon />,
  [Icons.CVS]: <ContactPageIcon />,
  [Icons.DEPARTMENTS]: <BusinessIcon />,
  [Icons.POSITIONS]: <WorkOutlineIcon />,
  [Icons.SKILLS]: <MovingIcon />,
  [Icons.LANGUAGES]: <TranslateIcon />
}

export default sidebarIcons
