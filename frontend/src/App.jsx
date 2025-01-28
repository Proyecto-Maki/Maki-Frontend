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
import RegisterPet from "./pages/pet-register";
import PetProfileClient from "./pages/pet-profile-client";
import Resume from "./pages/resume";
import Logout from "./pages/logout";
import PublishReview from "./pages/publish-review";
import InfoProduct from "./pages/info-producto";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";
import Productos from "./pages/productos";
import PetProfileFoundation from "./pages/pet-profile-foundation";
import Servicios from "./pages/servicios";
import Pedidos from "./pages/mis-pedidos";
import CreacionAdopcion from "./pages/creacion-de-adopcion";
import Pedido from "./pages/pedido";
import AboutUs from "./pages/about-us";
import Carrito from "./pages/carrito";
import TerminosYCondiciones from "./pages/terms-and-conditions";
import Membresias from "./pages/membresias";
import CrearSolicitudAdopcion from "./pages/crear-solicitud-adopcion";
import ResumenAdopcion from "./pages/resumen-adopcion";
import SolicitudesAdopcion from "./pages/solicitudes-adopcion";
import AdoptionsFun from "./pages/adopciones-fundacion";import Adoptions from "./pages/adoptions";



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
        <Route path="/register-pet" element={<RegisterPet />}></Route>
        <Route
          path="/pet-profile-client"
          element={<PetProfileClient />}
        ></Route>
        <Route path="/publish-review" element={<PublishReview />} />
        <Route path="/infor-product" element={<InfoProduct />} />
        <Route path="/resume" element={<Resume />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        {/*<Route path="/footer" element={<Footer />}></Route>*/}
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:slug" element={<InfoProduct />} />{" "}
        {/* Cambia id por slug */}
        <Route path="/adopcion" element={<Adoptions />} />
        <Route
          path="/pet-profile-foundation"
          element={<PetProfileFoundation />}
        />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/mis-pedidos" element={<Pedidos />} />
        <Route path="/crear-adopcion" element={<CreacionAdopcion />} />
        <Route path="/mi-pedido" element={<Pedido />} />
        <Route path="/sobre-maki" element={<AboutUs />}></Route>
        <Route path="/carrito" element={<Carrito />}></Route>
        <Route
          path="/terminos-y-condiciones"
          element={<TerminosYCondiciones />}
        />
        <Route path="/membresias" element={<Membresias />}></Route>
        <Route path="/crear-solicitud-adopcion" element={ <CrearSolicitudAdopcion />}></Route>
        <Route path="/resumen-adopcion" element={<ResumenAdopcion />}></Route>
        <Route path="/mascotas-adopcion" element={ <Adoptions />}></Route>
        <Route path="/solicitudes-de-adopcion" element={ <SolicitudesAdopcion />}></Route>
        <Route path="/adopciones-fundacion" element={ <AdoptionsFun />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
