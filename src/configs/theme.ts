import { green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: green[500],
            contrastText: "white"
        },
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
                        color: green[500],
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
