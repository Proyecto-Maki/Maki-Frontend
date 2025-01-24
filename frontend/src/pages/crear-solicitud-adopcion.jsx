import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import LoadingPage from "../components/loading-page";
import "../styles/crear-solicitud-adopcion.css";
import api from "../api";
import logo from "../img/Logotipo Maki.png";
import mascota from "../img/mascotaAdopcion1.png";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

function CrearSolicitudAdopcion() {
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  

  useEffect(() => {
    const fetchPets = async () => {
      const fakeData = [
        {
          id: 1,
          name: "Roberto",
        },
        {
          id: 2,
          name: "Mia",
        },
      ];
      setPets(fakeData);
    };
    fetchPets();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }
  const selectedPet = pets.length > 0 ? pets[0] : null;

 
  return (
    <div className="absolute-container-create-adoption">
      {/* Navbar */}
      <Navbar />
        <div className="total-container-create-adoption">
            <div className="background-container-create-adoption">
                <div className="logo-container">
                <img
                    src={logo}
                    alt="Logo Maki"
                    className="logo-img"
                    style={{ height: "100px" }}
                />
                </div>
                {selectedPet ? (
                    <div className="create-adoption">
                        <form className="form-create-adoption">
                            <div className="photo-container">
                            <img
                                src={mascota}
                                alt="Mascota"
                                className="pet-img"
                                style={{ height: "100px" }}
                            />
                            </div>
                            <h2 className="name-pet">{selectedPet.name}</h2>
                            <p className="text-create-adoption">
                            Nos alegra que hayas decidido adoptar a {selectedPet.name}. Por
                            favor cuéntanos el motivo de tu adopción:
                            </p>
                            <div className="input-container">
                            <div className="tooltip-create-adoption">
                                <input
                                type="text"
                                className="input-reason-adoption"
                                placeholder="Cuéntanos porqué decidiste adoptar"
                                name="reason"
                                required
                                />
                                <span className="tooltip-create-adoption-message">
                                Este campo es obligatorio. Ingresa el motivo de adopción.
                                </span>
                            </div>
                            </div>
                            <div className="form-group-normativas" style={{ marginBottom: "10px" }}>
                              <input
                                  className="terms-checkbox-normativas"
                                  type="checkbox"
                                  id="terms"
                              />
                            </div>
                                <label htmlFor="terms" className="normativas-label">
                                  Acepto y estoy de acuerdo con las{" "}
                                  <a
                                    href="/normativas" /*hay que creear esa vista, yo la hago*/
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#ff7f50" }}
                                  >
                                    normativas
                                  </a>{" "}
                                  de Maki
                                </label>
                              
                        </form>
                    </div>
                ) : (
                    <p>No hay mascotas disponibles para adoptar.</p>
                )}
                <div className="container-btn-adopt-pet">
                    <button type="submit" className="btn-adopt-pet">
                    <i className="fas fa-paw"></i> Adoptar!
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default CrearSolicitudAdopcion;