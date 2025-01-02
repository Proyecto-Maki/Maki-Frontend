import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import ConfirmationRegister from './pages/confirmation-register';
import PasswordRecovery from './pages/password-recovery';
import ForgetPassword from './pages/forget-password';
import UserProfile from './pages/user-profile';
import Home from './pages/home'
import LoadingPage from './pages/loading-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirmation-register" element={<ConfirmationRegister />} />
        <Route path="/user-profile" element={<UserProfile/>} />
        <Route path="/password-reset-confirm/:uidb64/:token" element={<PasswordRecovery />} />
        <Route path="/forget-password" element={<ForgetPassword />}></Route>
        <Route path="/loading-page" element={<LoadingPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
