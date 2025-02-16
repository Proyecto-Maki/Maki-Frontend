import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import "../styles/solicitudes-adopcion.css";
import "../styles/mis-solicitudes-cuidado.css";
import {FaChevronRight, FaDog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../components/ErrorModal.jsx";
import api from "../api.js";
import { formatDateTime } from "../functions.js";

const solicitudAdopcion = [
    { id: "2RYH6", costo: "87446", fecha: "09/01/2025", estado: "Aceptada", mascota: "Yoshi" },
    { id: "3ABC9", costo: "97736", fecha: "10/02/2025", estado: "Pendiente", mascota: "Copito" }
];

const MisSolicitudesCuidado = () => {
    const [isCliente, setIsCliente] = useState(false); // Definir el estado de is_cliente

    return (
        <div className="absolute-solicitudes-adopcion-container">
            <Navbar />
            <div className="contenedor-solicitudes-adopcion">
            <h3 className="titulo-solicitud-cuidado">Tus solicitudes de cuidado</h3>
                {solicitudAdopcion.length === 0 ? (
                    <div className="no-solicitudes">
                        <h3>No hay solicitudes de cuidado</h3>
                    </div>
                ) : (
                    solicitudAdopcion.map((solicitud, index) => (
                        <div key={index} className="tarjeta-solicitudes-adopcion-sa">
                            <div className="fila-superior-sa">
                                <div className="icono-y-titulo-sa">
                                    <FaDog className="icono-sa" />
                                    <h3 className="titulo-sa">#{solicitud.id}</h3>
                                </div>
                                <div className="id-y-chevron-sa">
                                    <h3 className="id-sa">
                                        {Number(solicitud.costo).toLocaleString("es-CO", {
                                            style: "currency",
                                            currency: "COP",
                                            minimumFractionDigits: 0,
                                        })}
                                    </h3>


                                    <button className="ver-detalle-sa">
                                        <FaChevronRight id="chevron" />
                                    </button>
                                </div>
                            </div>

                            <div className="fila-intermedia-sa">
                                <div className="nombre-y-apellido-sa">
                                    {!isCliente && (
                                        <>
                                            <p className="nombre-cliente-sa">
                                                Fecha de la solicitud:{" "}
                                                <span className="nombre-cliente-content-sa">
                                                    {formatDateTime(solicitud.mascota)}
                                                </span>
                                            </p>
                                        </>
                                    )}

                                    <p className="fecha-sa">
                                        Mascota:{" "}
                                        <span className="fecha-content-sa">
                                            {solicitud.mascota}
                                        </span>
                                    </p>
                                </div>
                                <button className="estado-sa">{solicitud.estado}</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MisSolicitudesCuidado;
