import React, { useState, useEffect } from "react";
import LoadingPage from "../components/loading-page";
import Navbar from "../components/navbar"; // Navbar personalizado
import "../styles/user-profile.css"; // Importa el archivo CSS
import { useNavigate } from "react-router-dom";
import api from "../api";
import ErrorModal from "../components/ErrorModal";
import ConfirmationModal from "../components/ConfirmationModal";
import SuccessModal from "../components/SuccessModal";

import mascotas_img from "../img/iconosProfile/mascotas.svg";
import pedidos_img from "../img/iconosProfile/pedidos.svg";
import adopciones_img from "../img/iconosProfile/adopciones.svg";
import donaciones_img from "../img/iconosProfile/donaciones.svg";
import makipaws_img from "../img/iconosProfile/makipaws.svg";
import clientes_img from "../img/Foto_Perfil_Clientes.svg";
import fundaciones_img from "../img/Foto_Perfil_Fundaciones.svg";
import { formatMoney } from "../functions";

const ProfileIcon = ({ src, alt, title }) => {
  return (
    <div className="p-2">
      <img src={src} alt={alt} className="img-icon" />
      <p className="titulosIconos">{title}</p>
    </div>
  );
};

const UserProfile = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState("");
  const [dirNavigate, setDirNavigate] = useState("");
  const [imageProfile, setImageProfile] = useState("");
  const navigate = useNavigate();

  if (
    !sessionStorage.getItem("token") &&
    !sessionStorage.getItem("email") &&
    !sessionStorage.getItem("refresh")
  ) {
    navigate("/iniciar-sesion");
  }

  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const refresh = sessionStorage.getItem("refresh");
  const es_cliente = sessionStorage.getItem("is_cliente");
  const es_fundacion = sessionStorage.getItem("is_fundacion");
  console.log(es_cliente);
  const mascotas_url =
    es_cliente === "true" ? "perfil-mascota-cliente/" : "perfil-mascota-fundacion/";
  const pedidos_url = "mis-pedidos/";
  console.log(mascotas_url);

  const adopciones_url = "solicitudes-de-adopcion/";
  const makipaws_url = "solicitudes-de-cuidado/";
  const donaciones_url = es_cliente === "true" ? "donaciones-realizadas/" : "donaciones-recibidas/";
  const [userType, setUserType] = useState("fundacion");

  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postal_code: "",
    localidad: "",
    role: "",
    saldo: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get(`current-user/`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
  
        if (userResponse.status === 200) {
          const tem_email = userResponse.data.email;
          console.log(userResponse.data);
          console.log(tem_email);
  
          if (userResponse.data.is_cliente === true) {
            setImageProfile(clientes_img);
            const clienteResponse = await api.get(`cliente-profile/`, {
              params: {
                email: tem_email,
              },
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            });
  
            if (clienteResponse.status === 200) {
              setUserData({
                name: clienteResponse.data.primer_nombre + " " + clienteResponse.data.primer_apellido,
                email: clienteResponse.data.email,
                phone: clienteResponse.data.telefono,
                address: clienteResponse.data.direccion,
                postal_code: clienteResponse.data.codigo_postal
                  ? clienteResponse.data.codigo_postal
                  : "No hay código postal",
                localidad: clienteResponse.data.localidad,
                role: "Dueño de mascota",
                saldo: clienteResponse.data.saldo,
              });
              setIsLoading(false);
            } else {
              console.log("Error en la traida de los datos");
              console.log(clienteResponse.data.message);
              setResponse(clienteResponse.data.message);
              setShowErrorModal(true);
              setTimeout(() => {
                navigate("/iniciar-sesion");
              }, 3000);
            }
          } else if (userResponse.data.is_fundacion === true) {
            setImageProfile(fundaciones_img);
            const fundacionResponse = await api.get("fundacion-profile/", {
              params: {
                email: tem_email,
              },
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            });
  
            if (fundacionResponse.status === 200) {
              setUserData({
                name: fundacionResponse.data.nombre,
                email: fundacionResponse.data.email,
                phone: fundacionResponse.data.telefono,
                address: fundacionResponse.data.direccion,
                postal_code: fundacionResponse.data.codigo_postal
                  ? fundacionResponse.data.codigo_postal
                  : "No hay código postal",
                localidad: fundacionResponse.data.localidad,
                role: "Fundación",
                saldo: fundacionResponse.data.saldo,
              });
              setIsLoading(false);
            } else {
              console.log("Error en la traida de los datos");
              console.log(fundacionResponse.data.message);
              setError("Error en la traida de los datos");
              setShowErrorModal(true);
              setTimeout(() => {
                navigate("/iniciar-sesion");
              }, 3000);
            }
          } else {
            console.log("Este usuario no tiene un rol asignado");
            console.log(userResponse.data.message);
            setError("Este usuario no tiene un rol asignado");
            setShowErrorModal(true);
            setTimeout(() => {
              navigate("/iniciar-sesion");
            }, 3000);
          }
        } else {
          console.log("Error en la traida de los datos, la petición no fue exitosa");
          console.log(userResponse.data.message);
          setError("Error en la traida de los datos, la petición no fue exitosa");
          setShowErrorModal(true);
          setTimeout(() => {
            navigate("/iniciar-sesion");
          }, 3000);
        }
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.detail : error.message);
        setShowErrorModal(true);
        setTimeout(() => {
          navigate("/iniciar-sesion");
        }, 3000);
      }
    };
  
    fetchData();
  }, []);

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError("");
    setResponse("");
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setError("");
    setResponse("");
  };

  useEffect(() => {
    console.log("userData ha cambiado:", userData);
  }, [userData]);

  const handleEliminarCuenta = async (e) => {
    e.preventDefault();
    const url_delete =
      es_cliente === "true"
        ? "cliente-profile-delete/"
        : "fundacion-profile-delete/";

    api
      .delete(url_delete, {
        params: {
          email: userData.email,
        },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Cuenta eliminada con éxito");
          setResponse("Cuenta eliminada con éxito");
          setShowSuccessModal(true);
          setTimeout(() => {
            navigate("/iniciar-sesion");
          }, 3000);
        } else {
          console.log("Error al eliminar la cuenta");
          console.log(response.data.message);
          setError("Error al eliminar la cuenta");
          setShowErrorModal(true);
        }
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error.message);
        console.log(error.response);
        setError(error.response ? error.response.data.detail : error.message);
        setShowErrorModal(true);
      });
  };

  const handleYesConfirmationModal = async (e) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    await handleEliminarCuenta(e);
    setIsLoading(false);
    handleNoConfirmationModal();
  };

  const handleNoConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleOpenConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="absolute-container-user-profile">
      {/* Navbar */}
      <Navbar />

      {/* User Profile */}

      <div className="profile-container">
      
        <div className="content-user-profile">
          <div className="card-body p-4">
            <div className="d-flex">
              {/* Foto de perfil y botón de cerrar sesión */}
              
              <div className="flex-shrink-0 text-center">
                <div className="image-user-profile">
                  <img src={imageProfile} alt="Profile" className="img-fluid" />
                </div>
                <a
                  href="/logout"
                  className="logout-icon mt-3 d-block"
                  title="Cerrar sesión"
                >
                  <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                </a>
              </div>
              {/* Información del usuario */}
              <div className="flex-grow-1 ms-3 profile-info">
                <h2 className="nombreUserProfile">{userData.name}</h2>
                <p className="correoUserProfile">{userData.email}</p>
                <p className="numeroUserProfile">{userData.phone}</p>
                <p className="direccionUserProfile">
                  {userData.address} | {userData.localidad} | Cód. Postal:{" "}
                  {userData.postal_code}
                </p>
                <p className="rolUserProfile">{userData.role}</p>
              </div>
              {/* Botón de editar */}
              <div className="button-container-userProfile">
                <button className="button-edit">
                  <svg
                    className="svg-icon"
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g stroke="#fcf3e3" stroke-linecap="round" stroke-width="2">
                      <path d="m20 20h-16"></path>
                      <path
                        clip-rule="evenodd"
                        d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z"
                        fill-rule="evenodd"
                      ></path>
                    </g>
                  </svg>
                  <span className="lable">Editar</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="saldo-container">
          <div className="saldo-subcontainer">
            <button>
              <div className="saldo-text">Tu saldo en Maki:</div>
              <div className="saldo-money">
                {formatMoney(userData.saldo)} COP
              </div>
            </button>
          </div>
        </div>

        {/* Icons Section */}
        <div className="icons-container">
        {userType === "fundacion" && (
            <div className="change-plan" >
                <h2>
                  ¡Aún estás a tiempo para cambiar de plan de membresía!
                </h2>
                <button className="boton-cambiar-plan">Ver planes</button>
            </div>
          )}
          
          <div className="d-flex flex-wrap justify-content-center">
            <a href={mascotas_url}>
              <button className="btn-mascotas-user-profile">
                <ProfileIcon
                  src={mascotas_img}
                  alt="Mascotas"
                  title="Mascotas"
                  className="icon-user-profile"
                />
              </button>
            </a>
            <a href={pedidos_url}>
              <button className="btn-pedidos-user-profile">
                <ProfileIcon
                  src={pedidos_img}
                  alt="Pedidos"
                  title="Pedidos"
                  className="icon-user-profile"
                />
              </button>
            </a>
            <a href={adopciones_url}>
              <button className="btn-adopciones-user-profile">
                <ProfileIcon
                  src={adopciones_img}
                  alt="Adopciones"
                  title="Adopciones"
                  className="icon-user-profile"
                />
              </button>
            </a>
            <a href={donaciones_url}>
              <button className="btn-donaciones-user-profile">
                <ProfileIcon
                  src={donaciones_img}
                  alt="Donaciones"
                  title="Donaciones"
                  className="icon-user-profile"
                />
              </button>
            </a>
            {es_cliente === "true" && (
              <a href={makipaws_url}>
                <button className="btn-makipaws-user-profile">
                  <ProfileIcon
                    src={makipaws_img}
                    alt="Makipaws"
                    title="MakiPaws"
                    className="icon-user-profile"
                  />
                </button>
              </a>
            )}
          </div>
          <div className="saldo-container">
          <div className="saldo-subcontainer">
            <button>
              <div className="saldo-text">Tu saldo en Maki:</div>
              <div className="saldo-money">
                $ {formatMoney(parseFloat(userData.saldo))} COP
              </div>
            </button>
          </div>
          
        </div>
        </div>
        
        {/* Botón de Eliminar cuenta */}
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn-delete-account"
            title="Eliminar Cuenta"
            onClick={handleOpenConfirmationModal}
          >
            <i className="fas fa-trash-alt"></i> Eliminar Cuenta
          </button>
        </div>
      </div>

      {/* <WelcomeModal show={showSuccessModal} handleClose={handleCloseSuccessModal} response={response} /> */}
      <SuccessModal
        show={showSuccessModal}
        handleClose={handleCloseSuccessModal}
        response={response}
        dirNavigate={dirNavigate}
      />
      <ErrorModal
        show={showErrorModal}
        handleClose={handleCloseErrorModal}
        error={error}
      />
      <ConfirmationModal
        show={showConfirmationModal}
        handleYes={handleYesConfirmationModal}
        handleNo={handleNoConfirmationModal}
        action="Eliminar cuenta"
        response="¿Estás seguro de eliminar tu cuenta? Esta acción no se puede deshacer."
      />
    </div>
  );
};

export default UserProfile;
