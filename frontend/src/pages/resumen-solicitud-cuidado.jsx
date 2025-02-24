import { React, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import "../styles/resumen-adopcion.css";
import "../styles/resumen-solicitud-cuidado.css";
import "../styles/pedido.css"; // Importa el archivo CSS
import foto_cliente from "../img/Foto_Perfil_Clientes.svg";
import dogImage from "../img/dog.png";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api.js";
import item from "../img/paw-item-adoption.png";
import SuccessModalNoReload from "../components/SuccessModalNoReload";
import ConfirmationModal from "../components/ConfirmationModal";
import SuccessModalReload from "../components/SuccessModalReload";
import ErrorModal from "../components/ErrorModal.jsx";
import { formatDateTime } from "../functions";

const ResumenCuidado = () => {
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const refresh = sessionStorage.getItem("refresh");
  const is_cliente = sessionStorage.getItem("is_cliente");
  const is_fundacion = sessionStorage.getItem("is_fundacion");

  if (
    !sessionStorage.getItem("email") ||
    !sessionStorage.getItem("token") ||
    !sessionStorage.getItem("refresh") ||
    !sessionStorage.getItem("is_cliente") ||
    !sessionStorage.getItem("is_fundacion")
  ) {
    window.location.href = "/iniciar-sesion";
  }

  const location = useLocation();
  const navigate = useNavigate();
  const { idSolicitud } = location.state || {};
  console.log("El id", idSolicitud);
  const [solicitudCuidado, setSolicitudCuidado] = useState({
    mascota: {} || null,
    cliente: {} || null,
    cuidador: {} || null,
  });

  if (!idSolicitud) {
    window.location.href = "/solicitudes-de-cuidado";
    return;
  }

  const [mostrarMasDetalles, setMostrarMasDetalles] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const toggleMostrarMas = (id) => {
    setMostrarMasDetalles((prevEstados) => ({
      ...prevEstados,
      [id]: !prevEstados[id],
    }));
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  useEffect(() => {
    if (idSolicitud && token) {
      api
        .get(`mi-solicitud-cuidado/${idSolicitud}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setSolicitudCuidado(res.data);
          } else {
            console.error("Error al obtener la solicitud de cuidado:", res);
            setError("Error al obtener la solicitud de cuidado");
            setShowErrorModal(true);
          }
        })
        .catch((error) => {
          console.error("Error al obtener la solicitud de cuidado:", error);
          setError("Error al obtener la solicitud de cuidado");
          setShowErrorModal(true);
        });
    }
  }, [idSolicitud, token]);

  const cancelarCuidado = async (id_solicitud) => {
    try {
      api
        .patch(
          `solicitud-cuidado/cancelar-solicitud/${id_solicitud}/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setResponse(res.data.message);
            setShowSuccessModal(true);
          } else {
            setError("Error al cancelar la solicitud de cuidado");
            console.log(res);
            setShowErrorModal(true);
          }
        })
        .catch((error) => {
          setError(
            error.response
              ? error.response.data.detail
              : "Error al cancelar la solicitud de cuidado"
          );
          console.log(error);
          setShowErrorModal(true);
        });
    } catch (error) {
      setError("Error al cancelar la solicitud de cuidado");
      console.log(error);
      setShowErrorModal(true);
    }
  };

  const handleOpenConfirmationModal = (e, id_solicitud) => {
    e.preventDefault();
    setShowConfirmationModal(true);
    console.log(id_solicitud);
  };

  const handleYesConfirmationModal = async (e) => {
    setShowConfirmationModal(false);
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 2000));
    await cancelarCuidado(solicitudCuidado.id);
  };

  const handleNoConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  if (!solicitudCuidado) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="absolute-resumen-adopcion-container">
      <Navbar />
      <div className="contenedor-resumen-adopcion">
        <div className="info-adopcion-card">
          <div className="fila-superior-adopcion">
            <h4 className="adopcion-titulo">#{solicitudCuidado.id || "Cargando"} </h4>
            <p className="adopcion-id">
              <button
                className="cancelar-cuidado"
                onClick={(e) =>
                  handleOpenConfirmationModal(e, solicitudCuidado.id)
                }
              >
                Cancelar cuidado
              </button>
            </p>
          </div>
          <div className="fila-inferior-adopcion">
            <div className="boton-y-nombre">
              <div className="adopcion-nombre-completo">
                <p className="adopcion-nombre-cliente">
                  <span className="label-nombre-adopcion">
                    Fecha en la que se realizó la solicitud:
                  </span>{" "}
                  <span className="cliente-nombre">
                    {solicitudCuidado.fecha_solicitud ? formatDateTime(solicitudCuidado.fecha_solicitud) : "Cargando"}
                  </span>
                </p>
                <p className="adopcion-apellido-cliente">
                  <span className="label-apellido-adopcion">
                    Mascota a cuidar:
                  </span>{" "}
                  <span className="cliente-apellido">
                    {solicitudCuidado.mascota.nombre || "Cargando"}
                  </span>
                </p>
                <p className="adopcion-apellido-cliente">
                  <span className="label-apellido-adopcion">Total:</span>{" "}
                  <span className="cliente-apellido">
                    {solicitudCuidado.costo ? Number(solicitudCuidado.costo).toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 2,
                    })  : "Cargando"}
                  </span>
                </p>
              </div>
            </div>
            <button className="estado-adopcion">
              {solicitudCuidado.estado || "Cargando"}
            </button>
          </div>
        </div>

        <div className="cards-container-container">
          {/* Tarjeta Solicitud de cuidado */}
          <h2 className="h2-adopcion">Solicitud de cuidado</h2>

          <div className="card-solicitud-adopcion">
            <div className="card-content-mascota">
              <h2 className="h2-tarjetas-adopcion">Tu mascota a cuidar</h2>
              <div className="card-content-mascota-interior">
                <div className="image-container">
                  <img
                    src={solicitudCuidado.mascota.imagen  || dogImage}
                    alt={solicitudCuidado.mascota.nombre  || "Cargando"}
                  />
                </div>
                <div className="mascota-details">
                  <div className="columna-izquierda">
                    <p className="name">{solicitudCuidado.mascota.nombre  || "Cargando"}</p>
                    <p>{solicitudCuidado.mascota.raza  || "Cargando"}</p>
                    <p>
                      {solicitudCuidado.mascota.sexo === "M"
                        ? "Macho"
                        : "Hembra"  || "Cargando"}
                    </p>
                    <p>
                      {solicitudCuidado.mascota.tamano === "P"
                        ? "Pequeño"
                        : solicitudCuidado.mascota.tamano === "M"
                        ? "Mediano"
                        : "Grande"  || "Cargando"}
                    </p>
                    <p>{solicitudCuidado.mascota.raza  || "Cargando"}</p>
                  </div>
                  <div className="columna-derecha">
                    <p>
                      <strong>Edad:</strong> {solicitudCuidado.mascota.edad  || "Cargando"}{" "}
                      año(s)
                    </p>
                    <p>
                      <strong>Peso:</strong> {solicitudCuidado.mascota.peso  || "Cargando"} kg
                    </p>

                    <p>
                      <strong>Dirección: </strong>
                      {solicitudCuidado.cliente.direccion  || "Cargando"}
                      {}
                    </p>
                    <p>
                      <strong>Localidad: </strong>
                      {solicitudCuidado.cliente.localidad  || "Cargando"}
                      {}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta Información cuidador */}
          <h2 className="h2-adopcion">Información cuidador</h2>
          <div className="card-informacion-cliente">
            <div className="card-content-cliente">
              <h2 className="h2-tarjetas-adopcion">
                {solicitudCuidado.cuidador.primer_nombre  || "Cargando"}{" "}
                {solicitudCuidado.cuidador.segundo_nombre || ""}{" "}
                {solicitudCuidado.cuidador.primer_apellido || ""}{" "}
                {solicitudCuidado.cuidador.segundo_apellido || ""}
              </h2>
              <div className="card-content-cliente-interior">
                <div className="image-container">
                  <img src={dogImage} alt="Cliente" />
                </div>
                <div className="cliente-details">
                  {mostrarMasDetalles[solicitudCuidado.id] ? (
                    <>
                      <div className="columna-izquierda">
                        <p>
                          <strong>Cédula:</strong> CC{" "}
                          {solicitudCuidado.cuidador.cedula  || "Cargando"}
                        </p>
                        <p>
                          <strong>Teléfono:</strong>{" "}
                          {solicitudCuidado.cuidador.telefono || "Cargando"}
                        </p>
                        <p>
                          <strong>Correo:</strong>{" "}
                          {solicitudCuidado.cuidador.email  || "Cargando"}
                        </p>
                      </div>
                      <div className="columna-derecha">
                        <p>
                          <strong>Localidad:</strong>{" "}
                          {solicitudCuidado.cuidador.localidad  || "Cargando"}{" "}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="columna-izquierda">
                        <p>
                          <strong>Ocupación:</strong>{" "}
                          {solicitudCuidado.cuidador.ocupacion  || "Cargando"}
                        </p>
                        <p>
                          <strong>Localidad:</strong>{" "}
                          {solicitudCuidado.cuidador.localidad  || "Cargando"}
                        </p>
                        <p>
                          <strong>Experiencia:</strong>{" "}
                          {solicitudCuidado.cuidador.experiencia  || "Cargando"}
                        </p>
                      </div>
                      <div className="columna-derecha">
                        <p>
                          <strong>Categoría mascotas:</strong>{" "}
                          {solicitudCuidado.cuidador.categoria_mascotas  || "Cargando"}{" "}
                        </p>
                      </div>
                    </>
                  )}
                  <div className="columna-3">
                    <button
                      className="ver-detalles-adopcion"
                      onClick={() => toggleMostrarMas(solicitudCuidado.id)}
                    >
                      <span>
                        {mostrarMasDetalles[solicitudCuidado.id]
                          ? "Ver menos"
                          : "Ver más"}{" "}
                      </span>
                      <svg width="15px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Tarjeta Motivo de Adopción */}
          <h2 className="h2-adopcion">Especificaciones de cuidado</h2>
          <div className="card-solicitud-adopcion">
            <div className="card-content-mascota">
              <div className="card-content-mascota-interior">
                <div className="mascota-details">
                  <div className="columna-izquierda">
                    {solicitudCuidado.fecha_inicio ===
                    solicitudCuidado.fecha_fin ? (
                      <>
                        <p>
                          <img
                            src={item}
                            alt="item"
                            className="item"
                            style={{ height: "20px", marginRight: "10px" }}
                          />
                          <strong>Fecha del cuidado: </strong>
                          {solicitudCuidado.fecha_inicio ? formatDateTime(solicitudCuidado.fecha_inicio) : "Cargando"}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          <img
                            src={item}
                            alt="item"
                            className="item"
                            style={{ height: "20px", marginRight: "10px" }}
                          />
                          <strong>Fecha de inicio del cuidado: </strong>
                          {solicitudCuidado.fecha_inicio ? formatDateTime(solicitudCuidado.fecha_inicio)  : "Cargando"}
                        </p>
                        <p>
                          <img
                            src={item}
                            alt="item"
                            className="item"
                            style={{ height: "20px", marginRight: "10px" }}
                          />
                          <strong>Fecha de fin del cuidado: </strong>
                          {solicitudCuidado.fecha_fin ? formatDateTime(solicitudCuidado.fecha_fin) : "Cargando"}
                        </p>
                      </>
                    )}

                    <p>
                      <img
                        src={item}
                        alt="item"
                        className="item"
                        style={{ height: "20px", marginRight: "10px" }}
                      />
                      <strong>Solicita cuidado medico: </strong>
                      {solicitudCuidado.is_cuidado_especial ? "Sí" : "No"  || "Cargando"}
                    </p>
                  </div>
                  <div className="columna-derecha">
                    <p>
                      <img
                        src={item}
                        alt="item"
                        className="item"
                        style={{ height: "20px", marginRight: "10px" }}
                      />

                      <strong>Descripción del cuidado: </strong>
                      {solicitudCuidado.descripcion  || "Cargando"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessModalReload
        show={showSuccessModal}
        handleClose={handleCloseSuccessModal}
        response={response}
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
        action="Cancelar"
        response="¿Estás seguro de que deseas cancelar el servicio? Esta acción no se puede deshacer."
      />
    </div>
  );
};

export default ResumenCuidado;
