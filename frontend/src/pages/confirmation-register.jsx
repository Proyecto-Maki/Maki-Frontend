import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import '../styles/confirmation-register.css';
import logo from '../img/Logotipo Maki.png'; // Ruta al logo
import api from "../api";

import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';

const ConfirmationRegister = () => {

    const [otp, setOtp] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [dirNavigate, setDirNavigate] = useState('');


    const handleCloseSuccessModal = () => {
		setShowSuccessModal(false)
		setError("");
		setResponse("");
	};
    const handleCloseErrorModal = () => {
            setShowErrorModal(false)
            setError("");
            setResponse("");
        };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const data = {
            otp: otp
        }

        api
            .post('/verify-email/', data)
            .then((res) => {
                if (res.status === 200) {
                    setResponse(res.data.message);
                    setDirNavigate("/login");
                    setShowSuccessModal(true);
                } else {
                    setError(res.data.message);
                    setShowErrorModal(true);
                }
            })
            .catch((error) => {
                setError(error.response.data.message);
                setShowErrorModal(true);
            });
    }


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
                                    value={otp} onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Código de confirmación"
                                />  
                            </div>
                        <button type="submit" className="submit-button" onClick={handleSubmit}>Registrar!</button>
                    </div>
                </div>
            </div>
            <SuccessModal show={showSuccessModal} handleClose={handleCloseSuccessModal} response={response} dirNavigate={dirNavigate} />
            <ErrorModal show={showErrorModal} handleClose={handleCloseErrorModal} error={error} />
        </>
    );
}
export default ConfirmationRegister;