import Navbar from "../components/navbar";
import LoadingPage from "../components/loading-page";
import "../styles/crear-solicitud-cuidado.css";
import api from "../api";
import logo from "../img/Logotipo Maki.png";
import mascota from "../img/mascotaAdopcion1.png";
import imagenCuidador from "../img/Mari Juliano.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import ConfirmationModal from "../components/ConfirmationModal";

function CrearSolicitudCuidado() {
    const [FormularioCuidado, setFormularioCuidado] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);
    const [pets, setPets] = useState([]);

    useEffect(() => {
        // Simulación de carga de mascotas
        setPets([
            { id: 1, name: "Max", image: "https://i.pinimg.com/736x/a5/25/a4/a525a429fecce53424bed2fc13c40b49.jpg" },
            { id: 2, name: "Luna", image: "https://i.pinimg.com/736x/29/90/31/299031eab4b15fe4660b5904bb1df3aa.jpg" }
        ]);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const selectPet = (pet) => {
        setSelectedPet(pet);
        closeModal();
    };
      


     {/*useEffect(() => {
            const ejemploCuidado = {
                id: 2,
                imagen: imagenCuidador,
                titulo: "Dale una segunda oportunidad a Lucas",
                direccion: "Calle 24 # 86 - 30 FONTIBÓN",
                fecha: "2025-01-14T03:22:29.365763Z", 
                imagen: imagenCuidador,
                nombre: "Julián",
                ocupacion: "Cuidador de masotas",
                localidad: "Chapinero",
                categoria_mascota: "Conejos",
                experiencia: "Julián es un técnico enfocado en el cuidado de lagartos. Contó con experiencia trabajando en zoológicos y santuarios de animales en cuidado. ",
                detalle_cuidador: {
                    id: 1,
                    cedula: "10101010",
                    telefono: "3123948710",
                    correo: "juli2390@gmail.com",
                    fecha_nacimiento: "12/05/1993",
                    localidad:"Kennedy",
                    codigoPostal: "109237",
                    direccion:"cra 12c #145-687"
                }
            };
    
            setFormularioCuidado([ejemploCuidado]);
        }, []);*/}

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
    <div className="absolute-container-create-care">
      {/* Navbar */}
      <Navbar />
      <div className="total-container-create-care">
        <div className="background-container-create-care">
          <div className="logo-container">
            <img
              src={logo}
              alt="Logo Maki"
              className="logo-img"
              style={{ height: "100px" }}
            />
          </div>
            <div className="create-care">
              <form className="form-create-care">
                <div className="photo-container">
                  <img
                    src={imagenCuidador}
                    alt="Mascota"
                    className="photo-container-img"
                  />
                </div>
                <h2 className="name-cuidador">Julián</h2>
                <div className="select-pet">
                    <h2>Mascota a Cuidar</h2>
                    <p>
                    Selecciona la mascota por la que solicitas el servicio de MakiPaws
                    </p>
                    <button type="button" className="button-select-pet" onClick={openModal}>Seleccionar mascota</button>
                </div>
                {selectedPet ? (
                                    <div className="pet-image-selected-care">
                                        <img src={selectedPet.image} alt={selectedPet.name} style={{ width: "163px", height:"162px", borderRadius:"50%" }} />
                                        <p style={{fontSize:"40px", color:"#F4A258"}}>{selectedPet.name}</p>
                                    </div>
                                ) : (
                                    <p style={{fontSize:"15px", color:"#F4A258"}}>No has seleccionado ninguna mascota</p>
                                )}
              </form>
            </div>
              
          {/*<div className="container-btn-adopt-pet">
            <button type="submit" className="btn-adopt-pet" onClick={handleOpenConfirmationModal}>
              <i className="fas fa-paw"></i> ¡Adoptar!
            </button>
          </div>*/}
        </div>
      </div>
      {/*<SuccessModal
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
        response={`¿Estás seguro enviar esta solicitud de adopción para ${mascota.nombre}?`}
      />*/}
        <Modal show={showModal} onHide={closeModal} dialogClassName="custom-modal">
           <Modal.Header closeButton style={{backgroundColor:"#fcf3e3", border:"none"}}>
                        <Modal.Title className="title-modal-pet-care">Seleccionar Mascota</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  className="container-modal-select-pet-care">
                        {pets.map((pet) => (
                            <div key={pet.id} onClick={() => selectPet(pet)} style={{ cursor: "pointer", marginBottom: "10px" }}>
                                <img src={pet.image} alt={pet.name} style={{ width: "100px" }} />
                                <p>{pet.name}</p>
                            </div>
                        ))}
                    </Modal.Body>
        </Modal>
    </div>
  );
}

export default CrearSolicitudCuidado;