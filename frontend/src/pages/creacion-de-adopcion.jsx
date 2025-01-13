import React, { useState } from "react";
import Navbar from "../components/navbar";
import "../styles/creacion-de-adopcion.css";
import logo from "../img/Logotipo Maki.png"; // Ruta al logo
const CreacionAdopcion = () => {
    const datosMascota = {
        imagen: '../src/img/catPfp.jpeg',
        Localidad: 'Teusaquillo',
        direccion: 'cra26',
        personalidad: 'Juguetón, amigable y cariñoso'
    };

    // Estado para manejar el formulario
    const [localidad, setLocalidad] = useState(datosMascota.localidad);
    const [direccion, setDireccion] = useState(datosMascota.direccion);
    const [personalidad, setPersonalidad] = useState('');


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
                                src={datosMascota.imagen}
                                alt="Foto-Mascota"
                                className="photo-container-img"
                            />
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
                            {/*personalidad*/}
                            <div className="form-group col-md-6">
                                <label className="label-creacion-adopcion-personalidad">
                                    Personalidad
                                </label>
                                <div className="input-photo-container">
                                    <div className="tooltip-creacion-adopcion">
                                        <input
                                            type="text"
                                            className="input-creacion-adopcion-personalidad"
                                            placeholder="Ingresa la personalidad de tu mascota"
                                            name="personalidad"
                                            value={personalidad}
                                            onChange={(e) => setPersonalidad(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botón para crear la adopción */}
                        <div className="form-group">
                            <button class="btn-crear-adopcion">
                                <i class="fas fa-paw huella-icon"></i> ¡Crear!
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreacionAdopcion;
