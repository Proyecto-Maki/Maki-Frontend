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
          setError(res.data.message);
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
  const handleCancelarPedido = async () => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas cancelar este pedido? Se reembolsará el total a tu saldo."
    );

    if (!confirmacion) return; // Si el usuario cancela, no hace la petición

    console.log(
      `Intentando cancelar pedido en: pedidos/${pedido.id}/cancelar/`
    );

    try {
      const response = await api.put(
        `pedidos/${pedido.id}/cancelar/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Respuesta de la API:", response);

      if (response.status === 200) {
        alert(
          "Pedido cancelado exitosamente. Se ha reembolsado el monto a tu saldo."
        );

        // Actualizar el saldo en sessionStorage
        const saldoActual = parseFloat(sessionStorage.getItem("saldo")) || 0;
        sessionStorage.setItem("saldo", saldoActual + parseFloat(pedido.total));

        // Redirigir a la lista de pedidos en lugar de intentar modificar `setPedidos`
        navigate("/mis-pedidos");
      } else {
        setError(response.data.message);
        setShowErrorModal(true);
      }
    } catch (error) {
      console.log(
        "Error en la API:",
        error.response ? error.response.data : error.message
      );
      setError(error.response ? error.response.data.detail : error.message);
      setShowErrorModal(true);
    }
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
            <button
              className="eliminar-pedido-btn"
              onClick={handleCancelarPedido}
            >
              <i className="fas fa-times"></i> Cancelar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedido;
