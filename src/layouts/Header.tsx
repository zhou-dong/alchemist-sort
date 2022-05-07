import * as React from 'react';
import { AppBar, Tab, Tabs } from "@mui/material";
import { makeStyles } from "@mui/styles";
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

const useStyles = makeStyles({

    menuButton: {
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
});

function Header() {
    const { menuButton, toolbar } = useStyles();

    const routeMatch = useRouteMatch(['/bubble', '/counting', '/selection']);
    const currentTab = routeMatch?.pattern?.path;


    const navs = (
        <Tabs value={currentTab} style={{}} textColor="inherit" >
            <Tab component={Link} label="Bubble Sort" value="/bubble" to="/bubble" />
            <Tab component={Link} label="Sort 2" value="/counting" to="/counting" />
            <Tab component={Link} label="sort 3" value="/selection" to="/selection" />
        </Tabs>
    );

    return (
        <AppBar elevation={0}>
            {navs}
        </AppBar>
    );

}

export default Header;

