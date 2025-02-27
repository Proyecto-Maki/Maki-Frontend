import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import ConfirmationRegister from "./pages/confirmation-register";
import PasswordRecovery from "./pages/password-recovery";
import ForgetPassword from "./pages/forget-password";
import UserProfile from "./pages/user-profile";
import Bienvenido from "./pages/home";
import LoadingPage from "./components/loading-page";
import RegisterPet from "./pages/pet-register";
import PetProfileClient from "./pages/pet-profile-client";
import Resume from "./pages/resume";
import Logout from "./pages/logout";
import PublishReview from "./pages/publish-review";
import InfoProduct from "./pages/info-producto";
import Footer from "./components/Footer";
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
import AdoptionsFun from "./pages/adopciones-fundacion";
import Adoptions from "./pages/adoptions";
import Makipaws from "./pages/makipaws";
import MisSolicitudesCuidado from "./pages/mis-solicitudes-cuidado";
import DonacionesRecibidas from "./pages/donaciones-recibidas";
import ResumenCuidado from "./pages/resumen-solicitud-cuidado";
import InfoCuidadores from "./pages/info-cuidador";
import DonacionesRealizadas from "./pages/donaciones-realizadas";
import CrearSolicitudCuidado from "./pages/crear-solicitud-cuidado";
import TarjetasDonaciones from "./pages/tarjetas-donacion";

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
      <Routes>
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/" element={<Bienvenido />} />
        <Route path="/registrate" element={<Register />} />
        <Route
          path="/confirmacion-registro"
          element={<ConfirmationRegister />}
        />
        <Route path="/perfil-usuario" element={<UserProfile />} />
        <Route
          path="/password-reset-confirm/:uidb64/:token"
          element={<PasswordRecovery />}
        />
        <Route path="/forget-password" element={<ForgetPassword />}></Route>
        {/*<Route path="/loading-page" element={<LoadingPage />}></Route>*/}
        <Route path="/register-pet" element={<RegisterPet />}></Route>
        <Route
          path="/perfil-mascota-cliente"
          element={<PetProfileClient />}
        ></Route>
        <Route path="/publicar-reseña" element={<PublishReview />} />
        <Route path="/infor-product" element={<InfoProduct />} />
        <Route path="/resume" element={<Resume />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        {/*<Route path="/footer" element={<Footer />}></Route>*/}
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:slug" element={<InfoProduct />} />{" "}
        {/* Cambia id por slug */}
        <Route path="/adopcion" element={<Adoptions />} />
        <Route
          path="/perfil-mascota-fundacion"
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
        <Route
          path="/crear-solicitud-adopcion"
          element={<CrearSolicitudAdopcion />}
        ></Route>
        <Route path="/resumen-adopcion" element={<ResumenAdopcion />}></Route>
        <Route path="/mascotas-adopcion" element={<Adoptions />}></Route>
        <Route
          path="/solicitudes-de-adopcion"
          element={<SolicitudesAdopcion />}
        ></Route>
        <Route path="/adopciones-fundacion" element={<AdoptionsFun />}></Route>
        <Route path="/makipaws" element={<Makipaws />}></Route>
        <Route path="/solicitudes-de-cuidado" element={<MisSolicitudesCuidado />}></Route>
        <Route path="/donaciones-recibidas" element={<DonacionesRecibidas />}></Route>
        <Route path="/resumen-cuidado" element={<ResumenCuidado />}></Route>
        <Route path="/info-cuidador" element={<InfoCuidadores />}></Route>
        <Route path="/donaciones-realizadas" element={<DonacionesRealizadas />}></Route>
        <Route path="/crear-solicitud-cuidado" element={<CrearSolicitudCuidado />}></Route>
        <Route path="/tarjetas-donaciones" element={<TarjetasDonaciones />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
