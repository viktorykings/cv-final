import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const PagesLayout = () => {
  return (
    <>
      <Box>breadcrumbs</Box>
      <Outlet />
    </>
  )
}
export default PagesLayout
