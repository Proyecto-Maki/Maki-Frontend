import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import "../styles/solicitudes-adopcion.css";
import "../styles/mis-solicitudes-cuidado.css";
import "../styles/donaciones-recibidas.css";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../components/ErrorModal.jsx";
import SuccessModalReload from "../components/SuccessModalReload";
import api from "../api.js";
import LoadingPage from "../components/loading-page";
import { formatDateTime } from "../functions.js";
import { formatMoney } from "../functions.js";

const solicitudAdopcion = [
  {
    id: "2RYH6",
    primer_nombre: "Ivana",
    primer_apellido: "Pedraza",
    tarjeta: "Tarjeta Gold ($50.000)",
    cantidad: "1",
  },
  {
    id: "2RYH6",
    primer_nombre: "Kelly",
    primer_apellido: "Solano",
    tarjeta: "Tarjeta Gold ($50.000)",
    cantidad: "1",
  },
];

const DonacionesRecibidas = () => {
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const refresh = sessionStorage.getItem("refresh");
  let es_cliente = sessionStorage.getItem("is_cliente");
  let es_fundacion = sessionStorage.getItem("is_fundacion");

  if (!token || !refresh || !email || !es_cliente || !es_fundacion) {
    window.location.href = "/inicio-sesion";
  }

  if (es_cliente === "true") {
    window.location.href = "/inicio-sesion";
  }

  const [donacionesRecibidas, setDonacionesRecibidas] = useState([]);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDonaciones = async () => {
      try {
        const response = await api.get(`donaciones-recibidas/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setDonacionesRecibidas(response.data);
          setIsLoading(false);
        } else {
          console.log(response);
          setError("Error al cargar las donaciones recibidas");
          setShowErrorModal(true);
        }
      } catch (error) {
        console.log(error);
        setError("Error al cargar las donaciones recibidas");
        setShowErrorModal(true);
      }
    };
    fetchDonaciones();
  }, []);

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError("");
    setResponse("");
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setError("");
    setResponse("");
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="absolute-solicitudes-adopcion-container">
      <Navbar />
      <div className="contenedor-solicitudes-adopcion">
        <h3 className="titulo-solicitud-cuidado">Donaciones recibidas</h3>
        {donacionesRecibidas.length === 0 ? (
          <div className="no-solicitudes">
            <h3>No hay donaciones recibidas</h3>
          </div>
        ) : (
          donacionesRecibidas.map((donacion, index) => (
            <div key={index} className="tarjeta-solicitudes-adopcion-sa">
              <div className="fila-superior-sa">
                <div className="icono-y-titulo-sa">
                  <h3 className="titulo-sa">
                    Has recibido una donación de{" "}
                    {donacion.cliente.primer_nombre +
                      " " +
                      donacion.cliente.primer_apellido}
                  </h3>
                </div>
                <div className="id-y-chevron-sa">
                  <h3 className="id-sa">#{donacion.id}</h3>
                </div>
              </div>

              <div className="fila-intermedia-sa">
                <div className="nombre-y-apellido-dr">
                  <p className="nombre-cliente-sa">
                    <button className="estado-sa">Fecha:</button>
                    <span className="recibiste-tarjeta-content-dr">
                      {formatDateTime(donacion.fecha)}
                    </span>
                  </p>
                </div>
              </div>

              <div className="fila-intermedia-sa">
                <div className="nombre-y-apellido-dr">
                  <p className="nombre-cliente-sa">
                    <button className="estado-sa">Recibiste</button>
                    <span className="recibiste-tarjeta-content-dr">
                      {donacion.tarjeta.tipo} (
                      {formatMoney(donacion.tarjeta.monto)} COP)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <ErrorModal
        show={showErrorModal}
        handleClose={handleCloseErrorModal}
        error={error}
      />
      <SuccessModalReload
        show={showSuccessModal}
        handleClose={handleCloseSuccessModal}
        response={response}
      />
    </div>
  );
};

export default DonacionesRecibidas;
