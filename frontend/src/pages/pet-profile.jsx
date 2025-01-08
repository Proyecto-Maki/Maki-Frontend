import Navbar from "../components/navbar"; // Navbar personalizado
import "../styles/pet-profile.css"; // Importa el archivo CSS
import logo from "../img/Logotipo Maki.png"; // Ruta al logo
import LoadingPage from "../components/loading-page";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import ErrorModal from '../components/ErrorModal';
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
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState('');
  const [isEditarOpen, setIsEditarOpen] = useState(false);
  const navigate = useNavigate();

  if (!sessionStorage.getItem('token') && !sessionStorage.getItem('email') && !sessionStorage.getItem('refresh')) {
    navigate('/login');
  }

  const email = sessionStorage.getItem('email');
  const token = sessionStorage.getItem('token');
  const refresh = sessionStorage.getItem('refresh');
  let es_cliente = sessionStorage.getItem('is_cliente');
  let es_fundacion = sessionStorage.getItem('is_fundacion');
  let crear_mascota_url = es_cliente ? '/register-pet-client' : '/register-pet-foundation';

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
  const eliminarMascota = (id) => {
    setMascotas(mascotas.filter((mascota) => mascota.id !== id));
  };



  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError('');
  };

  const abrirEditar = (mascota) => {
    setMascotaUser(mascota);
    setIsEditarOpen(true);
  };

  const cerrarEditar = () => {
    setIsEditarOpen(false);
  };


  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (isLoading) {
  //   return <LoadingPage />;
  // }

  return (
    <>
      {/* Navbar */}
      <Navbar />
      <div className="container-pet-foundation">
        <div className="content-pet-foundation">
          <div className="content-pet-foundation-header">
            <h2>Mascotas</h2>
            <div className="button-container-foundation">
              <button className="button-add-pet-foundation" onClick={handleAnadirMascota} type="button">
                <span className="button__text">Añadir</span>
                <span className="button__icon"><svg className="svg" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
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
                    <button onClick={() => eliminarMascota(mascota.id)}>
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
              mascotasUser={mascotaUser}
            />
          </div>
        </div>
      )}
      <ErrorModal show={showErrorModal} handleClose={handleCloseErrorModal} error={error} />
    </>
  );
}


export default PetProfile;
