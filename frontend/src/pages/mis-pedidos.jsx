import { React, useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "../styles/mis-pedidos.css";
import { GiSittingDog } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../components/ErrorModal";
import api from "../api.js";

const Pedidos = () => {

	const navigate = useNavigate();
  if (
    !sessionStorage.getItem("email") ||
    !sessionStorage.getItem("token") ||
    !sessionStorage.getItem("refresh") ||
    !sessionStorage.getItem("is_cliente") ||
    !sessionStorage.getItem("is_fundacion")
  ) {
    window.location.href = "/login";
  }

  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const refresh = sessionStorage.getItem("refresh");
  const is_cliente = sessionStorage.getItem("is_cliente");
  const is_fundacion = sessionStorage.getItem("is_fundacion");
  const [pedidos, setPedidos] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState("");

  // const pedidos = [
  //   { id: "#2RYH6", total: 24000, fecha: "09/01/2025", estado: "Entregado" },
  //   { id: "#2RYH6", total: 24000, fecha: "09/01/2025", estado: "Entregado" },
  //   { id: "#2RYH6", total: 24000, fecha: "09/01/2025", estado: "Entregado" },
  //   { id: "#2RYH6", total: 24000, fecha: "09/01/2025", estado: "Entregado" },
  //   { id: "#2RYH6", total: 24000, fecha: "09/01/2025", estado: "Entregado" },
  //   { id: "#2RYH7", total: 24000, fecha: "09/01/2025", estado: "Entregado" },
  // ];

	const handleVerDetalle = (pedido) => {
		console.log(`Ver detalle del pedido ${pedido.id}`);
		navigate("/mi-pedido", { state: { pedido } });
	}

  useEffect(() => {
    api
      .get(`pedidos/user/${email}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setPedidos(response.data);
        } else {
          setError(response.data.message);
          setShowErrorModal(true);
        }
      })
      .catch((error) => {
        console.error(
          error.response ? error.response.data.detail : error.message
        );
        setError(error.response ? error.response.data.detail : error.message);
        setShowErrorModal(true);
      });
  }, []);

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError("");
  };

  return (
    <div className="absolute-pedidos-container-mi">
      <Navbar />
      <div className="contenedor-pedidos-mi">
        {pedidos.length === 0 ? (
          <div className="no-pedidos-mi">
            <h3>No hay pedidos</h3>
            <p>Realiza compras para ver pedidos</p>
          </div>
        ) : (
          pedidos.map((pedido, index) => (
            <div key={index} className="tarjeta-pedido-mi">
              <div className="fila-superior-mi">
                <div className="icono-mi">
                  <GiSittingDog />
                </div>
                <div className="id-mi-container">
                  <h4 className="id-mi"># {pedido.id}</h4>
                  <button className="ver-detalle-mi" onClick={() => handleVerDetalle(pedido)}>
                    <i class="fa-solid fa-chevron-right" id="chevron"></i>
                  </button>
                </div>
              </div>
              <div className="fila-intermedia-mi">
                <p className="total-mi">
                  Total: ${pedido.total.toLocaleString()}
                </p>
                <button className="estado-mi">{pedido.estado}</button>
              </div>
              <div className="fila-inferior-mi">
                <p className="fecha-mi">
                  Fecha de compra:{" "}
                  {new Date(pedido.fecha).toLocaleString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <ErrorModal
        show={showErrorModal}
        handleClose={handleCloseErrorModal}
        error={error}
      />
    </div>
  );
};

export default Pedidos;
