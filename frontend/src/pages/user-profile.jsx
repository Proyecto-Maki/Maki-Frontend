import React from "react";
import Navbar from "../components/navbar"; // Navbar personalizado
import "../styles/user-profile.css"; // Importa el archivo CSS

const ProfileIcon = ({ src, alt, title }) => {
  return (
    <div className="p-2">
      <img src={src} alt={alt} className="img-icon" />
      <p className="titulosIconos">{title}</p>
    </div>
  );
};

const userData = {
  name: "Nana Pedraza",
  email: "Nana@gmail.com",
  phone: "310101025",
  address: "calle autism",
  role: "Dueño de mascota",
};

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
        {/* Foto de perfil y botón de cerrar sesión */}
        <div className="flex-shrink-0 text-center">
          <img
            src="../src/img/catPfp.jpeg"
            alt="Profile"
            className="img-fluid"
          />
          <a href="/logout" className="logout-icon mt-3 d-block" title="Cerrar sesión">
            <i className="fas fa-sign-out-alt"></i> Cerrar sesión
          </a>
        </div>
        {/* Información del usuario */}
        <div className="flex-grow-1 ms-3 profile-info">
          <h2 className="nombreUserProfile">{userData.name}</h2>
          <p className="correoUserProfile">{userData.email}</p>
          <p className="numeroUserProfile">{userData.phone}</p>
          <p className="direccionUserProfile">{userData.address}</p>
          <p className="rolUserProfile">{userData.role}</p>
        </div>
        {/* Botón de editar */}
        <div className="button-container-userProfile">
          <button className="edit-icon" title="Editar Perfil">
            <i className="fas fa-edit"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Icons Section */}
      <div className="icons-container">
        <div className="d-flex flex-row justify-content-center">
          <ProfileIcon src="../src/img/iconosProfile/mascotas.svg" alt="Mascotas" title="Mascotas" />
          <ProfileIcon src="../src/img/iconosProfile/pedidos.svg" alt="Pedidos" title="Pedidos" />
          <ProfileIcon src="../src/img/iconosProfile/adopciones.svg" alt="Adopciones" title="Adopciones" />
          <ProfileIcon src="../src/img/iconosProfile/donaciones.svg" alt="Donaciones" title="Donaciones" />
          <ProfileIcon src="../src/img/iconosProfile/makipaws.svg" alt="Makipaws" title="MakiPaws" />
        </div>
      </div>
      {/* Botón de Eliminar cuenta */}
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-danger" title="Eliminar Cuenta">
          <i className="fas fa-trash-alt"></i> Eliminar Cuenta
        </button>
      </div>
    </>
  );
};

export default UserProfile;
