import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import "../styles/servicios.css";
import ErrorModal from '../components/ErrorModal';
import SuccessModal from "../components/SuccessModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Servicios() {

    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState("");
    
    const [fundaciones, setFundaciones] = useState([]);

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
            })
    }, []);

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        setError("");
        setResponse("");
    }

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        setError("");
    }


    return (
        <div>
            <Navbar />
            <div className="servicios-container">
                <section className="banners">
                    <div class="adopta-card">
                        <img src="../src/img/adoptaBanner.png" alt="Adopta, no compres" class="adopta-card-img" />
                    </div>

                    <div class="donar-card">
                        <img src="../src/img/donaBanner.png" alt="Haz tu donación" class="donar-card-img" />
                    </div>

                </section>
                <section className="fundaciones">
                    {fundaciones.map((fundacion, index) => (
                        <div key={index} className="fundacion-row">
                            {/* Tarjeta de información de la fundación */}
                            <div className="fundacion-info">
                                <h3>{fundacion.nombre}</h3>
                                <p><strong>Teléfono:</strong> {fundacion.telefono}</p>
                                <p><strong>Dirección:</strong> {fundacion.direccion}</p>
                                <p><strong>Teléfono:</strong> {fundacion.telefono}</p>
                                <p><strong>Email:</strong> {fundacion.email}</p>
                            </div>
                            {/* Tarjeta de misión y acciones */}
                            <div className="fundacion-mision">
                                <h3>Misión</h3>
                                <p>{fundacion.descripcion}</p>
                                <div className="fundacion-actions">
                                    <button className="btn btn-success">Adoptar</button>
                                    <button className="btn btn-info">Donar</button>
                                </div>
                            </div>
                        </div>
                    ))}
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
        </div>
    );
}

export default Servicios;
