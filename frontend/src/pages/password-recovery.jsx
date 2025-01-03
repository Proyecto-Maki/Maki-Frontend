import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import '../styles/password-recovery.css';
import logo from '../img/Logotipo Maki.png'; // Ruta al logo
import api from "../api";
import { useNavigate, useParams } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';

const PasswordRecovery = () => {

    const { uidb64, token } = useParams();
    const [newPasswords, setNewPasswords] = useState({
        password: '',
        password2: ''
    });
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [dirNavigate, setDirNavigate] = useState('');


    const validatePassword = (password, password2) => {
        let message = "";
        if (password !== password2) {
            message += "Las contraseñas no coinciden. ";
        }
        if (!/\d/.test(password)) {
            message += "La contraseña debe tener al menos un número. ";
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            message += "La contraseña debe tener al menos un carácter especial. ";
        }
        if (password.length < 8) {
            message += "La contraseña debe tener más de 8 caracteres.";
        }

        if (message === "") {
            return null;
        } else {
            return message;
        }
    }

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false)
        setError("");
        setResponse("");
        setNewPasswords({
            password: '',
            password2: ''
        });
    };
    const handleCloseErrorModal = () => {
        setShowErrorModal(false)
        setError("");
        setResponse("");
        setNewPasswords({
            password: '',
            password2: ''
        });
    };

    const handleChange = (e) => {
        setNewPasswords({
            ...newPasswords,
            [e.target.name]: e.target.value
        });
    }

    const data = {
        'password': newPasswords.password,
        'confirm_password': newPasswords.password2,
        'uidb64': uidb64,
        'token': token
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);

        const passwordError = validatePassword(newPasswords.password, newPasswords.password2);
        if (passwordError) {
            setError(passwordError);
            setShowErrorModal(true);
            setNewPasswords({
                password: '',
                password2: ''
            });
            return;
        }
        api
            .patch('/set-new-password/', data)
            .then((res) => {
                if (res.status === 200) {
                    setResponse(res.data.message);
                    setDirNavigate('/login');
                    setShowSuccessModal(true);
                }
            })
            .catch((error) => {
                console.log(error.response.data);
                setError(error.response.data.message);
                setShowErrorModal(true);
            })
    }


    return (
        <>
            {/* Navbar */}
            <Navbar />
            <div className="background-recovery">
                <div className="password-recovery-container">
                    <div className="logo-register">
                        <img src={logo} alt="logo" className="logo" style={{ height: "100px", marginRight: "10px" }} />
                    </div>
                    <h1 className="description-code-psre" >Cambia tu contraseña</h1>
                    <div className="password-recovery-form">
                        <div className='form-group-psre'>
                            <label>Nueva contraseña</label>
                            <div className="tooltip-contrasena">

                                <input
                                    className="input-field-ps"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={newPasswords.password}
                                    placeholder="Contraseña"
                                    required
                                />
                                <span className="tooltip-psre-text-l">Este campo es obligatorio. Ingresa tu contraseña, debe tener mínimo 8 caracteres, entre letras, números y caracteres especiales</span>
                            </div>

                        </div>
                        <div className='form-group-psre'>
                            <label>Confirma tu nueva contraseña</label>
                            <div className="tooltip-contrasena">

                                <input
                                    className="input-field-ps"
                                    type="password"
                                    name="password2"
                                    onChange={handleChange}
                                    value={newPasswords.password2}
                                    placeholder="Confirmación de contraseña"
                                    required
                                />
                                <span className="tooltip-psre-text-m">Este campo es obligatorio. Ingresa tu contraseña nuevamente</span>
                            </div>

                        </div>

                        <button type="submit" className="submit-button" onClick={handleSubmit}>Cambiar</button>
                    </div>
                </div>
            </div>
            <SuccessModal show={showSuccessModal} handleClose={handleCloseSuccessModal} response={response} dirNavigate={dirNavigate} />
            <ErrorModal show={showErrorModal} handleClose={handleCloseErrorModal} error={error} />
        </>
    );
}
export default PasswordRecovery;