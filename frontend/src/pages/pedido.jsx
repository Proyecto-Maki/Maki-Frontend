import React from "react";
import Navbar from "../components/navbar"; // Navbar personalizado
import "../styles/pedido.css"; // Importa el archivo CSS

const Pedido = () => {
    const order = {
        id: "2343242",
        total: "$40000",
        fechaCompra: "09/10/2003",
        productos: [
            {
                id: 1,
                name: "Alimento para perro Natural Balance Adultos - 1.5Kg",
                price: 10000,
                image: "../src/img/foodimg/dogfood.png",
                quantity: 1,
            },
            {
                id: 2,
                name: "Alimento para gato Whiskas - 1Kg",
                price: 8000,
                image: "../src/img/foodimg/whiskas.png",
                quantity: 2,
            },
            {
                id: 1,
                name: "Alimento para perro Natural Balance Adultos - 1.5Kg",
                price: 10000,
                image: "../src/img/foodimg/dogfood.png",
                quantity: 1,
            },
            {
                id: 2,
                name: "Alimento para gato Whiskas - 1Kg",
                price: 8000,
                image: "../src/img/foodimg/whiskas.png",
                quantity: 2,
            },
            {
                id: 1,
                name: "Alimento para perro Natural Balance Adultos - 1.5Kg",
                price: 10000,
                image: "../src/img/foodimg/dogfood.png",
                quantity: 1,
            },
            {
                id: 2,
                name: "Alimento para gato Whiskas - 1Kg",
                price: 8000,
                image: "../src/img/foodimg/whiskas.png",
                quantity: 2,
            },
             {
                id: 1,
                name: "Alimento para perro Natural Balance Adultos - 1.5Kg",
                price: 10000,
                image: "../src/img/foodimg/dogfood.png",
                quantity: 1,
            },
            {
                id: 2,
                name: "Alimento para gato Whiskas - 1Kg",
                price: 8000,
                image: "../src/img/foodimg/whiskas.png",
                quantity: 2,
            },

        ]
    };

    return (
        <div className="absolute-container-resumen-pedido">
            <Navbar />
            <div className="background-container-resumen-pedido">
                <div className="content-container-resumen">
                    <div className="info-pedido-card">
                        <div className="fila-superior">
                            <h4 className="pedido-id">{order.id}</h4>
                        </div>
                        <div className="fila-intermedia">
                            <p className="pedido-total">Total: {order.total}</p>
                            <p className="pedido-fecha">Fecha de compra: {order.fechaCompra}</p>
                        </div>
                    </div>

                    {/* Contenedor grande para los productos */}
                    <div className="productos-container">
                        {/* Título "Resumen" dentro del contenedor de productos */}
                        <div className="resumen-titulo">
                            <h2>Resumen</h2>
                        </div>

                        {order.productos.map((product) => (
                            <div key={product.id} className="producto-card">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="producto-imagen"
                                />
                                <div className="producto-detalles">
                                    <h3 className="producto-nombre">{product.name}</h3>
                                    <p className="producto-precio">${product.price}</p>
                                </div>
                                {/* Sección para mostrar la cantidad */}
                                <div className="producto-cantidad">
                                    <p className="cantidad-text">
                                        Cantidad: <span className="cantidad-numero">{product.quantity}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Botón de Eliminar Pedido */}
                    <div className="eliminar-pedido-container">
                        <button className="eliminar-pedido-btn">
                            <i className="fas fa-times"></i> Eliminar Pedido
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Pedido;
