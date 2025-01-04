import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import "../styles/home.css";
import logo from "../img/Logotipo Maki.png"; // Ruta al logo
import perro_home from "../img/Perro_Home.png";
import instagram from "../img/instagram.png";
import tiktok from "../img/tiktok.png";

const Home = () => {
  return (
    <>
      {/* Navbar */}
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

          <div className="icon-container">
            <a href="#" className="social-icon instagram" class="social-icon">
              <img src={instagram} alt="instagram" className="instagram" />
            </a>
            <a href="#" className="social-icon tiktok" class="social-icon">
              <img src={tiktok} alt="tiktok" className="tiktok" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
