import { Box, List, ListItem, IconButton, Divider } from '@mui/material'
import { MenuItems } from '../../assets/sidebarIcons'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import SidebarListItem from './ListItem'
import { SidebarProps } from './types'
import { Paths } from '../../routes/paths'

const SidebarList = ({ toggleDrawer, open }: SidebarProps) => {
  const navigate = useNavigate()
  const [toNavigate, setToNavigate] = useState<string>('users')
  useEffect(() => {
    if (!open) {
      navigate(toNavigate)
    }
  }, [open, navigate, toNavigate])

  const handleLink = (path: string) => {
    toggleDrawer(false)
    setToNavigate(path)
  }
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem>
          <IconButton size="large" edge="end" color="secondary" onClick={() => toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {[MenuItems.HOME].map(text => (
          <SidebarListItem key={text} text={text} handleLink={() => handleLink(Paths.EMPLOYEES)} />
        ))}
      </List>
      <Divider />
      <List>
        {[MenuItems.EMPLOYEES, MenuItems.PROJECTS, MenuItems.CVS].map(text => (
          <SidebarListItem key={text} text={text} handleLink={handleLink} />
        ))}
      </List>
      <Divider />
      <List>
        {[MenuItems.DEPARTMENTS, MenuItems.POSITIONS, MenuItems.SKILLS, MenuItems.LANGUAGES].map(
          text => (
            <SidebarListItem key={text} text={text} handleLink={handleLink} />
          )
        )}
      </List>
    </Box>
  )
}

export default SidebarList
