import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar'; 
import "../styles/register.css";
import api from "../api";
import logo from '../img/Logotipo Maki.png';

function Register() {
    const [type, setType] = useState("user");
    const [formData, setFormData] = useState({});
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!acceptedTerms) {
        alert("Debes aceptar los términos y condiciones para continuar.");
        return;
      }
      const dataToSubmit = {
        ...formData,
        is_verified: false, // Ensure the is_verified field is included
      };
      console.log(dataToSubmit);

      const url = type === "user" ? "registro/cliente/" : "registro/fundacion/";

      api
      .post(url, dataToSubmit)
      .then((response) => {
        if (response.status === 201) {
          console.log("Usuario registrado correctamente");
          //navigate("/login");
        } else {
          console.log("Error al registrar el usuario");
        }
      })
      .catch((error) => {
        console.error("Error:", error.response ? error.response.data : error.message);
      });
    };

    const handleTypeChange = (newType) => {
      setType(newType);
      setFormData({});
    };

    return (
      <>
        <Navbar /> {/* Add Navbar component */}
        <div className="background-register">
          <div className="register-container">
            <div className="logo-register">
              <img src={logo} alt="logo" className="logo" style={{ height: "100px", marginRight: "10px" }}/>
            </div>
            <p className="type-user" >¿Que tipo de usuario eres?</p>
            <div className="toggle-buttons">
              <button
                className={type === "user" ? "active" : ""}
                onClick={() => handleTypeChange("user")}
              >
                Dueño mascota
              </button>
              <button
                className={type === "foundation" ? "active" : ""}
                onClick={() => handleTypeChange("foundation")}
              >
                Fundación
              </button>
            </div>
            <form className="register-form" onSubmit={handleSubmit}>
              {type === "user" ? (
                <>
                  <h2 >Regístrate como Usuario</h2>
                  <div className="form-group">
                    <label>Primer nombre</label>
                    <input
                      className="input-field"
                      type="text"
                      name="primer_nombre"
                      placeholder="Primer nombre"
                      onChange={handleChange}
                      value={formData.primer_nombre || ""}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Segundo nombre</label>
                    <input
                      className="input-field"
                      type="text"
                      name="segundo_nombre"
                      placeholder="Segundo nombre"
                      onChange={handleChange}
                      value={formData.segundo_nombre || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label>Primer apellido</label>
                    <input
                      className="input-field"
                      type="text"
                      name="primer_apellido"
                      placeholder="Primer apellido"
                      onChange={handleChange}
                      value={formData.primer_apellido || ""}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Segundo apellido</label>
                    <input
                      className="input-field"
                      type="text"
                      name="segundo_apellido"
                      placeholder="Segundo apellido"
                      onChange={handleChange}
                      value={formData.segundo_apellido || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label>Correo electrónico</label>
                    <input
                      className="input-field"
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      onChange={handleChange}
                      value={formData.email || ""}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Contraseña</label>
                    <input
                      className="input-field"
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      onChange={handleChange}
                      value={formData.password || ""}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirma tu contraseña</label>
                    <input
                      className="input-field"
                      type="password"
                      name="password2"
                      placeholder="Confirma tu contraseña"
                      onChange={handleChange}
                      value={formData.password2 || ""}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Teléfono</label>
                    <input
                      className="input-field"
                      type="text"
                      name="telefono"
                      placeholder="Teléfono"
                      onChange={handleChange}
                      value={formData.telefono || ""}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Dirección</label>
                    <input
                      className="input-field"
                      type="text"
                      name="direccion"
                      placeholder="Dirección"
                      onChange={handleChange}
                      value={formData.direccion || ""}
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2>Regístrate como Fundación</h2>
                  <div className="form-group">
                    <label>Nombre de la fundación</label>
                    <input
                      className="input-field"
                      type="text"
                      name="nombre"
                      placeholder="Nombre de la fundación"
                      onChange={handleChange}
                      value={formData.nombre || ""}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>NIT</label>
                    <input
                      className="input-field"
                      type="text"
                      name="nit"
                      placeholder="NIT"
                      onChange={handleChange}
                      value={formData.nit || ""}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Descripción</label>
                    <input
                      className="input-field"
                      type="text"
                      name="descripcion"
                      placeholder="Descripción"
                      onChange={handleChange}
                      value={formData.descripcion || ""}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Correo electrónico</label>
                    <input
                      className="input-field"
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      onChange={handleChange}
                      value={formData.email || ""}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Contraseña</label>
                    <input
                      className="input-field"
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      onChange={handleChange}
                      value={formData.password || ""}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirma tu contraseña</label>
                    <input
                      className="input-field"
                      type="password"
                      name="password2"
                      placeholder="Confirma tu contraseña"
                      onChange={handleChange}
                      value={formData.password2 || ""}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Teléfono</label>
                    <input
                      className="input-field"
                      type="text"
                      name="telefono"
                      placeholder="Teléfono"
                      onChange={handleChange}
                      value={formData.telefono || ""}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Dirección</label>
                    <input
                      className="input-field"
                      type="text"
                      name="direccion"
                      placeholder="Dirección"
                      onChange={handleChange}
                      value={formData.direccion || ""}
                      required
                    />
                  </div>
                </>
              )}
              <div className="form-group" style={{ marginBottom: '10px' }}>
                <label htmlFor="terms">
                  Acepto los <a href="/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" style={{ color: '#ff7f50' }}>términos y condiciones</a> de Maki
                </label>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Continuar</button>
            </form>
          </div>
        </div>
      </>
    );
  }
  
  export default Register;