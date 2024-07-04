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
  const buildPath = (id: string, path: string) => {
    return `users/${id}/${path}`
  }
  const routes = [Paths.PROFILE, Paths.SKILLS, Paths.LANGUAGES, Paths.CVS]
  const routeMatch = useRouteMatch(routes.map(el => buildPath(id as string, el)))
  const currentTab = routeMatch?.pattern?.path

  return (
    <Tabs value={currentTab} textColor="secondary" indicatorColor="secondary">
      <Tab
        label="Profile"
        value={buildPath(id as string, Paths.PROFILE)}
        to={Paths.PROFILE}
        component={Link}
      />
      <Tab
        label="Skills"
        value={buildPath(id as string, Paths.SKILLS)}
        to={Paths.SKILLS}
        component={Link}
      />
      <Tab
        label="Languages"
        value={buildPath(id as string, Paths.LANGUAGES)}
        to={Paths.LANGUAGES}
        component={Link}
      />
      <Tab label="CVs" value={buildPath(id as string, Paths.CVS)} to={Paths.CVS} component={Link} />
    </Tabs>
  )
}
export default ProfileTabs
