import { React, useState } from "react";
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
  const { solicitudCuidado } = location.state || {};

  if (!solicitudCuidado) {
    window.location.href = "/solicitudes-de-cuidado";
    return;
  }

  const [mostrarMasDetalles, setMostrarMasDetalles] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
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

  return (
    <div className="absolute-resumen-adopcion-container">
      <Navbar />
      <div className="contenedor-resumen-adopcion">
        <div className="info-adopcion-card">
          <div className="fila-superior-adopcion">
            <h4 className="adopcion-titulo">#{solicitudCuidado.id}</h4>
            <p className="adopcion-id">
              <button className="cancelar-cuidado">Cancelar cuidado</button>
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
                    {formatDateTime(solicitudCuidado.fecha_solicitud)}
                  </span>
                </p>
                <p className="adopcion-apellido-cliente">
                  <span className="label-apellido-adopcion">
                    Mascota a cuidar:
                  </span>{" "}
                  <span className="cliente-apellido">
                    {solicitudCuidado.mascota.nombre}
                  </span>
                </p>
                <p className="adopcion-apellido-cliente">
                  <span className="label-apellido-adopcion">Total:</span>{" "}
                  <span className="cliente-apellido">
                    {Number(solicitudCuidado.costo).toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </p>
              </div>
            </div>
            <button className="estado-adopcion">
              {solicitudCuidado.estado}
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
                    src={solicitudCuidado.mascota.imagen}
                    alt={solicitudCuidado.mascota.nombre}
                  />
                </div>
                <div className="mascota-details">
                  <div className="columna-izquierda">
                    <p className="name">{solicitudCuidado.mascota.nombre}</p>
                    <p>{solicitudCuidado.mascota.raza}</p>
                    <p>
                      {solicitudCuidado.mascota.sexo === "M"
                        ? "Macho"
                        : "Hembra"}
                    </p>
                    <p>
                      {solicitudCuidado.mascota.tamano === "P"
                        ? "Pequeño"
                        : solicitudCuidado.mascota.tamano === "M"
                        ? "Mediano"
                        : "Grande"}
                    </p>
                    <p>{solicitudCuidado.mascota.raza}</p>
                  </div>
                  <div className="columna-derecha">
                    <p>
                      <strong>Edad:</strong> {solicitudCuidado.mascota.edad}{" "}
                      año(s)
                    </p>
                    <p>
                      <strong>Peso:</strong> {solicitudCuidado.mascota.peso} kg
                    </p>

                    <p>
                      <strong>Dirección: </strong>
                      {solicitudCuidado.cliente.direccion}
                      {}
                    </p>
                    <p>
                      <strong>Localidad: </strong>
                      {solicitudCuidado.cliente.localidad}
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
                {solicitudCuidado.cuidador.primer_nombre}{" "}
                {solicitudCuidado.cuidador.segundo_nombre}{" "}
                {solicitudCuidado.cuidador.primer_apellido}{" "}
                {solicitudCuidado.cuidador.segundo_apellido}
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
                          {solicitudCuidado.cuidador.cedula}
                        </p>
                        <p>
                          <strong>Teléfono:</strong>{" "}
                          {solicitudCuidado.cuidador.telefono}
                        </p>
                        <p>
                          <strong>Correo:</strong>{" "}
                          {solicitudCuidado.cuidador.email}
                        </p>
                      </div>
                      <div className="columna-derecha">
                        <p>
                          <strong>Localidad:</strong>{" "}
                          {solicitudCuidado.cuidador.localidad}{" "}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="columna-izquierda">
                        <p>
                          <strong>Ocupación:</strong>{" "}
                          {solicitudCuidado.cuidador.ocupacion}
                        </p>
                        <p>
                          <strong>Localidad:</strong>{" "}
                          {solicitudCuidado.cuidador.localidad}
                        </p>
                        <p>
                          <strong>Experiencia:</strong>{" "}
                          {solicitudCuidado.cuidador.experiencia}
                        </p>
                      </div>
                      <div className="columna-derecha">
                        <p>
                          <strong>Categoría mascotas:</strong>{" "}
                          {solicitudCuidado.cuidador.categoria_mascotas}{" "}
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
                          {formatDateTime(solicitudCuidado.fecha_inicio)}
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
                          {formatDateTime(solicitudCuidado.fecha_inicio)}
                        </p>
                        <p>
                          <img
                            src={item}
                            alt="item"
                            className="item"
                            style={{ height: "20px", marginRight: "10px" }}
                          />
                          <strong>Fecha de fin del cuidado: </strong>
                          {formatDateTime(solicitudCuidado.fecha_fin)}
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
                      {solicitudCuidado.is_cuidado_especial ? "Sí" : "No"}
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
                      {solicitudCuidado.descripcion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessModalNoReload
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

export default ResumenCuidado;
