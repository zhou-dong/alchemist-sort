import { AppBar, Tab, Tabs } from "@mui/material";
import { Link, matchPath, useLocation } from 'react-router-dom';

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

function Header() {

    const routeMatch = useRouteMatch(['/bubble', '/counting', '/selection']);
    const currentTab = routeMatch?.pattern?.path;

    const navs = (
        <Tabs value={currentTab} TabIndicatorProps={{ style: { backgroundColor: "white" } }} >
            <Tab component={Link} label="Bubble Sort" value="/bubble" to="/bubble" />
            <Tab component={Link} label="Sort 2" value="/counting" to="/counting" />
            <Tab component={Link} label="sort 3" value="/selection" to="/selection" disabled />
        </Tabs>
    );

    return (
        <AppBar elevation={0}>
            {navs}
        </AppBar>
    );

}

export default Header;

