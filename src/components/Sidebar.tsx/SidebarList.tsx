import {
  Box,
  List,
  ListItem,
  IconButton,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { Paths } from '../../routes/paths'
import sidebarIcons from '../../styles/sidebarIcons'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
type SidebarProps = {
  open: boolean
  toggleDrawer: (newOpen: boolean) => void
}

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
        <ListItemButton
          onClick={() => {
            handleLink(Paths.EMPLOYEES)
          }}
        >
          <ListItemIcon>{sidebarIcons['HOME']}</ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItemButton>
      </List>
      <Divider />
      <List>
        {['Employees', 'Projects', 'CVS'].map(text => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                handleLink(Paths[text.toUpperCase() as keyof typeof Paths])
              }}
            >
              <ListItemIcon>{sidebarIcons[text.toUpperCase()]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Departments', 'Positions', 'Skills', 'Languages'].map(text => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                handleLink(Paths[text.toUpperCase() as keyof typeof Paths])
              }}
            >
              <ListItemIcon>{sidebarIcons[text.toUpperCase()]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default SidebarList
