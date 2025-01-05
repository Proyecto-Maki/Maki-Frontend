import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer"; // Importamos el Footer
import "../styles/home.css";
import perro_home from "../img/Perro_Home.png";

const Home = () => {
  return (
    <div className="absolute-home-container">
      <Navbar />
      <div className="home-container">
        <div className="dog__animation">
          <img src={perro_home} alt="perro_home" className="perro_home" />
        </div>
        <div className="home-content">
          <div className="left-text-container">
            <h2>
              ¡COMPRA <br /> LO MEJOR{" "}
            </h2>
            <p className="subheading">
              Tenemos los mejores alimentos naturales y ecológicos en el país
            </p>
          </div>
          <div className="right-text-container">
            <h2>
              PARA TU <br /> MASCOTA!
            </h2>
          </div>
        </div>
      </div>
      <Footer /> {/* Reutilizamos el Footer */}
    </div>
  );
};

export default Home;
