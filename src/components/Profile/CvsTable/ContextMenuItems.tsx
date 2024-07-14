import { MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDeleteCv } from '../../../graphql/users/cvs/hooks/useDeleteCv'

interface IMenuItemProps {
  cvId: string
  handleClose: () => void
}

const ContextMenuItems = ({ cvId, handleClose }: IMenuItemProps) => {
  const [deleteCv] = useDeleteCv()

  const handleClick = () => {
    deleteCv({ variables: { cv: { cvId: cvId } } })
    handleClose()
  }
  return (
    <>
      <MenuItem>
        <Link to={''}>Details</Link>
      </MenuItem>
      <MenuItem onClick={handleClick}>Delete CV</MenuItem>
    </>
  )
}

export default ContextMenuItems
