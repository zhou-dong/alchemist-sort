import { AppBar, Tab, Tabs } from "@mui/material";
import { Link, matchPath, useLocation } from 'react-router-dom';
import Algorithm from "../models/algorithm";
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

const buildTable = (index: number, { name, path }: Algorithm) => (
    <Tab key={index} component={Link} label={name} value={path} to={path} />
);

export default function () {

    const paths: string[] = algorithms.map(algorithm => algorithm.path);
    const tabs = algorithms.map((algorithm, index) => buildTable(index, algorithm));

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
        <AppBar elevation={0}>
            {navs}
        </AppBar>
    );
}
