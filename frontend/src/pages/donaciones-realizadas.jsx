import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import "../styles/solicitudes-adopcion.css";
import "../styles/mis-solicitudes-cuidado.css";
import "../styles/donaciones-realizadas.css";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../components/ErrorModal.jsx";
import api from "../api.js";

const solicitudAdopcion = [
    { id: "F892M", fundacion: "La Huella Roja", tarjeta: "Tarjeta Gold ($50.000)", cantidad: "1" },
    { id: "2RYH6", fundacion: "Patitas Peludas", tarjeta: "Tarjeta platinum ($110.000)", cantidad: "1" },

];

const DonacionesRealizadas = () => {
    const [isCliente, setIsCliente] = useState(false); // Definir el estado de is_cliente

    return (
        <div className="absolute-solicitudes-adopcion-container">
            <Navbar />
            <div className="contenedor-solicitudes-adopcion">
                <h3 className="titulo-solicitud-cuidado">Donaciones realizadas</h3>
                {solicitudAdopcion.length === 0 ? (
                    <div className="no-solicitudes">
                        <h3>No hay donaciones realizadas</h3>
                    </div>
                ) : (
                    solicitudAdopcion.map((solicitud, index) => (
                        <div key={index} className="tarjeta-solicitudes-adopcion-sa">
                            <div className="fila-superior-sa">
                                <div className="icono-y-titulo-sa">
                                    <h3 className="titulo-sa">Has donado a {solicitud.fundacion}</h3>
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
                                                <button className="estado-sa">Donaste:</button>
                                                <span className="recibiste-tarjeta-content-dr">
                                                    {solicitud.tarjeta}
                                                </span>
                                            </p>
                                        </>
                                    )}

                                    <p className="fecha-sa">
                                        <button className="estado-sa">Cantidad:</button>
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

export default DonacionesRealizadas;
