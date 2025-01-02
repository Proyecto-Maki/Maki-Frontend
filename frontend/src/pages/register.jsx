import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';
import "../styles/register.css";
import api from "../api";
import logo from '../img/Logotipo Maki.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';

function Register() {
	const [type, setType] = useState("user");
	const [formData, setFormData] = useState({});
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [error, setError] = useState("");
	const [response, setResponse] = useState("");
	const [dirNavigate, setDirNavigate] = useState("");

	const navigate = useNavigate();

	const validateCedula = (cedula) => {
		const re = /^\d+$/;
		if (!re.test(cedula)) {
			return "La cédula solo debe contener números.";
		}
		if (cedula.length !== 10) {
			return "La cédula debe tener 10 dígitos.";
		}
		return null;
	}

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

	const validateEmail = (email) => {
		const re = /\S+@\S+\.\S+/;
		if (re.test(email)) {
			return null;
		} else {
			return "El correo electrónico no es válido.";
		}
	}

	const validatePhone = (phone) => {
		const re = /^\d+$/;
		if (!re.test(phone)) {
			return "El número de teléfono solo debe contener números.";
		}
		if (phone.length !== 10) {
			return "El número de teléfono debe tener al menos 10 dígitos.";
		}
		return null;

	}

	const validateNit = (nit) => {
		const re = /^\d+$/;
		if (!re.test(nit)) {
			return "El NIT solo debe contener números.";
		}
		if (nit.length !== 9) {
			return "El NIT debe tener 9 dígitos.";
		}
		return null;
	}






	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!acceptedTerms) {
			setError("Debes aceptar los términos y condiciones para continuar.");
			// alert("Debes aceptar los términos y condiciones para continuar.");
			setShowErrorModal(true);
			return;
		}

		const cedulaError = validateCedula(formData.cedula);
		if (cedulaError) {
			setError(cedulaError);
			setShowErrorModal(true);
			// alert(cedulaError);
			return;
		}

		const passwordError = validatePassword(formData.password, formData.password2);
		if (passwordError) {
			setError(passwordError);
			setShowErrorModal(true);
			// alert(passwordError);
			return;
		}

		const emailError = validateEmail(formData.email);
		if (emailError) {
			setError(emailError);
			setShowErrorModal(true);
			// alert(emailError);
			return;
		}

		const phoneError = validatePhone(formData.telefono);
		if (phoneError) {
			setError(phoneError);
			setShowErrorModal(true);
			// alert(phoneError);
			return;
		}

		if (type === "foundation") {
			const nitError = validateNit(formData.nit);
			if (nitError) {
				setError(nitError);
				setShowErrorModal(true);
				return;
			}
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
					// Redirigir después de la espera si es éxito
					setResponse(response.data.message);
					setDirNavigate("/confirmation-register")
					setShowSuccessModal(true);

				} else {
					console.log("Error al registrar el usuario");
					console.log(response.data.message);
					setResponse(response.data.message)
					setShowErrorModal(true);
				}
			})
			.catch((error) => {
				console.error(error.response ? error.response.data : error.message);
				console.log(error.response.data.message);
				setError(error.response.data.message);
				setShowErrorModal(true);
			});
	};

	const handleTypeChange = (newType) => {
		setType(newType);
		setFormData({});
	};

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

	return (
		<>
			<Navbar /> {/* Add Navbar component */}
			<div className="background-register">
				<div className="register-container">
					<div className="logo-register">
						<img src={logo} alt="logo" className="logo-register-img" style={{ height: "100px", marginRight: "10px" }} />
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
									<label>Cédula de ciudadanía</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="text"
											name="cedula"
											placeholder="Cédula de ciudadanía"
											onChange={handleChange}
											value={formData.cedula || ""}
											required
										/>
										<span className="tooltip-registro-text">Este campo es obligatorio. Ingresa tu cédula.</span>
									</div>

								</div>
								<div className="form-group">
									<label>Primer nombre</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="text"
											name="primer_nombre"
											placeholder="Primer nombre"
											onChange={handleChange}
											value={formData.primer_nombre || ""}
											required
										/>
										<span className="tooltip-registro-text">Este campo es obligatorio. Ingresa tu primer nombre</span>
									</div>

								</div>
								<div className="form-group">
									<label>Segundo nombre</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="text"
											name="segundo_nombre"
											placeholder="Segundo nombre"
											onChange={handleChange}
											value={formData.segundo_nombre || ""}
										/>
										<span className="tooltip-registro-text">Este campo no es obligatorio. Ingresa tu segundo nombre</span>
									</div>

								</div>
								<div className="form-group">
									<label>Primer apellido</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="text"
											name="primer_apellido"
											placeholder="Primer apellido"
											onChange={handleChange}
											value={formData.primer_apellido || ""}
											required
										/>
										<span className="tooltip-registro-text">Este campo es obligatorio. Ingresa tu primer apellido</span>
									</div>

								</div>
								<div className="form-group">
									<label>Segundo apellido</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="text"
											name="segundo_apellido"
											placeholder="Segundo apellido"
											onChange={handleChange}
											value={formData.segundo_apellido || ""}
										/>
										<span className="tooltip-registro-text">Este campo no es obligatorio. Ingresa tu segundo apellido</span>
									</div>
								</div>
								<div className="form-group">
									<label>Correo electrónico</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="email"
											name="email"
											placeholder="Correo electrónico"
											onChange={handleChange}
											value={formData.email || ""}
											required
										/>
										<span className="tooltip-registro-text">Este campo es obligatorio. Ingresa tu correo electrónico</span>
									</div>
								</div>
								<div className="form-group">
									<label>Contraseña</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="password"
											name="password"
											placeholder="Contraseña"
											onChange={handleChange}
											value={formData.password || ""}
											required
										/>
										<span className="tooltip-registro-text-l">Este campo es obligatorio. Ingresa tu contraseña, debe tener mínimo 8 caracteres, entre letras, números y caracteres especiales</span>
									</div>

								</div>
								<div className="form-group">
									<label>Confirma tu contraseña</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="password"
											name="password2"
											placeholder="Confirma tu contraseña"
											onChange={handleChange}
											value={formData.password2 || ""}
											required
										/>
										<span className="tooltip-registro-text-m">Este campo es obligatorio. Ingresa tu contraseña nuevamente</span>
									</div>

								</div>
								<div className="form-group">
									<label>Teléfono</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="text"
											name="telefono"
											placeholder="Teléfono"
											onChange={handleChange}
											value={formData.telefono || ""}
											required
										/>
										<span className="tooltip-registro-text">Este campo es obligatorio. Ingresa tu número de teléfono</span>
									</div>

								</div>
								<div className="form-group">
									<label>Dirección</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="text"
											name="direccion"
											placeholder="Dirección"
											onChange={handleChange}
											value={formData.direccion || ""}
											required
										/>
										<span className="tooltip-registro-text">Este campo es obligatorio. Ingresa tu dirección</span>
									</div>
								</div>
							</>
						) : (
							<>
								<h2>Regístrate como Fundación</h2>
								<div className="form-group">
									<label>Nombre de la fundación</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="text"
											name="nombre"
											placeholder="Nombre de la fundación"
											onChange={handleChange}
											value={formData.nombre || ""}
											required
										/>
										<span className="tooltip-registro-text">Este campo es obligatorio. Ingresa el nombre de la fundación</span>
									</div>

								</div>
								<div className="form-group">
									<label>NIT</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="text"
											name="nit"
											placeholder="NIT"
											onChange={handleChange}
											value={formData.nit || ""}
											required
										/>
										<span className="tooltip-registro-text">Este campo es obligatorio. Ingresa el NIT de la fundación</span>
									</div>

								</div>
								<div className="form-group">
									<label>Descripción</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="text"
											name="descripcion"
											placeholder="Descripción"
											onChange={handleChange}
											value={formData.descripcion || ""}
											required
										/>
										<span className="tooltip-registro-text">Este campo es obligatorio. Ingresa una descripción de la fundación</span>
									</div>

								</div>
								<div className="form-group">
									<label>Correo electrónico</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="email"
											name="email"
											placeholder="Correo electrónico"
											onChange={handleChange}
											value={formData.email || ""}
											required
										/>
										<span className="tooltip-registro-text">Este campo es obligatorio. Ingresa tu correo electrónico</span>
									</div>

								</div>
								<div className="form-group">
									<label>Contraseña</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="password"
											name="password"
											placeholder="Contraseña"
											onChange={handleChange}
											value={formData.password || ""}
											required
										/>

										<span className="tooltip-registro-text-l">Este campo es obligatorio. Ingresa tu contraseña, debe tener mínimo 8 caracteres, entre letras, números y caracteres especiales</span>
									</div>

								</div>
								<div className="form-group">
									<label>Confirma tu contraseña</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="password"
											name="password2"
											placeholder="Confirma tu contraseña"
											onChange={handleChange}
											value={formData.password2 || ""}
											required
										/>
										<span className="tooltip-registro-text-m">Este campo es obligatorio. Ingresa tu contraseña nuevamente</span>
									</div>

								</div>
								<div className="form-group">
									<label>Teléfono</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="text"
											name="telefono"
											placeholder="Teléfono"
											onChange={handleChange}
											value={formData.telefono || ""}
											required
										/>
										<span className="tooltip-registro-text">Este campo es obligatorio. Ingresa tu número de teléfono</span>
									</div>

								</div>
								<div className="form-group">
									<label>Dirección</label>
									<div className="tooltip-registro">
										<input
											className="input-field"
											type="text"
											name="direccion"
											placeholder="Dirección"
											onChange={handleChange}
											value={formData.direccion || ""}
											required
										/>
										<span className="tooltip-registro-text">Este campo es obligatorio. Ingresa tu dirección</span>
									</div>
								</div>
							</>
						)}
						<div className="form-group-terms" style={{ marginBottom: '10px' }}>
							<label htmlFor="terms" className="terms-label">
								Acepto los <a href="/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" style={{ color: '#ff7f50' }}>términos y condiciones</a> de Maki
							</label>
							<input
								className="terms-checkbox"
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
			<SuccessModal show={showSuccessModal} handleClose={handleCloseSuccessModal} response={response} dirNavigate={dirNavigate} />
			<ErrorModal show={showErrorModal} handleClose={handleCloseErrorModal} error={error} />
		</>
	);
}

export default Register;