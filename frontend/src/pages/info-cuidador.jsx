import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Navbar from "../components/navbar";
import "../styles/info-cuidador.css";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import item from "../img/paw-item-adoption.png";
import imagenCuidador from "../img/Mari Juliano.jpg";
import HojadeVida from "../img/PlantillaHoja de vida - Cuidadores.jpg";
import imageCvv from "../img/image_lateral_CVV.jpg";
import ReactImageMagnify from "@blacklab/react-image-magnify";
import LoadingPage from "../components/loading-page";
import clientes_img from "../img/Foto_Perfil_Clientes.svg";
import { formatDateTime } from "../functions";
import ErrorModal from "../components/ErrorModal";
import ConfirmationModal from "../components/ConfirmationModal";
import SuccessModalReload from "../components/SuccessModalReload";

const InfoCuidadores = () => {
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const refresh = sessionStorage.getItem("refresh");
  const is_cliente = sessionStorage.getItem("is_cliente");
  const is_fundacion = sessionStorage.getItem("is_fundacion");
  const urlImagen = "http://res.cloudinary.com/dlktjxg1a/";

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

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const { idCuidador } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [datosCuidador, setDatosCuidador] = useState({});
  const [showMoreStates, setShowMoreStates] = useState({});
  const [filtroCalificacion, setFiltroCalificacion] = useState("Todos");
  const [resenaIdEliminar, setResenaIdEliminar] = useState(0);

  const handlePublicarResena = () => {
    const origen = "info-cuidador";
    const contenido = { datosCuidador }
    navigate("/publicar-reseña", { state: { origen, contenido }}); // Cambia "/otra-pagina" por la ruta deseada
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/cuidador/${idCuidador}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Datos del cuidador:", response.data);
        setDatosCuidador(response.data);
      } catch (error) {
        console.error("Error al obtener al cuidador:", error);
      }
    };

    fetchData();
  }, []);

  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    console.log("Cargando resenas del cuidador: ", datosCuidador.nombre);
    const fetchResenas = async () => {
      if (datosCuidador.id) {
        try {
          const response = await api.get(
            `resenas/cuidador/${datosCuidador.id}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Resenas del cuidador:", response.data);
          setResenas(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error al obtener las resenas del cuidador:", error);
        }
      }
    };
    fetchResenas();
  }, [datosCuidador.id]);

  const handleFiltroCalificacion = (e) => {
    console.log("Filtro de calificacion:", e.target.id);
    setFiltroCalificacion(e.target.id);
  };

  const ordenarResenas = () => {
    console.log("Filtro de calificacion:", filtroCalificacion);
    let resenasOrdenadas = [...resenas];
    if (filtroCalificacion === "Todos") {
      return;
    } else if (filtroCalificacion === "Menor-a-Mayor") {
      resenasOrdenadas.sort((a, b) => a.calificacion - b.calificacion);
    } else if (filtroCalificacion === "Mayor-a-Menor") {
      resenasOrdenadas.sort((a, b) => b.calificacion - a.calificacion);
    }

    setResenas(resenasOrdenadas);
    console.log("Resenas ordenadas:", resenasOrdenadas);
  };

  useEffect(() => {
      ordenarResenas();
    }, [filtroCalificacion]);

  const toggleShowMore = (id) => {
    setShowMoreStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
  };

  const handleEliminarResena =async (e) => {
    e.preventDefault();

    if (resenaIdEliminar === 0) {
      return;
    }

    try {
      const response = await api.delete(`resena/delete/${resenaIdEliminar}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.status === 204) {
        console.log("Reseña eliminada:", response);
        setResponse("Reseña eliminada con éxito");
        setShowSuccessModal(true);
        setResenaIdEliminar(0);
      } else {
        console.error("Error al eliminar la reseña:", response);
        setError("Error al eliminar la reseña");
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error al eliminar la reseña:", error);
      setError("Error al eliminar la reseña");
      setShowErrorModal(true);
    }
  }

  const handleOpenConfirmationModal = (e, id_resena) => {
    e.preventDefault();
    setShowConfirmationModal(true);
    setResenaIdEliminar(id_resena);
    console.log("Se abrió el modal de confirmación", id_resena);
  };

  const handleYesConfirmationModal = async (e) => {
    setShowConfirmationModal(false);
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    await handleEliminarResena(e);
  };

  const handleNoConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError("");
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setError("");
    setResponse("");
  };

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="absolute-container-cuidadores">
      <Navbar />
      <div className="cuidadores-container">
        <h2 className="title-cuidador"> Información del cuidador </h2>

        <div className="cards-container-cuidador" key={datosCuidador.id}>
          {" "}
          {/*este es el contenedor del cuidador*/}
          <div className="cuidador-image">
            <h2>{datosCuidador.nombre}</h2>
            <img src={datosCuidador.imagen} alt={datosCuidador.nombre} />
          </div>
          <div className="cuidador-card-info">
            {showMoreStates[datosCuidador.id] ? (
              <div className="cuidador-more-details">
                <p>
                  <img
                    src={item}
                    alt="item"
                    className="item"
                    style={{ height: "20px", marginRight: "10px" }}
                  />
                  <strong>Cédula:</strong> {datosCuidador.cedula}
                </p>
                <p>
                  <img
                    src={item}
                    alt="item"
                    className="item"
                    style={{ height: "20px", marginRight: "10px" }}
                  />
                  <strong>Teléfono:</strong> {datosCuidador.telefono}
                </p>
                <p>
                  <img
                    src={item}
                    alt="item"
                    className="item"
                    style={{ height: "20px", marginRight: "10px" }}
                  />
                  <strong>Localidad:</strong> {datosCuidador.localidad}
                </p>

                <p>
                  <img
                    src={item}
                    alt="item"
                    className="item"
                    style={{ height: "20px", marginRight: "10px" }}
                  />
                  <strong>Correo:</strong> {datosCuidador.email}
                </p>
              </div>
            ) : (
              <div className="cuidador-details">
                <div className="container-detail-up">
                  <img
                    src={item}
                    alt="item"
                    className="item"
                    style={{ height: "20px", marginRight: "10px" }}
                  />
                  <p className="row-1">
                    <strong>Ocupación:</strong> {datosCuidador.ocupacion}
                  </p>
                </div>
                <div className="container-detail">
                  <img
                    src={item}
                    alt="item"
                    className="item"
                    style={{ height: "20px", marginRight: "10px" }}
                  />
                  <p className="row-2">
                    <strong>Localidad:</strong> {datosCuidador.localidad}
                  </p>
                </div>
                <div className="container-detail">
                  <img
                    src={item}
                    alt="item"
                    className="item"
                    style={{ height: "20px", marginRight: "10px" }}
                  />
                  <p className="row-1">
                    <strong>Categoría Mascotas:</strong>{" "}
                    {datosCuidador.categoria_mascotas}
                  </p>
                </div>
                <div className="container-detail-down">
                  <img
                    src={item}
                    alt="item"
                    className="item"
                    style={{ height: "20px", marginRight: "10px" }}
                  />
                  <p className="row-2">
                    <strong>Experiencia:</strong> {datosCuidador.experiencia}
                  </p>
                </div>
              </div>
            )}
            <button
              className="see-more-button-cuidador"
              onClick={() => toggleShowMore(datosCuidador.id)}
            >
              <span>
                {showMoreStates[datosCuidador.id] ? "Ver menos" : "Ver más"}{" "}
              </span>
              <svg width="20px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
          </div>
          <button
            className="cuidado-button"
            title="Adoptar"
            /*onClick={() =>
                            handleAdoptarMascota(datosCuidador.mascota, datosCuidador.id)
                            }*/
          >
            <i className="fas fa-paw"></i> Solicitar Cuidado
          </button>
        </div>
      </div>
      <div className="container-hoja-de-vida">
        <h2 className="title-hoja-vida"> Hoja de vida del cuidador: </h2>
        <div className="image-cvv-container">
          <div className="imageMagnifyer">
            <ReactImageMagnify
              imageProps={{
                alt: "Hoja de vida cuidador",
                isFluidWidth: true,
                src: `${urlImagen}${datosCuidador.hoja_vida}`,
              }}
              magnifiedImageProps={{
                src: `${urlImagen}${datosCuidador.hoja_vida}`,
                width: 1000,
                height: 3000,
              }}
            />
          </div>
          <div className="container-lateral-image-cvv">
            <img src={imageCvv} alt="imageCvv" className="imageCvv" />
            <p>
              Con Maki podrás observar las habilidades y experiencias de
              nuestros cuidadores.
              <p
                style={{
                  justifySelf: "center",
                  color: "#7BB66D",
                  fontStyle: "initial",
                }}
              >
                ¡Así podrás estar seguro de tu decisión!
              </p>
            </p>
          </div>
        </div>
      </div>
      <h2 className="title-hoja-vida"> Criticas y reseñas </h2>
      <div className="container-reseñas-de-cuidador">
        <div className="reseñas-container">
          <div className="reseñas">
            {resenas.length > 0 ? (
              <>
                {resenas.map((resena) => (
                  <div key={resena.id} className="reseña">
                    <div className="reseña-header">
                      <img
                        src={clientes_img}
                        alt="Imagen"
                        className="reseña-avatar"
                      />
                      <div className="reseña-info">
                        <p className="reseña-titulo-cuid">{resena.titulo}</p>
                        <p className="reseña-nombre-cuid">
                          {resena.user_data.nombre
                            ? resena.user_data.nombre
                            : resena.user_data.primer_nombre}
                        </p>
                        <p className="reseña-fecha">
                          {formatDateTime(resena.fecha)}
                        </p>
                      </div>
                      {resena.user_data.email === email ? (
                        <>
                          <button
                            className="boton-eliminar"
                            onClick={(e) => handleOpenConfirmationModal(e, resena.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="reseña-stars">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span key={index}>
                          {index < resena.calificacion ? "⭐" : "☆"}
                        </span>
                      ))}
                    </div>
                    <p className="reseña-texto">{resena.comentario}</p>
                  </div>
                ))}
              </>
            ) : (
              <>
                <p className="reseña-titulo-prod">No hay comentarios</p>
              </>
            )}
          </div>

          <div className="escribir-reseña">
            <h2 className="titulo-escribir-reseña-cuidador">
              {" "}
              ¿Deseas escribir una reseña?{" "}
            </h2>
            <p className="Subtitulo-escribir-reseña-cuidador">
              {" "}
              Comparte tus opiniones y experiencias con otros clientes ¡Nos
              ayudarías mucho!
            </p>
            <button className="boton-reseña" onClick={handlePublicarResena}>Escríbela</button>
            <div className="filter-comments">
              <p> Ordena las reseñas por calificacion: </p>
              <div className="select">
                <div
                  class="selected"
                  data-default="Todos"
                  data-one="Menor a Mayor"
                  data-two="Mayor a Menor"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    class="arrow"
                    stroke="#302f2f"
                  >
                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
                  </svg>
                </div>
                <div class="options">
                  <div title="Todos">
                    <input
                      id="Todos"
                      name="option"
                      type="radio"
                      checked={filtroCalificacion === "Todos"}
                      onChange={handleFiltroCalificacion}
                    />
                    <label class="option" for="Todos" data-txt="Todos"></label>
                  </div>
                  <div title="Menor-a-Mayor">
                    <input
                      id="Menor-a-Mayor"
                      name="option"
                      type="radio"
                      checked={filtroCalificacion === "Menor-a-Mayor"}
                      onChange={handleFiltroCalificacion}
                    />
                    <label
                      class="option"
                      for="Menor-a-Mayor"
                      data-txt="Menor a Mayor"
                    ></label>
                  </div>
                  <div title="Mayor-a-Menor">
                    <input
                      id="Mayor-a-Menor"
                      name="option"
                      type="radio"
                      checked={filtroCalificacion === "Mayor-a-Menor"}
                      onChange={handleFiltroCalificacion}
                    />
                    <label
                      class="option"
                      for="Mayor-a-Menor"
                      data-txt="Mayor a Menor"
                    ></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      <ConfirmationModal
        show={showConfirmationModal}
        handleYes={handleYesConfirmationModal}
        handleNo={handleNoConfirmationModal}
        action="Eliminar reseña"
        response="¿Estás seguro de eliminar la reseña? Esta acción no se puede deshacer."
      />
    </div>
  );
};

export default InfoCuidadores;
