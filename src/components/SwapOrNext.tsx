import { Button, ButtonGroup } from "@mui/material";

interface Props {
    disabled: boolean;
    handleSwap: () => any;
    handleNext: () => any;
}

const SwapOrNext = ({ disabled, handleSwap, handleNext }: Props) => (
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

export default SwapOrNext;
