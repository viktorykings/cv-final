import { Avatar, TableCell, TableRow } from '@mui/material'
import ContextMenu from '../../../shared/components/Menu'
import { useState } from 'react'
import ContextMenuItems from '../../../components/Profile/CvsTable/ContextMenuItems'
import { TProps, IContextMenuItem } from './types/TableProps'
import { useReactiveVar } from '@apollo/client'
import { userID } from '../../constants'
import { useDeleteCv } from '../../../graphql/users/cvs/hooks/useDeleteCv'

type TableItemProps = {
  row: TProps
  contextMenu?: IContextMenuItem[]
}

const TableItem = ({ row, contextMenu }: TableItemProps) => {
  const currentUserID = useReactiveVar(userID)
  const cells = Object.keys(row)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const [deleteCv] = useDeleteCv(currentUserID)
  const handleDelete = (cvId: string) => {
    deleteCv({
      variables: {
        cv: {
          cvId: cvId
        }
      }
    })
    handleClose()
  }

  const createCell = (el: string) => {
    switch (el) {
      case 'id':
        return contextMenu ? (
          <ContextMenu
            key={'id'}
            open={open}
            anchorEl={anchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
          >
            <ContextMenuItems
              id={row.id}
              items={
                row.userId === currentUserID
                  ? [...contextMenu, { label: 'deleteCv', path: 'deleteCv' }]
                  : contextMenu
              }
              handleDelete={() => handleDelete(row.id ?? '')}
              handleClose={handleClose}
            />
          </ContextMenu>
        ) : (
          <TableCell key={'id'}></TableCell>
        )
      case 'avatar':
        return (
          <TableCell key={'avatar'} align="left">
            <Avatar src={row.avatar || ''} />
          </TableCell>
        )
      case 'userId':
        return
      default:
        return (
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
            {row[el]}
          </TableCell>
        )
    }
  }

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        {cells.map(el => createCell(el))}
      </TableRow>
    </>
  )
}

export default TableItem
