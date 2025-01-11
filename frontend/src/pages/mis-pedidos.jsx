import React from "react";
import Navbar from "../components/navbar";
import "../styles/mis-pedidos.css";

const Pedidos = () => {
    const pedidos = [
        { id: "#2RYH6", total: 24000, fecha: "09/01/2025", estado: "Entregado" },
        { id: "#2RYH6", total: 24000, fecha: "09/01/2025", estado: "Entregado" },
        { id: "#2RYH6", total: 24000, fecha: "09/01/2025", estado: "Entregado" },
        { id: "#2RYH6", total: 24000, fecha: "09/01/2025", estado: "Entregado" },
        { id: "#2RYH6", total: 24000, fecha: "09/01/2025", estado: "Entregado" },
        { id: "#2RYH7", total: 24000, fecha: "09/01/2025", estado: "Entregado" }
    ];

    return (
        <div className="absolute-pedidos-container">
            <Navbar />
            <div className="contenedor-pedidos">
                {pedidos.map((pedido, index) => (
                    <div key={index} className="tarjeta-pedido">
                        <div className="fila-superior">
                            <div className="icono"></div>
                            <h4 className="id">{pedido.id}</h4>
                            <i class="fa-solid fa-chevron-right" id="chevron"></i>
                        </div>
                        <div className="fila-intermedia">
                            <p className="total">Total: ${pedido.total.toLocaleString()}</p>
                            <button className="estado">{pedido.estado}</button>
                        </div>
                        <div className="fila-inferior">
                            <p className="fecha">Fecha de compra: {pedido.fecha}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pedidos;
