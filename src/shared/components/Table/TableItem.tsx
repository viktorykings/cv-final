import { TableCell, TableRow } from '@mui/material'
import ContextMenu from '../../../shared/components/Menu'
import { useState } from 'react'
import { TProps } from '.'
import ContextMenuItems from '../../../components/Profile/CvsTable/ContextMenuItems'

type TableItemProps = {
  row: TProps
}

const TableItem = (props: TableItemProps) => {
  const cells = Object.keys(props.row)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        {cells.map(el =>
          el === 'id' ? (
            <ContextMenu
              key={el}
              open={open}
              anchorEl={anchorEl}
              handleClick={handleClick}
              handleClose={handleClose}
            >
              <ContextMenuItems cvId={props.row.id} handleClose={handleClose} />
            </ContextMenu>
          ) : (
            <TableCell
              key={el}
              align="left"
              scope="row"
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                maxWidth: 200,
                textOverflow: 'ellipsis'
              }}
            >
              {props.row[el]}
            </TableCell>
          )
        )}
      </TableRow>
    </>
  )
}

export default TableItem
