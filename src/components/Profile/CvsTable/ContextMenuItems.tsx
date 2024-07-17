import { MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDeleteCv } from '../../../graphql/users/cvs/hooks/useDeleteCv'
import { IContextMenuItem } from '../../../shared/components/Table/types/TableProps'

interface IMenuItemProps<T> {
  items: T[]
  id: string | null | undefined
  handleClose: () => void
}

const ContextMenuItems = ({ items, id, handleClose }: IMenuItemProps<IContextMenuItem>) => {
  const [deleteCv] = useDeleteCv()

  const handleClick = () => {
    deleteCv({ variables: { cv: { cvId: id } } })
    handleClose()
  }
  return (
    <>
      {items.map(el =>
        el.path ? (
          el.path === 'profile' ? (
            <MenuItem key={el.label} component={Link} to={`${id}/${el.path}`} onClick={handleClose}>
              {el.label}
            </MenuItem>
          ) : (
            <MenuItem key={el.label} component={Link} to={`${id}`} onClick={handleClose}>
              {el.label}
            </MenuItem>
          )
        ) : (
          <MenuItem key={el.label} onClick={handleClick}>
            {el.label}
          </MenuItem>
        )
      )}
    </>
  )
}

export default ContextMenuItems
