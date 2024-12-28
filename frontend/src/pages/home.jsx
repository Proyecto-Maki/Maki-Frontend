import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import '../styles/home.css';
import logo from '../img/Logotipo Maki.png'; // Ruta al logo

const Home = () => {

    return (
        <>
            {/* Navbar */}
            <Navbar />

            <div className="home-container">
                <div className="backgroundHome-container">
                    <div className="home-content">
                        <div className="left-text-container">
                            ¡COMPRA <br /> LO MEJOR 
                            <div className="subheading">
                                Tenemos los mejores alimentos naturales y ecológicos en el país
                            </div>
                        </div>
                        <h1 className="right-text-container">
                            PARA TU <br /> MASCOTA!
                        </h1>

                        <div className="social-icons">
                            <a href="#" className="social-icon instagram"></a>
                            <a href="#" className="social-icon tiktok"></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;