import React, { useState } from "react";
import Navbar from "../components/navbar"; // Navbar personalizado
import LoadingPage from "../components/loading-page";
import "../styles/info-producto.css";

const InfoProduct = () => {
    const [mainImage, setMainImage] = useState("../src/img/foodimg/dogfood.png"); // Imagen principal
    const thumbnails = [
        "/../src/img/foodimg/whiskas.png",
        "/../src/img/foodimg/a-packet-of-food.png"
    ]; // Vistas adicionales del producto

    return (
        <>
            <Navbar />
            <div className="background-container">
                <div className="producto-container-total">
                    {/* Primera fila */}
                    <div className="row">
                        <div className="column">
                            <div className="product-image">
                                <img src={mainImage} alt="Producto principal" />
                            </div>
                            <div className="thumbnails">
                                {thumbnails.map((thumb, index) => (
                                    <img
                                        key={index}
                                        src={thumb}
                                        alt={`Vista ${index + 1}`}
                                        onClick={() => setMainImage(thumb)}
                                        className="thumbnail-image"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="column">
                            <h1>Alimento para Perro Natural Balance Adultos - 1.5kg</h1>
                            <h2>$60.000</h2>
                            <p>Selecciona la cantidad:</p>
                            <div className="quantity-selector">
                                <button>-</button>
                                <input type="number" value="2" readOnly />
                                <button>+</button>
                            </div>
                            <button className="add-to-cart-button">Agregar al carrito</button>
                        </div>
                    </div>

                    {/* Segunda fila */}
                    <div className="row">
                        <div className="column">
                            <h3>Acerca del Item</h3>
                            <p>
                                LA CARNE DE RES ES EL PRIMER INGREDIENTE... Ingredientes naturales balanceados para una dieta saludable.
                            </p>
                        </div>
                        <div className="column">
                            <h3>Ingredientes/Materiales</h3>
                            <p>Carne de res, harina de carne de res, arroz integral...</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InfoProduct;
