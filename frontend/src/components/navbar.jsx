import React from 'react';
import logo from '../img/Logotipo Maki.png'; // Ruta al logo

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{ backgroundColor: "#7BB66D", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
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
          <button className="btn-custom">Login</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
