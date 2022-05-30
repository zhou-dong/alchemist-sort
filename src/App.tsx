import React from 'react';
import * as THREE from 'three';
import { Route, Routes } from 'react-router-dom';

import Bubble from './sorts/bubble/Bubble';
import Demo from "./sorts/bubble/Demo";
import Header from "./layouts/Header";
import { render, renderer } from './utils/render';
import Home from './layouts/Home';
import BubbleAnimation from './sorts/bubble/Animation';

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
      render(scene);
    }
  };

  animate();

  return (
    <>
      <Header />
      <div ref={ref}></div>
      <Routes>
        <Route path="/" element={<Home setScene={setScene} />} />
        <Route path="/bubble-sort" element={<Bubble setScene={setScene} />} />
        <Route path='/selection-sort' element={<BubbleAnimation setScene={setScene} />} />
        <Route path="/demo" element={<Demo setScene={setScene} />} />
      </Routes>
    </>
  );
}

export default App;
