import { Tabs, Tab } from '@mui/material'
import { useLocation, matchPath, Link, useParams } from 'react-router-dom'
import { Paths } from '../../routes/paths'

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation()
  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i]
    const possibleMatch = matchPath(pattern, pathname)
    if (possibleMatch !== null) {
      return possibleMatch
    }
  }

  return null
}
const ProfileTabs = () => {
  const { id } = useParams()
  const { cvId } = useParams()
  const basePath = id ? 'users' : 'cvs'
  const baseID = id ? id : cvId

  const routesProfile = [Paths.PROFILE, Paths.SKILLS, Paths.LANGUAGES, Paths.CVS]
  const routesCvs = [Paths.DETAILS, Paths.SKILLS, Paths.PROJECTS, Paths.PREVIEW]
  const baseRoutes = id ? routesProfile : routesCvs

  const buildPath = (id: string, path: string) => {
    return `/${basePath}/${id}/${path}`
  }
  const routeMatch = useRouteMatch(baseRoutes.map(el => buildPath(baseID as string, el)))
  const currentTab = routeMatch?.pattern?.path

  return (
    <Tabs
      value={currentTab}
      textColor="secondary"
      indicatorColor="secondary"
      sx={{ margin: '10px 0 30px' }}
    >
      {baseRoutes.map(el => (
        <Tab
          key={el}
          label={el}
          value={buildPath(baseID as string, el)}
          to={buildPath(baseID as string, el)}
          component={Link}
        />
      ))}
    </Tabs>
  )
}
export default ProfileTabs
