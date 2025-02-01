import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import "../styles/login.css";
import logo from "../img/Logotipo Maki.png"; // Ruta al logo
import WelcomeModal from "../components/WelcomeModal"; // Import the new WelcomeModal component
import ErrorModal from "../components/ErrorModal";
import api from "../api";
import LoadingPage from "../components/loading-page";
import { useNavigate } from "react-router-dom";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import SuccessModal from "../components/SuccessModal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [dirNavigate, setDirNavigate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginUrl = "login/";
    const backendUrl = `${api.defaults.baseURL}${loginUrl}`;
    console.log("Request URL:", backendUrl);

    api
      .post(loginUrl, { email, password })
      .then((response) => {
        console.log("Response:", response);
        if (response.status === 200) {
          console.log("✅ Login successful:", response.data);

          const userId = response.data.data.user_id; // 📌 Asegurar que se obtiene el user_id
          if (!userId) {
            console.error(
              "❌ No se recibió user_id en la respuesta del backend"
            );
          } else {
            localStorage.setItem("user_id", userId); // 📌 Guardar user_id en localStorage
          }

          setResponse("¡Bienvenido!");
          setShowSuccessModal(true);
          setTimeout(() => {
            sessionStorage.setItem("token", response.data.data.access);
            sessionStorage.setItem("refresh", response.data.data.refresh);
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("is_cliente", response.data.data.is_cliente);
            sessionStorage.setItem(
              "is_fundacion",
              response.data.data.is_fundacion
            );
            navigate("/"); // Redirige a la página principal
          }, 5000);
        } else {
          console.log("❌ Error en el login");
          console.log(response.data.message);
          setResponse(response.data.message);
          setShowErrorModal(true);
        }
      })
      .catch((error) => {
        console.error(
          error.response ? error.response.data : "Error en el servidor"
        );
        setError(
          error.response ? error.response.data.detail : "Error en el servidor"
        );
        setShowErrorModal(true);
      });
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setError("");
    setResponse("");
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError("");
    setResponse("");
  };

  return (
    <div className="absolute-login-container">
      {/* Navbar */}
      <Navbar />
      <div className="background-container-login">
        <div className="login-container">
          <div className="login-content">
            <img
              src={logo}
              alt="Logo Maki"
              className="logo-img-login"
              style={{ height: "100px", marginRight: "15px" }}
            />
            <h2 className="welcome-text-login">¡BIENVENIDO!</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group position-relative">
                <div className="tooltip-login">
                  <input
                    type="email"
                    className="form-control custom-input"
                    placeholder="Dirección de correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span className="tooltip-login-email">
                    Ingresa tu correo electrónico
                  </span>
                </div>
              </div>
              <div className="form-group position-relative">
                <div className="tooltip-login">
                  <input
                    type="password"
                    className="form-control custom-input"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className="tooltip-login-password">
                    Ingresa tu contraseña
                  </span>
                </div>
              </div>
              <button type="submit" className="btn btn-success login-btn">
                Ingresa
              </button>
              <p className="forgot-password-text">
                <a href="/forget-password">Olvidé mi contraseña</a>
              </p>
              <p className="signup-text">
                ¿No tienes una cuenta aún? <a href="/register">Únete</a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-container-login">
        <Footer />
      </div>
      <WelcomeModal
        show={showSuccessModal}
        handleClose={handleCloseSuccessModal}
        response={response}
      />

      <ErrorModal
        show={showErrorModal}
        handleClose={handleCloseErrorModal}
        error={error}
      />
    </div>
  );
};

export default Login;
