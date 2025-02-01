import { React, useState, useEffect } from "react";
import Navbar from "../components/navbar"; // Navbar personalizado
import "../styles/pedido.css"; // Importa el archivo CSS
import api from "../api.js"; // Importa el archivo api.js
import ErrorModal from "../components/ErrorModal";
import { useLocation, useNavigate } from "react-router-dom"; // Importa la función useNavigate de react-router-dom

const Pedido = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");
  const refresh = sessionStorage.getItem("refresh");
  const is_cliente = sessionStorage.getItem("is_cliente");
  const is_fundacion = sessionStorage.getItem("is_fundacion");

  const [detalles, setDetalles] = useState([]);

  if (
    !sessionStorage.getItem("email") ||
    !sessionStorage.getItem("token") ||
    !sessionStorage.getItem("refresh") ||
    !sessionStorage.getItem("is_cliente") ||
    !sessionStorage.getItem("is_fundacion")
  ) {
    window.location.href = "/login";
  }

  const { pedido } = location.state || {};

  if (!pedido) {
    window.location.href = "/mis-pedidos";
    return;
  }

  useEffect(() => {
    api
      .get(`detalles-pedido/pedido/${pedido.id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setDetalles(res.data);
          console.log(detalles);
        } else {
          console.error("Error al obtener los detalles del pedido:", res);
          setError("Error al obtener los detalles del pedido");
          setShowErrorModal(true);
        }
      })
      .catch((error) => {
        console.error(error.response);
        setError(
          error.response.data.detail
            ? error.response.data.detail
            : "Error al obtener los detalles del pedido"
        );
        setShowErrorModal(true);
      });
  }, []);

  const order = {
    id: pedido.id,
    total: pedido.total,
    fechaCompra: new Date(pedido.fecha).toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }),
    productos: detalles.map((detalle) => ({
      id: detalle.id,
      name: detalle.producto.nombre,
      price: detalle.producto.precio,
      image: detalle.producto.imagen,
      quantity: detalle.cantidad,
    })),
  };

  useEffect(() => {
    console.log("La orden es: ", order);
  }, [order]);

  //   const order = {
  //     id: "2343242",
  //     total: "$40000",
  //     fechaCompra: "09/10/2003",
  //     productos: [
  //       {
  //         id: 1,
  //         name: "Alimento para perro Natural Balance Adultos - 1.5Kg",
  //         price: 10000,
  //         image: "../src/img/foodimg/dogfood.png",
  //         quantity: 1,
  //       },
  //       {
  //         id: 2,
  //         name: "Alimento para gato Whiskas - 1Kg",
  //         price: 8000,
  //         image: "../src/img/foodimg/whiskas.png",
  //         quantity: 2,
  //       },
  //       {
  //         id: 1,
  //         name: "Alimento para perro Natural Balance Adultos - 1.5Kg",
  //         price: 10000,
  //         image: "../src/img/foodimg/dogfood.png",
  //         quantity: 1,
  //       },
  //       {
  //         id: 2,
  //         name: "Alimento para gato Whiskas - 1Kg",
  //         price: 8000,
  //         image: "../src/img/foodimg/whiskas.png",
  //         quantity: 2,
  //       },
  //       {
  //         id: 1,
  //         name: "Alimento para perro Natural Balance Adultos - 1.5Kg",
  //         price: 10000,
  //         image: "../src/img/foodimg/dogfood.png",
  //         quantity: 1,
  //       },
  //       {
  //         id: 2,
  //         name: "Alimento para gato Whiskas - 1Kg",
  //         price: 8000,
  //         image: "../src/img/foodimg/whiskas.png",
  //         quantity: 2,
  //       },
  //       {
  //         id: 1,
  //         name: "Alimento para perro Natural Balance Adultos - 1.5Kg",
  //         price: 10000,
  //         image: "../src/img/foodimg/dogfood.png",
  //         quantity: 1,
  //       },
  //       {
  //         id: 2,
  //         name: "Alimento para gato Whiskas - 1Kg",
  //         price: 8000,
  //         image: "../src/img/foodimg/whiskas.png",
  //         quantity: 2,
  //       },
  //     ],
  //   };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError("");
  };

  return (
    <div className="absolute-container-resumen-pedido">
      <Navbar />
      <div className="background-container-resumen-pedido">
        <div className="content-container-resumen">
          <div className="info-pedido-card">
            <div className="fila-superior">
              <h4 className="pedido-id"># {order.id}</h4>
            </div>
            <div className="fila-intermedia">
              <p className="pedido-total">Total: {order.total}</p>
              <p className="pedido-fecha">
                Fecha de compra: {order.fechaCompra}
              </p>
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
                  src={`https://res.cloudinary.com/dlktjxg1a/${product.image}`}
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
                    Cantidad:{" "}
                    <span className="cantidad-numero">{product.quantity}</span>
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
