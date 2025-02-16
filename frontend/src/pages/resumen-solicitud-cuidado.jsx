import { React, useState } from "react";
import Navbar from "../components/navbar";
import "../styles/resumen-adopcion.css";
import "../styles/resumen-solicitud-cuidado.css";
import "../styles/pedido.css"; // Importa el archivo CSS
import foto_cliente from "../img/Foto_Perfil_Clientes.svg";
import dogImage from "../img/dog.png";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api.js";
import item from "../img/paw-item-adoption.png";
import SuccessModalNoReload from "../components/SuccessModalNoReload";
import ErrorModal from "../components/ErrorModal.jsx";

const ResumenCuidado = () => {
    const cliente = {
        primer_nombre: "Ivana",
        segundo_nombre: "Alejandra",
        primer_apellido: "Pedraza",
        segundo_apellido: "Hernandez",
        cedula: "10101010",
        email: "ivana240404@gmail.com",
        telefono: "3002424245",
        localidad: "Chapinero",
        direccion: "Cra. 80 #9-0",
        fecha_nacimiento: "24/04/2004",
        ocupacion: "Cuidador de mascotas profesional",
        categoria_mascotas: "Conejos",
        Experiencia: "Julián es un técnico enfocado en el cuidado de lagartos. Contó con experiencia trabajando en zoológicos y santuarios de animales en cuidado. ",
        codigo_postal: "110221"
    };

    const detalles_cuidado = {
        fecha: "19/01/2025",
        total: "100000",
        fecha_cuidado: "13/02/2025",
        hora_cuidado: "5",
        solicita_cuidado_medico: "No",
        descripcion_cuidado: "Yoshi se ha fracturado su pata izquierda trasera, necesita recibir su medicamento a las 3:00pm para el dolor. Además, necesita comer a las 8pm su alimento especial ‘Wild taste’.",
    };

    const mascota = {
        nombre: "Roberto",
        tipo: "Perro",
        raza: "Golden Retriever",
        edad: "2 años",
        sexo: "Macho",
        estado_salud: "Saludable",
        tamano: "Grande",
        peso: "32kg",
        personalidad: "Juguetón",
        ubicacion: "Bogotá D.C.",
        detalles: "Localidad de Suba, parque el virrey",
        imagen: dogImage,
    };

    const solicitudAdopcion = {
        id: "F892M",
        estado: "Aceptada",
        publicacion: {
            descripcion: "Un perro muy juguetón y amigable.",
            mascota: {
                nombre: "Roberto",
                raza: "Golden Retriever",
                sexo: "M",
                tamano: "G",
                edad: "2",
                peso: "32",
                personalidad: "Juguetón",
            },
            detalle_direccion: {
                detalle: "Localidad de suba, parque el virrey",
                ubicacion: "Bogotá D.C.",
            },
        },
    };

    const [mostrarMasDetalles, setMostrarMasDetalles] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");

    const toggleMostrarMas = (id) => {
        setMostrarMasDetalles((prevEstados) => ({
            ...prevEstados,
            [id]: !prevEstados[id],
        }));
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
    };

    return (
        <div className="absolute-resumen-adopcion-container">
            <Navbar />
            <div className="contenedor-resumen-adopcion">
                <div className="info-adopcion-card">
                    <div className="fila-superior-adopcion">
                        <h4 className="adopcion-titulo">
                            #{solicitudAdopcion.id}
                        </h4>
                        <p className="adopcion-id"><button className="cancelar-cuidado">Cancelar cuidado</button></p>
                    </div>
                    <div className="fila-inferior-adopcion">
                        <div className="boton-y-nombre">
                            <div className="adopcion-nombre-completo">
                                <p className="adopcion-nombre-cliente">
                                    <span className="label-nombre-adopcion">Fecha en la que se realizó la solicitud:</span>{" "}
                                    <span className="cliente-nombre">
                                        {detalles_cuidado.fecha}
                                    </span>
                                </p>
                                <p className="adopcion-apellido-cliente">
                                    <span className="label-apellido-adopcion">
                                        Mascota a cuidar:
                                    </span>{" "}
                                    <span className="cliente-apellido">
                                        {mascota.nombre}
                                    </span>
                                </p>
                                <p className="adopcion-apellido-cliente">
                                    <span className="label-apellido-adopcion">
                                        Total:
                                    </span>{" "}
                                    <span className="cliente-apellido">
                                    {Number(detalles_cuidado.total).toLocaleString("es-CO", {
                                            style: "currency",
                                            currency: "COP",
                                            minimumFractionDigits: 0,
                                        })}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <button className="estado-adopcion">{solicitudAdopcion.estado}</button>
                    </div>
                </div>

                <div className="cards-container-container">
                    {/* Tarjeta Solicitud de cuidado */}
                    <h2 className="h2-adopcion">Solicitud de cuidado</h2>

                    <div className="card-solicitud-adopcion">
                        <div className="card-content-mascota">
                            <h2 className="h2-tarjetas-adopcion">
                                Tu mascota a cuidar
                            </h2>
                            <div className="card-content-mascota-interior">
                                <div className="image-container">
                                    <img
                                        src={mascota.imagen}
                                        alt={mascota.nombre}
                                    />
                                </div>
                                <div className="mascota-details">
                                    <div className="columna-izquierda">
                                        <p>{solicitudAdopcion.publicacion.mascota.nombre}</p>
                                        <p>{solicitudAdopcion.publicacion.mascota.raza}</p>
                                        <p>
                                            {solicitudAdopcion.publicacion.mascota.sexo === "M"
                                                ? "Macho"
                                                : "Hembra"}
                                        </p>
                                        <p>
                                            {solicitudAdopcion.publicacion.mascota.tamano === "P"
                                                ? "Pequeño"
                                                : solicitudAdopcion.publicacion.mascota.tamano ===
                                                    "M"
                                                    ? "Mediano"
                                                    : "Grande"}
                                        </p>
                                        <p>{solicitudAdopcion.publicacion.mascota.raza}</p>
                                    </div>
                                    <div className="columna-derecha">
                                        <p>
                                            <strong>Edad:</strong>{" "}
                                            {solicitudAdopcion.publicacion.mascota.edad} año(s)
                                        </p>
                                        <p>
                                            <strong>Peso:</strong>{" "}
                                            {solicitudAdopcion.publicacion.mascota.peso} kg
                                        </p>
                                        <p>
                                            <strong>Personalidad:</strong>{" "}
                                            {solicitudAdopcion.publicacion.mascota.personalidad} kg
                                        </p>

                                        <p>
                                            <strong>Ubicación:</strong>{" "}
                                            {
                                                solicitudAdopcion.publicacion.detalle_direccion.ubicacion
                                            }
                                        </p>
                                        <p>
                                            <strong>Detalle:</strong>{" "}
                                            {
                                                solicitudAdopcion.publicacion.detalle_direccion.detalle
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta Información cuidador */}
                    <h2 className="h2-adopcion">Información cuidador</h2>
                    <div className="card-informacion-cliente">
                        <div className="card-content-cliente">
                            <h2 className="h2-tarjetas-adopcion">
                                {cliente.primer_nombre +
                                    " " +
                                    cliente.segundo_nombre +
                                    " " +
                                    cliente.primer_apellido +
                                    " " +
                                    cliente.segundo_apellido}
                            </h2>
                            <div className="card-content-cliente-interior">
                                <div className="image-container">
                                    <img src={dogImage} alt="Cliente" />
                                </div>
                                <div className="cliente-details">
                                    {mostrarMasDetalles[solicitudAdopcion.id] ? (
                                        <>
                                            <div className="columna-izquierda">
                                                <p>
                                                    <strong>Cédula:</strong> CC{" "}
                                                    {cliente.cedula}
                                                </p>
                                                <p>
                                                    <strong>Teléfono:</strong>{" "}
                                                    {cliente.telefono}
                                                </p>
                                                <p>
                                                    <strong>Fecha de nacimiento:</strong>{" "}
                                                    {cliente.fecha_nacimiento}{" "}
                                                </p>
                                                <p>
                                                    <strong>Correo:</strong> {cliente.email}
                                                </p>

                                            </div>
                                            <div className="columna-derecha">
                                                <p>
                                                    <strong>Localidad:</strong>{" "}
                                                    {cliente.localidad}{" "}
                                                </p>
                                                <p>
                                                    <strong>Código Postal:</strong>{" "}
                                                    {cliente.codigo_postal
                                                        ? cliente.codigo_postal
                                                        : "No hay código postal"}{" "}
                                                </p>
                                                <p>
                                                    <strong>Dirección:</strong>{" "}
                                                    {cliente.direccion}
                                                </p>

                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="columna-izquierda">
                                                <p>
                                                    <strong>Ocupación:</strong> CC{" "}
                                                    {cliente.cedula}
                                                </p>
                                                <p>
                                                    <strong>Localidad:</strong> {cliente.localidad}
                                                </p>
                                                <p>
                                                    <strong>Experiencia:</strong>{" "}
                                                    {cliente.Experiencia}
                                                </p>
                                            </div>
                                            <div className="columna-derecha">
                                                <p>
                                                    <strong>Categoría mascotas:</strong>{" "}
                                                    {cliente.categoria_mascotas}{" "}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                    <div className="columna-3">
                                        <button
                                            className="ver-detalles-adopcion"
                                            onClick={() => toggleMostrarMas(solicitudAdopcion.id)}
                                        >
                                            <span>
                                                {mostrarMasDetalles[solicitudAdopcion.id]
                                                    ? "Ver menos"
                                                    : "Ver más"}{" "}
                                            </span>
                                            <svg width="15px" height="10px" viewBox="0 0 13 10">
                                                <path d="M1,5 L11,5"></path>
                                                <polyline points="8 1 12 5 8 9"></polyline>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Tarjeta Motivo de Adopción */}
                    <h2 className="h2-adopcion">Especificaciones de cuidado</h2>
                    <div className="card-solicitud-adopcion">
                        <div className="card-content-mascota">
                            <div className="card-content-mascota-interior">
                                <div className="mascota-details">
                                    <div className="columna-izquierda">
                                        <p>
                                            <img
                                                src={item}
                                                alt="item"
                                                className="item"
                                                style={{ height: "20px", marginRight: "10px" }}
                                            />
                                            <strong>Fecha del cuidado </strong>{detalles_cuidado.fecha_cuidado}</p>
                                        <p>
                                            <img
                                                src={item}
                                                alt="item"
                                                className="item"
                                                style={{ height: "20px", marginRight: "10px" }}
                                            />
                                            <strong>Horas de cuidado </strong>{detalles_cuidado.hora_cuidado} horas</p>
                                        <p>
                                            <img
                                                src={item}
                                                alt="item"
                                                className="item"
                                                style={{ height: "20px", marginRight: "10px" }}
                                            />
                                            <strong>Solicitda cuidado medico: </strong>
                                             {detalles_cuidado.solicita_cuidado_medico}</p>
                                    </div>
                                    <div className="columna-derecha">
                                        <p>
                                            <img
                                                src={item}
                                                alt="item"
                                                className="item"
                                                style={{ height: "20px", marginRight: "10px" }}
                                            />

                                            <strong>Descripción del cuidado: </strong>
                                            {detalles_cuidado.descripcion_cuidado}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SuccessModalNoReload
                show={showSuccessModal}
                handleClose={handleCloseSuccessModal}
                response={response}
            />
            <ErrorModal
                show={showErrorModal}
                handleClose={handleCloseErrorModal}
                error={error}
            />
        </div>
    );
};

export default ResumenCuidado;