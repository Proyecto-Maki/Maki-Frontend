import Navbar from "../components/navbar";
import LoadingPage from "../components/loading-page";
import "../styles/register-pet-client.css"; // Importa el archivo CSS
import logo from "../img/Logotipo Maki.png"; // Ruta al logo
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import ConfirmationModal from "../components/ConfirmationModal";

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
  const [imagen, setImagen] = useState("");
  const [petsData, setPetsData] = useState([]);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [error, setError] = useState("");
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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

  const handleMascotas = () => {
    if (nombre === "" || tipo === "" || raza === "" || edad === "" || estado_salud === "" || tamano === "" || peso === "") {
      //alert("Por favor, llena todos los campos");
      // return;
      setError("Por favor, llena todos los campos");
      showErrorModal(true);
    }
    if (estado_salud === "Enfermo" || estado_salud === "Recuperación") {
      if (padecimiento === "") {
        // alert("Por favor, llena todos los campos");
        // return;
        setError("Por favor, llena todos los campos");
        showErrorModal(true);
      }
    }

    if (!validateNombre(nombre)) {
      setError("Nombre inválido. Ingresa solo letras.");
      setShowErrorModal(true);
      return;
    }

    if (!validateRaza(raza)) {
      setError("Raza inválida. Ingresa solo letras.");
      setShowErrorModal(true);
      return;
    }

    if (estado_salud === "Enfermo" || estado_salud === "Recuperación") {
      if (!validatePadecimiento(padecimiento)) {
        setError("Padecimiento inválido. Ingresa solo letras.");
        setShowErrorModal(true);
        return;
      }
    }


    const data = {
      nombre: nombre,
      tipo: tipo,
      raza: raza,
      edad: edad,
      estado_salud: estado_salud,
      padecimiento: padecimiento,
      tamano: tamano,
      peso: parseFloat(peso),
      imagen: imagen,
    };
    console.log(data);

    setPetsData([...petsData, data]);
    console.log(petsData);
    setNombre("");
    setTipo("");
    setRaza("");
    setEdad("");
    setEstadoSalud("");
    setPadecimiento("");
    setTamano("");
    setPeso("");
    setImagen("");
    document.getElementById("imagen-mascota").value = "";
    setProfilePetImg(defaultImg);
  }

  const handleSubmit = async (e) => {
    console.log(petsData);

    if (nombre !== "" || tipo !== "" || raza !== "" || edad !== "" || estado_salud !== "" || tamano !== "" || peso !== "") {
      alert("Por favor, agrega la mascota a la lista de mascotas");
      return;
    }
    if (petsData.length === 0) {
      alert("Por favor, agrega al menos una mascota");
      return;
    }

    // setShowConfirmationModal(true);


    const cantidad_mascotas = petsData.length;
    let respuestas = [];
    let error_vali = false;
    e.preventDefault();
    try {
      for (let i = 0; i < cantidad_mascotas; i++) {
        const currentPet = {
          email: email,
          nombre: petsData[i].nombre,
          tipo: petsData[i].tipo,
          raza: petsData[i].raza,
          edad: petsData[i].edad,
          estado_salud: petsData[i].estado_salud,
          tamano: petsData[i].tamano,
          peso: petsData[i].peso,
        }

        if (petsData[i].imagen) {
          currentPet.imagen = petsData[i].imagen, petsData[i].imagen.name;
        }

        let id_mascota = 0;

        api
          .post('registro/mascota/', currentPet, {
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
              "Content-Type": "multipart/form-data",
            }
          })
          .then((res) => {
            if (res.status === 201) {
              id_mascota = parseInt(res.data.id);
              console.log(id_mascota);
              console.log("Mascota registrada correctamente");
              if (currentPet.estado_salud === "Enfermo" || currentPet.estado_salud === "Recuperación") {
                const padecimiento = {
                  id_mascota: id_mascota,
                  padecimiento: petsData[i].padecimiento,
                }

                api
                  .post('registro/mascota/padecimiento/', padecimiento, {
                    headers: {
                      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    }
                  })
                  .then((res) => {
                    if (res.status === 201) {
                      console.log("Padecimiento registrado correctamente");
                    } else {
                      error_vali = true;
                      setError(res.data.message);
                      setShowErrorModal(true);
                      console.log("Error al registrar padecimiento");
                    }
                    respuestas.push(res.data);
                  })
                  .catch((error) => {
                    error_vali = true;
                    console.log(error);
                    // alert("Error al registrar padecimiento");
                    setError(error.response.data.message);
                    setShowErrorModal(true);
                  });

              }
            } else {
              error_vali = true;
              console.log(res.data)
              console.log("Error al registrar mascota");
              setError(res.data.message);
              setShowErrorModal(true);
            }
            respuestas.push(res.data);
          })
          .catch((error) => {
            console.log(error);
            // alert("Error al registrar mascota");
            error_vali = true;
            setError(error.response.data.message);
            setShowErrorModal(true);
          });

      }
    } catch (error) {
      console.log(error);
      error_vali = true;
      setError(error.response.data.message);
      setShowErrorModal(true);
      
      // alert("Error al registrar mascota");
    }

    if (error_vali === false) {
      setResponse("Mascotas registradas correctamente");
      setShowSuccessModal(true);
      setDirNavigate("/user-profile");
    }
  }


  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setError("");
    setResponse("");
  };
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError("");
    setResponse("");
  };

  const handleYesConfirmationModal = async (e) => {
    
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    await handleSubmit(e);
    setIsLoading(false);
    handleNoConfirmationModal();
    
  }

  const handleNoConfirmationModal = () => {
    setShowConfirmationModal(false);
  }

  const handleOpenConfirmationModal = () => {
    setShowConfirmationModal(true);
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
          <form >
            <h2>
              ¡Hola! Eres dueño de mascotas ¡Nos gustaría que la registraras!
            </h2>

            <div className="photo-container">
              <img src={profilePetImg} id="petImg" alt="Foto-Mascota" className="photo-container-img"></img>
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
                    required
                  />
                  <span className="tooltip-registro-mascota-text-xl">
                    Este campo es obligatorio. Ingresa el peso de tu mascota en kg.
                  </span>
                </div>

              </div>
            </div>


            <div className="pet-cards-container">
              {petsData.map((pet, index) => (
                <div key={index} className="pet-card">
                  <h3>{pet.nombre}</h3>
                  <p>Tipo: {pet.tipo}</p>
                  <p>Raza: {pet.raza}</p>
                  <p>Estado de salud: {pet.estado_salud}</p>
                  {pet.estado_salud === "Enfermo" || pet.estado_salud === "Recuperación" ? (
                    <p>Padecimiento: {pet.padecimiento}</p>
                  ) : null}
                  <p>Edad: {pet.edad} año(s)</p>
                  <p>Tamaño: {pet.tamano}</p>
                  <p>Peso: {pet.peso} kg</p>
                </div>
              ))

              }
            </div>

            <div className="d-flex flex-row">
              <button type="submit" onClick={handleOpenConfirmationModal} className="btn-register-pet">
                <i className="fas fa-paw"></i> ¡Crear!
              </button>
              <button type="submit" className="btn-another-pet" onClick={handleMascotas}>
                <i className="fas fa-plus"></i> Agregar mascota a la lista
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
        response="¿Estás seguro de que deseas registrar a tus mascotas?"
      />
    </>
  );
};

export default RegisterPetClient;
