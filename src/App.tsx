import React from 'react';
import * as THREE from 'three';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';

import Bubble from './sorts/Bubble';
import { clearIntersection, raycaster, render, renderer, refreshRaycaster } from './utils/render';

const Header = () => (
  <header className='header'>
    <Link className='home' to="/">Alchemist</Link>
  </header>
);

const Nav = () => (
  <nav className='navbar'>
    <Link to="/bubble">Bubble</Link>
  </nav>
);

interface HomeParams {
  setScene: React.Dispatch<React.SetStateAction<THREE.Scene | undefined>>
}

const homeScene = new THREE.Scene();
function Home({ setScene }: HomeParams) {
  React.useEffect(() => {
    setScene(homeScene);
  }, [])
  return (<></>);
}

function App() {

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref && ref.current) {
      ref.current.appendChild(renderer.domElement);
    }
  }, [ref]);

  const [scene, setScene] = React.useState<THREE.Scene>();

  function animate() {
    requestAnimationFrame(animate);

    if (scene) {
      refreshRaycaster();
      const intersects = raycaster.intersectObjects(scene.children);

      for (let i = 0; i < intersects.length; i++) {
        const intersect = intersects[i];
        // (intersect.object as any).material.color.set("red");
      }

      if (intersects.length > 0) {
        clearIntersection();
      }

      render(scene);
    }
  };

  animate();

  return (
    <div className="App">
      <Header />
      <div ref={ref}></div>
      <Routes>
        <Route path="/" element={<Home setScene={setScene} />} />
        <Route path="/bubble" element={<Bubble setScene={setScene} />} />
      </Routes>
      <Nav />
    </div>
  );
}

export default App;
