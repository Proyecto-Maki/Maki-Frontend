import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar"; // Navbar personalizado
import LoadingPage from "../components/loading-page";
import "../styles/publish-review.css"; // Importa el archivo CSS
import { useNavigate } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import ConfirmationModal from "../components/ConfirmationModal";
import api from "../api";

const PublishReview = ({ id_producto, slug }) => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState("");
    const [dirNavigate, setDirNavigate] = useState("");
    const [labelNombre, setLabelNombre] = useState("");
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [imageProfile, setImageProfile] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 3000);
    
        return () => clearTimeout(timer);
      }, []);

    // Prueba de producto CAMBIAR ESTO PA HACER PRUEBAS
    id_producto = 6;
    slug = "whiskas-sabor-pollo-sobres-100-gr"

    if (!sessionStorage.getItem('token') && !sessionStorage.getItem('email') && !sessionStorage.getItem('refresh')) {
        navigate('/login');
    }

    const email = sessionStorage.getItem('email');
    const token = sessionStorage.getItem('token');
    const refresh = sessionStorage.getItem('refresh');

    const current_date = new Date();

    const handleRating = (value) => {
        setRating(value);
    };

    const handlePublish = async (e) => {
        // Lógica para manejar la publicación de la reseña
        // console.log("Publicando reseña", { rating, title, comment });
        // alert("¡Tu reseña ha sido publicada!");

        if (rating === 0) {
            setError("Por favor ingrese una calificación entre una y cinco estrellas");
            setShowErrorModal(true);
        }

        if (title === "" || comment === "") {
            setError("Por favor ingrese todos los campos");
            setShowErrorModal(true);
        }

        e.preventDefault();

        const data = {
            email: email,
            id_producto: id_producto,
            calificacion: rating,
            titulo: title,
            comentario: comment,
        }

        api
            .post('resena/create/', data, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                  }
            })
            .then((res) => {
                if (res.status === 201){
                    setResponse("¡Tu reseña ha sido publicada!");
                    setShowSuccessModal(true);
                    setDirNavigate("/productos/" + slug + "/");
                } else {
                    console.log("Error al publicar la reseña");
                    setError(res.data.message);
                    setShowErrorModal(true);
                }
            })
            .catch((error) => {
                console.log("Error al publicar la reseña");
                setError(error.response ? error.response.data.detail : error.message);
                setShowErrorModal(true);
            });



    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
        setError("");
        setResponse("");
    }

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        setError("");
    }

    const handleYesConfirmationModal = async (e) => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 2000));
        await handlePublish(e);
        setIsLoading(false);
        handleNoConfirmationModal();
    }

    const handleNoConfirmationModal = () => {
        setShowConfirmationModal(false);
    }

    const handleOpenConfirmationModal = () => {
        setShowConfirmationModal(true);
    }

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
                    if (res.data.is_cliente) {
                        console.log("Es cliente");
                        setImageProfile('../src/img/Foto_Perfil_Clientes.svg');
                        api
                            .get(`cliente-profile/`, {
                                params: {
                                    email: tem_email
                                },
                                headers: {
                                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                                },
                            })
                            .then((res) => {
                                if (res.status === 200) {
                                    setLabelNombre(res.data.primer_nombre + " " + res.data.primer_apellido);
                                } else {
                                    console.log("Error al cargar el perfil del cliente");
                                    setError(res.data.message);
                                    setShowErrorModal(true);
                                }
                            })
                            .catch((error) => {
                                console.log("Error al cargar el perfil del cliente");
                                setError(error.response.data.detail);
                                setShowErrorModal(true);
                            })
                    } else if (res.data.is_fundacion) {
                        setImageProfile('../src/img/Foto_Perfil_Fundaciones.svg');
                        api
                            .get(`fundacion-profile/`, {
                                params: {
                                    email: tem_email,
                                },
                                headers: {
                                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                                },
                            })
                            .then((res) => {
                                if (res.status === 200) {
                                    setLabelNombre(res.data.nombre);
                                } else {
                                    console.log("Error al cargar el perfil de la fundación");
                                    setError(res.data.message);
                                    setShowErrorModal(true);
                                }
                            })
                            .catch((error) => {
                                console.log("Error al cargar el perfil de la fundación");
                                setError(error.response.data.detail);
                                setShowErrorModal(true);
                            })
                    } else {
                        console.log("El usuario no tiene un rol asignado");
                        setError(res.data.message);
                        setShowErrorModal(true);
                    }
                } else {
                    console.log("Error al cargar el perfil del usuario");
                    setError(res.data.message);
                    setShowErrorModal(true);
                }
            });
    }, []);

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <div className="absolute-container-publish-review">
            <Navbar />
            <div className="background-container-publish-review">
                <div className="publish-review-container">
                    <h2 className="publish-review-title">¿Qué piensas de nuestro producto?</h2>
                    <div className="publish-review-user-info">
                        <img
                            src={imageProfile}
                            alt="User Avatar"
                            className="publish-review-user-avatar"
                        />
                        <p className="publish-review-user-name">{labelNombre}</p>
                        <p className="publish-review-date">{current_date.toLocaleDateString()}</p>
                    </div>

                    <div className="publish-review-rating-section">
                        <p>Escoge nuestra calificación</p>
                        <div className="publish-review-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`publish-review-star ${star <= rating ? "selected" : ""
                                        }`}
                                    onClick={() => handleRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="publish-review-comment-section">
                        <input
                            type="text"
                            placeholder="Escribe un título para tu comentario"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="publish-review-title-input"
                        />
                        <textarea
                            placeholder="Cuéntanos más"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="publish-review-textarea"
                        ></textarea>
                    </div>

                    <button className="publish-review-button" onClick={handleOpenConfirmationModal}>
                        Publicar
                    </button>
                    <p className="publish-review-terms">Términos & Condiciones</p>
                </div>
            </div>
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
                response="¿Estás seguro de publicar la reseña?"
            />
        </div>
    );
};

export default PublishReview;
