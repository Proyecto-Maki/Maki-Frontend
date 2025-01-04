import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar";
import "../styles/home.css";
import perro_home from "../img/Perro_Home.png";
import instagram from "../img/instagram.png";
import tiktok from "../img/tiktok.png";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import logo from "../img/Logotipo Maki.png";
import { Parallax, ParallaxLayer } from "@react-spring/parallax"


const Home = () => {
    const location = useLocation(); // Obtenemos la ubicación actual de la ruta

    // Comprobamos si estamos en la página de Login
    const isLoginPage = location.pathname === "/login";

    // Comprobamos si estamos en la página de perfil de usuario
    const isUserProfilePage = location.pathname === "/user-profile";

    // Aquí podrías agregar la URL de la foto de perfil o pasarla como prop
    const userProfileImage = "../src/img/catPfp.jpeg";

    return (
        <div className="absolute-home-container">
            {/* Navbar */}
            <Navbar />
            <Parallax pages={2}  className="animation-container">
                <ParallaxLayer offset={0} speed={1.8}>
                    <div className="home-container">
                        <div className="dog__animation" id="backgroun-dog">
                            <img src={perro_home} alt="perro_home" className="perro_home" />
                        </div>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.8}>
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
                                    <a href="#" className="social-icon tiktok"  class="social-icon">
                                        <img src={tiktok} alt="tiktok" className="tiktok" />
                                    </a>
                                </div>
                            </div>

                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={1}>
                    <div className="footer-container-home">
                        <div className="divider-footer-home">
                            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                                <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                                <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                            </svg>
                            <div className="footer-logo-home">
                                <img
                                src={logo}
                                alt="Logo Maki"
                                className="logo-img"
                                style={{ height: "80px", marginRight: "15px" }}
                                />
                            </div>
                            <div className="footer-nav-home">
                                <ul>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/servicios">Servicios</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/productos">Productos</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/makipaws">MakiPaws</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/acerca">Acerca de Maki</a>
                                    </li>
                                </ul>
                            </div>
                            <hr className="footer-divider-home" /> {/*linea divisoria*/}
                            <div className="footer-contact-home">
                                <div className="footer-social-home">
                                    <a href="#" className="social-icon-footer-home instagram" class="social-icon">
                                        <img src={instagram} alt="instagram" className="instagram" />
                                    </a>
                                    <a href="#" className="social-icon-footer-home tiktok"  class="social-icon">
                                        <img src={tiktok} alt="tiktok" className="tiktok" />
                                    </a>
                                </div>
                                <p className="email-footer-home">makishop@gmail.com</p>
                                <p className="copyright-footer-home">© 2024 Maki. All rights reserved</p>
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>
            </Parallax>
        </div>

    );
};

export default Home;
