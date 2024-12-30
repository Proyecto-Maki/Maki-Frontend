import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/login'
import Home from './pages/home'
import React from 'react';
import Register from './pages/register';
import ConfirmationRegister from './pages/confirmation-register';
import UserProfile from './pages/user-profile';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirmation-register" element={<ConfirmationRegister />} />
        <Route path="/user-profile" element={<UserProfile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
