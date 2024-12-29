import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import '../styles/confirmation-register.css';
import logo from '../img/Logotipo Maki.png'; // Ruta al logo

const ConfirmationRegister = () => {
    return (
        <>
            {/* Navbar */}
            <Navbar />
            <div className="background-register">
                <div className="confirmation_register-container">
                    <div className="logo-register">
                        <img src={logo} alt="logo" className="logo" style={{ height: "100px", marginRight: "10px" }}/>
                    </div>
                    <h1 className="description-code" >Confirma tu correo electrónico</h1>
                    <div className="confirmation_register-form">
                        <h2>
                            Inserta el código que enviamos a tu correo electrónico
                        </h2>
                            <div className="tooltip-code">
                                <input
                                    className="input-field"
                                    type="text"
                                    name="codigo"
                                    placeholder="Código de confirmación"
                                />  
                            </div>
                        <button type="submit" className="submit-button">Registrar!</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ConfirmationRegister;