import React from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';

import Bubble from './sorts/Bubble';

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
  return (
    <>
      <div>
        I guess we need to do some thing in home page.
      </div>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bubble" element={<Bubble />} />
      </Routes>
      <Nav />
    </div>
  );
}

export default App;
