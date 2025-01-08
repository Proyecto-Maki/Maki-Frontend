import SuccessModal from "../SuccessModal";
import ErrorModal from "../ErrorModal";
import ConfirmationModal from "../ConfirmationModal";
import React, { useState, useEffect } from "react";
import "../../styles/modal-pet-update.css";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";

function PetUpdate({ isEditarOpen, cerrarEditar, mascotasUser }) {
    const [profilePetImg, setProfilePetImg] = useState(mascotasUser.imagen);
    console.log(mascotasUser.imagen);
    const [nombre, setNombre] = useState(mascotasUser.nombre);
    const [tipo, setTipo] = useState(mascotasUser.tipo);
    const [raza, setRaza] = useState(mascotasUser.raza);
    const [edad, setEdad] = useState(mascotasUser.edad);
    const [estado_salud, setEstadoSalud] = useState(mascotasUser.estado_salud);
    const [padecimiento, setPadecimiento] = useState(mascotasUser.padecimiento);
    const [tamano, setTamano] = useState(mascotasUser.tamano);
    const [peso, setPeso] = useState(mascotasUser.peso);
    const [imagen, setImagen] = useState(mascotasUser.imagen);
    const defaultImg = "../src/img/dog.png";
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState("");
    const [dirNavigate, setDirNavigate] = useState("");

    const validateNombre = (nombre) => {
        const regex = /^[A-Za-z]+$/;
        if (nombre === "" || !regex.test(nombre)) {
            return false;
        }
        return true;
    }

    const validateRaza = (raza) => {
        const regex = /^[A-Za-z]+$/;
        if (raza === "" || !regex.test(raza)) {
            return false;
        }
        return true;
    }

    const validatePadecimiento = (padecimiento) => {
        const regex = /^[A-Za-z]+$/;
        if (padecimiento === "" || !regex.test(padecimiento)) {
            return false;
        }
        return true;
    }

    const handleChangeImg = (e) => {
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        setImagen(e.target.files[0]);
        if (file) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setProfilePetImg(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setProfilePetImg(defaultImg);
            setImagen("");
        }
    }

    const handleEstadoSaludChange = (e) => {
        setEstadoSalud(e.target.value);
    };


    const handleSubmit = async (e) => {
        if (nombre === "" || tipo === "" || raza === "" || edad === "" || estado_salud === "" || tamano === "" || peso === "") {
            // alert("Por favor, llena todos los campos");
            // return;
            setError("Por favor, llena todos los campos");
            setShowErrorModal(true);
        }
        if (estado_salud === "Enfermo" || estado_salud === "Recuperación") {
            if (padecimiento === "") {
                // alert("Por favor, llena todos los campos");
                // return;
                setError("Por favor, llena todos los campos");
                setShowErrorModal(true);
            }
        }

        if (!validateNombre(nombre)) {
            setError("Nombre inválido. Ingresa solo letras.");
            setShowErrorModal(true);
        }

        if (!validateRaza(raza)) {
            setError("Raza inválida. Ingresa solo letras.");
            setShowErrorModal(true);
        }

        if (estado_salud === "Enfermo" || estado_salud === "Recuperación") {
            if (!validatePadecimiento(padecimiento)) {
                setError("Padecimiento inválido. Ingresa solo letras.");
                setShowErrorModal(true);
                return;
            }
        }

        const data = {
            email: sessionStorage.getItem('email'),
            nombre: nombre,
            tipo: tipo,
            raza: raza,
            edad: edad,
            estado_salud: estado_salud,
            padecimiento: padecimiento,
            tamano: tamano,
            peso: parseFloat(peso),
            imagen: imagen,
        }

        if (imagen) {
            data.imagen = imagen, imagen.name;
        }

        api
            .put(`mascotas/update/${mascotasUser.id}/`, data, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    setResponse("Mascota actualizada con éxito");
                    setShowSuccessModal(true);
                    setDirNavigate("/pet-profile");
                } else {
                    setError(res.data.message);
                    setShowErrorModal(true);
                }
            })
            .catch((error) => {
                setError(error.response.data.message);
                setShowErrorModal(true);
            });
    }

    const handleYesConfirmationModal = async (e) => {
        alert("Mascota actualizada con éxito");
        // setIsLoading(true);
        // await new Promise(r => setTimeout(r, 2000));
        // await handleSubmit(e);
        // setIsLoading(false);
        // handleNoConfirmationModal();

    }

    const handleNoConfirmationModal = () => {
        setShowConfirmationModal(false);
    }

    const handleOpenConfirmationModal = () => {
        setShowConfirmationModal(true);

    }

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        setError('');
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        setError("");
        setResponse("");
    };

    return (
        isEditarOpen && (

            <div className="modal-editar-mascota">
                <div className="modal-editar-mascota-content">
                    <span className="close" onClick={cerrarEditar}>&times;</span>
                    <form>
                        <h2>Actualiza tu mascota</h2>
                        <div className="photo-container-pet-update">
                            <img src={profilePetImg} id="petImg" alt="Foto-Mascota" className="photo-container-pet-update-img"></img>
                        </div>
                        <div className="form-group">
                            <label className="label-register-pet-breed">Imagen</label>
                            <div className="tooltip-registro-mascota">
                                <input
                                    accept="image/png,image/jpeg"
                                    type="file"
                                    className="input-register-pet-breed"
                                    placeholder="Ingresa la raza de tu mascota"
                                    name="imagen"
                                    id="imagen-mascota"
                                    // value={imagen}
                                    onChange={handleChangeImg}
                                />
                                <span className="tooltip-registro-mascota-text">
                                    Este campo no es obligatorio. Ingresa la imagen de tu mascota, en formato .PNG o .JPEG.
                                </span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="label-register-pet-name">
                                ¿Cómo se llama tu mascota?
                            </label>
                            <div className="input-photo-container">
                                <div className="tooltip-registro-mascota">
                                    <input
                                        type="text"
                                        className="input-register-pet-name"
                                        placeholder="Ingresa el nombre de tu mascota"
                                        name="nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                    <span className="tooltip-registro-mascota-text">
                                        Este campo es obligatorio. Ingresa el nombre de tu mascota.
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="label-register-pet-type">
                                    ¿Qué tipo de mascota tienes?
                                </label>
                                <div className="tooltip-registro-mascota">
                                    <select className="input-register-pet-type" name="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                                        <option defaultValue>Selecciona...</option>
                                        <option>Perro</option>
                                        <option>Gato</option>
                                        <option>Roedor</option>
                                        <option>Ave</option>
                                        <option>Reptil</option>
                                        <option>Pez</option>
                                    </select>
                                    <span className="tooltip-registro-mascota-text">
                                        Este campo es obligatorio. Ingresa el tipo de mascota.
                                    </span>
                                </div>

                            </div>
                            <div className="form-group col-md-6">
                                <label className="label-register-pet-breed">Raza</label>
                                <div className="tooltip-registro-mascota">
                                    <input
                                        type="text"
                                        className="input-register-pet-breed"
                                        placeholder="Ingresa la raza de tu mascota"
                                        name="raza"
                                        value={raza}
                                        onChange={(e) => setRaza(e.target.value)}
                                        required
                                    />
                                    <span className="tooltip-registro-mascota-text-m">
                                        Este campo es obligatorio. Ingresa la raza de tu mascota. Si es un mestizo, ingresa "Mestizo".
                                    </span>
                                </div>
                            </div>
                        </div>


                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="label-register-pet-type">
                                    Estado de salud
                                </label>
                                <div className="tooltip-registro-mascota">
                                    <select className="input-register-pet-type" name="estado_salud" value={estado_salud} required onChange={handleEstadoSaludChange}>
                                        <option defaultValue>Selecciona...</option>
                                        <option>Saludable</option>
                                        <option>Enfermo</option>
                                        <option>Recuperación</option>
                                    </select>
                                    <span className="tooltip-registro-mascota-text">
                                        Este campo es obligatorio. Ingresa el estado de salud de tu mascota.
                                    </span>
                                </div>

                            </div>
                        </div>

                        {estado_salud === "Enfermo" || estado_salud === "Recuperación" ? (
                            <div className="form-group">
                                <label className="label-register-pet-breed">
                                    Si seleccionaste "Enfermo" o "Recuperación", ¿Qué padecimiento tiene?
                                </label>
                                <div className="input-photo-container">
                                    <div className="tooltip-registro-mascota">
                                        <input
                                            type="text"
                                            className="input-register-pet-illness"
                                            placeholder="Ingresa una breve descripción del padecimiento"
                                            name="padecimiento"
                                            value={padecimiento}
                                            onChange={(e) => setPadecimiento(e.target.value)}
                                            required
                                        />
                                        <span className="tooltip-registro-mascota-text-m">
                                            Si seleccionaste "Enfermo" o "Recuperación", este campo es obligatorio. Ingresa una breve descripción del padecimiento de tu mascota.
                                        </span>
                                    </div>

                                </div>
                            </div>
                        ) : null}

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label
                                    htmlFor="input-pet-age"
                                    className="label-register-pet-age"
                                >
                                    Edad
                                </label>
                                <div className="tooltip-registro-mascota">
                                    <input
                                        type="number"
                                        className="input-register-pet-age"
                                        id="input-pet-age"
                                        placeholder="Ingresa la edad de tu mascota"
                                        name="edad"
                                        value={edad}
                                        onChange={(e) => setEdad(e.target.value)}
                                        required
                                        min={0}
                                        max={50}
                                    />
                                    <span className="tooltip-registro-mascota-text-m">
                                        Este campo es obligatorio. Ingresa la edad de tu mascota en años. Si es menor a un año, ingresa 0.
                                    </span>
                                </div>
                            </div>
                            <div className="form-group col-md-4">
                                <label
                                    htmlFor="input-pet-size"
                                    className="label-register-pet-size"
                                >
                                    Tamaño
                                </label>
                                <div className="tooltip-registro-mascota">
                                    <select
                                        id="input-pet-size"
                                        className="input-register-pet-size"
                                        name="tamano"
                                        value={tamano}
                                        onChange={(e) => setTamano(e.target.value)}
                                        required
                                    >
                                        <option defaultValue>Selecciona...</option>
                                        <option value={'P'}>Pequeño</option>
                                        <option value={'M'}>Mediano</option>
                                        <option value={'G'}>Grande</option>
                                    </select>
                                    <span className="tooltip-registro-mascota-text-l">
                                        Este campo es obligatorio. Ingresa el tamaño de tu mascota.
                                    </span>
                                </div>

                            </div>
                            <div className="form-group col-md-2">
                                <label
                                    htmlFor="input-pet-weight"
                                    className="label-register-pet-weight"
                                >
                                    Peso
                                </label>
                                <div className="tooltip-registro-mascota">
                                    <input
                                        type="number"
                                        className="input-register-pet-weight"
                                        id="input-pet-weight"
                                        placeholder="Peso en kg"
                                        name="peso"
                                        value={peso}
                                        onChange={(e) => setPeso(e.target.value)}
                                        min={0.1}
                                        max={120}
                                        step={0.01}
                                        required
                                    />
                                    <span className="tooltip-registro-mascota-text-xl">
                                        Este campo es obligatorio. Ingresa el peso de tu mascota en kg.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="pet-update-row">
                            <button type="submit" className="btn-register-pet" onClick={() => setShowConfirmationModal(true)}>
                                <i className="fas fa-paw"></i>Actualizar
                            </button>
                        </div>


                    </form>
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
                {showConfirmationModal && (
                    <div style={{zIndex: 4000, position: "fixed", top: 0, left: 0, width: '100%', height: '100%' }}>
                        <ConfirmationModal
                            show={showConfirmationModal}
                            handleYes={handleYesConfirmationModal}
                            handleNo={handleNoConfirmationModal}
                            response="¿Estás seguro de que deseas editar?"
                        />
                    </div>
                )}

            </div>


        )

    );
}

export default PetUpdate;