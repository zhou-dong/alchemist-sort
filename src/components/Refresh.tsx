import { RefreshOutlined } from "@mui/icons-material";
import { IconButton, Toolbar } from "@mui/material";

interface Props {
    handleRefresh: () => any;
}

export default function ({ handleRefresh }: Props) {
    return (
        <Toolbar sx={{ position: "fixed", bottom: 0, right: 0 }}>
            <IconButton onClick={handleRefresh} size="large" color="secondary">
                <RefreshOutlined />
            </IconButton>
        </Toolbar>
    );
}
