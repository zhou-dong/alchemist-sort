import { green, grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: green[500],
            contrastText: "white"
        },
        secondary: {
            main: grey[500],
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
                        color: "black",
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
