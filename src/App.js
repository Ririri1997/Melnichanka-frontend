import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyled from './style/global.styles';
import Login from './views/pages/Login/Login';
import Registration from './views/pages/Registration/Registration';
import Logout from './views/pages/Logout/Logout';
import Home from './views/pages/Home/Home';
import Goods from './views/pages/Goods/Goods';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyled />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/goods" element={<Goods />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
