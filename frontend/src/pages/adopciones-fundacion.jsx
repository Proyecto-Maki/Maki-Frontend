import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "../styles/adopciones-fundacion.css";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";

const AdoptionsFun = () => {
    const mascotas = [{
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
    }];

    const handleAdoptarMascota = (mascota) => {
        navigate("/crear-solicitud-adopcion", { state: { mascota: mascota } });
    };

    const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(null);

    const toggleDetalles = (id) => {
        setTarjetaSeleccionada(tarjetaSeleccionada === id ? null : id);
    };

    return (
        <div className="absolute-lista-adopcion-fundacion-container">
            <Navbar />
            <div className="lista-adopcion-fundacion-container">
                {mascotas.map((publicacion, index) => (
                    <div className="lista-adopcion-fundacion-card-content-mascota" key={publicacion.id}>
                        <h2 className="lista-adopcion-fundacion-titlulo-publicacion">{publicacion.titulo}</h2>
                        <div className="lista-adopcion-fundacion-mascota-details-general">
                            <div className="lista-adopcion-fundacion-pet-image">
                                <img src={publicacion.mascota.imagen} alt={publicacion.mascota.nombre} />
                            </div>
                            <div className="lista-adopcion-fundacion-mascota-info">
                                <div className="lista-adopcion-fundacion-mascota-header">
                                    <h2>{publicacion.mascota.nombre}</h2>
                                    <button
                                        className="lista-adopcion-fundacion-ver-detalles-adopcion"
                                        onClick={() => toggleDetalles(index)}
                                    >
                                        <i className={`fas fa-chevron-${tarjetaSeleccionada === index ? 'down' : 'right'}`}></i>
                                        Ver más
                                    </button>
                                </div>

                                <div className="lista-adopcion-fundacion-mascota-details">
                                    <div className="lista-adopcion-fundacion-columna-izquierda">
                                        {tarjetaSeleccionada === index ? (
                                            <>
                                                <p className="lista-adopcion-fundacion-info-oculta"><i className="fas fa-paw"></i> Apto para niños: Sí</p>
                                                <p className="lista-adopcion-fundacion-info-oculta"><i className="fas fa-paw"></i> Tipo de espacio: Grande</p>
                                                <p className="lista-adopcion-fundacion-info-oculta"><i className="fas fa-paw"></i> Desparacitado: Sí</p>
                                                <p className="lista-adopcion-fundacion-info-oculta"><i className="fas fa-paw"></i> Vacunas al día: Sí</p>
                                            </>
                                        ) : (
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
                                    <div className="lista-adopcion-fundacion-columna-derecha">
                                        {tarjetaSeleccionada === index ? (
                                            <>
                                                <p className="lista-adopcion-fundacion-info-oculta"><i className="fas fa-paw"></i>Apto para ruido: Sí</p>
                                                <p className="lista-adopcion-fundacion-info-oculta"><i className="fas fa-paw"></i>Apto para otras mascotas: Sí</p>
                                                <p className="lista-adopcion-fundacion-info-oculta"><i className="fas fa-paw"></i>Esterilizado: No</p>
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
                                    <div className="lista-adopcion-fundacion-descripcion">
                                        <p><strong>Descripción:</strong> {publicacion.descripcion}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Contenedor para los íconos de editar y eliminar */}
                        <div className="lista-adopcion-fundacion-icons-container">
                            <button className="lista-adopcion-fundacion-edit-button">
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="lista-adopcion-fundacion-delete-button">
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdoptionsFun;
