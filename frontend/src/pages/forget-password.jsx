import "bootstrap/dist/css/bootstrap.min.css";
import LoadingPage from "../components/loading-page";
import Navbar from "../components/navbar";
import "../styles/forget-password.css";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import logo from "../img/Logotipo Maki.png"; // Ruta al logo
import api from "../api";
import React, { useState, useEffect } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
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

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
      return null;
    } else {
      return "El correo electrónico no es válido.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      setShowErrorModal(true);
      setEmail("");
      return;
    }

    const data = {
      email: email,
    };

    api
      .post("/password-reset/", data)
      .then((res) => {
        if (res.status === 200) {
          setResponse(res.data.message);
          setDirNavigate();
          setEmail("");
          setShowSuccessModal(true);
        }
      })
      .catch((error) => {
        setError(error.response.data.detail ? error.response.data.detail : "Error al enviar el correo electrónico");
        setShowErrorModal(true);
      });
  };

  return (
    <div className="absolute-container-forget-password">
      <Navbar />
      <div className="background-recovery">
        <div className="forget-password-container">
          <div className="logo-forget">
            <img
              src={logo}
              alt="logo"
              className="logo"
              style={{ height: "100px", marginRight: "10px" }}
            />
          </div>
          <h1 className="description-forget">Correo eléctronico</h1>
          <div className="confirmation_forget-form">
            <h2>Ingresa el correo electrónico asociado a tu cuenta</h2>
            <div className="tooltip-forget">
              <input
                className="input-field"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                required
              />
            </div>
            <button
              type="submit"
              className="submit-button"
              onClick={handleSubmit}
            >
              Enviar correo
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
export default ForgetPassword;
