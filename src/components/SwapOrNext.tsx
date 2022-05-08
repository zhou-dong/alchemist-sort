import { Button, ButtonGroup } from "@mui/material";

interface Props {
    disabled: boolean;
    handleSwap: () => any;
    handleNext: () => any;
}

export default function ({ disabled, handleSwap, handleNext }: Props) {
    return (
        <ButtonGroup
            size="large"
            variant="outlined"
            color="secondary"
            disabled={disabled}
        >
            <Button onClick={handleSwap}>SWAP</Button>
            <Button onClick={handleNext}>NEXT</Button>
        </ButtonGroup>
    );
}
