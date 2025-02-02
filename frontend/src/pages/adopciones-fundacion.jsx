import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "../styles/adopciones-fundacion.css";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import ErrorModal from "../components/ErrorModal";
import SuccessModalReload from "../components/SuccessModalReload";
import PublicacionAdopcionUpdate from "../components/forms/publicacion-adopcion-update";
import ConfirmationModal from "../components/ConfirmationModal";
import LoadingPage from "../components/loading-page";

const AdoptionsFun = () => {
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const refresh = sessionStorage.getItem("refresh");
  const is_cliente = sessionStorage.getItem("is_cliente");
  const is_fundacion = sessionStorage.getItem("is_fundacion");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [publicacionIdEliminar, setPublicacionIdEliminar] = useState(0);
  const [detalleMascotaIdEliminar, setDetalleMascotaIdEliminar] = useState(0);
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
          console.log(res.data);
          setError("Error al obtener las publicaciones de adopción");
          setShowErrorModal(true);
        }
      })
      .catch((err) => {
        setError(err.response.data.detail ? err.response.data.detail : "Error al obtener las publicaciones de adopción");
        setShowErrorModal(true);
      });
  }, []);

  const handleOpenConfirmationModal = (e, id_publicacion, id_detalle) => {
    e.preventDefault();
    setShowConfirmationModal(true);
    setPublicacionIdEliminar(id_publicacion);
    setDetalleMascotaIdEliminar(id_detalle);
    console.log("Se abrió el modal de confirmación", id_publicacion, id_detalle);
  };

  const eliminarPublicacion = async (e) => {
    e.preventDefault();
    if (publicacionIdEliminar === 0) {
      return;
    }

    console.log("Publicación a eliminar: ", publicacionIdEliminar);
    console.log("Detalle mascota a eliminar: ", detalleMascotaIdEliminar);

    let error_validacion = false;
    try {
      api
        .delete(`detalle-mascota/delete/${detalleMascotaIdEliminar}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 204) {
            console.log("Detalle mascota eliminado");
            api
              .delete(`publicaciones/delete/${publicacionIdEliminar}/`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                if (res.status === 204) {
                  console.log("Publicación eliminada");
                } else {
                  console.log(res.data);
                  setError("Error al eliminar la publicación");
                  setShowErrorModal(true);
                  error_validacion = true;
                }
              })
              .catch((error) => {
                console.log(error);
                setError(
                  error.response.data.detail ? error.response.data.detail : "Error al eliminar la publicación"
                );
                setShowErrorModal(true);
                error_validacion = true;
              });
          } else {
            console.log(res.data);
            setError("Error al eliminar el detalle de la mascota");
            setShowErrorModal(true);
            error_validacion = true;
          }
        })
        .catch((error) => {
          console.log(error);
          setError(error.response.data.detail ? error.response.data.detail : "Error al eliminar el detalle de la mascota");
          setShowErrorModal(true);
          error_validacion = true;
        });
    } catch (error) {
      console.log(error);
      setError(error.response.data.detail ? error.response.data.detail : "Error al eliminar la publicación");
      setShowErrorModal(true);
      error_validacion = true;
    }

    if (error_validacion === false) {
      setResponse("Publicación eliminada correctamente");
      setShowSuccessModal(true);
    }
  };

  const handleYesConfirmationModal = async (e) => {
    setShowConfirmationModal(false);
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 2000));
    await eliminarPublicacion(e);
  };

  const handleNoConfirmationModal = () => {
    setShowConfirmationModal(false);
    setPublicacionIdEliminar(0);
    setDetalleMascotaIdEliminar(0);
  };

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
    console.log(publicacionData);
    setPublicacionEditar(publicacionData);
    setIsEditarOpen(true);
  };

  const cerrarEditar = () => {
    setIsEditarOpen(false);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

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
                          <i className="fas fa-paw"></i> Apto para niños: {publicacion.detalle_mascota.apto_ninos === true ? "Sí" : "No"}
                        </p>
                        <p className="lista-adopcion-fundacion-info-oculta">
                          <i className="fas fa-paw"></i> Tipo de espacio: {publicacion.detalle_mascota.espacio === "P" ? "Pequeño" : "Grande"}
                        </p>
                        <p className="lista-adopcion-fundacion-info-oculta">
                          <i className="fas fa-paw"></i> Desparasitado: {publicacion.detalle_mascota.desparasitado === true ? "Sí" : "No"}
                        </p>
                        <p className="lista-adopcion-fundacion-info-oculta">
                          <i className="fas fa-paw"></i> Vacunas al día: {publicacion.detalle_mascota.vacunado === true ? "Sí" : "No"}
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
                          <i className="fas fa-paw"></i>Apto para ruido: {publicacion.detalle_mascota.apto_ruido === true ? "Sí" : "No"}
                        </p>
                        <p className="lista-adopcion-fundacion-info-oculta">
                          <i className="fas fa-paw"></i>Apto para otras
                          mascotas: {publicacion.detalle_mascota.apto_otras_mascotas === true ? "Sí" : "No"}
                        </p>
                        <p className="lista-adopcion-fundacion-info-oculta">
                          <i className="fas fa-paw"></i>Esterilizado: {publicacion.detalle_mascota.esterilizado === true ? "Sí" : "No"}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>Edad: {publicacion.mascota.edad} año(s)</p>
                        <p>Peso: {publicacion.mascota.peso} kg</p>
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
              <button
                className="lista-adopcion-fundacion-edit-button"
                onClick={() => abrirEditar(publicacion)}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button className="lista-adopcion-fundacion-delete-button" onClick={(e) => {
                console.log("Se hizo click en eliminar", publicacion);
                handleOpenConfirmationModal(e, publicacion.id, publicacion.detalle_mascota.id);
              }}>
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
              isEditarOpen={isEditarOpen}
              cerrarEditar={cerrarEditar}
              publicacionEditar={publicacionEditar}
            />
          </div>
        </div>
      )}
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
      <ConfirmationModal
        show={showConfirmationModal}
        handleYes={handleYesConfirmationModal}
        handleNo={handleNoConfirmationModal}
        response="¿Estás seguro de que deseas eliminar la publicación? Esta acción es irreversible."
      />
    </div>
  );
};

export default AdoptionsFun;
