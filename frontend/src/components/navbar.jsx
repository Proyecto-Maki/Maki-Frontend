import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Importamos useLocation para obtener la ruta actual
import logo from "../img/Logotipo Maki Blanco.png"; // Ruta al logo
import "../styles/navbar.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa"; // Importamos los iconos de React Icons
import clientes_img from "../img/Foto_Perfil_Clientes.svg";
import fundaciones_img from "../img/Foto_Perfil_Fundaciones.svg";

function Navbar() {
  const location = useLocation(); // Obtenemos la ubicación actual de la ruta

  // Comprobamos si estamos en la página de Login
  const isLoginPage = location.pathname === "/login";

  // Comprobamos si estamos en la página de perfil de usuario
  const isUserProfilePage = location.pathname === "/user-profile";

  const [userLogin, setUserLogin] = useState(false); // Variable de estado para saber si el usuario está logueado
  const [userProfileImage, setUserProfileImage] = useState(""); // Variable de estado para la foto de perfil

  useEffect(() => {
    if (
      sessionStorage.getItem("token") !== null &&
      sessionStorage.getItem("refresh") !== null &&
      sessionStorage.getItem("email") !== null &&
      sessionStorage.getItem("is_cliente") !== null &&
      sessionStorage.getItem("is_fundacion") !== null
    ) {
      setUserLogin(true);
      if (sessionStorage.getItem("is_cliente") === "true") {
        setUserProfileImage(clientes_img);
      } else {
        setUserProfileImage(fundaciones_img);
      }
    }
  }, []);

  useEffect(() => {
    console.log(userLogin);
  }, [userLogin]);

  // Aquí podrías agregar la URL de la foto de perfil o pasarla como prop
  //
  // const userProfileImage = "../src/img/catPfp.jpeg"; // Reemplaza con la URL de la imagen del perfil

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{ boxShadow: "#7BB66D" }}
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
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">☰</span>
        </button>

        {/* Links y botones */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-info">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Bienvenido
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/servicios">
                  Servicios
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/productos">
                  Productos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/makipaws">
                  MakiPaws
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/sobre-maki">
                  Acerca de Maki
                </a>
              </li>
            </ul>
            {/* Botones adicionales */}
            <div className="button-login">
              {!isLoginPage && !isUserProfilePage && userLogin === false && (
                <a href="/login">
                  <button className="btn-custom">Login</button>
                </a>
              )}
              {/* Mostrar foto de perfil si estamos en la página de perfil de usuario */}
              {isUserProfilePage ||
                (userLogin === true && (
                  <div
                    className="profile-actions"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {/* Icono de búsqueda */}
                    <div style={{ marginRight: "10px" }}>
                      <FaSearch size={20} />
                    </div>

                    {/* Icono de carrito */}
                    <div className="shopping-cart">
                      <a href="/carrito" className="me-3">
                        <FaShoppingCart className="cart-icon" />
                      </a>
                    </div>

                    {/* Foto de perfil */}
                    <div className="profile-photo-navbar">
                      <a href="/user-profile">
                        <img
                          src={userProfileImage}
                          alt="Foto de perfil"
                          className="img-profile-navbar"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
