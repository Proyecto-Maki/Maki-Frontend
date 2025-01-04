import React, { useState } from "react";
import Navbar from "../components/navbar"; // Navbar personalizado
import "../styles/pet-foundation.css"; // Importa el archivo CSS
import logo from "../img/Logotipo Maki.png"; // Ruta al logo

const PetFoundation = () => {
  // Estado inicial con las mascotas
  const [mascotas, setMascotas] = useState([
    {
      id: 1,
      nombre: "Baby",
      tipo: "Perro",
      edad: "2 meses",
      tamano: "Pequeño",
      peso: "3kg",
      raza: "Korgi",
      imagen: "../src/img/pet pfp/silly.jpeg", // Ruta de la imagen
    },
    {
      id: 2,
      nombre: "Milo",
      tipo: "Gato",
      edad: "1 año",
      tamano: "Mediano", 
      peso: "5kg",
      raza: "Siberiano",
      imagen: "../src/img/pet pfp/fish.jpeg", // Ruta de la imagen
    },
    {
      id: 3,
      nombre: "Milo",
      tipo: "Gato",
      edad: "1 año",
      tamano: "Mediano",
      peso: "5kg",
      raza: "Siberiano",
      imagen: "../src/img/pet pfp/hampter.jpeg", // Ruta de la imagen
    },
    {
      id: 4,
      nombre: "Milo",
      tipo: "Gato",
      edad: "1 año",
      tamano: "Mediano",
      peso: "5kg",
      raza: "Siberiano",
      imagen: "../src/img/pet pfp/hehe.jpeg", // Ruta de la imagen
    }
  ]);

  // Función para eliminar una mascota
  const eliminarMascota = (id) => {
    setMascotas(mascotas.filter((mascota) => mascota.id !== id));
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />
      <div className="background-container">
      <h2>Mascotas</h2>
        {/* Contenedor principal de tarjetas */}
        <div className="card-container">
          {mascotas.map((mascota) => (
            <div key={mascota.id} className="card">
              <img src={mascota.imagen} alt={mascota.nombre} className="card-image" />
              <h3>{mascota.nombre}</h3>
              <p><strong>Tipo:</strong> {mascota.tipo}</p>
              <p><strong>Edad:</strong> {mascota.edad}</p>
              <p><strong>Tamaño:</strong> {mascota.tamano}</p>
              <p><strong>Peso:</strong> {mascota.peso}</p>
              <p><strong>Raza:</strong> {mascota.raza}</p>
              <div className="actions">
                <button onClick={() => alert(`Editar: ${mascota.nombre}`)}>
                  <i className="fas fa-pencil-alt"></i> 
                </button>
                <button onClick={() => eliminarMascota(mascota.id)}>
                  <i className="fas fa-trash-alt"></i> 
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PetFoundation;
