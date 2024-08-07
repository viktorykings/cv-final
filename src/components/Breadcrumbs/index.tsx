import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { Link, useLocation } from 'react-router-dom'

export default function BasicBreadcrumbs() {
  const location = useLocation()
  const crumbs = location.pathname.toUpperCase().split('/').slice(1)
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ m: 3 }}>
      <Link key={crumbs[0]} color="inherit" to={`/${crumbs[0].toLowerCase()}`}>
        {crumbs[0]}
      </Link>
      {crumbs.slice(1).map(el => (
        <Typography key={el}>{el}</Typography>
      ))}
    </Breadcrumbs>
  )
}
