import React from 'react';
import Navbar from './components/Navbar';
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
      </Router>
    </>
  );
}

export default App;
