import Navbar from "../components/navbar"; // Navbar personalizado
import "../styles/pet-foundation.css"; // Importa el archivo CSS
import logo from "../img/Logotipo Maki.png"; // Ruta al logo
import LoadingPage from "../components/loading-page";
import React, { useState, useEffect } from "react";

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
    },
  ]);

  // Función para eliminar una mascota
  const eliminarMascota = (id) => {
    setMascotas(mascotas.filter((mascota) => mascota.id !== id));
  };
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="absolute-container-pet-foundation">
      {/* Navbar */}
      <Navbar />
      <div className="container-pet-foundation">
        <div className="content-pet-foundation">
        <div className="heading-pet-foundation">
          <h2>Mascotas</h2>
            <div className="button-container-foundation">
              <button className="button-add-pet-foundation" type="button">
                        <span class="button__text">Añadir</span>
                        <span class="button__icon"><svg class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
              </button>
            </div>
        </div>
          
          {/* Contenedor principal de tarjetas */}
          <div className="card-container">
            {mascotas.map((mascota) => (
              <div key={mascota.id} className="card-content">
                <img
                  src={mascota.imagen}
                  alt={mascota.nombre}
                  className="card-image"
                />
                <div key={mascota.id} className="card-text">
                  <h3>{mascota.nombre}</h3>
                  <p >
                    <strong>Tipo:</strong> {mascota.tipo}
                  </p>
                  <p>
                    <strong>Edad:</strong> {mascota.edad}
                  </p>
                  <p>
                    <strong>Tamaño:</strong> {mascota.tamano}
                  </p>
                  <p>
                    <strong>Peso:</strong> {mascota.peso}
                  </p>
                  <p>
                    <strong>Raza:</strong> {mascota.raza}
                  </p>
                </div>
                
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
      </div>
    </div>
  );
};

export default PetFoundation;
