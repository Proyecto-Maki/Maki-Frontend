import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar'; // Import Navbar
import "../styles/register.css";

function Register() {
    const [type, setType] = useState("user"); // 'user' or 'foundation'
    const [formData, setFormData] = useState({});
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form Data:", formData);
      // Aquí puedes enviar los datos al backend usando fetch o axios
    };
  
    return (
      <>
        <Navbar /> {/* Add Navbar component */}
        <div className="register-container">
          <h1>¡Bienvenido a Maki!</h1>
          <p>Por favor selecciona el tipo de registro</p>
          <div className="toggle-buttons">
            <button
              className={type === "user" ? "active" : ""}
              onClick={() => setType("user")}
            >
              Usuario
            </button>
            <button
              className={type === "foundation" ? "active" : ""}
              onClick={() => setType("foundation")}
            >
              Fundación
            </button>
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            {type === "user" ? (
              <>
                <h2>Regístrate como Usuario</h2>
                <div className="form-group">
                  <label>Primer nombre</label>
                  <input
                    className="input-field"
                    type="text"
                    name="primer_nombre"
                    placeholder="Primer nombre"
                    onChange={handleChange}
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
                    required
                  />
                </div>
              </>
            )}
            <button type="submit" className="submit-button">Continuar</button>
          </form>
        </div>
      </>
    );
  }
  
  export default Register;