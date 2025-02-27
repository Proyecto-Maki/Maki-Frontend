import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "../styles/adoptions.css";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import item from "../img/paw-item-adoption.png";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";

const Adoptions = () => {
  // Estado para almacenar los datos de las mascotas
  const [publicacionesAdopcion, setPublicacionesAdopcion] = useState([]);
  const [showMoreStates, setShowMoreStates] = useState({}); // Estado para manejar "Ver más" por cada tarjeta
  const navigate = useNavigate();
  const location = useLocation();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const refresh = sessionStorage.getItem("refresh");
  const is_cliente = sessionStorage.getItem("is_cliente");
  const is_fundacion = sessionStorage.getItem("is_fundacion");

  if (!email || !token || !refresh || !is_cliente || !is_fundacion) {
    window.location.href = "/login";
  }

  const { fundacion } = location.state || {};

  if (!fundacion) {
    window.location.href = "/servicios";
    return;
  }


  useEffect(() => {
    api
      .get("publicaciones-adopcion/", {
        params: {
          email_fundacion: fundacion.email,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setPublicacionesAdopcion(res.data);
        } else {
          console.error("Error al obtener las publicaciones de adopción:", res);
          setError("Error al obtener las publicaciones de adopción");
          setShowErrorModal(true);
        }
      })
      .catch((error) => {
        setError(error.response ? error.response.data.detail : "Error al obtener las publicaciones de adopción");
        setShowErrorModal(true);
      });
  }, []);

  const handleAdoptarMascota = (mascota, id_publicacion) => {
    navigate("/crear-solicitud-adopcion", {
      state: { mascota: mascota, id_publicacion: id_publicacion },
    });
  };

  const toggleShowMore = (id) => {
    setShowMoreStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id], // Alterna el estado para la tarjeta correspondiente
    }));
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

  return (
    <div className="absolute-container-adoptions">
      <Navbar />
      <div className="adoptions-container">
        {publicacionesAdopcion.length === 0 ? (
          <div className="no-adoptions-container">
            <h3>
              No hay publicaciones de adopción disponibles en este momento.
            </h3>
          </div>
        ) : (
          publicacionesAdopcion.map((publicacion) => (
            <div className="cards-container" key={publicacion.id}>
              {" "}
              {/*este es un contenedor por cada mascota*/}
              <h2> {publicacion.titulo} </h2>
              <div className="pet-card-adoptions">
                <div className="pet-image">
                  <img
                    src={publicacion.mascota.imagen}
                    alt={publicacion.mascota.nombre}
                  />
                </div>
                {showMoreStates[publicacion.id] ? (
                  <div className="pet-more-details">
                    <div className="container-detail-up"> 
                      <img
                        src={item}
                        alt="item"
                        className="item"
                        style={{ height: "20px", marginRight: "10px" }}
                      />
                      <p className="row-1">
                      <strong>Apto para niños:</strong>{" "}
                      {publicacion.detalle_mascota.apto_ninos ? "Sí" : "No"}
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
                      <strong>Apto en ambientes con ruido:</strong>{" "}
                      {publicacion.detalle_mascota.apto_ruido ? "Sí" : "No"}
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
                        
                        <strong>Habita en espacios:</strong>{" "}
                        {publicacion.detalle_mascota.espacio === 'P' ? "Pequeño" : "Grande"}
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
                      
                      <strong>Apto para otras mascotas:</strong>{" "}
                      {publicacion.detalle_mascota.apto_otras_mascotas
                        ? "Sí"
                        : "No"}
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
                        
                        <strong>Desparasitado:</strong>{" "}
                        {publicacion.detalle_mascota.desparasitado
                          ? "Sí"
                          : "No"}
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
                      
                      <strong>Esterilizado:</strong>{" "}
                      {publicacion.detalle_mascota.esterilizado ? "Sí" : "No"}
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
                        
                        <strong>Vacunado:</strong>{" "}
                        {publicacion.detalle_mascota.vacunado ? "Sí" : "No"}
                      </p>
                    </div>
                    <div className="container-detail"> 
                    <img
                        src={item}
                        alt="item"
                        className="item"
                        style={{ height: "20px", marginRight: "10px", alignSelf:"flex-start"}}
                      />
                    <p className="row-2">
                      
                      <strong>Descripción:</strong> {publicacion.descripcion}
                    </p>  
                    </div>  
                    
                  </div>
                ) : (
                  <div className="pet-details">
                    <h2>{publicacion.mascota.nombre}</h2>
                    <div className="container-detail-up"> 
                      <img
                        src={item}
                        alt="item"
                        className="item"
                        style={{ height: "20px", marginRight: "10px" }}
                      />
                      <p className="row-1">
                        <strong>Tipo:</strong> {publicacion.mascota.tipo}
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
                        <strong>Sexo:</strong> {publicacion.mascota.sexo}
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
                        <strong>Tamaño:</strong>{" "}
                        {publicacion.mascota.tamano === "P"
                          ? "Pequeño"
                          : publicacion.mascota.tamano === "M"
                          ? "Mediano"
                          : "Grande"}
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
                      <strong>Edad:</strong> {publicacion.mascota.edad} año(s)
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
                      <strong>Peso:</strong> {publicacion.mascota.peso} kg
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
                      <strong>Dirección:</strong> {publicacion.direccion}
                    </p>
                    </div>
                    
                  </div>
                )}
                <button
                  className="see-more-button"
                  onClick={() => toggleShowMore(publicacion.id)}
                >
                  <span>
                    {showMoreStates[publicacion.id] ? "Ver menos" : "Ver más"}{" "}
                  </span>
                  <svg width="15px" height="10px" viewBox="0 0 13 10">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </button>
              </div>
              <button
                className="adopt-button"
                title="Adoptar"
                onClick={() =>
                  handleAdoptarMascota(publicacion.mascota, publicacion.id)
                }
              >
                <i className="fas fa-paw"></i> Adoptar
              </button>
            </div>
          ))
        )}
      </div>
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

export default Adoptions;
