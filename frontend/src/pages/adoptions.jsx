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

    const[showErrorModal, setShowErrorModal] = useState(false);
    const[error, setError] = useState("");

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
                params:{
                    email_fundacion: fundacion.email
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => {
                if(res.status === 200){
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

    const handleAdoptarMascota = (mascota) => {
        navigate("/crear-solicitud-adopcion", { state: { mascota: mascota } });
    }

    return (
        <>
            <Navbar />
            <div className="adoptions-container">
                {publicacionesAdopcion.map((publicacion) => (
                    <div className="pet-card" key={publicacion.id}>
                        <div className="pet-image">
                            <img src={publicacion.mascota.imagen} alt={publicacion.mascota.nombre} />
                        </div>
                        <div className="pet-details">
                            <h2>{publicacion.mascota.nombre}</h2>
                            <p><strong>Tipo:</strong> {publicacion.mascota.tipo}</p>
                            <p><strong>Sexo:</strong> {publicacion.mascota.sexo}</p>
                            <p><strong>Tamaño:</strong> {publicacion.mascota.tamano === 'P' ? 'Pequeño' : publicacion.mascota.tamano === 'M' ? 'Mediano' : 'Grande'}</p>
                            <p><strong>Edad:</strong> {publicacion.mascota.edad} año(s)</p>
                            <p><strong>Peso:</strong> {publicacion.mascota.peso} kg</p>
                            <p><strong>Descripción:</strong> {publicacion.descripcion}</p>
                            <p><strong>Dirección:</strong> {publicacion.direccion}</p>
                            {/* <p><strong>Detalle:</strong> {pet.details}</p> */}
                        </div>
                        <button className="adopt-button" title="Adoptar" onClick={() => handleAdoptarMascota(publicacion.mascota)}>
                            <i className="fas fa-paw"></i> Adoptar
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Adoptions;
