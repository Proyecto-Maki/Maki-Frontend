import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import '../styles/login.css';
import logo from '../img/Logotipo Maki.png'; // Ruta al logo

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Login Page */}
            <div className="login-container">
                <div className="login-content">
                <img
                src={logo}
                alt="Logo Maki"
                className="logo-img"
                style={{ height: "100px", marginRight: "15px" }}
                />
                    <h1 className="welcome-text">¡BIENVENIDO!</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control custom-input"
                                placeholder="Dirección de correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group position-relative">
                            <input
                                type="password"
                                className="form-control custom-input"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success login-btn">
                            Ingresa
                        </button>
                        <p className="forgot-password-text">
                            <a href="/reset-password">Olvidé mi contraseña</a>
                        </p>
                        <p className="signup-text">
                            ¿No tienes una cuenta aún? <a href="/signup">Únete</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
