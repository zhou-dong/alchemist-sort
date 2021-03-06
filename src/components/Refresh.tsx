import { RefreshOutlined } from "@mui/icons-material";
import { IconButton, Toolbar } from "@mui/material";

interface Props {
    handleRefresh: () => any;
}

const Refresh = ({ handleRefresh }: Props) => (
    <Toolbar sx={{ position: "fixed", bottom: 0, right: 0 }}>
        <IconButton onClick={handleRefresh} size="large" color="secondary">
            <RefreshOutlined />
        </IconButton>
    </Toolbar>
);

export default Refresh;
