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
import ReactImageMagnify from 'react-image-magnify';

const InfoCuidadores = () => {
    const [publicacionesCuidador, setPublicacionesCuidador] = useState([]);
    const [showMoreStates, setShowMoreStates] = useState({});



    useEffect(() => {
        const ejemploCuidador = {
            id: 2,
            titulo: "Dale una segunda oportunidad a Lucas",
            direccion: "Calle 24 # 86 - 30 FONTIBÓN",
            fecha: "2025-01-14T03:22:29.365763Z",
            imagen: imagenCuidador,
            nombre: "Julián",
            ocupacion: "Cuidador de masotas",
            localidad: "Chapinero",
            categoria_mascota: "Conejos",
            experiencia: "Julián es un técnico enfocado en el cuidado de lagartos. Contó con experiencia trabajando en zoológicos y santuarios de animales en cuidado. ",
            detalle_cuidador: {
                id: 1,
                cedula: "10101010",
                telefono: "3123948710",
                correo: "juli2390@gmail.com",
                fecha_nacimiento: "12/05/1993",
                localidad: "Kennedy",
                codigoPostal: "109237",
                direccion: "cra 12c #145-687"
            }
        };



        setPublicacionesCuidador([ejemploCuidador]);
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
            texto: "Así que mi cachorro tiene un estómago sensible y he probado muchas cosas diferentes...",
            avatar: imagenCuidador
        },
        {
            id: 2,
            nombre: "Melissa",
            fecha: "27/11/24",
            estrellas: 3,
            texto: "Nuestros dos perros han sido criados con cordero y arroz integral...",
            avatar: imagenCuidador
        },
        {
            id: 3,
            nombre: "Rosa",
            fecha: "10/11/24",
            estrellas: 5,
            texto: "Mi cachorro tenía tantas infecciones de oído que su veterinario sugirió cambiar su dieta...",
            avatar: imagenCuidador
        }
    ];
    return (
        <div className="absolute-container-cuidadores">
            <Navbar />
            <div className="cuidadores-container">
                <h2 className="title-cuidador">  Información del cuidador </h2>
                {publicacionesCuidador.length === 0 ? (
                    <div className="no-cuidadores-container">
                        <h3>
                            No hay publicaciones de adopción disponibles en este momento.
                        </h3>
                    </div>
                ) : (
                    publicacionesCuidador.map((publicacion) => (
                        <div className="cards-container-cuidador" key={publicacion.id}>
                            {" "}
                            {/*este es el contenedor del cuidador*/}
                            <div className="cuidador-image">
                                <h2>{publicacion.nombre}</h2>
                                <img
                                    src={publicacion.imagen}
                                    alt={publicacion.nombre}
                                />
                            </div>
                            <div className="cuidador-card-info">
                                {showMoreStates[publicacion.id] ? (
                                    <div className="cuidador-more-details">
                                        <p>
                                            <img
                                                src={item}
                                                alt="item"
                                                className="item"
                                                style={{ height: "20px", marginRight: "10px" }}
                                            />
                                            <strong>Cédula:</strong>{" "}
                                            {publicacion.detalle_cuidador.cedula}
                                        </p>
                                        <p>
                                            <img
                                                src={item}
                                                alt="item"
                                                className="item"
                                                style={{ height: "20px", marginRight: "10px" }}
                                            />
                                            <strong>Teléfono:</strong>{" "}
                                            {publicacion.detalle_cuidador.telefono}
                                        </p>
                                        <p>
                                            <img
                                                src={item}
                                                alt="item"
                                                className="item"
                                                style={{ height: "20px", marginRight: "10px" }}
                                            />
                                            <strong>Fecha de Nacimiento:</strong>{" "}
                                            {publicacion.detalle_cuidador.fecha_nacimiento}
                                        </p>
                                        <p>
                                            <img
                                                src={item}
                                                alt="item"
                                                className="item"
                                                style={{ height: "20px", marginRight: "10px" }}
                                            />
                                            <strong>Localidad:</strong>{" "}
                                            {publicacion.detalle_cuidador.localidad}
                                        </p>
                                        <p>
                                            <img
                                                src={item}
                                                alt="item"
                                                className="item"
                                                style={{ height: "20px", marginRight: "10px" }}
                                            />
                                            <strong>Código Postal:</strong>{" "}
                                            {publicacion.detalle_cuidador.codigoPostal}
                                        </p>
                                        <p>
                                            <img
                                                src={item}
                                                alt="item"
                                                className="item"
                                                style={{ height: "20px", marginRight: "10px" }}
                                            />
                                            <strong>Dirección:</strong>{" "}
                                            {publicacion.detalle_cuidador.direccion}
                                        </p>

                                        <p>
                                            <img
                                                src={item}
                                                alt="item"
                                                className="item"
                                                style={{ height: "20px", marginRight: "10px" }}
                                            />
                                            <strong>Correo:</strong>{" "}
                                            {publicacion.detalle_cuidador.correo}
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
                                                <strong>Ocupación:</strong> {publicacion.ocupacion}
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
                                                <strong>Localidad:</strong> {publicacion.localidad}
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
                                                <strong>Categoría Mascotas:</strong>{" "} {publicacion.categoria_mascota}
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
                                                <strong>Experiencia:</strong> {publicacion.experiencia}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <button
                                    className="see-more-button-cuidador"
                                    onClick={() => toggleShowMore(publicacion.id)}
                                >
                                    <span>
                                        {showMoreStates[publicacion.id] ? "Ver menos" : "Ver más"}{" "}
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
                            handleAdoptarMascota(publicacion.mascota, publicacion.id)
                            }*/
                            >
                                <i className="fas fa-paw"></i> Solicitar Cuidado
                            </button>
                        </div>
                    ))
                )}

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
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Hoja de vida cuidador',
                                isFluidWidth: true,
                                src: HojadeVida
                            },
                            largeImage: {
                                src: HojadeVida,
                                width: 1000,
                                height: 2050
                            }
                        }} />
                    </div>
                    <div className="container-lateral-image-cvv">
                        <img
                            src={imageCvv}
                            alt="imageCvv"
                            className="imageCvv"
                        />
                        <p>Con Maki podrás observar las habilidades y experiencias de nuestros cuidadores.
                            <p style={{ justifySelf: "center", color: "#7BB66D", fontStyle: "initial" }}>¡Así podrás estar seguro de tu decisión!</p>
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
                                    <img src={reseña.avatar} alt={reseña.nombre} className="reseña-avatar" />
                                    <div className="reseña-info">
                                        <p className="reseña-nombre">{reseña.nombre}</p>
                                        <p className="reseña-fecha">{reseña.fecha}</p>
                                    </div>
                                    <button className="boton-eliminar" onClick={() => eliminarReseña(reseña.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>

                                </div>
                                <div className="reseña-stars">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <span key={index}>{index < reseña.estrellas ? "⭐" : "☆"}</span>
                                    ))}
                                </div>
                                <p className="reseña-texto">{reseña.texto}</p>
                            </div>
                        ))}
                    </div>

                    <div className="escribir-reseña">
                        <h2 className="titulo-escribir-reseña-cuidador"> ¿Deseas escribir una reseña? </h2>
                        <p className="Subtitulo-escribir-reseña-cuidador"> Comparte tus opiniones y experiencias con otros clientes ¡Nos ayudarías mucho!</p>
                        <button className="boton-reseña">Escríbela</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default InfoCuidadores;
