import React, { useState } from "react";
import Navbar from "../components/navbar"; // Navbar personalizado
import "../styles/resume.css"; // Importa el archivo CSS

const Resume = () => {
    const [cart, setCart] = useState([
        {
            id: 1,
            name: "Donación fundación Sol Canino",
            price: 10000,
            image: "../src/img/foodimg/whiskas.png",
            quantity: 1,  // Agregado: valor inicial de quantity
        },
        {
            id: 2,
            name: "Comida para mascotas ecológica",
            price: 50000,
            image: "../src/img/foodimg/dogfood.png",
            quantity: 1,  // Agregado: valor inicial de quantity
        },
    ]);

    const removeFromCart = (id) => {
        setCart(cart.filter((product) => product.id !== id));
    };

    const increaseQuantity = (id) => {
        setCart(cart.map((product) =>
            product.id === id
                ? { ...product, quantity: product.quantity + 1 }
                : product
        ));
    };

    const decreaseQuantity = (id) => {
        setCart(cart.map((product) =>
            product.id === id && product.quantity > 1
                ? { ...product, quantity: product.quantity - 1 }
                : product
        ));
    };

    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

    return (
        <>
            <Navbar />
            <div className="background-container">
                <div className="content-container">
                    {/* Columna izquierda */}
                    <div className="left-column">
                        {/* Información de pago */}
                        <div className="payment-card">
                            <h3 className="card-title">Tu información de pago</h3>
                            <div className="payment-method">
                                <input type="radio" id="mercadoPago" name="payment" defaultChecked />
                                <label htmlFor="mercadoPago">Mercado Pago</label>
                            </div>
                        </div>

                        {/* Lista de productos */}
                        {cart.map((product) => (
                            <div key={product.id} className="product-card">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <div className="product-details">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-price">${(product.price * product.quantity).toLocaleString()}</p>
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="quantity-controls">
                                        <button
                                            className="quantity-button"
                                            onClick={() => decreaseQuantity(product.id)}
                                        >
                                            -
                                        </button>
                                        <span className="quantity-display">{product.quantity}</span>
                                        <button
                                            className="quantity-button"
                                            onClick={() => increaseQuantity(product.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="remove-button"
                                        onClick={() => removeFromCart(product.id)}
                                    >
                                        <i className="fas fa-trash-alt remove-icon"></i> {/* Ícono de eliminar de Font Awesome */}
                                        <span className="remove-text">Remover</span> {/* Texto "Remover" */}
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Columna derecha */}
                    <div className="right-column">
                        <div className="summary-card">
                            <h3 className="card-title">Resumen de compra</h3>
                            <p>
                                Precio sin IVA: ${(totalPrice).toLocaleString()}
                            </p>
                            <p>
                                <strong>TOTAL: ${(totalPrice).toLocaleString()}</strong>
                            </p>
                            {/* Botón de pagar */}
                            <button className="pay-button">Pagar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Resume;
