import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import Community from './components/pages/Community';
import Store from './components/pages/Store';
import Wtg from './components/pages/Wtg';

function App() {
  const [bottomNavbar, setBottomNavbar] = useState(false);

  const showBottomNavbar = () => {
    if (window.innerWidth <= 960) {
      setBottomNavbar(true);
    } else {
      setBottomNavbar(false);
    }
  };

  useEffect(() => {
    showBottomNavbar();
  }, []);

  window.addEventListener('resize', showBottomNavbar);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          {/* 추가 */}
          <Route path='/community' element={<Community />} />
          <Route path='/store' element={<Store />} />
          <Route path='/wtg' element={<Wtg />} />
          {/* 추가 */}
          <Route path='/services' element={<Services />} />
          <Route path='/products' element={<Products />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
        {bottomNavbar && <BottomNavbar />}
      </Router>
    </>
  );
}

export default App;
