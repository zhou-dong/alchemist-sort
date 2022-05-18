import * as THREE from 'three';
import { Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';

const Center = styled("div")(() => ({
    border: 0,
    position: "fixed",
    top: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

interface Params {
    setScene: React.Dispatch<React.SetStateAction<THREE.Scene | undefined>>
}

const scene = new THREE.Scene();

const Home = ({ setScene }: Params) => {
    setScene(scene);
    return (
        <Center>
            <HomeIcon sx={{ fontSize: 110 }} color="secondary" />
            <Typography align="center" variant="h1" color="secondary">
                Sorting
            </Typography>
        </Center>
    )
};

export default Home;
