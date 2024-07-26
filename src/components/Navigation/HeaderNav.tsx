import { Tabs, Tab, Box, AppBar, Toolbar } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link, matchPath, useLocation } from 'react-router-dom'

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

function HeaderNav() {
  const routeMatch = useRouteMatch(['/auth/signup', '/auth/login'])
  const currentTab = routeMatch?.pattern?.path
  const { t } = useTranslation()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: 0 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
          <Tabs value={currentTab} textColor="secondary" indicatorColor="secondary" centered>
            <Tab
              label={t('header.login')}
              value="/auth/login"
              to="/auth/login"
              component={Link}
              sx={{ width: 150 }}
            />
            <Tab
              label={t('header.signup')}
              value="/auth/signup"
              to="/auth/signup"
              component={Link}
              sx={{ width: 150 }}
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default HeaderNav
