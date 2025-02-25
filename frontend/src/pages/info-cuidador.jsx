import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Navbar from "../components/navbar";
import "../styles/info-cuidador.css";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import item from "../img/paw-item-adoption.png";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";
import imagenCuidador from "../img/Mari Juliano.jpg";
import HojadeVida from "../img/PlantillaHoja de vida - Cuidadores.jpg";
import imageCvv from "../img/image_lateral_CVV.jpg";
import ReactImageMagnify from "@blacklab/react-image-magnify";
import LoadingPage from "../components/loading-page";
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

  const { idCuidador } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [datosCuidador, setDatosCuidador] = useState({});
  const [showMoreStates, setShowMoreStates] = useState({});

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
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener al cuidador:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleShowMore = (id) => {
    setShowMoreStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
  };

  const reseñas = [
    {
      id: 1,
      nombre: "Ivana P.",
      fecha: "25/12/24",
      estrellas: 4,
      texto:
        "Así que mi cachorro tiene un estómago sensible y he probado muchas cosas diferentes...",
      avatar: imagenCuidador,
    },
    {
      id: 2,
      nombre: "Melissa",
      fecha: "27/11/24",
      estrellas: 3,
      texto:
        "Nuestros dos perros han sido criados con cordero y arroz integral...",
      avatar: imagenCuidador,
    },
    {
      id: 3,
      nombre: "Rosa",
      fecha: "10/11/24",
      estrellas: 5,
      texto:
        "Mi cachorro tenía tantas infecciones de oído que su veterinario sugirió cambiar su dieta...",
      avatar: imagenCuidador,
    },
  ];

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
                  <strong>Teléfono:</strong>{" "}
                  {datosCuidador.telefono}
                </p>
                <p>
                  <img
                    src={item}
                    alt="item"
                    className="item"
                    style={{ height: "20px", marginRight: "10px" }}
                  />
                  <strong>Localidad:</strong>{" "}
                  {datosCuidador.localidad}
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
      {/*}
      <ErrorModal
        show={showErrorModal}
        handleClose={handleCloseErrorModal}
        error={error}
      />
      <SuccessModal
        show={showSuccessModal}
        handleClose={handleCloseSuccessModal}
        response={response}
      />*/}
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
                width: 1050,
                height: 2050,
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
            {reseñas.map((reseña) => (
              <div key={reseña.id} className="reseña">
                <div className="reseña-header">
                  <img
                    src={reseña.avatar}
                    alt={reseña.nombre}
                    className="reseña-avatar"
                  />
                  <div className="reseña-info">
                    <p className="reseña-nombre">{reseña.nombre}</p>
                    <p className="reseña-fecha">{reseña.fecha}</p>
                  </div>
                  <button
                    className="boton-eliminar"
                    onClick={() => eliminarReseña(reseña.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
                <div className="reseña-stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index}>
                      {index < reseña.estrellas ? "⭐" : "☆"}
                    </span>
                  ))}
                </div>
                <p className="reseña-texto">{reseña.texto}</p>
              </div>
            ))}
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
            <button className="boton-reseña">Escríbela</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCuidadores;
