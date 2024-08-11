import { Box, List, IconButton, Divider, Drawer } from '@mui/material'
import { MenuItems } from '../../assets/sidebarIcons'
import CloseIcon from '@mui/icons-material/Close'
import SidebarListItem from './SidebarItem'

type SidebarProps = {
  open: boolean
  toggleDrawer: (newOpen: boolean) => () => void
}

const Sidebar = ({ open, toggleDrawer }: SidebarProps) => {
  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250, p: 2 }} role="presentation" onClick={toggleDrawer(false)}>
        <IconButton
          onClick={e => {
            e.stopPropagation()
            toggleDrawer(false)()
          }}
        >
          <CloseIcon />
        </IconButton>
        <Divider />
        <List>
          {[MenuItems.HOME].map(text => (
            <SidebarListItem key={text} text={text} />
          ))}
          <Divider />
          {[MenuItems.EMPLOYEES, MenuItems.PROJECTS, MenuItems.CVS].map(text => (
            <SidebarListItem key={text} text={text} />
          ))}
          <Divider />
          {[MenuItems.DEPARTMENTS, MenuItems.POSITIONS, MenuItems.SKILLS, MenuItems.LANGUAGES].map(
            text => (
              <SidebarListItem key={text} text={text} />
            )
          )}
        </List>
      </Box>
    </Drawer>
  )
}
export default Sidebar
