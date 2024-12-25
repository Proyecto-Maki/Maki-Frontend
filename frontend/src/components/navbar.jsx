import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/Logotipo Maki.png'; // Asegúrate de que la ruta sea correcta

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-light" style={{ backgroundColor: '#7BB66D' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
        <img src={logo} alt="Logo" className="logo-img" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Servicios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">MakiPaws</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Acerca de Maki</Link>
            </li>
          </ul>
          <button className="btn-custom" type="button">Login</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
