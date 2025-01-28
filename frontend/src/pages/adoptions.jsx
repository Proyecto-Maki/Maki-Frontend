import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "../styles/adoptions.css";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";

const Adoptions = () => {
    // Estado para almacenar los datos de las mascotas
    const [publicacionesAdopcion, setPublicacionesAdopcion] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [error, setError] = useState("");

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

    /*
    Estos son los datos que se traen desde la api (un ejemplo)

    {
        "id": 2,
        "titulo": "Dale una segunda oportunidad a Lucas",
        "descripcion": "Lucas es un perrito rescatado, que busca el amor de una nueva familia. Lucas es muy juguetón y activo. Es amigable con los niños y le gusta compartir su ambiente con otros perritos.",
        "direccion": "Calle 24 # 86 - 30 FONTIBÓN",
        "fecha": "2025-01-14T03:22:29.365763Z",
        "mascota": {
            "id": 68,
            "nombre": "Lucas",
            "sexo": "M",
            "tipo": "Perro",
            "raza": "Mestizo",
            "edad": 6,
            "estado_salud": "Saludable",
            "tamano": "P",
            "peso": "7.00",
            "imagen": "http://res.cloudinary.com/dlktjxg1a/image/upload/v1736567830/iq1fthgzbdmvtizvaq6o.jpg"
        },
        "detalle_mascota": {
            "id": 1,
            "apto_ninos": true,
            "espacio": "P",
            "apto_otras_mascotas": false,
            "desparacitado": true,
            "vacunado": true,
            "esterilizado": true
        }
    }
    
    */
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
            })
    }, []);

    const handleAdoptarMascota = (mascota, id_publicacion) => {
        navigate("/crear-solicitud-adopcion", { state: { mascota: mascota, id_publicacion: id_publicacion } });
    }
    //Para el boton de ver más
    const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(null);

    const toggleDetalles = (id) => {
        setTarjetaSeleccionada(tarjetaSeleccionada === id ? null : id);
    };


    return (
        <div className="absolute-lista-adopcion-container">
            <Navbar />
            <div className="lista-adopcion-container">
                {publicacionesAdopcion.map((publicacion, index) => (
                    <div className="lista-adopcion-card-content-mascota" key={publicacion.id}>
                        <h2 className="lista-adopcion-titlulo-publicacion">{publicacion.titulo}</h2>
                        <div className="lista-adopcion-mascota-details-general">
                            <div className="lista-adopcion-pet-image">
                                <img src={publicacion.mascota.imagen} alt={publicacion.mascota.nombre} />
                            </div>
                            <div className="lista-adopcion-mascota-info">
                                <div className="lista-adopcion-mascota-header">
                                    <h2>{publicacion.mascota.nombre}</h2>
                                    <button
                                        className="lista-adopcion-ver-detalles-adopcion"
                                        onClick={() => toggleDetalles(index)} // Usa el índice como identificador
                                    >
                                        <i className={`fas fa-chevron-${tarjetaSeleccionada === index ? 'down' : 'right'}`}></i>
                                        Ver más
                                    </button>
                                </div>

                                {/* Contenedor que se ajusta al diseño de columna */}
                                <div className="lista-adopcion-mascota-details">
                                    <div className="lista-adopcion-columna-izquierda">
                                        {tarjetaSeleccionada === index ? (
                                            // Información alterna
                                            <>
                                                <p className="lista-adopcion-info-oculta"><i className="fas fa-paw"></i> Apto para niños: Sí</p>
                                                <p className="lista-adopcion-info-oculta"><i className="fas fa-paw"></i> Tipo de espacio: Grande</p>
                                                <p className="lista-adopcion-info-oculta"><i className="fas fa-paw"></i> Desparasitado: Sí</p>
                                                <p className="lista-adopcion-info-oculta"><i className="fas fa-paw"></i> Vacunas al día: Sí</p>
                                            </>
                                        ) : (
                                            // Información original
                                            <>
                                                <p>{publicacion.mascota.tipo}</p>
                                                <p>{publicacion.mascota.sexo === 'M' ? 'Macho' : 'Hembra'}</p>
                                                <p>
                                                    {publicacion.mascota.tamano === 'P'
                                                        ? 'Pequeño'
                                                        : publicacion.mascota.tamano === 'M'
                                                            ? 'Mediano'
                                                            : 'Grande'}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    <div className="lista-adopcion-columna-derecha">
                                        {tarjetaSeleccionada === index ? (
                                            // Información alterna
                                            <>
                                                <p className="lista-adopcion-info-oculta"><i className="fas fa-paw"></i>Apto para ruido: Sí</p>
                                                <p className="lista-adopcion-info-oculta"><i className="fas fa-paw"></i>Apto para otras mascotas: Sí</p>
                                                <p className="lista-adopcion-info-oculta"><i className="fas fa-paw"></i>Esterilizado: No</p>
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
                                    <div className="lista-adopcion-descripcion">
                                        <p><strong>Descripción:</strong> {publicacion.descripcion}</p>
                                    </div>
                                )}
                            </div>
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
