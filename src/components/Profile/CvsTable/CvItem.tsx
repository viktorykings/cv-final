import { TableCell, TableRow } from '@mui/material'
import ContextMenu from '../../../shared/components/Menu'
import ContextMenuItems from './ContextMenuItems'
import { useState } from 'react'

type TCvItemProps = {
  id: string
  name: string
  description: string
}

const CvItem = (props: TCvItemProps) => {
  const { id, name, description } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left" sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        {name}
      </TableCell>
      <TableCell
        align="left"
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: '855px',
          textOverflow: 'ellipsis'
        }}
      >
        {description}
      </TableCell>
      <TableCell align="left" scope="col" sx={{ width: '20px' }}>
        <ContextMenu
          open={open}
          anchorEl={anchorEl}
          handleClick={handleClick}
          handleClose={handleClose}
        >
          <ContextMenuItems cvId={id} handleClose={handleClose} />
        </ContextMenu>
      </TableCell>
    </TableRow>
  )
}

export default CvItem
