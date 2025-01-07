import React, { useState } from "react";
import Navbar from "../components/navbar"; // Navbar personalizado
import LoadingPage from "../components/loading-page";
import "../styles/info-producto.css";

const InfoProduct = () => {
    /*incremento y decremento producto*/
    const [quantity, setQuantity] = useState(0);

    const increment = () => {
        setQuantity(quantity + 1);
      };
    
    const decrement = () => {
        if (quantity > 0) {
          setQuantity(quantity - 1);
        }
    };
    

    const [mainImage, setMainImage] = useState("../src/img/foodimg/dogfood.png"); // Imagen principal
    const thumbnails = [
        "/../src/img/foodimg/whiskas.png",
        "/../src/img/foodimg/dogfood.png",
        "/../src/img/foodimg/dogfood.png",
        "/../src/img/foodimg/dogfood.png"
    ]; // Vistas adicionales del producto

    return (
        <div className="absolute-container-info-producto">
            <Navbar />
            <div className="background-container-info-producto">
                <div className="producto-container-total">
                    {/* Primera fila */}
                    <div className="row">
                        <div className="column">
                            <div className="d-flex flex-row">
                                <div className="main-product-image">
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
                        </div>
                        <div className="column">
                            <h1>Alimento para Perro Natural Balance Adultos - 1.5kg</h1>
                            <h2>$60.000</h2>
                            <p>Selecciona la cantidad:</p>
                            <div className="container-quantity-selector">
                                <div className="quantity-selector">
                                    <span className="rest" onClick={decrement}>-</span>
                                    <span className="num">{quantity}</span>
                                    <span className="add" onClick={increment}>+</span>
                                </div>
                            </div>
                            <div className="Btn-add-cart-info-pr">
                                <button className="cartBtn">
                                    <svg class="cart" fill="white" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                                    ADD TO CART
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" class="product"><path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"></path></svg>
                                </button>
                            </div>
                            
                        </div>
                    </div>

                    {/* segunda fila */}
                    <div className="row">
                        <div className="column">
                            <h3>Acerca del Item</h3>
                            <p>
                                LA CARNE DE RES ES EL PRIMER INGREDIENTE que proporciona proteínas y aminoácidos esenciales para ayudar a mantener los músculos fuertes; El arroz integral se incluye como una fuente saludable y rica de fibra para la salud digestiva; Contiene (1) bolsa de 24 libras.

                                PENSANDO EN LAS MASCOTAS SENSIBLES, hemos elegido cuidadosamente una lista simplificada de ingredientes de primera calidad para ayudar a mantener un pelaje, una piel y un sistema digestivo saludables; Elaborado con una sola fuente de proteína animal y sin soja, gluten ni colorantes o saborizantes artificiales añadidos.

                                NUTRIENTES DE NUESTRA RECETA DE COMIDA PARA PERROS DE RES elaborada con ingredientes nutritivos como carne de res y arroz integral; Completo y equilibrado con nutrientes esenciales para ayudar a mantener el sistema inmunológico saludable de tu perro.

                                NUTRICIÓN PARA TODO TIPO DE PERRO Cualquier perro puede disfrutar de nuestras deliciosas recetas, no solo los perros con estómagos sensibles, piel irritable o alergias; Nuestras fórmulas elaboradas a propósito reducen la cantidad de ingredientes sin sacrificar el sabor o la nutrición.
                            </p>
                            <h3>Acerca del Item</h3>
                        </div>
                        <div className="column">
                            <h3>Ingredientes/Materiales</h3>
                            <p>Carne de res, harina de carne de res, arroz integral, arroz cervecero, salvado de arroz, levadura seca de cerveza, sorgo integral, aceite de girasol, sabor natural, linaza, vitaminas (suplemento de vitamina E, ácido ascórbico (fuente de vitamina C), niacina, suplemento de vitamina A, mononitrato de tiamina, pantotenato de D-calcio, suplemento de riboflavina, clorhidrato de piridoxina, suplemento de vitamina B12, ácido fólico, biotina, suplemento de vitamina D3 ), taurina, DL-metionina, sal, cloruro de potasio, Minerales (proteinato de zinc, sulfato de zinc, sulfato ferroso, proteinato de hierro, sulfato de cobre, proteinato de cobre, sulfato de manganeso, proteinato de manganeso, selenito de sodio, yodato de calcio), cloruro de colina, extracto de té verde, extracto de menta verde.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoProduct;
