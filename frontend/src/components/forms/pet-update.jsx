import SuccessModalReload from "../SuccessModalReload.jsx";
import ErrorModal from "../ErrorModal";
import ConfirmationModal from "../ConfirmationModal";
import React, { useState, useEffect } from "react";
import "../../styles/modal-pet-update.css";
import { useNavigate } from "react-router-dom";
import api from "../../api.js";

function PetUpdate({ isEditarOpen, cerrarEditar, mascotaUser }) {
    const [profilePetImg, setProfilePetImg] = useState(mascotaUser.imagen);
    const [nombre, setNombre] = useState(mascotaUser.nombre);
    const [sexo, setSexo] = useState(mascotaUser.sexo);
    const [tipo, setTipo] = useState(mascotaUser.tipo);
    const [raza, setRaza] = useState(mascotaUser.raza);
    const [edad, setEdad] = useState(mascotaUser.edad);
    const [estado_salud, setEstadoSalud] = useState(mascotaUser.estado_salud);
    const [padecimiento, setPadecimiento] = useState(mascotaUser.padecimiento);
    const [tamano, setTamano] = useState(mascotaUser.tamano);
    const [peso, setPeso] = useState(mascotaUser.peso);
    const [imagen, setImagen] = useState(mascotaUser.imagen);
    const defaultImg = "../src/img/dog.png";
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState("");


    const validateNombre = (nombre) => {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
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
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
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
            setImagen(null);
        }
    }

    const handleEstadoSaludChange = (e) => {
        setEstadoSalud(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nombre === "" || sexo === "" || tipo === "" || raza === "" || edad === "" || estado_salud === "" || tamano === "" || peso === "") {
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
            console.log("Nombre inválido. Ingresa solo letras.");
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
            sexo: sexo,
            tipo: tipo,
            raza: raza,
            edad: edad,
            estado_salud: estado_salud,
            tamano: tamano,
            peso: parseFloat(peso),
        }

        console.log(data.imagen);
        if (imagen !== mascotaUser.imagen) {
            data.imagen = imagen;
        }

        let error_vali = false;
        const id_mascota = mascotaUser.id;

        api
            .put(`mascotas/update/${mascotaUser.id}/`, data, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log(id_mascota);
                    console.log("Mascota actualizada");
                    if (estado_salud === "Enfermo" || estado_salud === "Recuperación") {
                        const dataPadecimiento = {
                            id_mascota: id_mascota,
                            padecimiento: padecimiento,
                        }

                        api
                            .put(`padecimientos/update/${id_mascota}/`, dataPadecimiento, {
                                headers: {
                                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                                }
                            })
                            .then((res) => {
                                if (res.status === 200) {
                                    console.log("Padecimiento actualizado");
                                } else {
                                    error_vali = true;
                                    setError(res.data.message);
                                    setShowErrorModal(true);
                                }
                            })
                            .catch((error) => {
                                error_vali = true;
                                console.log(error);
                                setError(error);
                                setShowErrorModal(true);
                            });
                    }

                } else {
                    error_vali = true;
                    setError(res.data.message);
                    setShowErrorModal(true);
                }
            })
            .catch((error) => {
                error_vali = true;
                console.log(error);
                setError(error);
                setShowErrorModal(true);
            });

        if (error_vali === false) {
            setResponse("Mascota actualizada correctamente");
            setShowSuccessModal(true);
        }
    }

    const handleYesConfirmationModal = async (e) => {
        e.preventDefault();
        setShowConfirmationModal(false);
        // setIsLoading(true);
        await new Promise(r => setTimeout(r, 2000));
        await handleSubmit(e);
        // setIsLoading(false);
        handleNoConfirmationModal();

    }

    const handleNoConfirmationModal = () => {

        setShowConfirmationModal(false);
    }

    const handleOpenConfirmationModal = (e) => {
        e.preventDefault();
        setShowConfirmationModal(true);
        console.log("entra");
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
                            <div className="form-group col-md-6">
                                <label
                                    htmlFor="input-pet-size"
                                    className="label-register-pet-size"
                                >
                                    Sexo
                                </label>
                                <div className="tooltip-registro-mascota">
                                    <select
                                        id="input-pet-size"
                                        className="input-register-pet-size"
                                        name="sexo"
                                        value={sexo}
                                        onChange={(e) => setSexo(e.target.value)}
                                        required
                                    >
                                        <option defaultValue>Selecciona...</option>
                                        <option value={'M'}>Macho</option>
                                        <option value={'H'}>Hembra</option>
                                    </select>
                                    <span className="tooltip-registro-mascota-text-l">
                                        Este campo es obligatorio. Ingresa el sexo de tu mascota.
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
                            <button type="submit" className="btn-register-pet" onClick={handleOpenConfirmationModal}>
                                <i className="fas fa-paw"></i>Actualizar
                            </button>
                        </div>


                    </form>
                </div>
                <SuccessModalReload
                    show={showSuccessModal}
                    handleClose={handleCloseSuccessModal}
                    response={response}
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
                    action="Actualizar"
                    response="¿Estás seguro de que deseas editar?"
                />
            </div>


        )

    );
}

export default PetUpdate;