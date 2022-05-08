import Typography from "@mui/material/Typography";
import { createStyles, makeStyles } from "@mui/styles";

interface Props {
    steps: number;
}

const useStyles = makeStyles(() => createStyles({
    stepsContainer: {
        position: "fixed",
        top: 70,
        right: 40,
    },
}));

export default function ({ steps }: Props) {
    const { stepsContainer } = useStyles();
    return (
        <div className={stepsContainer}>
            <Typography color="primary" variant='body1' style={{ marginLeft: "-4px" }}>
                STEPS
            </Typography>
            <Typography color="secondary" variant="h4" style={{ marginTop: "-9px" }}>
                {(steps < 10) ? "0" : ""}{steps}
            </Typography>
        </div>
    );
}
