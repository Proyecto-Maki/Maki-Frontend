import React, { useState } from "react";
import Navbar from "../components/navbar"; // Navbar personalizado
import LoadingPage from "../components/loading-page";
import "../styles/publish-review.css"; // Importa el archivo CSS

const PublishReview = () => {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");

    const handleRating = (value) => {
        setRating(value);
    };

    const handlePublish = () => {
        // Lógica para manejar la publicación de la reseña
        console.log("Publicando reseña", { rating, title, comment });
        alert("¡Tu reseña ha sido publicada!");
    };

    return (
        <>
            <Navbar />
            <div className="background-container">
                <div className="publish-review-container">
                    <h2 className="publish-review-title">¿Qué piensas de nuestro producto?</h2>
                    <div className="publish-review-user-info">
                        <img
                            src="https://via.placeholder.com/50"
                            alt="User Avatar"
                            className="publish-review-user-avatar"
                        />
                        <p className="publish-review-user-name">Ivana P.</p>
                        <p className="publish-review-date">30/12/24</p>
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

                    <button className="publish-review-button" onClick={handlePublish}>
                        Publicar
                    </button>
                    <p className="publish-review-terms">Términos & Condiciones</p>
                </div>
            </div>
        </>
    );
};

export default PublishReview;
