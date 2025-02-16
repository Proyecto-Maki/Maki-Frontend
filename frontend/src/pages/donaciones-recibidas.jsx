import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import "../styles/solicitudes-adopcion.css";
import "../styles/mis-solicitudes-cuidado.css";
import "../styles/donaciones-recibidas.css";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../components/ErrorModal.jsx";
import api from "../api.js";

const solicitudAdopcion = [
    { id: "2RYH6", primer_nombre: "Ivana", primer_apellido: "Pedraza", tarjeta: "Tarjeta Gold ($50.000)", cantidad: "1" },
    { id: "2RYH6", primer_nombre: "Kelly", primer_apellido: "Solano", tarjeta: "Tarjeta Gold ($50.000)", cantidad: "1" },

];

const DonacionesRecibidas = () => {
    const [isCliente, setIsCliente] = useState(false); // Definir el estado de is_cliente

    return (
        <div className="absolute-solicitudes-adopcion-container">
            <Navbar />
            <div className="contenedor-solicitudes-adopcion">
                <h3 className="titulo-solicitud-cuidado">Donaciones recibidas</h3>
                {solicitudAdopcion.length === 0 ? (
                    <div className="no-solicitudes">
                        <h3>No hay donaciones recibidas</h3>
                    </div>
                ) : (
                    solicitudAdopcion.map((solicitud, index) => (
                        <div key={index} className="tarjeta-solicitudes-adopcion-sa">
                            <div className="fila-superior-sa">
                                <div className="icono-y-titulo-sa">
                                    <h3 className="titulo-sa">Has recibido una donación de {solicitud.primer_nombre + " " + solicitud.primer_apellido}</h3>
                                </div>
                                <div className="id-y-chevron-sa">
                                    <h3 className="id-sa">#{solicitud.id}</h3>
                                </div>
                            </div>

                            <div className="fila-intermedia-sa">
                                <div className="nombre-y-apellido-dr">
                                    {!isCliente && (
                                        <>
                                            <p className="nombre-cliente-sa">
                                                <button className="estado-sa">Recibiste</button>
                                                <span className="recibiste-tarjeta-content-dr">
                                                    {solicitud.tarjeta}
                                                </span>
                                            </p>
                                        </>
                                    )}

                                    <p className="fecha-sa">
                                        <button className="estado-sa">Cantidad</button>
                                        <span className="cantidad-content-dr">
                                            {solicitud.cantidad}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DonacionesRecibidas;
