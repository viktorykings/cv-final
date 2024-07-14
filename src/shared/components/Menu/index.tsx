import React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MoreVertIcon from '@mui/icons-material/MoreVert'

interface IMenuChildren {
  open: boolean
  anchorEl: null | HTMLElement
  children: JSX.Element
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleClose: () => void
}

export default function ContextMenu(props: IMenuChildren) {
  const { open, handleClick, anchorEl, handleClose, children } = props

  return (
    <div>
      <Button
        id="context-menu"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
        sx={{ borderRadius: '50%', height: '64px', width: '64px' }}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {children}
      </Menu>
    </div>
  )
}
