import React from 'react';
import * as THREE from 'three';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';

import Bubble from './sorts/Bubble';
import { render, renderer } from './utils/render';

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

function Home() {
  const scene = new THREE.Scene();
  render(scene);
  return (
    <>
    </>
  );
}

function App() {

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref && ref.current) {
      ref.current.appendChild(renderer.domElement);
    }
  }, [ref]);

  return (
    <div className="App">
      <Header />
      <div ref={ref}></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bubble" element={<Bubble />} />
      </Routes>
      <Nav />
    </div>
  );
}

export default App;
