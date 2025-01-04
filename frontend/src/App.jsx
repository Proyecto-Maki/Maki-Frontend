import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
<<<<<<< HEAD
import Login from './pages/login';
import Register from './pages/register';
import ConfirmationRegister from './pages/confirmation-register';
import PasswordRecovery from './pages/password-recovery';
import ForgetPassword from './pages/forget-password';
import UserProfile from './pages/user-profile';
import Home from './pages/home'
import LoadingPage from './components/loading-page';
import RegisterPetClient from './pages/pet-register-client';
import PetFoundation from './pages/pet-foundation'
import Resume from './pages/resume';
import Logout from './pages/logout';
=======
import Login from "./pages/login";
import Register from "./pages/register";
import ConfirmationRegister from "./pages/confirmation-register";
import PasswordRecovery from "./pages/password-recovery";
import ForgetPassword from "./pages/forget-password";
import UserProfile from "./pages/user-profile";
import Home from "./pages/home";
import LoadingPage from "./components/loading-page";
import RegisterPetClient from "./pages/pet-register-client";
import PetFoundation from "./pages/pet-foundation";
import Resume from "./pages/resume";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";
>>>>>>> origin/development-Angel

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/confirmation-register"
          element={<ConfirmationRegister />}
        />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route
          path="/password-reset-confirm/:uidb64/:token"
          element={<PasswordRecovery />}
        />
        <Route path="/forget-password" element={<ForgetPassword />}></Route>
        {/*<Route path="/loading-page" element={<LoadingPage />}></Route>*/}
        <Route
          path="/register-pet-client"
          element={<RegisterPetClient />}
        ></Route>
        <Route path="/pet-foundation" element={<PetFoundation />}></Route>
        <Route path="/resume" element={<Resume />}></Route>
<<<<<<< HEAD
        <Route path="/logout" element={<Logout />}></Route>
=======
        <Route path="/footer" element={<Footer />}></Route>
>>>>>>> origin/development-Angel
      </Routes>
    </BrowserRouter>
  );
}

export default App;
