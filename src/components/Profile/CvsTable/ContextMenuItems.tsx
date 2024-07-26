import { MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDeleteCv } from '../../../graphql/users/cvs/hooks/useDeleteCv'
import { IContextMenuItem } from '../../../shared/components/Table/types/TableProps'
import { useTranslation } from 'react-i18next'

interface IMenuItemProps<T> {
  items: T[] | undefined
  id: string | null | undefined
  handleClose: () => void
}

const ContextMenuItems = ({ items, id, handleClose }: IMenuItemProps<IContextMenuItem>) => {
  const [deleteCv] = useDeleteCv()
  const { t } = useTranslation()

  const handleClick = () => {
    deleteCv({ variables: { cv: { cvId: id } } })
    handleClose()
  }
  if (!items) return <></>
  console.log(items)
  return (
    <>
      {items.map(el =>
        el.path ? (
          el.path === 'profile' ? (
            <MenuItem key={el.label} component={Link} to={`${id}/${el.path}`} onClick={handleClose}>
              {t('contextMenu.profile')}
            </MenuItem>
          ) : (
            <MenuItem
              key={el.label}
              component={Link}
              to={`/cvs/${id}/${el.path}`}
              onClick={handleClose}
            >
              {t(`contextMenu.${el.label}`, '')}
            </MenuItem>
          )
        ) : (
          <MenuItem key={el.label} onClick={handleClick}>
            {t(`contextMenu.${el.label}`, '')}
          </MenuItem>
        )
      )}
    </>
  )
}

export default ContextMenuItems
