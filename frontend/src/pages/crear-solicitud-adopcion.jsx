import Navbar from "../components/navbar";
import LoadingPage from "../components/loading-page";
import "../styles/crear-solicitud-adopcion.css";
import api from "../api";
import logo from "../img/Logotipo Maki.png";
import mascota from "../img/mascotaAdopcion1.png";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import ConfirmationModal from "../components/ConfirmationModal";

function CrearSolicitudAdopcion() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [dirNavigate, setDirNavigate] = useState("");

  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const refresh = sessionStorage.getItem("refresh");
  const is_cliente = sessionStorage.getItem("is_cliente");
  const is_fundacion = sessionStorage.getItem("is_fundacion");

  if (!email || !token || !refresh || !is_cliente || !is_fundacion) {
    window.location.href = "/login";
  }

  if (is_cliente === "false") {
    window.location.href = "/servicios";
  }

  const { mascota } = location.state || {};
  const { id_publicacion } = location.state || {};
  if (!mascota || !id_publicacion) {
    window.location.href = "/servicios";
    return;
  }



  // Estados del formulario
  const [motivo, setMotivo] = useState("");
  const [terminos, setTerminos] = useState(false);



  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);




  // useEffect(() => {
  //   const fetchPets = async () => {
  //     const fakeData = [
  //       {
  //         id: 1,
  //         name: "Roberto",
  //       },
  //     ];
  //     setPets(fakeData);
  //   };
  //   fetchPets();
  // }, []);

  // if (isLoading) {
  //   return <LoadingPage />;
  // }
  // const selectedPet = pets.length > 0 ? pets[0] : null;

  const validateMotivo = (motivo) => {
    let error = "";
    if (motivo.length < 10) {
      error += " El motivo debe tener al menos 10 caracteres.";
    }

    if (motivo > 255) {
      error += " El motivo debe tener más de 255 caracteres.";
    }

    if (motivo.length === 0) {
      error += " El motivo no puede estar vacío.";
    }

    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,]+$/;
    if (!regex.test(motivo)) {
      error += " El motivo solo puede contener letras y números.";
    }

    return error;
  }

  const validateTerminos = (terminos) => {
    if (!terminos) {
      return "Debes aceptar las normativas de adopciones de Maki para continuar.";
    }
  }

  const handleEnviarSolicitud = async (e) => {
    e.preventDefault();

    const validacionTerminos = validateTerminos(terminos);
    if (validacionTerminos) {
      setError(validacionTerminos);
      setShowErrorModal(true);
    }

    const validacionMotivo = validateMotivo(motivo);
    if (validacionMotivo) {
      setError(validacionMotivo);
      setShowErrorModal(true);
    }

    const data = {
      email: email,
      id_publicacion: id_publicacion,
      motivo: motivo,
    }

    api
      .post('solicitud-adopcion/create/', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then((res) => {
        if (res.status === 201) {
          setResponse(res.data.message);
          setShowSuccessModal(true);
          setDirNavigate("/servicios");
        } else {
          console.log(res.data);
          setError("Error al enviar la solicitud de adopción.");
          setShowErrorModal(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.response ? error.response.data.detail : "Error al enviar la solicitud de adopción.");
        setShowErrorModal(true);
      });

  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setError("");
    setResponse("");
  };
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError("");
    setResponse("");
  };

  const handleYesConfirmationModal = async (e) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    await handleEnviarSolicitud(e);
    setIsLoading(false);
    handleNoConfirmationModal();
  };

  const handleNoConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleOpenConfirmationModal = (e) => {
    e.preventDefault();
    setShowConfirmationModal(true);
  };

  return (
    <div className="absolute-container-create-adoption">
      {/* Navbar */}
      <Navbar />
      <div className="total-container-create-adoption">
        <div className="background-container-create-adoption">
          <div className="logo-container">
            <img
              src={logo}
              alt="Logo Maki"
              className="logo-img"
              style={{ height: "100px" }}
            />
          </div>
          {mascota ? (
            <div className="create-adoption">
              <form className="form-create-adoption">
                <div className="photo-container">
                  <img
                    src={mascota.imagen}
                    alt="Mascota"
                    className="photo-container-img"
                  />
                </div>
                <h2 className="name-pet">{mascota.nombre}</h2>
                <p className="text-create-adoption">
                  Nos alegra que hayas decidido adoptar a {mascota.nombre}. Por
                  favor cuéntanos el motivo de tu adopción:
                </p>
                <div className="input-container">
                  <div className="tooltip-create-adoption">
                    <textarea
                      type="text"
                      className="input-reason-adoption"
                      placeholder={`Cuéntanos porqué decidiste adoptar y porqué crees que eres la persona indicada para ${mascota.nombre}...`}
                      name="motivo"
                      value={motivo}
                      onChange={(e) => setMotivo(e.target.value)}
                      required
                    />
                    <span className="tooltip-create-adoption-message">
                      Este campo es obligatorio. Ingresa el motivo de adopción. 
                    </span>
                  </div>
                </div>
                <div className="normative-maki" style={{ display: "grid", gridTemplateColumns: "50px 1fr"}}>
                  <div className="form-group-normativas" style={{ marginBottom: "10px"}}>
                    <input
                      className="terms-checkbox-normativas"
                      type="checkbox"
                      id="terms"
                      checked={terminos}
                      onChange={(e) => setTerminos(e.target.checked)}
                      required
                    />
                  </div>
                  <label htmlFor="terms" className="normativas-label">
                    Acepto y estoy de acuerdo con las{" "}
                    <a
                      href="/terminos-y-condiciones" /*hay que creear esa vista, yo la hago*/
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#ff7f50" }}
                    >
                      normativas
                    </a>{" "}
                    de Maki
                  </label>
                </div>

              </form>
            </div>
          ) : (
            <p>No hay mascotas disponibles para adoptar.</p>
          )}
          <div className="container-btn-adopt-pet">
            <button type="submit" className="btn-adopt-pet" onClick={handleOpenConfirmationModal}>
              <i className="fas fa-paw"></i> ¡Adoptar!
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
      <ConfirmationModal
        show={showConfirmationModal}
        handleYes={handleYesConfirmationModal}
        handleNo={handleNoConfirmationModal}
        response={`¿Estás seguro enviar esta solicitud de adopción para ${mascota.nombre}?`}
      />
    </div>
  );
}

export default CrearSolicitudAdopcion;