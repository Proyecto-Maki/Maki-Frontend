import React from "react";
import Navbar from "../components/navbar";
import "../styles/mis-pedidos.css";
import { GiSittingDog } from "react-icons/gi";

const Pedidos = () => {
  const pedidos = [
    { id: "#2RYH6", total: 24000, fecha: "09/01/2025", estado: "Entregado" },
    { id: "#2RYH6", total: 24000, fecha: "09/01/2025", estado: "Entregado" },
    { id: "#2RYH6", total: 24000, fecha: "09/01/2025", estado: "Entregado" },
    { id: "#2RYH6", total: 24000, fecha: "09/01/2025", estado: "Entregado" },
    { id: "#2RYH6", total: 24000, fecha: "09/01/2025", estado: "Entregado" },
    { id: "#2RYH7", total: 24000, fecha: "09/01/2025", estado: "Entregado" },
  ];

  return (
    <div className="absolute-pedidos-container-mi">
      <Navbar />
      <div className="contenedor-pedidos-mi">
        {pedidos.map((pedido, index) => (
          <div key={index} className="tarjeta-pedido-mi">
            <div className="fila-superior-mi">
              <div className="icono-mi">
                <GiSittingDog />
              </div>
              <div className="id-mi-container">
                <h4 className="id-mi">{pedido.id}</h4>
                <i class="fa-solid fa-chevron-right" id="chevron"></i>
              </div>
            </div>
            <div className="fila-intermedia-mi">
              <p className="total-mi">
                Total: ${pedido.total.toLocaleString()}
              </p>
              <button className="estado-mi">{pedido.estado}</button>
            </div>
            <div className="fila-inferior-mi">
              <p className="fecha-mi">Fecha de compra: {pedido.fecha}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pedidos;
