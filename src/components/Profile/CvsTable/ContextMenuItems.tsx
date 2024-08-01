import { MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDeleteCv } from '../../../graphql/users/cvs/hooks/useDeleteCv'
import { IContextMenuItem } from '../../../shared/components/Table/types/TableProps'
import { useTranslation } from 'react-i18next'

interface IMenuItemProps<T> {
  items: T[] | undefined
  id: string | null | undefined
  handleClose: () => void
  handleDelete?: () => void
}

const ContextMenuItems = ({ items, id, handleClose }: IMenuItemProps<IContextMenuItem>) => {
  const [deleteCv] = useDeleteCv()
  const { t } = useTranslation()

  const handleDelete = () => {
    deleteCv({ variables: { cv: { cvId: id } } })
    handleClose()
  }

  const createContextMenuItem = (item: IContextMenuItem) => {
    switch (item.path) {
      case 'profile':
        return (
          <MenuItem
            key={item.label}
            component={Link}
            to={`${id}/${item.path}`}
            onClick={handleClose}
          >
            {t('contextMenu.profile')}
          </MenuItem>
        )
      case 'deleteCv':
        return (
          <MenuItem
            key={item.label}
            component={Link}
            to={`/cvs/${id}/${item.path}`}
            onClick={handleDelete}
          >
            {t(`contextMenu.${item.label}`, '')}
          </MenuItem>
        )
      default:
        return (
          <MenuItem
            key={item.label}
            component={Link}
            to={`/cvs/${id}/${item.path}`}
            onClick={handleClose}
          >
            {t(`contextMenu.${item.label}`, '')}
          </MenuItem>
        )
    }
  }
  if (!items) return <></>
  return <>{items.map(el => createContextMenuItem(el))}</>
}

export default ContextMenuItems
