import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import ConfirmationRegister from './pages/confirmation-register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirmation-register" element={<ConfirmationRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
