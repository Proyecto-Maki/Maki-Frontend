import { React, useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import "../styles/solicitudes-adopcion.css";
import { FaCat } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../components/ErrorModal.jsx";
import api from "../api.js";

const SolicitudesAdopcion = () => {
  const solicitudAdopcion = [
    { id: "2RYH6", titulo: "Chispa te necesita", fecha: "09/01/2025", estado: "En proceso", primer_nombre: "Juan", primer_apellido: "Pérez" },
    { id: "2RYH6", titulo: "Chispa te necesita", fecha: "09/01/2025", estado: "En proceso", primer_nombre: "Juan", primer_apellido: "Pérez" },
    { id: "2RYH6", titulo: "Chispa te necesita", fecha: "09/01/2025", estado: "En proceso", primer_nombre: "Juan", primer_apellido: "Pérez" },
    { id: "2RYH6", titulo: "Chispa te necesita", fecha: "09/01/2025", estado: "En proceso", primer_nombre: "Juan", primer_apellido: "Pérez" },
    { id: "2RYH6", titulo: "Chispa te necesita", fecha: "09/01/2025", estado: "En proceso", primer_nombre: "Juan", primer_apellido: "Pérez" },
    { id: "2RYH6", titulo: "Chispa te necesita", fecha: "09/01/2025", estado: "En proceso", primer_nombre: "Juan", primer_apellido: "Pérez" },
  ];
  return (
    <div className="absolute-solicitudes-adopcion-container">
      <Navbar />
      <div className="contenedor-solicitudes-adopcion">
        {solicitudAdopcion.length === 0 ? (
          <div className="no-solicitudes">
            <h3>No hay solicitudes de adopción</h3>
          </div>
        ) : (
          solicitudAdopcion.map((solicitudAdopcion, index) => (
            <div key={index} className="tarjeta-solicitudes-adopcion-sa">
              <div className="fila-superior-sa">
                <div className="icono-y-titulo-sa">
                  <FaCat className="icono-sa" />
                  <h3 className="titulo-sa">{solicitudAdopcion.titulo}</h3>
                </div>
                <div className="id-y-chevron-sa">
                  <h3 className="id-sa">#{solicitudAdopcion.id}</h3>
                  <button className="ver-detalle-sa">
                    <i className="fa-solid fa-chevron-right" id="chevron"></i>
                  </button>
                </div>
              </div>

              <div className="fila-intermedia-sa">
                <div className="nombre-y-apellido-sa">
                  <p className="nombre-cliente-sa">
                  Nombre cliente: <span className="nombre-cliente-content-sa"> {solicitudAdopcion.primer_nombre} </span>
                  </p>
                  <p className="apellido-cliente-sa">
                    Apellido cliente: <span className="apellido-cliente-content-sa"> {solicitudAdopcion.primer_apellido} </span>
                  </p>
                  <p className="fecha-sa">
                    Fecha de compra: <span className="fecha-content-sa"> {solicitudAdopcion.fecha} </span>
                  </p>
                </div>
                <button className="estado-sa">{solicitudAdopcion.estado}</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SolicitudesAdopcion;
