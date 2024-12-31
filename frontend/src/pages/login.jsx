import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import '../styles/login.css';
import logo from '../img/Logotipo Maki.png'; // Ruta al logo
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';
import api from '../api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState('');
    const [dirNavigate, setDirNavigate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        api
            .post('login/', { email, password })
            .then((response) => {
                if (response.status === 200) {
                    console.log('Login successful:', response.data);
                    setResponse(response.data.message);
                    setDirNavigate('/home'); // Redirige a la página de dashboard o la que corresponda
                    setShowSuccessModal(true);
                } else {
                    console.log('Error en el login');
                    console.log(response.data.message);
                    setResponse(response.data.message);
                    setShowErrorModal(true);
                }
            })
            .catch((error) => {
                console.error(error.response ? error.response.data : error.message);
                // console.log(error.response.data.message);
                console.log(error.response.data.detail);
                //setError(error.response.data.message);
                setError(error.response.data.detail);
                setShowErrorModal(true);
            });
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        setError('');
        setResponse('');
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        setError('');
        setResponse('');
    };

    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Login Page */}
            <div className="background-container">
                <div className="login-container">
                    <div className="login-content">
                        <img
                            src={logo}
                            alt="Logo Maki"
                            className="logo-img"
                            style={{ height: "100px", marginRight: "15px" }}
                        />
                        <h2 className="welcome-text">¡BIENVENIDO!</h2>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="tooltip-login">
                                    <input
                                        type="email"
                                        className="form-control custom-input"
                                        placeholder="Dirección de correo"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <span className="tooltip-registro-text">Ingresa tu correo electrónico</span>
                                </div>
                            </div>
                            <div className="form-group position-relative">
                                <div className="tooltip-registro">
                                    <input
                                        type="password"
                                        className="form-control custom-input"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span className="tooltip-registro-text">Ingresa tu contraseña</span>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success login-btn">
                                Ingresa
                            </button>
                            <p className="forgot-password-text">
                                <a href="/reset-password">Olvidé mi contraseña</a>
                            </p>
                            <p className="signup-text">
                                ¿No tienes una cuenta aún? <a href="/register">Únete</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <SuccessModal show={showSuccessModal} handleClose={handleCloseSuccessModal} response={response} dirNavigate={dirNavigate} />
            <ErrorModal show={showErrorModal} handleClose={handleCloseErrorModal} error={error} />
        </>
    );
};

export default Login;
