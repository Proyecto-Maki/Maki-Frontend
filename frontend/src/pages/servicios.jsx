import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import "../styles/servicios.css";
import ErrorModal from '../components/ErrorModal';
import SuccessModal from "../components/SuccessModal";
import WarningModal from "../components/WarningModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import api from "../api";
import adopta_banner from "../img/adoptaBanner.png";
import dona_banner from "../img/donaBanner.png";

function Servicios() {

    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState("");
    const [warning, setWarning] = useState("");
    const [dirNavigate, setDirNavigate] = useState("");
    const [localidadUser, setLocalidadUser] = useState("");
    const [idLocalidad, setIdLocalidad] = useState(0);
    const [fundaciones, setFundaciones] = useState([]);

    const email = sessionStorage.getItem("email");
    const token = sessionStorage.getItem("token");
    const refresh = sessionStorage.getItem("refresh");
    const is_cliente = sessionStorage.getItem("is_cliente");
    const is_fundacion = sessionStorage.getItem("is_fundacion");

    // Simula datos de fundaciones (puedes reemplazar esto con una API)
    // const [fundaciones, setFundaciones] = useState([
    //     {
    //         nombre: "Sol Canino",
    //         telefono: "213312313",
    //         direccion: "Colombia, Bogotá D.C, Vereda Carrizal Casa el Quinto Pino, Granada, Cundinamarca",
    //         celular: "321 1111111",
    //         email: "solCanino@mail.com",
    //         mision: "Somos una fundación con ánimo de lucro que busca ayudar y resguardar a todos los animalitos desamparados. Ayúdanos a conseguirle un nuevo hogar.",
    //     },
    //     {
    //         nombre: "Ciudad Michi",
    //         telefono: "213377731",
    //         direccion: "Colombia, Cali, Avenida del Gato 123",
    //         celular: "321 2222222",
    //         email: "ciudadMichi@mail.com",
    //         mision: "Somos una fundación con ánimo de lucro que busca ayudar y resguardar a todos los animalitos desamparados. Ayúdanos a conseguirle un nuevo hogar. ",
    //     }
    // ]);

    useEffect(() => {
        const fetchFundaciones = () => {
            console.log("Localidades: ", idLocalidad);
            api
                .get("fundaciones/")
                .then((res) => {
                    if (res.status === 200) {
                        setFundaciones(res.data);
                    } else {
                        console.log("Error al cargar las fundaciones");
                        setError(res.data.message);
                        setShowErrorModal(true);
                    }
                })
                .catch((error) => {
                    console.log("Error al cargar las fundaciones");
                    setError(error.response.data.detail);
                    setShowErrorModal(true);
                });
        };

        if (idLocalidad === 0) {
            fetchFundaciones();
        } else {
            console.log("Localidad: ", idLocalidad);
            // setFundaciones([]);
            api
                .get(`fundaciones/localidad/${idLocalidad}/`)
                .then((res) => {
                    if (res.status === 200) {
                        setFundaciones(res.data);
                    } else {
                        console.log("Error al cargar las fundaciones");
                        setError(res.data.message);
                        setShowErrorModal(true);
                    }
                })
                .catch((error) => {
                    console.log("Error al cargar las fundaciones");
                    setError(error.response ? error.response.data.detail : error.message);
                    setShowErrorModal(true);
                });
        }
    }, [idLocalidad]);

    const handleLocalidadChange = (event) => {
        const newIdLocalidad = parseInt(event.target.value);
        setIdLocalidad(newIdLocalidad);
    };

    useEffect(() => {
        console.log("Localidad seleccionada: ", idLocalidad);
    }, [idLocalidad]);


    const handleAdoptar = (email_fundacion) => {
        if (email === null || token === null || refresh === null) {
            setWarning("Para ver las adopciones disponibles, debes iniciar sesión. ¿Deseas iniciar sesión?");
            setDirNavigate("/login");
            setShowWarningModal(true);
        } else if (is_fundacion === "true") {
            setWarning("Debes iniciar sesión como cliente para poder adoptar mascotas. ¿Deseas iniciar sesión?");
            setDirNavigate("/login");
            setShowWarningModal(true);
        } else {
            navigate("/adopcion", {state: {email_fundacion}});
        }
        

    }

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        setError("");
        setResponse("");
    }

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        setError("");
    }

    const handleCloseWarningModal = () => {
        setShowWarningModal(false);
        setWarning("");
    }

    return (
        <div>
            <Navbar />
            <div className="servicios-container">
                <section className="banners">
                    <div class="adopta-card">
                        <img src={adopta_banner} alt="Adopta, no compres" class="adopta-card-img" />
                    </div>

                    <div class="donar-card">
                        <img src={dona_banner} alt="Haz tu donación" class="donar-card-img" />
                    </div>

                </section>

                <section className="servicios-filtros">
                    <div className="filtro-localidad">
                        <h3>Filtrar por localidad:</h3>
                        <select name="id_localidad" id="id_localidad" value={idLocalidad} onChange={handleLocalidadChange}>
                            <option value={0}>Todas las localidades</option>
                            <option value={1}>Usaquén</option>
                            <option value={2}>Chapinero</option>
                            <option value={3}>Santa Fe</option>
                            <option value={4}>San Cristóbal</option>
                            <option value={5}>Usme</option>
                            <option value={6}>Tunjuelito</option>
                            <option value={7}>Bosa</option>
                            <option value={8}>Kennedy</option>
                            <option value={9}>Fontibón</option>
                            <option value={10}>Engativá</option>
                            <option value={11}>Suba</option>
                            <option value={12}>Barrios Unidos</option>
                            <option value={13}>Teusaquillo</option>
                            <option value={14}>Los Mártires</option>
                            <option value={15}>Antonio Nariño</option>
                            <option value={16}>Puente Aranda</option>
                            <option value={17}>La Candelaria</option>
                            <option value={18}>Rafael Uribe Uribe</option>
                            <option value={19}>Ciudad Bolívar</option>
                            <option value={20}>Sumapaz</option>
                        </select>
                    </div>
                </section>

                <section className="fundaciones">

                    {fundaciones.length === 0 ?
                        (<h3 className="no-fundaciones">No hay fundaciones</h3>) :
                        (fundaciones.map((fundacion, index) => (
                            <div key={index} className="fundacion-row">
                                {/* Tarjeta de información de la fundación */}
                                <div className="fundacion-info">
                                    <h3>{fundacion.nombre}</h3>
                                    <p><strong>Teléfono:</strong> {fundacion.telefono}</p>
                                    <p><strong>Dirección:</strong> {fundacion.direccion} | {fundacion.localidad} | {fundacion.codigo_postal ? fundacion.codigo_postal : 'No hay código postal'}</p>
                                    <p><strong>Teléfono:</strong> {fundacion.telefono}</p>
                                    <p><strong>Email:</strong> {fundacion.email}</p>
                                </div>
                                {/* Tarjeta de misión y acciones */}
                                <div className="fundacion-mision">
                                    <h3>Misión</h3>
                                    <p>{fundacion.descripcion}</p>
                                    <div className="fundacion-actions">
                                        <button className="btn btn-success" onClick={() => handleAdoptar(fundacion.email)}>Adoptar</button>
                                        <button className="btn btn-info">Donar</button>
                                    </div>
                                </div>
                            </div>
                        )))
                    }
                </section>
            </div>
            
            <ErrorModal
                show={showErrorModal}
                handleClose={handleCloseErrorModal}
                error={error}
            />
            <SuccessModal
                show={showSuccessModal}
                handleClose={handleCloseSuccessModal}
                response={response}
            />
            <WarningModal 
                show={showWarningModal}
                handleClose={handleCloseWarningModal}
                warning={warning}
                dirNavigate={dirNavigate}
            />
        </div>
    );
}

export default Servicios;
