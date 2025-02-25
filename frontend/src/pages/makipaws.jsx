import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Importa Link para navegación
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/makipaws.css";
import generateRandomAlphaNumericCode, {
  randomValue,
} from "../GenerateCardCode";
import MakipawsSlider from "../pages/makipaws_banner";
import CategoriesWithProvider from "../components/categories";
import foto_perfil_cuidador from "../img/Mari Juliano.jpg";
import item from "../img/paw-item-adoption.png";
import axios from "axios";
import LoadingPage from "../components/loading-page";

function Makipaws() {

  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const refresh = sessionStorage.getItem("refresh");
  const is_cliente = sessionStorage.getItem("is_cliente");
  const is_fundacion = sessionStorage.getItem("is_fundacion");

  if (
    !sessionStorage.getItem("email") ||
    !sessionStorage.getItem("token") ||
    !sessionStorage.getItem("refresh") ||
    !sessionStorage.getItem("is_cliente") ||
    !sessionStorage.getItem("is_fundacion")
  ) {
    window.location.href = "/iniciar-sesion";
  }

  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const [cuidadores, setCuidadores] = useState([]);

  const handleDetalleCuidador = (idCuidador) => {
    console.log("ID del cuidador:", idCuidador);
    navigate("/info-cuidador", { state: { idCuidador } });
  };

  useEffect(() => {
    api
      .get("/cuidadores/") 
      .then((response) => {
        setCuidadores(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los cuidadores:", error);
      });
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="absolute-makipaws-container">
      <div className="makipaws-container">
        <Navbar />
        <MakipawsSlider />
        <CategoriesWithProvider />
        <main className="main-content-makipaws">
          <div className="container py-5">
            <div className="row-makipaws">
              {cuidadores.map((cuidador) => (
                <div className="columns-makipaws" key={cuidador.id}>
                  <div className="card-makipaws">
                    <div className="image-cuidador">
                      <img
                        src={cuidador.imagen}
                        alt={cuidador.nombre}
                        className="card-img-top"
                        style={{
                          borderRadius: "50%",
                          marginTop: "5%",
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-name">{cuidador.nombre}</h5>
                      <div className="card-information">
                        <p className="card-ocupation">
                          <img
                            src={item}
                            alt="item"
                            className="item"
                            style={{ height: "20px", marginRight: "10px" }}
                          />
                          <strong>Ocupación: </strong>
                          {cuidador.ocupacion}
                        </p>
                        <p className="card-category">
                          <img
                            src={item}
                            alt="item"
                            className="item"
                            style={{ height: "20px", marginRight: "10px" }}
                          />
                          <strong>Categoría: </strong>
                          {cuidador.categoriaMascotas}
                        </p>
                        <p className="card-locality">
                          <img
                            src={item}
                            alt="item"
                            className="item"
                            style={{ height: "20px", marginRight: "10px" }}
                          />
                          <strong>Localidad: </strong>
                          {cuidador.localidad}
                        </p>
                        <p className="card-experience">
                          <img
                            src={item}
                            alt="item"
                            className="item"
                            style={{ height: "20px", marginRight: "10px" }}
                          />
                          <strong>Experiencia: </strong>
                          {cuidador.experiencia}
                        </p>
                      </div>
                      {/* <Link
                    
                        className="btn card-button"
                      > */}
                      <button
                        className="details-cuidador"
                        onClick={(e) => {
                          handleDetalleCuidador(cuidador.id);
                        }}
                      >
                        <span>¡Me interesa!</span>
                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                          <path d="M1,5 L11,5"></path>
                          <polyline points="8 1 12 5 8 9"></polyline>
                        </svg>
                      </button>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <div className="footer-container-makipaws">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Makipaws;
