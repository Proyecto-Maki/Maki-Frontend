import React, { useState } from "react";
import Navbar from "../components/navbar";
import "../styles/creacion-de-adopcion.css";
import logo from "../img/Logotipo Maki.png"; // Ruta al logo
const CreacionAdopcion = () => {
    const datosMascota = {
        imagen: '../src/img/catPfp.jpeg',
        nombre: 'Miau',
        tipo: 'Gato',
        raza: 'Siames',
        salud: 'Excelente',
        sexo: 'Macho',
        edad: '2 años',
        tamaño: 'Mediano',
        peso: '4 kg',
        ubicacion: 'Ciudad de México',
        personalidad: 'Juguetón, amigable y cariñoso'
    };

    // Estado para manejar el formulario
    const [nombre, setNombre] = useState(datosMascota.nombre);
    const [tipo, setTipo] = useState(datosMascota.tipo);
    const [raza, setRaza] = useState(datosMascota.raza);
    const [estadoSalud, setEstadoSalud] = useState(datosMascota.salud);
    const [sexo, setSexo] = useState(datosMascota.sexo);
    const [edad, setEdad] = useState(datosMascota.edad);
    const [tamano, setTamano] = useState(datosMascota.tamaño);
    const [peso, setPeso] = useState(datosMascota.peso);
    const [ubicacion, setUbicacion] = useState('');
    const [personalidad, setPersonalidad] = useState('');


    return (
        <div className="absolute-container-creacion-adopcion">
            {/* Navbar */}
            <Navbar />
            <div className="background-container-creacion-adopcion">
                {/* Logo Maki encima del formulario */}
                <div className="logo-container">
                    <img
                        src={logo} // Usando la imagen de datosMascota
                        alt="Logo Maki"
                        className="logo-img"
                        style={{ height: "100px" }}
                    />
                </div>
                <div className="crear-adopcion-container">
                    <form >
                        {/* Foto de la mascota */}
                        <div className="photo-container-creacion-adopcion">
                            <img
                                src={datosMascota.imagen}
                                alt="Foto-Mascota"
                                className="photo-container-img"
                            />
                        </div>

                        <div className="form-group">
                            <label className="label-creacion-adopcion-breed">Imagen</label>
                            <div className="tooltip-creacion-adopcion">
                                <input
                                    accept="image/png,image/jpeg"
                                    type="file"
                                    className="input-creacion-adopcion-breed"
                                    placeholder="Ingresa la raza de tu mascota"
                                    name="imagen"
                                    id="imagen-mascota"
                                />
                            </div>
                        </div>

                        {/* Nombre de la mascota */}
                        <div className="form-group">
                            <label className="label-creacion-adopcion-name">
                                ¿Cómo se llama tu mascota?
                            </label>
                            <div className="input-photo-container">
                                <div className="tooltip-creacion-adopcion">
                                    <input
                                        type="text"
                                        className="input-creacion-adopcion-name"
                                        placeholder="Ingresa el nombre de tu mascota"
                                        name="nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            {/* Tipo de mascota */}
                            <div className="form-group col-md-6">
                                <label className="label-creacion-adopcion-type">
                                    ¿Qué tipo de mascota tienes?
                                </label>
                                <div className="tooltip-creacion-adopcion">
                                    <select
                                        className="input-creacion-adopcion-type"
                                        name="tipo"
                                        value={tipo}
                                        onChange={(e) => setTipo(e.target.value)}
                                        required
                                    >
                                        <option defaultValue>Selecciona...</option>
                                        <option>Perro</option>
                                        <option>Gato</option>
                                        <option>Roedor</option>
                                        <option>Ave</option>
                                        <option>Reptil</option>
                                        <option>Pez</option>
                                    </select>
                                </div>
                            </div>

                            {/* Raza de la mascota */}
                            <div className="form-group col-md-6">
                                <label className="label-creacion-adopcion-breed">Raza</label>
                                <div className="tooltip-creacion-adopcion">
                                    <input
                                        type="text"
                                        className="input-creacion-adopcion-race"
                                        placeholder="Ingresa la raza de tu mascota"
                                        name="raza"
                                        value={raza}
                                        onChange={(e) => setRaza(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            {/* Estado de salud */}
                            <div className="form-group col-md-6">
                                <label className="label-creacion-adopcion-type">
                                    Estado de salud
                                </label>
                                <div className="tooltip-creacion-adopcion">
                                    <select
                                        className="input-creacion-adopcion-type"
                                        name="estado_salud"
                                        value={estadoSalud}
                                        onChange={(e) => setEstadoSalud(e.target.value)}
                                        required
                                    >
                                        <option defaultValue>Selecciona...</option>
                                        <option>Saludable</option>
                                        <option>Enfermo</option>
                                        <option>Recuperación</option>
                                    </select>
                                </div>
                            </div>

                            {/* Sexo de la mascota */}
                            <div className="form-group col-md-6">
                                <label htmlFor="input-pet-size" className="label-creacion-adopcion-size">
                                    Sexo
                                </label>
                                <div className="tooltip-creacion-adopcion">
                                    <select
                                        id="input-pet-sexo"
                                        className="input-creacion-adopcion-size"
                                        name="sexo"
                                        value={sexo}
                                        onChange={(e) => setSexo(e.target.value)}
                                        required
                                    >
                                        <option defaultValue>Selecciona...</option>
                                        <option value="M">Macho</option>
                                        <option value="H">Hembra</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            {/* Edad de la mascota */}
                            <div className="form-group col-md-6">
                                <label htmlFor="input-pet-age" className="label-creacion-adopcion-age">
                                    Edad
                                </label>
                                <div className="tooltip-creacion-adopcion">
                                    <input
                                        type="number"
                                        className="input-creacion-adopcion-age"
                                        id="input-pet-age"
                                        placeholder="Ingresa la edad de tu mascota"
                                        name="edad"
                                        value={edad}
                                        onChange={(e) => setEdad(e.target.value)}
                                        required
                                        min={0}
                                        max={50}
                                    />
                                </div>
                            </div>

                            {/* Tamaño de la mascota */}
                            <div className="form-group col-md-4">
                                <label htmlFor="input-pet-size" className="label-creacion-adopcion-size">
                                    Tamaño
                                </label>
                                <div className="tooltip-creacion-adopcion">
                                    <select
                                        id="input-pet-size"
                                        className="input-creacion-adopcion-size"
                                        name="tamano"
                                        value={tamano}
                                        onChange={(e) => setTamano(e.target.value)}
                                        required
                                    >
                                        <option defaultValue>Selecciona...</option>
                                        <option value="P">Pequeño</option>
                                        <option value="M">Mediano</option>
                                        <option value="G">Grande</option>
                                    </select>
                                </div>
                            </div>

                            {/* Peso de la mascota */}
                            <div className="form-group col-md-2">
                                <label htmlFor="input-pet-weight" className="label-creacion-adopcion-weight">
                                    Peso
                                </label>
                                <div className="tooltip-creacion-adopcion">
                                    <input
                                        type="number"
                                        className="input-creacion-adopcion-weight"
                                        id="input-pet-weight"
                                        placeholder="Peso en kg"
                                        name="peso"
                                        value={peso}
                                        onChange={(e) => setPeso(e.target.value)}
                                        min={0.1}
                                        max={120}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            {/* Ubicación de la mascota */}
                            <div className="form-group col-md-6">
                                <label className="label-creacion-adopcion-ubicacion">
                                    Ubicación
                                </label>
                                <div className="input-photo-container">
                                    <div className="tooltip-creacion-adopcion">
                                        <input
                                            type="text"
                                            className="input-creacion-adopcion-ubicacion"
                                            placeholder="Ingresa la ubicacion de tu mascota"
                                            name="ubicacion"
                                            value={ubicacion}
                                            onChange={(e) => setUbicacion(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
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
