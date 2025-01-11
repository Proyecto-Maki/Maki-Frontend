import React, { useState, useEffect } from "react";
import LoadingPage from "../components/loading-page";
import Navbar from "../components/navbar"; // Navbar personalizado
import "../styles/user-profile.css"; // Importa el archivo CSS
import { useNavigate } from "react-router-dom";
import api from "../api";
import ErrorModal from '../components/ErrorModal';

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
  const [error, setError] = useState('');
  const [imageProfile, setImageProfile] = useState('');
  const navigate = useNavigate();

  if (!sessionStorage.getItem('token') && !sessionStorage.getItem('email') && !sessionStorage.getItem('refresh')) {
    navigate('/login');
  }

  const email = sessionStorage.getItem('email');
  const token = sessionStorage.getItem('token');
  const refresh = sessionStorage.getItem('refresh');
  const es_cliente = sessionStorage.getItem('is_cliente');
  const es_fundacion = sessionStorage.getItem('is_fundacion');
  console.log(es_cliente);
  const mascotas_url = es_cliente === true ? 'pet-profile-client/' : 'pet-profile-foundation/';
  console.log(mascotas_url)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
  });

  useEffect(() => {

    api
      .get(`current-user/`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {

          const tem_email = res.data.email;
          console.log(res.data);
          console.log(tem_email);
          if (res.data.is_cliente === true) {
            setImageProfile('../src/img/Foto_Perfil_Clientes.svg');
            api
              .get(`cliente-profile/`, {
                params: {
                  email: tem_email,
                },
                headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
              })
              .then((res) => {
                if (res.status === 200) {
                  setUserData({
                    name: res.data.primer_nombre + ' ' + res.data.primer_apellido,
                    email: res.data.email,
                    phone: res.data.telefono,
                    address: res.data.direccion,
                    role: "Dueño de mascota",
                  })
                  //console.log('Información del usuario:', userData);
                } else {
                  console.log('Error en la traida de los datos');
                  console.log(response.data.message);
                  setResponse(response.data.message);
                  setShowErrorModal(true);
                  setTimeout(() => {
                    navigate('/login');
                  }, 3000)
                }
              })
              .catch((error) => {
                console.error(error.response ? error.response.data : error.message);
                console.log(error.response.data.detail);
                setError(error.response.data.detail);
                setShowErrorModal(true);
                setTimeout(() => {
                  navigate('/login');
                }, 3000)
              });
          } else if (res.data.is_fundacion === true) {
            setImageProfile('../src/img/Foto_Perfil_Fundaciones.svg');
            api
              .get('fundacion-profile/', {
                params: {
                  email: tem_email,
                },
                headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
              })
              .then((res) => {
                if (res.status === 200) {
                  setUserData({
                    name: res.data.nombre,
                    email: res.data.email,
                    phone: res.data.telefono,
                    address: res.data.direccion,
                    role: "Fundación",
                  })
                  //console.log('Información del usuario:', userData);
                } else {
                  console.log('Error en la traida de los datos');
                  console.log(response.data.message);
                  setError(response.data.message);
                  setShowErrorModal(true);
                  setTimeout(() => {
                    navigate('/login');
                  }, 3000)
                }
              })
              .catch((error) => {
                console.error(error.response ? error.response.data : error.message);
                console.log(error.response.data.detail);
                setError(error.response.data.detail);
                setShowErrorModal(true);
                setTimeout(() => {
                  navigate('/login');
                }, 3000)
              });
          } else {
            console.log('Este usuario no tiene un rol asignado');
            console.log(response.data.message);
            setError(response.data.message);
            setShowErrorModal(true);
            setTimeout(() => {
              navigate('/login');
            }, 3000)
          }
        } else {
          console.log('Error en la traida de los datos, la petición no fue exitosa');
          console.log(response.data.message);
          setError(response.data.message);
          setShowErrorModal(true);
          setTimeout(() => {
            navigate('/login');
          }, 3000)
        }
      })
      .catch((error) => {
        setError(error.response.message);
        setShowErrorModal(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000)
      });
  }, []);

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError('');
    setResponse('');
  };

  useEffect(() => {
    console.log('userData ha cambiado:', userData);
  }, [userData]);

  const handleEliminarCuenta = () => {
    api
      .delete('cliente-profile-delete/', {
        params: {
          email: userData.email,
        },
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log('Cuenta eliminada con éxito');
          setResponse('Cuenta eliminada con éxito');
          setShowSuccessModal(true);
          setTimeout(() => {
            navigate('/login');
          }, 3000)
        } else {
          console.log('Error al eliminar la cuenta');
          console.log(response.data.message);
          setError(response.data.message);
          setShowErrorModal(true);
        }
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error.message);
        console.log(error.response.data.detail);
        setError(error.response.data.detail);
        setShowErrorModal(true);
      });
  }


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
                  <img
                    src={imageProfile}
                    alt="Profile"
                    className="img-fluid"
                  />
                </div>
                <a href="/logout" className="logout-icon mt-3 d-block" title="Cerrar sesión">
                  <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                </a>
              </div>
              {/* Información del usuario */}
              <div className="flex-grow-1 ms-3 profile-info">
                <h2 className="nombreUserProfile">{userData.name}</h2>
                <p className="correoUserProfile">{userData.email}</p>
                <p className="numeroUserProfile">{userData.phone}</p>
                <p className="direccionUserProfile">{userData.address}</p>
                <p className="rolUserProfile">{userData.role}</p>
              </div>
              {/* Botón de editar */}
              <div className="button-container-userProfile">
                <button className="button-edit">
                  <svg className="svg-icon" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g stroke="#fcf3e3" stroke-linecap="round" stroke-width="2"><path d="m20 20h-16"></path><path clip-rule="evenodd" d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z" fill-rule="evenodd"></path></g></svg>
                  <span className="lable">Edit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Icons Section */}
      <div className="icons-container">
        <div className="d-flex flex-wrap justify-content-center">
        <a href={mascotas_url}>
          <button className="btn-mascotas-user-profile" >
              <ProfileIcon
                src="../src/img/iconosProfile/mascotas.svg"
                alt="Mascotas"
                title="Mascotas"
                className="icon-user-profile"
              />
            </button>
        </a>
          
          <ProfileIcon
            src="../src/img/iconosProfile/pedidos.svg"
            alt="Pedidos"
            title="Pedidos"
            className="icon-user-profile"
          />
          <ProfileIcon
            src="../src/img/iconosProfile/adopciones.svg"
            alt="Adopciones"
            title="Adopciones"
            className="icon-user-profile"
          />
          <ProfileIcon
            src="../src/img/iconosProfile/donaciones.svg"
            alt="Donaciones"
            title="Donaciones"
            className="icon-user-profile"
          />
          <ProfileIcon
            src="../src/img/iconosProfile/makipaws.svg"
            alt="Makipaws"
            title="MakiPaws"
            className="icon-user-profile"
          />
        </div>
      </div>
      {/* Botón de Eliminar cuenta */}
      <div className="d-flex justify-content-center mt-4">
        <button className="btn-delete-account"  title="Eliminar Cuenta" onClick={handleEliminarCuenta}>
          <i className="fas fa-trash-alt"></i> Eliminar Cuenta
        </button>
      </div>

      {/* <WelcomeModal show={showSuccessModal} handleClose={handleCloseSuccessModal} response={response} /> */}
      <ErrorModal show={showErrorModal} handleClose={handleCloseErrorModal} error={error} />
    </div>
  );
};

export default UserProfile;
