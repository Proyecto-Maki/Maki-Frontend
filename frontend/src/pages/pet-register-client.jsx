import Navbar from "../components/navbar";
import LoadingPage from "../components/loading-page";
import "../styles/register-pet-client.css"; // Importa el archivo CSS
import logo from "../img/Logotipo Maki.png"; // Ruta al logo
import React, { useState, useEffect } from "react";

const RegisterPetClient = () => {
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
    <>
      {/* Navbar */}
      <Navbar />
      <div className="background-container">
        {/* Logo Maki encima del formulario */}
        <div className="logo-container">
          <img
            src={logo}
            alt="Logo Maki"
            className="logo-img"
            style={{ height: "100px" }}
          />
        </div>
        <div className="register-pet-container">
          <form>
            <h2>
              ¡Hola! Eres dueño de mascotas ¡Nos gustaría que la registraras!
            </h2>
            <div className="form-group">
              <label className="label-register-pet-name">
                ¿Cómo se llama tu mascota?
              </label>
              <div className="input-photo-container">
                <input
                  type="text"
                  className="input-register-pet-name"
                  placeholder="Ingresa el nombre de tu mascota"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="label-register-pet-type">
                  ¿Qué tipo de mascota tienes?
                </label>
                <select className="input-register-pet-type" required>
                  <option defaultValue>Selecciona...</option>
                  <option>Perro</option>
                  <option>Gato</option>
                  <option>Roedor</option>
                  <option>Ave</option>
                  <option>Reptil</option>
                  <option>Pez</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label className="label-register-pet-breed">Raza</label>
                <input
                  type="text"
                  className="input-register-pet-breed"
                  placeholder="Ingresa la raza de tu mascota"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="input-pet-age"
                  className="label-register-pet-age"
                >
                  Edad
                </label>
                <input
                  type="number"
                  className="input-register-pet-age"
                  id="input-pet-age"
                  placeholder="Ingresa la edad de tu mascota"
                  required
                />
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="input-pet-size"
                  className="label-register-pet-size"
                >
                  Tamaño
                </label>
                <select
                  id="input-pet-size"
                  className="input-register-pet-size"
                  required
                >
                  <option defaultValue>Selecciona...</option>
                  <option>Pequeño</option>
                  <option>Mediano</option>
                  <option>Grande</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label
                  htmlFor="input-pet-weight"
                  className="label-register-pet-weight"
                >
                  Peso
                </label>
                <input
                  type="text"
                  className="input-register-pet-weight"
                  id="input-pet-weight"
                  placeholder="Peso en kg"
                  required
                />
              </div>
            </div>
            <div className="d-flex flex-row">
              <button type="submit" className="btn-register-pet">
                <i className="fas fa-paw"></i> ¡Crear!
              </button>
              <button type="submit" className="btn-another-pet">
                <i className="fas fa-plus"></i> Agregar otra mascota
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPetClient;
