import React from 'react';
import { useLocation } from 'react-router-dom'; // Importamos useLocation para obtener la ruta actual
import logo from '../img/Logotipo Maki Blanco.png'; // Ruta al logo
import '../styles/navbar.css';
import { FaSearch, FaShoppingCart } from 'react-icons/fa'; // Importamos los iconos de React Icons


function Navbar() {
  const location = useLocation(); // Obtenemos la ubicación actual de la ruta

  // Comprobamos si estamos en la página de Login
  const isLoginPage = location.pathname === '/login';

  // Comprobamos si estamos en la página de perfil de usuario
  const isUserProfilePage = location.pathname === '/user-profile';

  // Aquí podrías agregar la URL de la foto de perfil o pasarla como prop
  const userProfileImage = '../src/img/catPfp.jpeg'; // Reemplaza con la URL de la imagen del perfil

  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={{ boxShadow: "#7BB66D" }}>
      <div className="container-fluid">
        {/* Logo */}
        <div className="navbar-brand">
          <img
            src={logo}
            alt="Logo Maki"
            className="logo-img"
            style={{ height: "50px", marginRight: "15px" }}
          />
        </div>

        {/* Botón  para pantallas pequeñas */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">☰</span>
        </button>

        {/* Links y botones */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/servicios">Servicios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/productos">Productos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/makipaws">MakiPaws</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/acerca">Acerca de Maki</a>
            </li>
          </ul>
          {/* Botones adicionales */}
          <div className= "button-login" >
            {!isLoginPage && !isUserProfilePage && (
              <a href="/login">
                <button className="btn-custom">Login</button>
              </a>
            )}
            {/* Mostrar foto de perfil si estamos en la página de perfil de usuario */}
            {isUserProfilePage && (
              <div className="profile-actions" style={{ display: 'flex', alignItems: 'center' }}>
                {/* Icono de búsqueda */}
                <div style={{ marginRight: "10px" }}>
                  <FaSearch size={20} />
                </div>

                {/* Icono de carrito */}
                <div style={{ marginRight: "10px" }}>
                  <FaShoppingCart size={20} />
                </div>

                {/* Foto de perfil */}
                <div className="profile-photo">
                  <img
                    src={userProfileImage}
                    alt="Foto de perfil"
                    className="img-profile"
                    style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
