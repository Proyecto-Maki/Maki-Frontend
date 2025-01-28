import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "../styles/adoptions.css";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import item from "../img/paw-item-adoption.png";

const Adoptions = () => {
    // Estado para almacenar los datos de las mascotas
    const [publicacionesAdopcion, setPublicacionesAdopcion] = useState([]);
    const [showMoreStates, setShowMoreStates] = useState({}); // Estado para manejar "Ver más" por cada tarjeta
    const navigate = useNavigate();
    const location = useLocation();

    const  [showErrorModal, setShowErrorModal] = useState(false);
    const  [error, setError] = useState("");

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

    const ejemploPublicacion = {
        id: 2,
        titulo: "Dale una segunda oportunidad a Lucas",
        direccion: "Calle 24 # 86 - 30 FONTIBÓN",
        fecha: "2025-01-14T03:22:29.365763Z",
        mascota: {
            id: 68,
            nombre: "Lucas",
            sexo: "M",
            tipo: "Perro",
            raza: "Mestizo",
            edad: 6,
            estado_salud: "Saludable",
            tamano: "P",
            peso: "7.00",
            imagen: "http://res.cloudinary.com/dlktjxg1a/image/upload/v1736567830/iq1fthgzbdmvtizvaq6o.jpg"
        },
        detalle_mascota: {
            id: 1,
            apto_ninos: true,
            espacio: "P",
            apto_otras_mascotas: false,
            desparacitado: true,
            vacunado: true,
            esterilizado: true,
            descripcion: "Lucas es un perrito rescatado, que busca el amor de una nueva familia. Lucas es muy juguetón y activo. Es amigable con los niños y le gusta compartir su ambiente con otros perritos.",
        }
    };

    useEffect(() => {
        setPublicacionesAdopcion([ejemploPublicacion]); 
    }, []);

    useEffect(() => {
        const segundaPublicacion = {
            id: 3,
            titulo: "¡Conoce a Luna, la gata más dulce!",
            direccion: "Carrera 15 # 75 - 45 CHAPINERO",
            fecha: "2025-01-15T08:30:00.000Z",
            mascota: {
                id: 69,
                nombre: "Luna",
                sexo: "H",
                tipo: "Gato",
                raza: "Siamés",
                edad: 3,
                estado_salud: "Saludable",
                tamano: "P",
                peso: "4.5",
                imagen: "https://i.pinimg.com/736x/ae/33/ed/ae33ed2630660828424b9601fd9d7ca1.jpg"
            },
            detalle_mascota: {
                id: 2,
                apto_ninos: true,
                espacio: "P",
                apto_otras_mascotas: true,
                desparacitado: true,
                vacunado: true,
                esterilizado: true,
                descripcion: "Luna es una gata rescatada que disfruta de la tranquilidad y el cariño. Es muy juguetona, se lleva bien con niños y otras mascotas, y está en busca de un hogar lleno de amor.",
            }
        };
    
        setPublicacionesAdopcion([ejemploPublicacion, segundaPublicacion]);
    }, []);
    

    useEffect(() => {
        api
            .get("publicaciones-adopcion/", {
                params: {
                    email_fundacion: fundacion.email
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => {
                if (res.status === 200) {
                    setPublicacionesAdopcion(res.data);
                } else {
                    setError(res.data.message);
                    setShowErrorModal(true);
                }
            })
            .catch((error) => {
                setError(error.response ? error.response.data.detail : error.message);
                setShowErrorModal(true);
            });
    }, []);

    const handleAdoptarMascota = (mascota, id_publicacion) => {
        navigate("/crear-solicitud-adopcion", { state: { mascota: mascota, id_publicacion: id_publicacion } });
    };

    const toggleShowMore = (id) => {
        setShowMoreStates((prevStates) => ({
            ...prevStates,
            [id]: !prevStates[id] // Alterna el estado para la tarjeta correspondiente
        }));
    };

    return (
        <div className="absolute-container-adoptions">
            <Navbar />
            <div className="adoptions-container">
                {publicacionesAdopcion.map((publicacion) => (
                    <div className="cards-container" key={publicacion.id}> {/*este es un contenedor por cada mascota*/}
                        <h2> {publicacion.titulo} </h2>
                        <div className="pet-card-adoptions">
                            <div className="pet-image">
                                <img src={publicacion.mascota.imagen} alt={publicacion.mascota.nombre} />
                            </div>
                                {showMoreStates[publicacion.id] ? (
                                    <div className="pet-more-details">
                                        <p>
                                            <img
                                                src={item}
                                                alt="item"
                                                className="item"
                                                style={{ height: "20px", marginRight: "10px" }}
                                            />
                                            
                                            <strong>
                                                Apto para niños:
                                            </strong> {publicacion.detalle_mascota.apto_ninos ? "Sí" : "No"}</p>
                                        <p>
                                            <img
                                                src={item}
                                                alt="item"
                                                className="item"
                                                style={{ height: "20px", marginRight: "10px" }}
                                            />
                                            <strong>
                                                Apto para otras mascotas:
                                            </strong> {publicacion.detalle_mascota.apto_otras_mascotas ? "Sí" : "No"}</p>
                                        <p>
                                            <img
                                                src={item}
                                                alt="item"
                                                className="item"
                                                style={{ height: "20px", marginRight: "10px" }}
                                            />
                                            <strong>
                                                Esterilizado:
                                            </strong> {publicacion.detalle_mascota.esterilizado ? "Sí" : "No"}</p>
                                        <p>
                                            <img
                                                src={item}
                                                alt="item"
                                                className="item"
                                                style={{ height: "20px", marginRight: "10px" }}
                                            />
                                            <strong>
                                                Vacunado:
                                            </strong> {publicacion.detalle_mascota.vacunado ? "Sí" : "No"}</p>
                                        <p>
                                            <img
                                                src={item}
                                                alt="item"
                                                className="item"
                                                style={{ height: "20px", marginRight: "10px" }}
                                            />
                                            <strong>
                                                Descripción:
                                            </strong> {publicacion.detalle_mascota.descripcion}</p>
                                    </div>
                                ):(
                                    <div className="pet-details">
                                        <h2>{publicacion.mascota.nombre}</h2>
                                        <p><strong>Tipo:</strong> {publicacion.mascota.tipo}</p>
                                        <p><strong>Sexo:</strong> {publicacion.mascota.sexo}</p>
                                        <p><strong>Tamaño:</strong> {publicacion.mascota.tamano === 'P' ? 'Pequeño' : publicacion.mascota.tamano === 'M' ? 'Mediano' : 'Grande'}</p>
                                        <p><strong>Edad:</strong> {publicacion.mascota.edad} año(s)</p>
                                        <p><strong>Peso:</strong> {publicacion.mascota.peso} kg</p>
                                        <p><strong>Dirección:</strong> {publicacion.direccion}</p>
                                    </div>
                                )}
                                <button className="see-more-button" onClick={() => toggleShowMore(publicacion.id)}>
                                    <span>{showMoreStates[publicacion.id] ? "Ver menos" : "Ver más"} </span>
                                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </button>
                        </div>
                        <button className="adopt-button" title="Adoptar" onClick={() => handleAdoptarMascota(publicacion.mascota, publicacion.id)}>
                            <i className="fas fa-paw"></i> Adoptar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );



};

export default Adoptions;

