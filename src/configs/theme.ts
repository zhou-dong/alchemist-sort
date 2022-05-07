import { green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: green[500],
            contrastText: "white"
        },
    },
});

export default theme;
