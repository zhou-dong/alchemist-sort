import { Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";

interface Props {
    steps: number;
}

export default function ({ steps }: Props) {
    return (
        <Toolbar sx={{ position: "fixed", top: 60, right: 0 }}>
            <Typography color="secondary" variant="h4">
                {(steps < 10) ? "0" : ""}{steps}
            </Typography>
        </Toolbar>
    );
}
