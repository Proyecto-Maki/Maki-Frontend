import React, { useState } from "react";
import Navbar from "../components/navbar"; // Navbar personalizado
import LoadingPage from "../components/loading-page";
import "../styles/info-producto.css";

const InfoProduct = () => {
    const [mainImage, setMainImage] = useState("../src/img/foodimg/dogfood.png"); // Imagen principal
    const thumbnails = [
        "/../src/img/foodimg/whiskas.png",
        "/../src/img/foodimg/dogfood.png",
        "/../src/img/foodimg/dogfood.png",
        "/../src/img/foodimg/dogfood.png"
    ]; // Vistas adicionales del producto

    return (
        <>
            <Navbar />

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
                        <div className="quantity-selector">
                            <button>-</button>
                            <input type="number" value="2" readOnly />
                            <button>+</button>
                        </div>
                        <button className="add-to-cart-button">Agregar al carrito</button>
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

        </>
    );
};

export default InfoProduct;
