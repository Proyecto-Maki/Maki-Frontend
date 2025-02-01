import { React, useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "../styles/resumen-adopcion.css";
import "../styles/pedido.css"; // Importa el archivo CSS
import foto_cliente from "../img/Foto_Perfil_Clientes.svg";
import dogImage from "../img/dog.png";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api.js";
import item from "../img/paw-item-adoption.png";
import { use } from "react";
import SuccessModalNoReload  from "../components/SuccessModalNoReload";
import ErrorModal from "../components/ErrorModal.jsx";

const ResumenAdopcion = () => {
  // Datos estáticos
  // const cliente = {
  //     primer_nombre: "Ivana",
  //     segundo_nombre: "Alejandra",
  //     primer_apellido: "Pedraza",
  //     segundo_apellido: "Hernandez",
  //     cedula: "10101010",
  // };

  // const user = {
  //     id: "1",
  //     direccion: "Cra. 80 #9-0",
  //     correo: "ivana240404@gmail.com",
  //     telefono: "3002424245"
  // };

  // const publicacion_adopcion = {
  //     titulo: "Cachorro juguetón y amable busca hogar",
  // };

  // const mascota = {
  //     nombre: "Roberto",
  //     tipo: "Perro",
  //     raza: "Golden Retriever",
  //     edad: "2 años",
  //     sexo: "Macho",
  //     estado_salud: "Saludable",
  //     tamano: "Grande",
  //     peso: "32kg",
  //     personalidad: "Juguetón",
  //     ubicacion: "Bogotá D.C.",
  //     detalles: "Localidad de Suba, parque el virrey",
  // };

  // const solicitudAdopcion = {
  //     id: "F892M",
  //     estado: "Aceptada",
  //     motivo: "Me gustan mucho los animales desde que era niña. He tenido muchas mascotas en mi vida y desde temprana edad aprendí a tener la responsabilidad de cómo cuidarlos y educarlos. Cuento con un jardín grande donde Roberto pueda correr y disfrutar del espacio. Trabajo remotamente así que mantengo en casa. No tengo niños y cuento con un gato de 2 años de edad que le gusta jugar con los perros."

  // };
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
    window.location.href = "/login";
  }

  const location = useLocation();
  const navigate = useNavigate();
  const [mostrarMasDetalles, setMostrarMasDetalles] = useState(false);
  const { solicitudAdopcion } = location.state || {};
  const [estadoSolicitud, setEstadoSolicitud] = useState(
    solicitudAdopcion.estado
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState({});


  if (!solicitudAdopcion) {
    window.location.href = "/solicitudes-de-adopcion";
    return;
  }

  const toggleMostrarMas = (id) => {
    setMostrarMasDetalles((prevEstados) => ({
      ...prevEstados,
      [id]: !prevEstados[id],
    }));
  };

  const handleActualizarEstado = async (nuevoEstado) => {
    const data = {
      estado: nuevoEstado,
    };
    try {
      api
        .patch(
          `solicitud-adopcion-fundacion/update-estado/${solicitudAdopcion.id}/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setEstadoSolicitud(nuevoEstado);
            setResponse("Estado de la solicitud de adopción actualizado correctamente");
            setShowSuccessModal(true);
          } else {
            setError("Error al actualizar el estado de la solicitud de adopción");
            setShowErrorModal(true);
          }
        })
        .catch((error) => {
          setError(error.response.data.detail ? error.response.data.detail : "Error al actualizar el estado de la solicitud de adopción");
          setShowErrorModal(true);
        });
    } catch (error) {

      console.error(
        "Error al actualizar el estado de la solicitud de adopción:",
        error
      );
      setError(
        error.response.data.detail
          ? error.response.data.detail
          : "Error al actualizar el estado de la solicitud de adopción"
      );
      setShowErrorModal(true);
    }
  };

  const handleEstadoChange = (e) => {
    const nuevoEstado = e.target.value;
    handleActualizarEstado(nuevoEstado);
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  }

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  }

  return (
    <div className="absolute-resumen-adopcion-container">
      <Navbar />
      <div className="contenedor-resumen-adopcion">
        <div className="info-adopcion-card">
          <div className="fila-superior-adopcion">
            <h4 className="adopcion-titulo">
              {solicitudAdopcion.publicacion.titulo}
            </h4>
            <p className="adopcion-id">#{solicitudAdopcion.id}</p>
          </div>
          <div className="fila-inferior-adopcion">
            <div className="boton-y-nombre">
              <div className="adopcion-nombre-completo">
                <p className="adopcion-nombre-cliente">
                  <span className="label-nombre-adopcion">Nombre cliente:</span>{" "}
                  <span className="cliente-nombre">
                    {solicitudAdopcion.cliente.primer_nombre}{" "}
                    {solicitudAdopcion.cliente.segundo_nombre}
                  </span>
                </p>
                <p className="adopcion-apellido-cliente">
                  <span className="label-apellido-adopcion">
                    Apellido cliente:
                  </span>{" "}
                  <span className="cliente-apellido">
                    {solicitudAdopcion.cliente.primer_apellido}{" "}
                    {solicitudAdopcion.cliente.segundo_apellido}
                  </span>
                </p>
              </div>
            </div>
            {is_cliente === "true" ? (
              <button className="estado-adopcion">{estadoSolicitud}</button>
            ) : (
              <>
                <select className="estado-adopcion-select" value={estadoSolicitud} onChange={(e) => handleEstadoChange(e)}>
                  <option value={'Pendiente'}>Pendiente</option>
                  <option value={'Aceptada'}>Aceptada</option>
                  <option value={'Rechazada'}>Rechazada</option>
                  <option value={'Cancelada'}>Cancelada</option>
                  <option value={'Completada'}>Completada</option>
                </select>
              </>
            )}
          </div>
        </div>

        <div className="cards-container-container">
          {/* Tarjeta Solicitud de Adopción */}
          <h2 className="h2-adopcion">Solicitud de adopción</h2>

          <div className="card-solicitud-adopcion">
            <div className="card-content-mascota">
              <h2 className="h2-tarjetas-adopcion">
                {solicitudAdopcion.publicacion.titulo}
              </h2>
              <div className="card-content-mascota-interior">
                <div className="image-container">
                  <img
                    src={solicitudAdopcion.publicacion.mascota.imagen}
                    alt={solicitudAdopcion.publicacion.mascota.nombre}
                  />
                </div>
                <div className="mascota-details">
                  {mostrarMasDetalles[solicitudAdopcion.id] ? (
                    <>
                      <div className="columna-izquierda">
                        <p>
                          <img
                            src={item}
                            alt="item"
                            className="item"
                            style={{ height: "20px", marginRight: "10px" }}
                          />
                          <strong>Apto para niños: </strong>
                          {solicitudAdopcion.publicacion.detalle_mascota
                            .apto_ninos
                            ? "Sí"
                            : "No"}
                        </p>
                        <p>
                          <img
                            src={item}
                            alt="item"
                            className="item"
                            style={{ height: "20px", marginRight: "10px" }}
                          />
                          <strong>Apto en ambientes con ruido: </strong>
                          {solicitudAdopcion.publicacion.detalle_mascota
                            .apto_ruido
                            ? "Sí"
                            : "No"}
                        </p>
                        <p>
                          <img
                            src={item}
                            alt="item"
                            className="item"
                            style={{ height: "20px", marginRight: "10px" }}
                          />
                          <strong>Habita en espacios:</strong>{" "}
                          {solicitudAdopcion.publicacion.detalle_mascota
                            .espacio === "P"
                            ? "Pequeño"
                            : "Grande"}
                        </p>
                        <p>
                          <img
                            src={item}
                            alt="item"
                            className="item"
                            style={{ height: "20px", marginRight: "10px" }}
                          />
                          <strong>Apto para otras mascotas:</strong>{" "}
                          {solicitudAdopcion.publicacion.detalle_mascota
                            .apto_otras_mascotas
                            ? "Sí"
                            : "No"}
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
                          <strong>Desparasitado:</strong>{" "}
                          {solicitudAdopcion.publicacion.detalle_mascota
                            .desparasitado
                            ? "Sí"
                            : "No"}
                        </p>
                        <p>
                          <img
                            src={item}
                            alt="item"
                            className="item"
                            style={{ height: "20px", marginRight: "10px" }}
                          />
                          <strong>Esterilizado:</strong>{" "}
                          {solicitudAdopcion.publicacion.detalle_mascota
                            .esterilizado
                            ? "Sí"
                            : "No"}
                        </p>
                        <p>
                          <img
                            src={item}
                            alt="item"
                            className="item"
                            style={{ height: "20px", marginRight: "10px" }}
                          />
                          <strong>Vacunado:</strong>{" "}
                          {solicitudAdopcion.publicacion.detalle_mascota
                            .vacunado
                            ? "Sí"
                            : "No"}
                        </p>
                        <p>
                          <img
                            src={item}
                            alt="item"
                            className="item"
                            style={{ height: "20px", marginRight: "10px" }}
                          />
                          <strong>Descripción:</strong>{" "}
                          {solicitudAdopcion.publicacion.descripcion}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="columna-izquierda">
                        <p>{solicitudAdopcion.publicacion.mascota.nombre}</p>
                        <p>{solicitudAdopcion.publicacion.mascota.raza}</p>
                        <p>
                          {solicitudAdopcion.publicacion.mascota.sexo === "M"
                            ? "Macho"
                            : "Hembra"}
                        </p>
                        <p>
                          {solicitudAdopcion.publicacion.mascota.tamano === "P"
                            ? "Pequeño"
                            : solicitudAdopcion.publicacion.mascota.tamano ===
                              "M"
                            ? "Mediano"
                            : "Grande"}
                        </p>
                        <p>{solicitudAdopcion.publicacion.mascota.raza}</p>
                      </div>
                      <div className="columna-derecha">
                        <p>
                          <strong>Edad:</strong>{" "}
                          {solicitudAdopcion.publicacion.mascota.edad} año(s)
                        </p>
                        <p>
                          <strong>Peso:</strong>{" "}
                          {solicitudAdopcion.publicacion.mascota.peso} kg
                        </p>
                        <p>
                          <strong>Dirección:</strong>{" "}
                          {
                            solicitudAdopcion.publicacion.detalle_direccion
                              .direccion
                          }
                        </p>
                        <p>
                          <strong>Localidad:</strong>{" "}
                          {
                            solicitudAdopcion.publicacion.detalle_direccion
                              .localidad
                          }
                        </p>
                      </div>
                    </>
                  )}

                  <div className="columna-3">
                    <button
                      className="ver-detalles-adopcion"
                      onClick={() => toggleMostrarMas(solicitudAdopcion.id)}
                    >
                      <span>
                        {mostrarMasDetalles[solicitudAdopcion.id]
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

          {/* Tarjeta Información Cliente */}
          <h2 className="h2-adopcion">Información cliente</h2>
          <div className="card-informacion-cliente">
            <div className="card-content-cliente">
              <h2 className="h2-tarjetas-adopcion">
                {solicitudAdopcion.cliente.primer_nombre +
                  " " +
                  solicitudAdopcion.cliente.segundo_nombre +
                  " " +
                  solicitudAdopcion.cliente.primer_apellido +
                  " " +
                  solicitudAdopcion.cliente.segundo_apellido}
              </h2>
              <div className="card-content-cliente-interior">
                <div className="image-container">
                  <img src={dogImage} alt="Cliente" />
                </div>
                <div className="cliente-details">
                  <div className="columna-izquierda">
                    <p>
                      <strong>Cédula:</strong> CC{" "}
                      {solicitudAdopcion.cliente.cedula}
                    </p>
                    <p>
                      <strong>Correo:</strong> {solicitudAdopcion.cliente.email}
                    </p>
                    <p>
                      <strong>Teléfono:</strong>{" "}
                      {solicitudAdopcion.cliente.telefono}
                    </p>
                    <p>
                      <strong>Localidad:</strong>{" "}
                      {solicitudAdopcion.cliente.localidad}{" "}
                    </p>
                  </div>
                  <div className="columna-derecha">
                    <p>
                      <strong>Código Postal:</strong>{" "}
                      {solicitudAdopcion.cliente.codigo_postal
                        ? solicitudAdopcion.cliente.codigo_postal
                        : "No hay código postal"}{" "}
                    </p>
                    <p>
                      <strong>Dirección:</strong>{" "}
                      {solicitudAdopcion.cliente.direccion}
                    </p>
                    <p>
                      <strong>Fecha de nacimiento:</strong>{" "}
                      {solicitudAdopcion.cliente.fecha_nacimiento}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Tarjeta Motivo de Adopción */}
          <h2 className="h2-adopcion">Motivo de adopción</h2>
          <div className="card-motivo-adopcion">
            <p>{solicitudAdopcion.motivo}</p>
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

export default ResumenAdopcion;
