import { Outlet } from 'react-router-dom'
import BasicBreadcrumbs from '../Breadcrumbs'

const PagesLayout = () => {
  return (
    <>
      <BasicBreadcrumbs />
      <Outlet />
    </>
  )
}
export default PagesLayout
