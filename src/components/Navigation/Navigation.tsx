import { Tabs, Tab, Box, AppBar, Toolbar} from '@mui/material';
import {
    Link,
    matchPath,
    useLocation,
} from 'react-router-dom';


function useRouteMatch(patterns: readonly string[]) {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}

function HeaderNav() {
    const routeMatch = useRouteMatch(['/auth/signup', '/auth/login']);
    const currentTab = routeMatch?.pattern?.path;

    return (

        // <Tabs value={currentTab} textColor="secondary" centered TabIndicatorProps={{ style: { background: theme.palette.secondary.main  }}} >
        //     <Tab label="Login" value="/auth/login" to="/auth/login" component={Link} sx={{ width: 150, "& .Mui-selected": { color: theme.palette.secondary.main }, "&.MuiTab-root:hover": {bgcolor: "transparent", color:"white"} }} />
        //     <Tab label="Signup" value="/auth/signup" to="/auth/signup" component={Link} sx={{ width: 150, "& .Mui-selected": { color: theme.palette.secondary.main }, "&.MuiTab-root:hover": {bgcolor: "transparent",  color:"white"}}} />
        // </Tabs>

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{display: "flex", justifyContent:"center", alignItems: "flex-end"}}>
                    <Tabs value={currentTab} textColor="secondary"
                        indicatorColor="secondary" centered
                    >
                        <Tab label="Login" value="/auth/login" to="/auth/login" component={Link} sx={{ width: 150 }} />
                        <Tab label="Signup" value="/auth/signup" to="/auth/signup" component={Link} sx={{ width: 150 }} />
                    </Tabs>
                    {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton> */}
                </Toolbar>
            </AppBar>
        </Box>

    );
}
export default HeaderNav

