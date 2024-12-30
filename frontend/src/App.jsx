import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import ConfirmationRegister from './pages/confirmation-register';
import PasswordRecovery from './pages/password-recovery';
import UserProfile from './pages/user-profile';
import Home from './pages/home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirmation-register" element={<ConfirmationRegister />} />
        <Route path="/user-profile" element={<UserProfile/>} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
