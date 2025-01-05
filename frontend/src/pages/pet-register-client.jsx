import Navbar from "../components/navbar";
import LoadingPage from "../components/loading-page";
import "../styles/register-pet-client.css"; // Importa el archivo CSS
import logo from "../img/Logotipo Maki.png"; // Ruta al logo
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPetClient = () => {

  const navigate = useNavigate();

  if (!sessionStorage.getItem('token') && !sessionStorage.getItem('email') && !sessionStorage.getItem('refresh')) {
    navigate('/login');
  }

  const email = sessionStorage.getItem('email');
  const token = sessionStorage.getItem('token');
  const refresh = sessionStorage.getItem('refresh');

  const [isLoading, setIsLoading] = useState(true);
  const defaultImg = "../src/img/dog.png";
  const [profilePetImg, setProfilePetImg] = useState(defaultImg);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [estado_salud, setEstadoSalud] = useState("");
  const [padecimiento, setPadecimiento] = useState("");
  const [tamano, setTamano] = useState("");
  const [peso, setPeso] = useState("");
  const [imagen, setImagen] = useState(profilePetImg);
  const [petsData, setPetsData] = useState([]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleChangeImg = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setProfilePetImg(reader.result);
        setImagen(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePetImg(defaultImg);
      setImagen(defaultImg);
    }
  }

  const handleEstadoSaludChange = (e) => {
    setEstadoSalud(e.target.value);
  };

  const handleChange = (e) => {
    
  }

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      {/* Navbar */}
      <Navbar />
      <div className="background-container-pr">
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

            <div className="photo-container">
              <img src={profilePetImg} id="petImg" alt="Foto-Mascota" className="photo-container-img"></img>
            </div>

            <div className="form-group">
              <label className="label-register-pet-breed">Imagen</label>
              <input
                accept="image/png,image/jpeg"
                type="file"
                className="input-register-pet-breed"
                placeholder="Ingresa la raza de tu mascota"
                name="imagen"
                value={imagen}
                onChange={handleChangeImg}
              />
            </div>
            <div className="form-group">
              <label className="label-register-pet-name">
                ¿Cómo se llama tu mascota?
              </label>
              <div className="input-photo-container">
                <input
                  type="text"
                  className="input-register-pet-name"
                  placeholder="Ingresa el nombre de tu mascota"
                  name="nombre"
                  value={nombre}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="label-register-pet-type">
                  ¿Qué tipo de mascota tienes?
                </label>
                <select className="input-register-pet-type" name="tipo" value={tipo} onChange={handleChange} required>
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
                  name="raza"
                  value={raza}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
            <div className="form-group col-md-6">
                <label className="label-register-pet-type">
                  Estado de salud
                </label>
                <select className="input-register-pet-type" name="estado_salud" value={estado_salud} required onChange={handleEstadoSaludChange}>
                  <option defaultValue>Selecciona...</option>
                  <option>Saludable</option>
                  <option>Enfermo</option>
                  <option>Recuperación</option>
                </select>
              </div>
            </div>

            {estado_salud === "Enfermo" || estado_salud === "Recuperación" ? (
              <div className="form-group">
                <label className="label-register-pet-breed">
                  Si seleccionaste "Enfermo" o "Recuperación", ¿Qué padecimiento tiene?
                </label>
                <div className="input-photo-container">
                  <input
                    type="text"
                    className="input-register-pet-illness"
                    placeholder="Ingresa una breve descripción del padecimiento"
                    name="padecimiento"
                    value={padecimiento}
                    onChange={handleChange}
                    required
                  />
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
                <input
                  type="number"
                  className="input-register-pet-age"
                  id="input-pet-age"
                  placeholder="Ingresa la edad de tu mascota"
                  name="edad"
                  value={edad}
                  onChange={handleChange}
                  required
                  min={0}
                  max={50}
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
                  name="tamano"
                  value={tamano}
                  onChange={handleChange}
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
                  type="number"
                  className="input-register-pet-weight"
                  id="input-pet-weight"
                  placeholder="Peso en kg"
                  name="peso"
                  value={peso}
                  onChange={handleChange}
                  min={0.1}
                  max={120}
                  required
                />
              </div>
            </div>
            <div className="d-flex flex-row">
              <button type="submit" onClick={handleSubmit} className="btn-register-pet">
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
