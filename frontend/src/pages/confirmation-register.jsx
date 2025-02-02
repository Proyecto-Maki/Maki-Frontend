import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar";
import LoadingPage from "../components/loading-page";
import "../styles/confirmation-register.css";
import logo from "../img/Logotipo Maki.png"; // Ruta al logo
import api from "../api";
import React, { useState, useEffect } from "react";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";

const ConfirmationRegister = () => {
  const [otp, setOtp] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [dirNavigate, setDirNavigate] = useState("");
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

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setError("");
    setResponse("");
    setOtp("");
  };
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError("");
    setResponse("");
    setOtp("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      otp: otp,
    };

    api
      .post("/verify-email/", data)
      .then((res) => {
        if (res.status === 200) {
          setResponse(res.data.message);
          setDirNavigate("/login");
          setShowSuccessModal(true);
        } else {
          setError(res.data.message);
          setShowErrorModal(true);
        }
      })
      .catch((error) => {
        setError(error.response.data.detail ? error.response.data.detail : "Error al verificar el correo electrónico");
        setShowErrorModal(true);
      });
  };

  return (
    <div className="absolute-confirmation-register-container">
      {/* Navbar */}
      <Navbar />
      <div className="background-confirmation-register">
        <div className="confirmation_register-container">
          <div className="logo-register">
            <img
              src={logo}
              alt="logo"
              className="logo"
              style={{ height: "100px", marginRight: "10px" }}
            />
          </div>
          <h1 className="description-code">Confirma tu correo electrónico</h1>
          <div className="confirmation_register-form">
            <h2>Inserta el código que enviamos a tu correo electrónico</h2>
            <div className="tooltip-code">
              <input
                className="input-field"
                type="text"
                name="codigo"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Código de confirmación"
                required
              />
            </div>
            <button
              type="submit"
              className="submit-button"
              onClick={handleSubmit}
            >
              Registrar
            </button>
          </div>
        </div>
      </div>
      <SuccessModal
        show={showSuccessModal}
        handleClose={handleCloseSuccessModal}
        response={response}
        dirNavigate={dirNavigate}
      />
      <ErrorModal
        show={showErrorModal}
        handleClose={handleCloseErrorModal}
        error={error}
      />
    </div>
  );
};
export default ConfirmationRegister;
