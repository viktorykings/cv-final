import { MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import { IContextMenuItem } from '../../../shared/components/Table/types/TableProps'
import { useTranslation } from 'react-i18next'

interface IMenuItemProps<T> {
  items: T[] | undefined
  id: string | null | undefined
  handleClose?: () => void
  handleDelete?: () => void
}

const ContextMenuItems = ({
  items,
  id,
  handleClose,
  handleDelete
}: IMenuItemProps<IContextMenuItem>) => {
  const { t } = useTranslation()

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
          <MenuItem key={item.label} onClick={handleDelete}>
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
