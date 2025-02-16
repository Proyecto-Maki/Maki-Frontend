import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import "../styles/creacion-de-adopcion.css";
import logo from "../img/Logotipo Maki.png"; // Ruta al logo
import { useLocation, useNavigate } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import ConfirmationModal from "../components/ConfirmationModal";
import LoadingPage from "../components/loading-page";
import api from "../api.js";

const CreacionAdopcion = () => {
    // const datosMascota = {
    //     imagen: '../src/img/catPfp.jpeg',
    //     Localidad: 'Teusaquillo',
    //     direccion: 'cra26',
    //     descripcion: 'Juguetón, amigable y cariñoso'
    // };

    const [isLoading, setIsLoading] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState("");
    const [dirNavigate, setDirNavigate] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    if (!sessionStorage.getItem("email") || !sessionStorage.getItem("token") || !sessionStorage.getItem("refresh") || !sessionStorage.getItem("is_cliente") || !sessionStorage.getItem("is_fundacion")) {
        window.location.href = "/login";
    }

    const email = sessionStorage.getItem("email");
    const token = sessionStorage.getItem("token");
    const refresh = sessionStorage.getItem("refresh");
    const is_cliente = sessionStorage.getItem("is_cliente");
    const is_fundacion = sessionStorage.getItem("is_fundacion");

    // Estado para manejar el formulario
    const [mascotaImagen, setMascotaImagen] = useState('');
    const [nombreMascota, setNombreMascota] = useState('');
    const [titulo, setTitulo] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ninnos, setNinnos] = useState(false);
    const [vacunado, setVacunado] = useState(false);
    const [espacio, setEspacio] = useState('P');
    const [desparasitado, setDesparasitado] = useState(false);
    const [esterilizado, setEsterilizado] = useState(false);
    const [convive, setConvive] = useState(false);
    const [ruido, setRuido] = useState(false);

    const { mascota } = location.state || {};

    if (!mascota) {
        window.location.href = "/pet-profile-foundation";
        return;
    }

    useEffect(() => {
        console.log(mascota);
        setMascotaImagen(mascota.imagen);
        setNombreMascota(mascota.nombre);
    }, [mascota]);

    const validateTitulo = (titulo) => {
        const hasLetters = /[a-zA-Z]/.test(titulo);
        const hasNumbers = /\d/.test(titulo);
        const isValidLength = titulo.length >= 5;

        return hasLetters && isValidLength;
    }

    const validateDescripcion = (descripcion) => {
        const hasLetters = /[a-zA-Z]/.test(descripcion);
        const hasNumbers = /\d/.test(descripcion);
        const isValidLength = descripcion.length >= 5;

        return hasLetters && isValidLength;
    }

    const validateDireccion = (direccion) => {
        const hasLetters = /[a-zA-Z]/.test(direccion);
        const hasNumbers = /\d/.test(direccion);
        const isValidLength = direccion.length >= 5;

        return hasLetters && isValidLength;
    }



    const handleCrearPublicacion = async (e) => {
        e.preventDefault();

        if (!titulo || !localidad || !direccion || !descripcion) {
            setError("Por favor llene todos los campos");
            setShowErrorModal(true);
            return;
        }

        if (!validateTitulo(titulo)) {
            setError("El título debe tener al menos 5 caracteres y contener letras");
            setShowErrorModal(true);
            return;
        }

        if (!validateDescripcion(descripcion)) {
            setError("La descripción debe tener al menos 5 caracteres y contener letras");
            setShowErrorModal(true);
            return;
        }

        if (!validateDireccion(direccion)) {
            setError("La dirección debe tener al menos 5 caracteres y contener letras");
            setShowErrorModal(true);
            return;
        }

        const datosDetalleMascota = {
            id_mascota: mascota.id,
            apto_ninos: ninnos,
            apto_ruido: ruido,
            espacio: espacio,
            apto_otras_mascotas: convive,
            desparasitado: desparasitado,
            vacunado: vacunado,
            esterilizado: esterilizado,
        }

        const datosPublicacion = {
            email: email,
            id_mascota: mascota.id,
            titulo: titulo,
            id_localidad: parseInt(localidad),
            direccion: direccion,
            descripcion: descripcion
        };

        console.log(datosPublicacion);
        console.log(datosDetalleMascota);

        api
            .post('detalle-mascota/create/', datosDetalleMascota, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                }
            })
            .then((res) => {
                if (res.status === 201) {
                    console.log("Detalle mascota creado exitosamente");
                    api
                        .post('publicaciones/create/', datosPublicacion, {
                            headers: {
                                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                            }
                        })
                        .then((res) => {
                            if (res.status === 201) {
                                setResponse("Publicación creada exitosamente");
                                setShowSuccessModal(true);
                                setDirNavigate("/pet-profile-foundation");
                            } else {
                                setError(res.data.message);
                                setShowErrorModal(true);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            setError(err.response ? err.response.data.detail : "Error al crear la publicación");
                            setShowErrorModal(true);
                        });
                } else {
                    setError(res.data.message);
                    setShowErrorModal(true);
                }
            })
            .catch((err) => {
                console.log(err);
                setError(err.response ? err.response.data.detail : "Error al crear el detalle de la mascota");
                setShowErrorModal(true);
            });
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

    const handleYesConfirmationModal = async (e) => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 2000));
        await handleCrearPublicacion(e);
        setIsLoading(false);
        handleNoConfirmationModal();
    }

    const handleNoConfirmationModal = () => {
        setShowConfirmationModal(false);
    }

    const handleOpenConfirmationModal = (e) => {
        e.preventDefault();
        setShowConfirmationModal(true);
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <div className="absolute-container-creacion-adopcion">
            {/* Navbar */}
            <Navbar />
            <div className="background-container-creacion-adopcion">

                {/* Logo Maki encima del formulario */}
                <div className="logo-container">
                    <img
                        src={logo}
                        alt="Logo Maki"
                        className="logo-img"
                        style={{ height: "100px" }}
                    />
                </div>
                <div className="crear-adopcion-container">
                    <form >
                        <div className="photo-container-creacion-adopcion">
                            <img
                                src={mascotaImagen}
                                alt="Foto-Mascota"
                                className="photo-container-img"
                            />
                        </div>

                        <div className="form-row-nombre-mascota">
                            <h3>{nombreMascota}</h3>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label className="label-creacion-adopcion-title">
                                    Dale un título a tu publicación
                                </label>
                                <div className="tooltip-creacion-adopcion">
                                    <input
                                        type="text"
                                        className="input-creacion-adopcion-title"
                                        placeholder="Ingresa el titulo de tu publicación"
                                        name="titulo"
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                        required>
                                    </input>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="label-creacion-adopcion-locality">
                                    Localidad de residencia
                                </label>
                                <div className="tooltip-creacion-adopcion">
                                    <select
                                        className="input-creacion-adopcion-locality"
                                        name="localidad"
                                        value={localidad}
                                        onChange={(e) => setLocalidad(e.target.value)}
                                        required
                                    >
                                        <option defaultValue>Selecciona...</option>
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
                            </div>

                            {/* dirección */}
                            <div className="form-group col-md-6">
                                <label className="label-creacion-adopcion-direction">Dirección</label>
                                <div className="tooltip-creacion-adopcion">
                                    <input
                                        type="text"
                                        className="input-creacion-adopcion-direction"
                                        placeholder="Ingresa tu dirección exacta"
                                        name="direccion"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            {/*descripcion*/}
                            <div className="form-group col-md-12">
                                <label className="label-creacion-adopcion-descripcion">
                                    Descripción
                                </label>
                                <div className="input-photo-container">
                                    <div className="tooltip-creacion-adopcion">
                                        <textarea
                                            className="textarea-creacion-adopcion-descripcion"
                                            placeholder="Ingresa una descripción para la publicación de tu mascota"
                                            name="descripcion"
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            {/*detalles*/}
                            <div className="form-group col-md-12">
                                <label className="label-creacion-adopcion-details">
                                    Detalles de la mascota
                                </label>
                                <div className="input-details-container">
                                    <label className="label-creacion-adopcion-niños">
                                        Apto para niños:
                                        <div className="tooltip-creacion-adopcion">
                                            <select
                                                className="input-creacion-adopcion-locality"
                                                name="ninnos"
                                                value={ninnos}
                                                onChange={(e) => setNinnos(e.target.value)}
                                                required
                                            >
                                                <option defaultValue>Selecciona...</option>
                                                <option value={true}>Si</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                    </label>
                                    <label className="label-creacion-adopcion-ruido">
                                        Apto con ruido:
                                        <div className="tooltip-creacion-adopcion">
                                            <select
                                                className="input-creacion-adopcion-locality"
                                                name="ninnos"
                                                value={ruido}
                                                onChange={(e) => setRuido(e.target.value)}
                                                required
                                            >
                                                <option defaultValue>Selecciona...</option>
                                                <option value={true}>Si</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                    </label>
                                    <label className="label-creacion-adopcion-vacuna">
                                        Vacunado:
                                        <div className="tooltip-creacion-adopcion">
                                            <select
                                                className="input-creacion-adopcion-locality"
                                                name="vacunado"
                                                value={vacunado}
                                                onChange={(e) => setVacunado(e.target.value)}
                                                required
                                            >
                                                <option defaultValue>Selecciona...</option>
                                                <option value={true}>Si</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                    </label>
                                    <label className="label-creacion-adopcion-espacio">
                                        Tipo de espacio:
                                        <div className="tooltip-creacion-adopcion">
                                            <select
                                                className="input-creacion-adopcion-locality"
                                                name="espacio"
                                                value={espacio}
                                                onChange={(e) => setEspacio(e.target.value)}
                                                required
                                            >
                                                <option defaultValue>Selecciona...</option>
                                                <option value={'P'}>Pequeño</option>
                                                <option value={'G'}>Grande</option>
                                            </select>
                                        </div>
                                    </label>
                                    <label className="label-creacion-adopcion-desparacitado">
                                        Desparacitado:
                                        <div className="tooltip-creacion-adopcion">
                                            <select
                                                className="input-creacion-adopcion-locality"
                                                name="desparacitado"
                                                value={desparasitado}
                                                onChange={(e) => setDesparasitado(e.target.value)}
                                                required
                                            >
                                                <option defaultValue>Selecciona...</option>
                                                <option value={true}>Si</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                    </label>
                                    <label className="label-creacion-adopcion-esterilizado">
                                        Esterilizado:
                                        <div className="tooltip-creacion-adopcion">
                                            <select
                                                className="input-creacion-adopcion-locality"
                                                name="esterilizado"
                                                value={esterilizado}
                                                onChange={(e) => setEsterilizado(e.target.value)}
                                                required
                                            >
                                                <option defaultValue>Selecciona...</option>
                                                <option value={true}>Si</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                    </label>
                                    <label className="label-creacion-adopcion-convive">
                                        Convive con mascotas:
                                        <div className="tooltip-creacion-adopcion">
                                            <select
                                                className="input-creacion-adopcion-locality"
                                                name="convive"
                                                value={convive}
                                                onChange={(e) => setConvive(e.target.value)}
                                                required
                                            >
                                                <option defaultValue>Selecciona...</option>
                                                <option value={true}>Si</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Botón para crear la adopción */}
                        <div className="form-group">
                            <button class="btn-crear-adopcion" onClick={handleOpenConfirmationModal}>
                                <i class="fas fa-paw huella-icon"></i> ¡Crear!
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            <SuccessModal
                show={showSuccessModal}
                handleClose={handleCloseSuccessModal}
                response={response}
                dirNavigate={dirNavigate}
            />
            <ErrorModal
                show={showErrorModal}
                handleClose={handleCloseErrorModal}
                error={error}
            />
            <ConfirmationModal
                show={showConfirmationModal}
                handleYes={handleYesConfirmationModal}
                handleNo={handleNoConfirmationModal}
                action="Publicar"
                response="¿Estás seguro de publicar la adopción?"
            />
        </div>
    );
};

export default CreacionAdopcion;
