import React from "react";
import { Button } from "react-bootstrap";
import { FaDog, FaShoppingBag, FaHeart, FaDonate, FaEdit, FaSignOutAlt, FaTrashAlt } from "react-icons/fa";
import Navbar from '../components/navbar'; // Navbar personalizado
import '../styles/user-profile.css'; // Importa el archivo CSS

const UserProfile = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      {/* User Profile */}
      <div className="profile-container">
        <div className="card profile-card">
          <div className="card-body p-4">
            <div className="d-flex">
              <div className="flex-shrink-0">
                <img
                  src="../src/img/catPfp.jpeg"
                  alt="Generic placeholder image"
                  className="img-fluid"
                />
              </div>
              <div className="flex-grow-1 ms-3">
                <h2 className="nombreUserProfile">Nana Pedraza</h2>
                <p className="correoUserProfile">Nana@gmail.com</p>
                <p className="numeroUserProfile">310101025</p>
                <p className="direccionUserProfile">calle autism</p>
                <p className="rolUserProfile">Dueño de mascota</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="icons-container">
            <div className="d-flex flex-row justify-content-center">
              <div className="p-2">
                <img
                  src="../src/img/iconosProfile/mascotas.png"
                  alt="Generic placeholder image"
                  className="img-fluid"
                />
                <p className="titulosIconos">Mascotas</p>
              </div>
              <div className="p-2">
              <img
                  src="../src/img/iconosProfile/pedidos.png"
                  alt="Generic placeholder image"
                  className="img-fluid"
                />
                <p className="titulosIconos">Pedidos</p>
              </div>
              <div className="p-2">
              <img
                  src="../src/img/iconosProfile/adopciones.png"
                  alt="Generic placeholder image"
                  className="img-fluid"
                />
                <p className="titulosIconos">Adopciones</p>
              </div>
              <div className="p-2">
              <img
                  src="../src/img/iconosProfile/donaciones.png"
                  alt="Generic placeholder image"
                  className="img-fluid"
                />
                <p className="titulosIconos">Donaciones</p>
              </div>
              <div className="p-2">
              <img
                  src="../src/img/iconosProfile/MakiPaws.png"
                  alt="Generic placeholder image"
                  className="img-fluid"
                />
                <p className="titulosIconos">MakiPaws</p>
              </div>
            </div>
          </div>
    </>
  );
};

export default UserProfile;
