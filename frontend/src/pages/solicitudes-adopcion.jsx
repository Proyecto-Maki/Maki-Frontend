import { React, useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import "../styles/solicitudes-adopcion.css";
import { FaCat } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../components/ErrorModal.jsx";
import api from "../api.js";
import { use } from "react";
import { formatDateTime } from "../functions.js";

const SolicitudesAdopcion = () => {
  // const solicitudAdopcion = [
  //   { id: "2RYH6", titulo: "Chispa te necesita", fecha: "09/01/2025", estado: "En proceso", primer_nombre: "Juan", primer_apellido: "Pérez" },
  //   { id: "2RYH6", titulo: "Chispa te necesita", fecha: "09/01/2025", estado: "En proceso", primer_nombre: "Juan", primer_apellido: "Pérez" },
  //   { id: "2RYH6", titulo: "Chispa te necesita", fecha: "09/01/2025", estado: "En proceso", primer_nombre: "Juan", primer_apellido: "Pérez" },
  //   { id: "2RYH6", titulo: "Chispa te necesita", fecha: "09/01/2025", estado: "En proceso", primer_nombre: "Juan", primer_apellido: "Pérez" },
  //   { id: "2RYH6", titulo: "Chispa te necesita", fecha: "09/01/2025", estado: "En proceso", primer_nombre: "Juan", primer_apellido: "Pérez" },
  //   { id: "2RYH6", titulo: "Chispa te necesita", fecha: "09/01/2025", estado: "En proceso", primer_nombre: "Juan", primer_apellido: "Pérez" },
  // ];

  const [solicitudesAdopcion, setSolicitudesAdopcion] = useState([]);

  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const refresh = sessionStorage.getItem("refresh");
  const is_cliente = sessionStorage.getItem("is_cliente");
  const is_fundacion = sessionStorage.getItem("is_fundacion");

  if (
    !sessionStorage.getItem("email") ||
    !sessionStorage.getItem("token") ||
    !sessionStorage.getItem("refresh") ||
    !sessionStorage.getItem("is_cliente") ||
    !sessionStorage.getItem("is_fundacion")
  ) {
    window.location.href = "/login";
  }

  useEffect(() => {
    if (is_cliente === "true") {
      api
        .get(`mis-solicitudes-adopcion/${email}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setSolicitudesAdopcion(res.data);
          } else {
            console.error("Error al obtener las solicitudes de adopción:", res);
          }
        })
        .catch((error) => {
          console.error("Error al obtener las solicitudes de adopción:", error);
        });
    } else {
      api
        .get(`solicitudes-adopcion-fundacion/${email}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setSolicitudesAdopcion(res.data);
          } else {
            console.error("Error al obtener las solicitudes de adopción:", res);
          }
        })
        .catch((error) => {
          console.error("Error al obtener las solicitudes de adopción:", error);
        });
    }
  }, []);

  const handleVerDetalleSolicitud = (solicitudAdopcion) => {
    console.log(`Ver detalle de la solicitud ${solicitudAdopcion.id}`);
    navigate("/resumen-adopcion", { state: { solicitudAdopcion } });
  }


  return (
    <div className="absolute-solicitudes-adopcion-container">
      <Navbar />
      <div className="contenedor-solicitudes-adopcion">
        {solicitudesAdopcion.length === 0 ? (
          <div className="no-solicitudes">
            <h3>No hay solicitudes de adopción</h3>
          </div>
        ) : (
          solicitudesAdopcion.map((solicitudAdopcion, index) => (
            <div key={index} className="tarjeta-solicitudes-adopcion-sa">
              <div className="fila-superior-sa">
                <div className="icono-y-titulo-sa">
                  <FaCat className="icono-sa" />
                  <h3 className="titulo-sa">
                    {solicitudAdopcion.publicacion.titulo}
                  </h3>
                </div>
                <div className="id-y-chevron-sa">
                  <h3 className="id-sa">#{solicitudAdopcion.id}</h3>
                  <button className="ver-detalle-sa" onClick={() => handleVerDetalleSolicitud(solicitudAdopcion)}>
                    <i className="fa-solid fa-chevron-right" id="chevron"></i>
                  </button>
                </div>
              </div>

              <div className="fila-intermedia-sa">
                <div className="nombre-y-apellido-sa">
                  {is_cliente === "true" ? (
                    <></>
                  ) : (
                    <>
                      <p className="nombre-cliente-sa">
                        Nombre del cliente:{" "}
                        <span className="nombre-cliente-content-sa">
                          {" "}
                          {solicitudAdopcion.cliente.primer_nombre}{" "}
                          {solicitudAdopcion.cliente.segundo_nombre}{" "}
                        </span>
                      </p>
                      <p className="apellido-cliente-sa">
                        Apellido del cliente:{" "}
                        <span className="apellido-cliente-content-sa">
                          {" "}
                          {solicitudAdopcion.cliente.primer_apellido}{" "}
                          {solicitudAdopcion.cliente.segundo_apellido}{" "}
                        </span>
                      </p>
                    </>
                  )}

                  <p className="fecha-sa">
                    Fecha de la solicitud:{" "}
                    <span className="fecha-content-sa">
                      {" "}
                      {formatDateTime(solicitudAdopcion.fecha)}{" "}
                    </span>
                  </p>
                </div>
                <button className="estado-sa">
                  {solicitudAdopcion.estado}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SolicitudesAdopcion;
