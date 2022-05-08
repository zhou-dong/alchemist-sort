import { AppBar, Tab, Tabs } from "@mui/material";
import { Link, matchPath, useLocation } from 'react-router-dom';
import algorithms from "../sorts/algorithms";

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

export default function () {

    const paths: string[] = algorithms.map(algorithm => algorithm.path);
    const tabs = algorithms.map(({ name, path }, index) => <Tab key={index} component={Link} label={name} value={path} to={path} />);

    const routeMatch = useRouteMatch(paths);
    const currentTab = routeMatch?.pattern?.path;

    const navs = (
        <Tabs
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{ style: { backgroundColor: "white" } }}
        >
            {tabs}
        </Tabs>
    );

    return (
        <AppBar color="secondary" elevation={0}>
            {navs}
        </AppBar>
    );
}
