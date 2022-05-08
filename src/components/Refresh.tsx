import { RefreshOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

interface Props {
    handleRefresh: () => any;
}

const useStyles = makeStyles(() => createStyles({
    refresh: {
        position: "fixed",
        bottom: 80,
        right: 40,
        border: "2px solid lightgrey",
    }
}));

export default function ({ handleRefresh }: Props) {
    const { refresh } = useStyles();
    return (
        <IconButton
            size="large"
            className={refresh}
            onClick={handleRefresh}
        >
            <RefreshOutlined />
        </IconButton>
    );
}
