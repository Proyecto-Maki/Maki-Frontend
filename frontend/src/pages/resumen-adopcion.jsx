import React from "react";
import Navbar from "../components/navbar";
import "../styles/resumen-adopcion.css";
import "../styles/pedido.css"; // Importa el archivo CSS
import foto_cliente from "../img/Foto_Perfil_Clientes.svg";
import dogImage from "../img/dog.png";
const ResumenAdopcion = () => {
    // Datos estáticos
    const cliente = {
        primer_nombre: "Ivana",
        segundo_nombre: "Alejandra",
        primer_apellido: "Pedraza",
        segundo_apellido: "Hernandez",
        cedula: "10101010",
    };

    const user = {
        id: "1",
        direccion: "Cra. 80 #9-0",
        correo: "ivana240404@gmail.com",
        telefono: "3002424245"
    };

    const publicacion_adopcion = {
        titulo: "Cachorro juguetón y amable busca hogar",
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
    };

    const solicitudAdopcion = {
        id: "F892M",
        estado: "Aceptada",
        motivo: "Me gustan mucho los animales desde que era niña. He tenido muchas mascotas en mi vida y desde temprana edad aprendí a tener la responsabilidad de cómo cuidarlos y educarlos. Cuento con un jardín grande donde Roberto pueda correr y disfrutar del espacio. Trabajo remotamente así que mantengo en casa. No tengo niños y cuento con un gato de 2 años de edad que le gusta jugar con los perros."

    };

    return (
        <div className="absolute-resumen-adopcion-container">
            <Navbar />
            <div className="contenedor-resumen-adopcion">
                <div className="info-adopcion-card">
                    <div className="fila-superior-adopcion">
                        <h4 className="adopcion-titulo">{publicacion_adopcion.titulo}</h4>
                        <p className="adopcion-id">#{solicitudAdopcion.id}</p>
                    </div>
                    <div className="fila-inferior-adopcion">
                        <div className="boton-y-nombre">
                            <div className="adopcion-nombre-completo">
                                <p className="adopcion-nombre-cliente"><span className="label-nombre-adopcion">Nombre cliente:</span> <span className="cliente-nombre">{cliente.primer_nombre}</span></p>
                                <p className="adopcion-apellido-cliente"><span className="label-apellido-adopcion">Apellido cliente:</span> <span className="cliente-apellido">{cliente.primer_apellido}</span></p>


                            </div>
                        </div>
                        <button className="estado-adopcion">{solicitudAdopcion.estado}</button>
                    </div>
                </div>

                <div className="cards-container">
                    {/* Tarjeta Solicitud de Adopción */}
                    <h2 className="h2-adopcion">Solicitud de adopción</h2>

                    <div className="card-solicitud-adopcion">
                        <div className="card-content-mascota">
                            <h2 className="h2-tarjetas-adopcion">{publicacion_adopcion.titulo}</h2>
                            <div className="card-content-mascota-interior">
                                <div className="image-container">
                                    <img src={dogImage} alt={mascota.nombre} />
                                </div>
                                <div className="mascota-details">
                                    <div className="columna-izquierda">
                                        <p>{mascota.nombre}</p>
                                        <p>{mascota.raza}</p>
                                        <p>{mascota.sexo}</p>
                                        <p>{mascota.tamano}</p>
                                        <p>{mascota.raza}</p>
                                    </div>
                                    <div className="columna-derecha">
                                        <p><strong>Edad:</strong> {mascota.edad}</p>
                                        <p><strong>Peso:</strong> {mascota.peso}</p>
                                        <p><strong>Personalidad:</strong> {mascota.personalidad}</p>
                                        <p><strong>Ubicación:</strong> {mascota.ubicacion}</p>
                                        <p><strong>Detalles:</strong> {mascota.detalles}</p>
                                    </div>
                                    <div className="columna-3">
                                        <button className="ver-detalles-adopcion">
                                            <i className="fas fa-chevron-right"></i> Ver más
                                        </button>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Tarjeta Información Cliente */}
                    <h2 className="h2-adopcion">Información cliente</h2>
                    <div className="card-informacion-cliente">

                        <div className="card-content-cliente">
                            <h2 className="h2-tarjetas-adopcion">{cliente.primer_nombre + " " + cliente.segundo_nombre + " " + cliente.primer_apellido + " " + cliente.segundo_apellido}</h2>
                            <div className="card-content-cliente-interior">
                                <div className="image-container">
                                    <img src={dogImage} alt="Cliente" />
                                </div>
                                <div className="cliente-details">
                                    <div className="columna-izquierda">
                                        <p><strong>Cédula:</strong> {cliente.cedula}</p>
                                        <p><strong>Correo:</strong> {user.correo}</p>
                                        <p><strong>Teléfono:</strong> {user.telefono}</p>
                                        <p><strong>Localidad:</strong> Teusaquillo </p>
                                    </div>
                                    <div className="columna-derecha">
                                        <p><strong>Código Postal:</strong> 3432 </p>
                                        <p><strong>Dirección:</strong> {user.direccion}</p>
                                        <p><strong>Fecha de nacimiento:</strong> 24-04-2000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Tarjeta Motivo de Adopción */}
                    <h2 className="h2-adopcion">Motivo de adopción</h2>
                    <div className="card-motivo-adopcion">
                        <p>{solicitudAdopcion.motivo}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumenAdopcion;
