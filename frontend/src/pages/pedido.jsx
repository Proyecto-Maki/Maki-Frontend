import { React, useState, useEffect } from "react";
import Navbar from "../components/navbar"; // Navbar personalizado
import "../styles/pedido.css"; // Importa el archivo CSS
import api from "../api.js"; // Importa el archivo api.js
import { useLocation, useNavigate } from "react-router-dom"; // Importa la función useNavigate de react-router-dom
import ErrorModal from "../components/ErrorModal";
import ConfirmationModal from "../components/ConfirmationModal";
import SuccessModal from "../components/SuccessModal.jsx";

const Pedido = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [dirNavigate, setDirNavigate] = useState("");

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
    window.location.href = "/iniciar-sesion";
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
          error.response
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


  const handleOpenConfirmationModal = (e, mascotaId) => {
    e.preventDefault();
    setShowConfirmationModal(true);
    setMascotaIdEliminar(mascotaId);
    console.log("Se abrió el modal de confirmación", mascotaId);
  };

  const handleYesConfirmationModal = async (e) => {
    setShowConfirmationModal(false);
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));
    await handleCancelarPedido(e);
  };

  const handleNoConfirmationModal = () => {
    setShowConfirmationModal(false);
    setMascotaIdEliminar(0);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError("");
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setError("");
    setResponse("");
  };

  const handleCancelarPedido = async (e) => {
    e.preventDefault();

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
        // alert(
        //   "Pedido cancelado exitosamente. Se ha reembolsado el monto a tu saldo."
        // );

        // Actualizar el saldo en sessionStorage
        const saldoActual = parseFloat(sessionStorage.getItem("saldo")) || 0;
        sessionStorage.setItem("saldo", saldoActual + parseFloat(pedido.total));

        setResponse("Pedido cancelado exitosamente. Se ha reembolsado el monto a tu saldo.");
        setDirNavigate("/mis-pedidos");
        setShowSuccessModal(true);

        // Redirigir a la lista de pedidos en lugar de intentar modificar `setPedidos`
        // navigate("/mis-pedidos");
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
              onClick={(e) => handleOpenConfirmationModal(e)}
            >
              <i className="fas fa-times"></i> Cancelar Pedido
            </button>
          </div>
        </div>
      </div>
      <ErrorModal
        show={showErrorModal}
        handleClose={handleCloseErrorModal}
        error={error}
      />
      <SuccessModal
        show={showSuccessModal}
        handleClose={handleCloseSuccessModal}
        response={response}
        dirNavigate={dirNavigate}
      />
      <ConfirmationModal
        show={showConfirmationModal}
        handleYes={handleYesConfirmationModal}
        handleNo={handleNoConfirmationModal}
        action="Cancelar pedido"
        response="¿Estás seguro de que deseas cancelar el pedido?"
      />
    </div>
  );
};

export default Pedido;
