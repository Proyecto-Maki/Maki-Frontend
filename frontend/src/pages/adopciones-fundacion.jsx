import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "../styles/adopciones-fundacion.css";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";
import PublicacionAdopcionUpdate from "../components/forms/publicacion-adopcion-update";

const AdoptionsFun = () => {
  
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const refresh = sessionStorage.getItem("refresh");
  const is_cliente = sessionStorage.getItem("is_cliente");
  const is_fundacion = sessionStorage.getItem("is_fundacion");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [publicacionEditar, setPublicacionEditar] = useState({});
  const [isEditarOpen, setIsEditarOpen] = useState(false);

  if (!email || !token || !refresh || !is_cliente || !is_fundacion) {
    window.location.href = "/login";
  }

  if (is_cliente === "true") {
    window.location.href = "/login";
  }

  const [publicacionesFundacion, setPublicacionesFundacion] = useState([]);

  const handleAdoptarMascota = (mascota) => {
    navigate("/crear-solicitud-adopcion", { state: { mascota: mascota } });
  };

  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(null);

  const toggleDetalles = (id) => {
    setTarjetaSeleccionada(tarjetaSeleccionada === id ? null : id);
  };

  useEffect(() => {
    api
      .get(`publicaciones/fundacion/${email}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setPublicacionesFundacion(res.data);
        } else {
          setError(res.data.message);
          setShowErrorModal(true);
        }
      })
      .catch((err) => {
        setError(err.response ? err.response.data.detail : err.message);
        setShowErrorModal(true);
      });
  }, []);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setError("");
    setResponse("");
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError("");
  };

  const abrirEditar = async (publicacion) => {
    let publicacionData = publicacion;
    console.log(publicacionData)
    setPublicacionEditar(publicacionData);
    setIsEditarOpen(true);
  }

  const cerrarEditar = () => {
    setIsEditarOpen(false);
  };

  return (
    <div className="absolute-lista-adopcion-fundacion-container">
      <Navbar />
      <div className="lista-adopcion-fundacion-container">
        <div className="lista-adopcion-fundacion-header">
          <h2>Tus publicaciones de adopción</h2>
        </div>
        {publicacionesFundacion.map((publicacion, index) => (
          <div
            className="lista-adopcion-fundacion-card-content-mascota"
            key={publicacion.id}
          >
            <h2 className="lista-adopcion-fundacion-titlulo-publicacion">
              {publicacion.titulo}
            </h2>
            <div className="lista-adopcion-fundacion-mascota-details-general">
              <div className="lista-adopcion-fundacion-pet-image">
                <img
                  src={publicacion.mascota.imagen}
                  alt={publicacion.mascota.nombre}
                />
              </div>
              <div className="lista-adopcion-fundacion-mascota-info">
                <div className="lista-adopcion-fundacion-mascota-header">
                  <h2>{publicacion.mascota.nombre}</h2>
                  <button
                    className="lista-adopcion-fundacion-ver-detalles-adopcion"
                    onClick={() => toggleDetalles(index)}
                  >
                    <i
                      className={`fas fa-chevron-${
                        tarjetaSeleccionada === index ? "down" : "right"
                      }`}
                    ></i>
                    Ver más
                  </button>
                </div>

                <div className="lista-adopcion-fundacion-mascota-details">
                  <div className="lista-adopcion-fundacion-columna-izquierda">
                    {tarjetaSeleccionada === index ? (
                      <>
                        <p className="lista-adopcion-fundacion-info-oculta">
                          <i className="fas fa-paw"></i> Apto para niños: Sí
                        </p>
                        <p className="lista-adopcion-fundacion-info-oculta">
                          <i className="fas fa-paw"></i> Tipo de espacio: Grande
                        </p>
                        <p className="lista-adopcion-fundacion-info-oculta">
                          <i className="fas fa-paw"></i> Desparacitado: Sí
                        </p>
                        <p className="lista-adopcion-fundacion-info-oculta">
                          <i className="fas fa-paw"></i> Vacunas al día: Sí
                        </p>
                      </>
                    ) : (
                      <>
                        <p>{publicacion.mascota.tipo}</p>
                        <p>
                          {publicacion.mascota.sexo === "M"
                            ? "Macho"
                            : "Hembra"}
                        </p>
                        <p>
                          {publicacion.mascota.tamano === "P"
                            ? "Pequeño"
                            : publicacion.mascota.tamano === "M"
                            ? "Mediano"
                            : "Grande"}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="lista-adopcion-fundacion-columna-derecha">
                    {tarjetaSeleccionada === index ? (
                      <>
                        <p className="lista-adopcion-fundacion-info-oculta">
                          <i className="fas fa-paw"></i>Apto para ruido: Sí
                        </p>
                        <p className="lista-adopcion-fundacion-info-oculta">
                          <i className="fas fa-paw"></i>Apto para otras
                          mascotas: Sí
                        </p>
                        <p className="lista-adopcion-fundacion-info-oculta">
                          <i className="fas fa-paw"></i>Esterilizado: No
                        </p>
                      </>
                    ) : (
                      <>
                        <p>Edad: {publicacion.mascota.edad} año(s)</p>
                        <p>Peso: {publicacion.mascota.peso} kg</p>
                        <p>Personalidad: Juguetón</p>
                        <p>Dirección: {publicacion.direccion}</p>
                      </>
                    )}
                  </div>
                </div>
                {tarjetaSeleccionada === index && (
                  <div className="lista-adopcion-fundacion-descripcion">
                    <p>
                      <strong>Descripción:</strong> {publicacion.descripcion}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Contenedor para los íconos de editar y eliminar */}
            <div className="lista-adopcion-fundacion-icons-container">
              <button className="lista-adopcion-fundacion-edit-button" onClick={() => abrirEditar(publicacion)}>
                <i className="fas fa-edit"></i>
              </button>
              <button className="lista-adopcion-fundacion-delete-button">
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      {isEditarOpen && (
        <div className="modal-editar-publicacion">
          <div className="modal-editar-publicacion-content">
            {/* <span className="close">&times;</span> */}
            <PublicacionAdopcionUpdate 
              isEditarOpen = {isEditarOpen}
              cerrarEditar = {cerrarEditar}
              publicacionEditar = {publicacionEditar}
            />
          </div>
        </div>
      )}
      <ErrorModal
        show={showErrorModal}
        handleClose={handleCloseErrorModal}
        error={error}
      />
      <SuccessModal
        show={showSuccessModal}
        handleClose={handleCloseSuccessModal}
        response={response}
      />
    </div>
  );
};

export default AdoptionsFun;
