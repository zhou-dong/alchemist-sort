import { green, grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: grey[500],
            contrastText: "white"
        },
        secondary: {
            main: green[500],
            contrastText: "white"
        }
    },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    "&.MuiTab-root": {
                        color: "white"
                    },
                    "&.Mui-selected": {
                        backgroundColor: "white",
                        color: grey[600],
                    },
                    "&.Mui-disabled": {
                        color: "gray",
                    }
                }
            }
        }
    }
});

export default theme;
