import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import "../styles/solicitudes-adopcion.css";
import "../styles/mis-solicitudes-cuidado.css";
import { FaChevronRight, FaDog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../components/ErrorModal.jsx";
import api from "../api.js";
import { formatDateTime } from "../functions";
import { Link } from "react-router-dom";

const MisSolicitudesCuidado = () => {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const refresh = sessionStorage.getItem("refresh");
  const is_cliente = sessionStorage.getItem("is_cliente");
  const is_fundacion = sessionStorage.getItem("is_fundacion");
  const [error, setError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [solicitudAdopcion, setSolicitudesAdopcion] = useState([]);

  if (
    !sessionStorage.getItem("email") ||
    !sessionStorage.getItem("token") ||
    !sessionStorage.getItem("refresh") ||
    !sessionStorage.getItem("is_cliente") ||
    !sessionStorage.getItem("is_fundacion")
  ) {
    window.location.href = "/login";
  }

  if (is_fundacion === "true") {
    navigate("/login");
  }

  const handleVerDetalleSolicitud = (idSolicitud) => {
    console.log(`Ver detalle de la solicitud de cuidado: ${idSolicitud}`);
    navigate("/resumen-cuidado", {state: {
      idSolicitud}});
  }
  

  useEffect(() => {
    api
      .get(`mis-solicitudes-cuidado/${email}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setSolicitudesAdopcion(res.data);
          console.log("Solicitudes de cuidado:", res.data);
        } else {
          console.error("Error al obtener las solicitudes de cuidado:", res);
          setError("Error al obtener las solicitudes de cuidado");
          setShowErrorModal(true);
        }
      })
      .catch((error) => {
        console.error("Error al obtener las solicitudes de cuidado:", error);
        setError("Error al obtener las solicitudes de cuidado");
        setShowErrorModal(true);
      });
  }, []);

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError("");
  };

  return (
    <div className="absolute-solicitudes-adopcion-container">
      <Navbar />
      <div className="contenedor-solicitudes-adopcion">
        <h3 className="titulo-solicitud-cuidado">Tus solicitudes de cuidado</h3>
        {solicitudAdopcion.length === 0 ? (
          <div className="no-solicitudes">
            <h3>No hay solicitudes de cuidado</h3>
          </div>
        ) : (
          solicitudAdopcion.map((solicitud, index) => (
            <div key={index} className="tarjeta-solicitudes-adopcion-sa">
              <div className="fila-superior-sa">
                <div className="icono-y-titulo-sa">
                  <FaDog className="icono-sa" />
                  <h3 className="titulo-sa">#{solicitud.id}</h3>
                </div>
                <div className="id-y-chevron-sa">
                  <h3 className="id-sa">
                    {Number(solicitud.costo).toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 2,
                    })}
                  </h3>

                  
                    <button className="ver-detalle-sa" onClick={() => handleVerDetalleSolicitud(solicitud.id)}>
                      <FaChevronRight id="chevron" />
                    </button>
                  
                </div>
              </div>

              <div className="fila-intermedia-sa">
                <div className="nombre-y-apellido-sa">
                  {is_cliente && (
                    <>
                      <p className="nombre-cliente-sa">
                        Fecha de la solicitud:{" "}
                        <span className="nombre-cliente-content-sa">
                          {formatDateTime(solicitud.fecha_solicitud)}
                        </span>
                      </p>
                    </>
                  )}

                  <p className="fecha-sa">
                    Mascota:{" "}
                    <span className="fecha-content-sa">
                      {solicitud.mascota.nombre}
                    </span>
                  </p>
                </div>
                <button className="estado-sa">{solicitud.estado}</button>
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
    </div>
  );
};

export default MisSolicitudesCuidado;
