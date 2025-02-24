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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CrearSolicitudCuidado() {
    const [FormularioCuidado, setFormularioCuidado] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);
    const [pets, setPets] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedOption, setSelectedOption] = useState("opcion1");
    const [payment, setPayment] = useState(null);
    const [selectedCareType, setSelectedCareType] = useState(null);
    const [enabledCareType, setEnabledCareType] = useState(null);

    useEffect(() => {
        // Simulación de carga de mascotas
        setPets([
            { id: 1, 
              name: "Max", 
              sexo: "M",
              tipo: "Gato",
              raza: "Mestizo",
              edad: 6,
              estado_salud: "Saludable",
              tamano: "P",
              peso: "4.00",
              direccion: "Av carrera 10 # 70 - 30 USME",
              image: "https://i.pinimg.com/736x/a5/25/a4/a525a429fecce53424bed2fc13c40b49.jpg" },
            { id: 2, 
              name: "Luna", 
              nombre: "Lucas",
              sexo: "H",
              tipo: "Gato",
              raza: "Mestizo",
              edad: 2,
              estado_salud: "Saludable",
              tamano: "P",
              peso: "3.00",
              direccion: "Calle 24 # 86 - 30 FONTIBÓN",
              image: "https://i.pinimg.com/736x/29/90/31/299031eab4b15fe4660b5904bb1df3aa.jpg" },
            
              
            ]);
    }, []);

    useEffect(() => {
      console.log("Cargando información de pago...");
      setPayment({
           precioSinIva: "$80,000", 
            iva: "19%", 
            precioConIva: "$71.400",
            cuidadoMedico: "20%",
            precioConCuidadoMedico: "$85,680",
            total: "$114,240",
    });
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

      
    // Incrementa o decrementa la cantidad
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  /*seleccionar cuidado por dias u horas*/
  const handleSelectCareType = (type) => {
    setSelectedCareType(type);
  };
  const toggleCareType = (type) => {
    setEnabledCareType((prevType) => (prevType === type ? null : type));
  };

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
                <div className={`solicitar-cuidado-dias ${enabledCareType === "horas" ? "disabled-care" : ""}`} 
  onClick={() => toggleCareType("dias")}>
                  <h2>¿Necesitas solicitar un cuidado por más de un día?</h2>
                  <div className="dates-care">
                    <div>
                      <p style={{ fontSize: "20px" }}>Fecha de inicio del cuidado</p>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()} 
                        placeholderText="Selecciona una fecha"
                        className="custom-datepicker"
                      />
                    </div>
                    <div>
                      <p style={{ fontSize: "20px" }}>Fecha de fin del cuidado</p>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        minDate={startDate || new Date()} 
                        placeholderText="Selecciona una fecha"
                        className="custom-datepicker"
                      />
                    </div>
                  </div>
                </div>
                <div className={`solicitar-cuidado-horas ${enabledCareType === "dias" ? "disabled-care" : ""}`} 
  onClick={() => toggleCareType("horas")}>
                  <h2>¿Necesitas solicitar un cuidado menor a 24 horas?</h2>
                  <div className="dates-care">
                    <div>
                      <p style={{ fontSize: "20px" }}>Fecha del cuidado</p>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()} 
                        placeholderText="Selecciona una fecha"
                        className="custom-datepicker"
                      />
                    </div>
                    <div>
                      <p style={{ fontSize: "20px" }}>Horas de cuidado</p>
                      <div className="container-hours-selector">
                        <div className="quantity-hours-selector">
                          <span onClick={handleDecrement}>-</span>
                          <span className="quantity-value">{quantity}</span>
                          <span onClick={handleIncrement}>+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-special-care">
                    <div className="container-question-special-care">
                      <h2>¿Tu mascota solicita un cuidado médico?</h2>
                      <div className="select-yes-no">
                      {["Sí", "No"].map((option, index) => (
                      <label key={index} className="radio-label">
                        <input
                          type="radio"
                          name="opciones"
                          value={option}
                          checked={selectedOption === option}
                          onChange={() => setSelectedOption(option)}
                        />
                        <span className="custom-radio">{option}</span>
                      </label>
                    ))}
                      </div>
                    </div>
                    <div className="container-text-special-care">
                      <p>Recuerda que tu tarifa final tiene un incremento del 20% por una solicitud con cuidado médico.</p>
                      <div className="container-checkbox-agree">
                        <input
                          className="terms-checkbox-care"
                          type="checkbox"
                          id="terms"
                         />
                         <a>De acuerdo</a>
                      </div>
                    </div>
                </div>
                <div className="care-description">
                  <h2>Descripción del cuidado</h2>
                  <input
                    type="text"
                    className="input-describe-pet-care"
                    placeholder="Describe las necesidades de tu mascota y tus recomendaciones de cuidado."
                  />
                </div>
                <div className="container-information">
                    <div className="resumen-pago"> 
                      <h2>Resumen de Pago</h2>
                      <div className="info-pago-1" style={{textAlign:"left", gridColumn:"1 / 2"}}>
                        <p>
                          Precio sin IVA:
                        </p>
                        <p>
                          IVA:
                        </p>
                        <p>
                          Cuidado Médico:
                        </p>
                        <p>
                          Precio con cuidado médico:
                        </p>
                        <p style={{fontSize:"24px", paddingTop:"15px"}}>
                          TOTAL:
                        </p>
                      </div>
                      
                      <div className="info-pago-2" style={{textAlign:"right", gridColumn:"2 / 2"}}> 
                        {payment ? (
                          <>
                            <p>{payment.precioSinIva}</p>
                            <p>{payment.iva}</p>
                            <p>{payment.cuidadoMedico}</p>
                            <p>{payment.precioConCuidadoMedico}</p>
                            <p style={{ fontSize: "24px", paddingTop: "37px", color:"#F4A258" }}>{payment.total}</p>
                          </>
                        ) : (
                          <p>Cargando...</p>
                        )}
                      </div>
                    </div>
                    <div className="terminos-condiciones-cuidados">
                      <p>
                      De acuerdo a los términos y condiciones de Maki, la tarifa de cuidado en MakiPaws es de mínimo un día de cuidado. Si solicitas un cuidado por un día o menos, de igual manera tu tarifa será la solicitada por un día de cuidado.
                      </p>
                      <div className="container-checkbox-agree-tandc">
                        <label htmlFor="terms" className="terms-label-tandc">
                        <input
                            className="terms-checkbox-care-tandc"
                            type="checkbox"
                            id="terms"
                          />
                          Acepto los{" "}
                          <a
                            href="/terminos-y-condiciones"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#ff7f50" }}
                          >
                            términos y condiciones
                          </a>{" "}
                          
                          de Maki
                        </label>
                      </div>
                    </div>
                </div>
                <div className="btn-create-care">
                <button type="submit"  className="btn-create-care-pet">
                  <i className="fas fa-paw"></i> ¡Crear!
                </button>
                </div>
              </form>
            </div>
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
        <Modal 
        show={showModal} 
        onHide={closeModal} 
        dialogClassName="custom-modal">
           <Modal.Header closeButton style={{backgroundColor:"#fcf3e3", border:"none"}}>
                        <Modal.Title className="title-modal-pet-care">Seleccionar Mascota</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  className="container-modal-select-pet-care">
                        {pets.map((pet) => (
                          <div className="pet-card-care">
                            <div className="pet-image-care">
                              <img
                                src={pet.image}
                                alt={pet.name}
                              />
                            </div>
                            <div className="pet-details-care-column1">
                              <h2>{pet.name}</h2>
                              <p>
                                <strong>Tipo:</strong> {pet.tipo}
                              </p>
                              <p>
                                <strong>Sexo:</strong> {pet.sexo}
                              </p>
                              <p>
                                <strong>Tamaño:</strong>{" "}
                                  {pet.tamano === "P"
                                    ? "Pequeño"
                                    : pet.tamano === "M"
                                    ? "Mediano"
                                    : "Grande"}
                              </p>
                            </div>
                            <div className="pet-details-care-column2">
                              <div className="container-button-select-pet-care">
                                <button className="button-select-pet-care-modal" onClick={() => selectPet(pet)} style={{ cursor: "pointer", marginBottom: "10px" }}> Seleccionar </button>
                              </div>
                              <p>
                                <strong>Edad:</strong> {pet.edad} año(s)
                              </p>
                              <p>
                                <strong>Peso:</strong> {pet.peso} kg
                              </p>
                              <p>
                                <strong>Dirección:</strong> {pet.direccion}
                              </p>
                              
                            </div>
                            
                          </div>
                          
                            /*<div key={pet.id} onClick={() => selectPet(pet)} style={{ cursor: "pointer", marginBottom: "10px", border:"2px solid red" }}>
                                <img src={pet.image} alt={pet.name} style={{ width: "100px" }} />
                                <p>{pet.name}</p>
                            </div>*/
                        ))}
                    </Modal.Body>
        </Modal>
    </div>
  );
}

export default CrearSolicitudCuidado;