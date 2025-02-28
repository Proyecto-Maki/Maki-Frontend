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
  const [mascotasUser, setMascotasUser] = useState([]);
  const [pets, setPets] = useState([]); // Asegura que 'pets' esté definido

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState("opcion1");
  const [payment, setPayment] = useState({
    precioSinIva: 0,
    iva: 0,
    precioConIva: 0,
    cuidadoMedico: 0,
    precioConCuidadoMedico: 0,
    total: 0,
  });
  const [selectedCareType, setSelectedCareType] = useState(null);
  const [enabledCareType, setEnabledCareType] = useState(null);
  const [showHourSelection, setShowHourSelection] = useState(false);
  const location = useLocation();
  const cuidador = location.state?.cuidador || null;
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isMedicalCareChecked, setIsMedicalCareChecked] = useState(false);

  useEffect(() => {
    calcularPrecioTotal();
  }, [startDate, endDate, selectedOption]);

  useEffect(() => {
    if (startDate && !endDate) {
      setEndDate(startDate);
    }
  }, [startDate]);

  // 🔹 Si `endDate` no está seleccionado, asignarlo igual a `startDate`
  useEffect(() => {
    if (startDate && !endDate) {
      setEndDate(startDate);
    }
  }, [startDate]);

  // 🔹 Verificar si la diferencia entre `startDate` y `endDate` es 1 día o menos
  useEffect(() => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      console.log(`📅 Diferencia de días: ${diffDays}`);

      if (diffDays <= 1) {
        setSelectedCareType("horas"); // 🔹 Habilitar selección de horas
      } else {
        setSelectedCareType("dias"); // 🔹 Mantener en modo "días"
      }
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate && startDate.getTime() === endDate.getTime()) {
      setShowHourSelection(true);
    } else {
      setShowHourSelection(false);
    }
  }, [startDate, endDate]);

  const calcularPrecioTotal = () => {
    console.log("📌 Calculando precio total...");

    if (!startDate) {
      console.log("⚠️ Faltan fechas para calcular el precio");
      return;
    }

    // Si endDate es null, asumir que es igual a startDate
    const finalEndDate = endDate || startDate;

    const tarifaDiaria = 40000;
    const ivaPorcentaje = 0.19;
    const cuidadoMedicoExtra = selectedOption === "Sí" ? 0.2 : 0;

    // Calcular número de días (mínimo 1 día)
    const diffTime = Math.abs(finalEndDate - startDate);
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    console.log(`📅 Días de cuidado: ${diffDays}`);

    // Precio sin IVA
    let precioSinIva = tarifaDiaria * diffDays;

    // Incremento por cuidado médico
    let incrementoCuidadoMedico = precioSinIva * cuidadoMedicoExtra;

    // Precio con incremento por cuidado médico
    let precioConCuidadoMedico = precioSinIva + incrementoCuidadoMedico;

    // IVA
    let iva = precioConCuidadoMedico * ivaPorcentaje;

    // Precio final con IVA
    let total = precioConCuidadoMedico + iva;

    console.log("💰 Precio sin IVA:", precioSinIva);
    console.log("➕ Incremento por Cuidado Médico:", incrementoCuidadoMedico);
    console.log("🧾 IVA (19%):", iva);
    console.log("💵 Total a pagar:", total);

    // Actualizar estado con los valores calculados
    setPayment({
      precioSinIva,
      iva,
      precioConIva: precioSinIva + iva,
      cuidadoMedico: incrementoCuidadoMedico,
      precioConCuidadoMedico,
      total,
    });
  };

  // 🔹 Si el usuario solo selecciona la fecha de inicio, endDate se asigna automáticamente
  useEffect(() => {
    if (startDate && !endDate) {
      setEndDate(startDate);
    }
  }, [startDate]);

  // useEffect(() => {
  //   // Simulación de carga de mascotas
  //   setPets([
  //     {
  //       id: 1,
  //       name: "Max",
  //       sexo: "M",
  //       tipo: "Gato",
  //       raza: "Mestizo",
  //       edad: 6,
  //       estado_salud: "Saludable",
  //       tamano: "P",
  //       peso: "4.00",
  //       direccion: "Av carrera 10 # 70 - 30 USME",
  //       image:
  //         "https://i.pinimg.com/736x/a5/25/a4/a525a429fecce53424bed2fc13c40b49.jpg",
  //     },
  //     {
  //       id: 2,
  //       name: "Luna",
  //       nombre: "Lucas",
  //       sexo: "H",
  //       tipo: "Gato",
  //       raza: "Mestizo",
  //       edad: 2,
  //       estado_salud: "Saludable",
  //       tamano: "P",
  //       peso: "3.00",
  //       direccion: "Calle 24 # 86 - 30 FONTIBÓN",
  //       image:
  //         "https://i.pinimg.com/736x/29/90/31/299031eab4b15fe4660b5904bb1df3aa.jpg",
  //     },
  //   ]);
  // }, []);
  useEffect(() => {
    const fetchPets = async () => {
      const email = sessionStorage.getItem("email");
      const token = sessionStorage.getItem("token");

      if (!email || !token) {
        console.error("No hay usuario autenticado.");
        setError("Usuario no autenticado.");
        setShowErrorModal(true);
        return;
      }

      try {
        const response = await api.get(`/mascotas/${email}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200 && response.data.length > 0) {
          console.log("Mascotas recibidas en el frontend:", response.data); // 📌 Depuración
          setPets(response.data);
        } else {
          console.warn("No hay mascotas registradas.");
          setPets([]);
        }
      } catch (err) {
        console.error(
          "Error al obtener las mascotas:",
          err.response?.data || err.message
        );
        setError(
          err.response?.data?.detail || "No se pudieron cargar las mascotas."
        );
        setShowErrorModal(true);
      }
    };

    fetchPets();
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
  const handleIncrement = () =>
    setQuantity((prev) => (prev < 24 ? prev + 1 : prev));
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  /*seleccionar cuidado por dias u horas*/
  const handleSelectCareType = (type) => {
    setSelectedCareType(type);
  };
  const toggleCareType = (type) => {
    setEnabledCareType((prevType) => (prevType === type ? null : type));
  };

  const handleTermsChange = (e) => {
    setIsTermsChecked(e.target.checked);
  };

  const handleMedicalCareChange = (e) => {
    setIsMedicalCareChecked(e.target.checked);
  };

  const isCreateButtonEnabled = () => {
    if (selectedOption === "Sí") {
      return isTermsChecked && isMedicalCareChecked;
    }
    return isTermsChecked;
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

  const handlePayment = async () => {
    if (!selectedPet || !startDate || !payment.total) {
      alert("Faltan datos obligatorios para el pago.");
      return;
    }

    try {
      const email = sessionStorage.getItem("email");
      const token = sessionStorage.getItem("token");

      if (!email || !token) {
        alert("Debes iniciar sesión para realizar un pago.");
        return;
      }

      const response = await fetch(
        "https://backend.makishop.live/api/mercadopago/create_preference_cuidado/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: sessionStorage.getItem("user_id"),
            mascota_id: selectedPet.id,
            cuidador_id: cuidador.id,
            total: payment.total,
            email: email,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.init_point; // Redirigir a Mercado Pago
      } else {
        console.error("Error al crear la preferencia:", data.error);
        alert("Error al iniciar el pago.");
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      alert("Error inesperado al iniciar el pago.");
    }
  };

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
            <form
              className="form-create-care"
              onSubmit={(e) => {
                e.preventDefault(); // 🚀 Evita el comportamiento por defecto del formulario
                handlePayment();
              }}
            >
              <div className="photo-container">
                {cuidador ? (
                  <>
                    <img
                      src={cuidador.imagen}
                      alt={cuidador.nombre}
                      className="photo-container-img"
                    />
                    <h2 className="name-cuidador">{cuidador.nombre}</h2>
                  </>
                ) : (
                  <>
                    <img
                      src={imagenCuidador}
                      alt="Mascota"
                      className="photo-container-img"
                    />
                    <h2 className="name-cuidador">Nombre no disponible</h2>
                  </>
                )}
              </div>
              <h2 className="name-cuidador"></h2>
              <div className="select-pet">
                <h2>Mascota a Cuidar</h2>
                <p>
                  Selecciona la mascota por la que solicitas el servicio de
                  MakiPaws
                </p>
                <button
                  type="button"
                  className="button-select-pet"
                  onClick={openModal}
                >
                  Seleccionar mascota
                </button>
              </div>
              {selectedPet ? (
                <div className="pet-image-selected-care">
                  <img
                    src={selectedPet.imagen}
                    alt={selectedPet.name}
                    style={{
                      width: "163px",
                      height: "162px",
                      borderRadius: "50%",
                    }}
                  />
                  <p style={{ fontSize: "40px", color: "#F4A258" }}>
                    {selectedPet.name}
                  </p>
                </div>
              ) : (
                <p style={{ fontSize: "15px", color: "#F4A258" }}>
                  No has seleccionado ninguna mascota
                </p>
              )}
              <div
                className={`solicitar-cuidado-dias ${
                  enabledCareType === "horas" ? "disabled-care" : ""
                }`}
                onClick={() => toggleCareType("dias")}
              >
                <h2>¿Necesitas solicitar un cuidado por más de un día?</h2>
                <div className="dates-care">
                  <div>
                    <p style={{ fontSize: "20px" }}>
                      Fecha de inicio del cuidado
                    </p>
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
              {showHourSelection && (
                <div className="solicitar-cuidado-horas">
                  <h2>¿Necesitas solicitar un cuidado menor a 24 horas?</h2>
                  <div className="dates-care">
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
              )}
              <div className="container-special-care">
                <div className="container-question-special-care">
                  <h2>¿Tu mascota solicita un cuidado médico?</h2>
                  <div className="select-yes-no">
                    {["Sí", "No"].map((option, index) => (
                      <label key={index} className="radio-label">
                        <input
                          type="radio"
                          name="cuidadoMedico"
                          value={option}
                          checked={selectedOption === option}
                          onChange={() => setSelectedOption(option)}
                        />
                        <span className="custom-radio">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {selectedOption === "Sí" && (
                  <div className="container-text-special-care">
                    <p>
                      Recuerda que tu tarifa final tiene un incremento del 20%
                      por una solicitud con cuidado médico.
                    </p>
                    <div className="container-checkbox-agree">
                      <input
                        className="terms-checkbox-care"
                        type="checkbox"
                        id="medicalCare"
                        checked={isMedicalCareChecked}
                        onChange={handleMedicalCareChange}
                      />
                      <label htmlFor="medicalCare">De acuerdo</label>
                    </div>
                  </div>
                )}
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
                  <div
                    className="info-pago-1"
                    style={{ textAlign: "left", gridColumn: "1 / 2" }}
                  >
                    <p>Precio sin IVA:</p>
                    <p>Cuidado Médico:</p>
                    <p>IVA (19%)</p>
                    {/* <p>Precio con cuidado médico:</p> */}
                    <p style={{ fontSize: "24px", paddingTop: "15px" }}>
                      TOTAL:{" "}
                      <strong>${payment.total.toLocaleString()} COP</strong>
                    </p>
                  </div>

                  <div
                    className="info-pago-2"
                    style={{ textAlign: "right", gridColumn: "2 / 2" }}
                  >
                    {payment ? (
                      <>
                        <p>{payment.precioSinIva}</p>
                        <p>{payment.cuidadoMedico}</p>
                        <p>{payment.iva}</p>
                        {/* <p>{payment.precioConCuidadoMedico}</p> */}
                        <p
                          style={{
                            fontSize: "24px",
                            paddingTop: "37px",
                            color: "#F4A258",
                          }}
                        >
                          {payment.total}
                        </p>
                      </>
                    ) : (
                      <p>Cargando...</p>
                    )}
                  </div>
                </div>
                <div className="terminos-condiciones-cuidados">
                  <p>
                    De acuerdo a los términos y condiciones de Maki, la tarifa
                    de cuidado en MakiPaws es de mínimo un día de cuidado. Si
                    solicitas un cuidado por un día o menos, de igual manera tu
                    tarifa será la solicitada por un día de cuidado.
                  </p>
                  <div className="container-checkbox-agree-tandc">
                    <label htmlFor="terms" className="terms-label-tandc">
                      <input
                        className="terms-checkbox-care-tandc"
                        type="checkbox"
                        id="terms"
                        checked={isTermsChecked}
                        onChange={handleTermsChange}
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
                <button
                  // type="submit"
                  className="btn-create-care-pet"
                  onClick={handlePayment}
                  disabled={!isCreateButtonEnabled()}
                >
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
        dialogClassName="custom-modal"
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#fcf3e3", border: "none" }}
        >
          <Modal.Title className="title-modal-pet-care">
            Seleccionar Mascota
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="container-modal-select-pet-care">
          {pets.map((pet) => (
            <div className="pet-card-care">
              <div className="pet-image-care">
                <img src={pet.imagen} alt={pet.name} width={"100px"} />
              </div>
              <div className="pet-details-care-column1">
                <h2>{pet.nombre}</h2>
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
                  <button
                    className="button-select-pet-care-modal"
                    onClick={() => selectPet(pet)}
                    style={{ cursor: "pointer", marginBottom: "10px" }}
                  >
                    {" "}
                    Seleccionar{" "}
                  </button>
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
