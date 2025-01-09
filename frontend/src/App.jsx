import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import ConfirmationRegister from "./pages/confirmation-register";
import PasswordRecovery from "./pages/password-recovery";
import ForgetPassword from "./pages/forget-password";
import UserProfile from "./pages/user-profile";
import Home from "./pages/home";
import LoadingPage from "./components/loading-page";
import RegisterPetClient from "./pages/pet-register-client";
import PetProfile from "./pages/pet-profile";
import Resume from "./pages/resume";
import Logout from "./pages/logout";
import PublishReview from "./pages/publish-review";
import InfoProduct from "./pages/info-producto";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";
import Productos from "./pages/productos";
import Adoptions from "./pages/adoptions";
import api from "./api"; // Importamos la API

function App() {
  const [numItemsCarrito, setNumeroItemsCarrito] = useState(0);
  const codigo = localStorage.getItem("codigo_carrito");

  // useEffect(() => {
  //   if (codigo) {
  //     api
  //       .get(`/get_estado_carrito?codigo=${codigo}`)
  //       .then((res) => {
  //         setNumeroItemsCarrito(res.data.num_items);
  //       })
  //       .catch((err) => {
  //         console.error(
  //           "Error al obtener el número de items del carrito:",
  //           err
  //         );
  //       });
  //   }
  // }, [codigo]);

  return (
    <BrowserRouter>
      <Navbar cartItems={numItemsCarrito} />
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
        <Route path="/pet-profile" element={<PetProfile />}></Route>
        <Route path="/publish-review" element={<PublishReview />} />
        <Route path="/infor-product" element={<InfoProduct />} />
        <Route path="/resume" element={<Resume />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        {/*<Route path="/footer" element={<Footer />}></Route>*/}
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:slug" element={<InfoProduct />} />{" "}
        {/* Cambia id por slug */}
        <Route path="/adopcion" element={<Adoptions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
