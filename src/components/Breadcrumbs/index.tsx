import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { Link, useLocation } from 'react-router-dom'

export default function BasicBreadcrumbs() {
  const location = useLocation()
  const crumbs = location.pathname.toUpperCase().split('/').slice(1)
  console.log(location, crumbs)
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ m: 3 }}>
      <Link color="inherit" to={`/${crumbs[0].toLowerCase()}`}>
        {crumbs[0]}
      </Link>
      {crumbs.slice(1).map(el => (
        <Typography>{el}</Typography>
      ))}
    </Breadcrumbs>
  )
}
