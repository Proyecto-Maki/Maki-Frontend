import React from 'react';
import { useLocation } from 'react-router-dom'; // Importamos useLocation para obtener la ruta actual
import logo from '../img/Logotipo Maki Blanco.png'; // Ruta al logo
import '../styles/navbar.css';

function Navbar() {
  const location = useLocation(); // Obtenemos la ubicación actual de la ruta

  // Comprobamos si estamos en la página de Login
  const isLoginPage = location.pathname === '/login';

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{ backgroundColor: "#7BB66D", boxShadow: "#7BB66D" }}
    >
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
          <span className="navbar-toggler-icon"></span>
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
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Si no estamos en la página de login, mostramos el botón */}
            {!isLoginPage && <button className="btn-custom">Login</button>}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
