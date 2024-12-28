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
                <div className="home-content">
                    
                </div>
            </div>
        </>
    );
};

export default Home;