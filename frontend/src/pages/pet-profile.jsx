import Navbar from "../components/navbar"; // Navbar personalizado
import "../styles/pet-profile.css"; // Importa el archivo CSS
import logo from "../img/Logotipo Maki.png"; // Ruta al logo
import LoadingPage from "../components/loading-page";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import ErrorModal from '../components/ErrorModal';
import ConfirmationModal from "../components/ConfirmationModal";
import SuccessModalReload from "../components/SuccessModalReload";
import PetUpdate from "../components/forms/pet-update";

function PetProfile() {
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

  const [mascotasUser, setMascotasUser] = useState([]);
  const [mascotaUser, setMascotaUser] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState("");
  const [isEditarOpen, setIsEditarOpen] = useState(false);
  const [mascotaIdEliminar, setMascotaIdEliminar] = useState(0);
  const navigate = useNavigate();

  if (!sessionStorage.getItem('token') && !sessionStorage.getItem('email') && !sessionStorage.getItem('refresh')) {
    navigate('/login');
  }

  const email = sessionStorage.getItem('email');
  const token = sessionStorage.getItem('token');
  const refresh = sessionStorage.getItem('refresh');
  let es_cliente = sessionStorage.getItem('is_cliente');
  let es_fundacion = sessionStorage.getItem('is_fundacion');
  let crear_mascota_url = '/register-pet';

  // MIRA SI EL USUARIO ES CLIENTE O FUNDACION
  // useEffect(() => {
  //   api
  //     .get(`current-user/`, {
  //       headers: {
  //         'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         console.log(res.data);
  //         if (res.data.is_cliente) {
  //           es_cliente = true;
  //           crear_mascota_url = '/register-pet-client';
  //           console.log(crear_mascota_url);
  //         } else {
  //           es_fundacion = true;
  //           crear_mascota_url = '/register-pet-foundation';
  //           console.log(crear_mascota_url);
  //         }
  //       } else {
  //         console.log(res.data.message);
  //         setError(res.data.message);
  //         setShowErrorModal(true);
  //       }

  //     })
  //     .catch((error) => {
  //       console.error(error.response ? error.response.data : error.message);
  //       setError(error.response.data.detail);
  //       setShowErrorModal(true);
  //     });
  // }, []);

  // TRAIDA DE MASCOTAS DEL USUARIO

  useEffect(() => {
    api.get(`mascotas/${email}/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setMascotasUser(response.data);
        } else {
          console.log(response.data.message);
          setError(response.data.message);
          setShowErrorModal(true);
        }
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error.message);
        setError(error.response.data.detail);
        setShowErrorModal(true);
      });
  }, []);

  const handleAnadirMascota = () => {
    console.log(crear_mascota_url);
    navigate(crear_mascota_url);
  }

  // Función para eliminar una mascota
  const eliminarMascota = async (e) => {
    // setMascotas(mascotas.filter((mascota) => mascota.id !== id));
    if (mascotaIdEliminar === 0) {
      return;
    }
    try {
      api
        .delete(`mascotas/delete/${mascotaIdEliminar}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((res) => {
          if(res.status === 204) {
            setResponse("Mascota eliminada exitosamente");
            setShowSuccessModal(true);
          } else {
            setError(res.data.message);
            setShowErrorModal(true);
          }
        })
        .catch((error) => {
          console.error(error.response ? error.response.data : error.message);
          setError(error.response.data.detail);
          setShowErrorModal(true);
        })
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setError(error.response.data.detail);
      setShowErrorModal(true);
    }
  };

  const handleOpenConfirmationModal = (e, mascotaId) => {
    e.preventDefault();
    setShowConfirmationModal(true);
    setMascotaIdEliminar(mascotaId);
    console.log("Se abrió el modal de confirmación", mascotaId);
  }


  const handleYesConfirmationModal = async (e) => {
    setShowConfirmationModal(false);
    e.preventDefault();
    await new Promise(r => setTimeout(r, 2000));
    await eliminarMascota(e);

  }

  const handleNoConfirmationModal = () => {
    setShowConfirmationModal(false);
    setMascotaIdEliminar(0);
  }

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError('');
  };

  const abrirEditar = async (mascota) => {
    let mascotaData = mascota;
    if (mascotaData.estado_salud === "Enfermo" || mascotaData.estado_salud === "Recuperación") {
      try {
        const res = await api.get(`padecimientos/mascota/${mascotaData.id}/`, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          }
        });

        if (res.status === 200) {
          mascotaData.padecimiento = res.data.padecimiento;
          console.log("El padecimiento es ", mascotaData.padecimiento);
        } else {
          setError(res.data.message);
          setShowErrorModal(true);
          return;
        }
      } catch (error) {
        console.log(error);
        setError(error);
        setShowErrorModal(true);
        return;
      }
    }

    setMascotaUser(mascotaData);
    setIsEditarOpen(true);
  };

  const cerrarEditar = () => {
    setIsEditarOpen(false);
  };

const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setError("");
    setResponse("");
};


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

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
              <button className="button-add-pet-foundation" type="button" onClick={handleAnadirMascota}>
                <span class="button__text">Añadir</span>
                <span class="button__icon"><svg class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
              </button>
            </div>
          </div>

          {mascotasUser.length === 0 ? (
            <div>
              <h2>No tienes mascotas registradas</h2>
            </div>
          ) : (
            <div className="card-container">
              {mascotasUser.map((mascota) => (
                <div key={mascota.id} className="card-content">
                  <img
                    src={mascota.imagen}
                    alt={mascota.nombre}
                    className="card-image"
                  />
                  <div key={mascota.id} className="card-text">
                    <h3>{mascota.nombre}</h3>
                    <p>
                      <strong>Sexo:</strong> {mascota.sexo === 'M' ? 'Macho' : 'Hembra'}
                    </p>
                    <p >
                      <strong>Tipo:</strong> {mascota.tipo}
                    </p>
                    <p>
                      <strong>Edad:</strong> {mascota.edad} año(s)
                    </p>
                    <p>
                      <strong>Tamaño:</strong> {mascota.tamano === 'P' ? 'Pequeño' : mascota.tamano === 'M' ? 'Mediano' : 'Grande'}
                    </p>
                    <p>
                      <strong>Peso:</strong> {mascota.peso} kg
                    </p>
                    <p>
                      <strong>Raza:</strong> {mascota.raza}
                    </p>
                  </div>

                  <div className="actions">
                    <button onClick={() => abrirEditar(mascota)}>
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button onClick={(e) => handleOpenConfirmationModal(e, mascota.id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
          }


          {/* Contenedor principal de tarjetas */}

        </div>
      </div>
      {isEditarOpen && (
        <div className="modal-editar-mascota">
          <div className="modal-editar-mascota-content">
            <span className="close" onClick={cerrarEditar}>&times;</span>
            <PetUpdate
              isEditarOpen={isEditarOpen}
              cerrarEditar={cerrarEditar}
              mascotaUser={mascotaUser}
            />
          </div>
        </div>
      )}
      <ErrorModal
        show={showErrorModal}
        handleClose={handleCloseErrorModal}
        error={error}
      />
      <SuccessModalReload
        show={showSuccessModal}
        handleClose={handleCloseSuccessModal}
        response={response}
      />
      <ConfirmationModal
        show={showConfirmationModal}
        handleYes={handleYesConfirmationModal}
        handleNo={handleNoConfirmationModal}
        response="¿Estás seguro de que deseas eliminar a la mascota?"
      />
    </div>
  );
};


export default PetProfile;
