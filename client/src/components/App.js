import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./pages/Navbar/Navbar";
import BottomNavbar from "./pages/BottomNavbar/BottomNavbar";
import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import Products from "./pages/Products/Products";
import SignUp from "./pages/SignUp/SignUp";
import Community from "./pages/Community/List";
import Store from "./pages/Store/Store";
import Wtg from "./pages/Wtg/Wtg";
import SignIn from "./pages/SignIn/General/SignIn";
import Profile from "./pages/Profile/Profile";
import Callback from "./pages/SignIn/Naver/Callback";
import Undefined from "./pages/Undefined/Undefined";
import Recruitment from "./pages/Recruitment/Recruitment";
import Information from "./pages/Recruitment/Information/Information";
import Upload from "./pages/Community/Upload";
import Detail from "./pages/Community/Detail";
import Edit from "./pages/Community/Edit";
import ComMain from "./pages/Community/ComMain";

function App() {
  // BottomNavbar on, off
  const [bottomNavbar, setBottomNavbar] = useState(false);

  // 너비가 960 이하일 때만 true
  const showBottomNavbar = () => {
    if (window.innerWidth <= 960) {
      setBottomNavbar(true);
    } else {
      setBottomNavbar(false);
    }
  };

  // 일단 페이지가 렌더링된 후에 한 번 실행함.
  useEffect(() => {
    showBottomNavbar();
  }, []);

  // 사용자가 'resize'하는 것을 감지하여 showBottomNavbar를 실행함.
  window.addEventListener("resize", showBottomNavbar);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* Features page */}
          <Route exact path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/community" element={<ComMain />} />
          <Route path="/wtg" element={<Wtg />} />
          <Route path="/profile" element={<Profile />} />

          {/* 추가 */}
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route exact path="/recruitment" element={<Recruitment />} />
          <Route
            exact
            path="/recruitment/information"
            element={<Information />}
          />

          {/* Community post */}

          <Route path="/upload" element={<Upload />} />
          <Route path="/list" element={<ComMain />} />
          <Route path="/post/:postNum" element={<Detail />}></Route>
          <Route path="/edit/:postNum" element={<Edit />}></Route>

          {/* Register/Login page */}
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/auth/naver/callback" element={<Callback />} />

          {/* Loading page */}
          <Route path="/undefined" element={<Undefined />} />
        </Routes>
        {bottomNavbar && <BottomNavbar />}
      </Router>
    </>
  );
}

export default App;
