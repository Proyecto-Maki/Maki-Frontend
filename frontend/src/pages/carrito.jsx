import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar"; // Navbar personalizado
import LoadingPage from "../components/loading-page";
import api from "../api"; // Tu configuración de Axios para el backend
import "../styles/carrito.css"; // Importa el archivo CSS
import MercadoPagoimg from "../img/mercadopago.png";
import LogoMakiimg from "../img/Logotipo Maki.png";
import { formatMoney } from "../functions";

const Carrito = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saldo, setSaldo] = useState(0);
  const [metodoPago, setMetodoPago] = useState("mercadoPago"); // Estado para el método de pago

  const fetchCart = async () => {
    try {
      let codigoCarrito = localStorage.getItem("codigo_carrito");
      if (!codigoCarrito) {
        codigoCarrito = generateRandomAlphaNumericCode(10);
        localStorage.setItem("codigo_carrito", codigoCarrito);
      }

      const response = await api.get(
        `/get_estado_carrito?codigo_carrito=${codigoCarrito}`
      );

      const productos = response.data.productos.map((item) => ({
        id: item.id,
        name: item.name,
        price: parseFloat(item.price),
        image: item.image,
        quantity: item.cantidad,
      }));
      console.log("Productos del carrito:", productos);
      setCart(productos);
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
    } finally {
      setIsLoading(false);
      console.log("Carrito cargado.");
    }
  };

  const fetchSaldo = async () => {
    try {
      const email = sessionStorage.getItem("email");
      if (!email) return;

      const esCliente = sessionStorage.getItem("is_cliente") === "true";
      const esFundacion = sessionStorage.getItem("is_fundacion") === "true";
      let endpoint = esCliente
        ? `cliente-profile/?email=${email}`
        : `fundacion-profile/?email=${email}`;

      const response = await api.get(endpoint, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setSaldo(parseFloat(response.data.saldo));
      }
    } catch (error) {
      console.error("Error al obtener el saldo del usuario:", error);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      localStorage.removeItem("codigo_carrito");
      sessionStorage.setItem("wasPaid", "true");
      window.location.href = "/mis-pedidos/";
    } catch (error) {
      console.error("Error al manejar el pago exitoso:", error);
    }
  };

  const handlePayment = async () => {
    const totalCompra = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    const userId = sessionStorage.getItem("user_id");
    const token = sessionStorage.getItem("token");

    if (!userId || !token) {
      alert("Error: No estás autenticado. Inicia sesión nuevamente.");
      return;
    }

    if (metodoPago === "saldo") {
      if (saldo >= totalCompra) {
        try {
          const response = await api.post(
            "/pagar_con_saldo_maki", // no me gustan las barras al final diosmio
            {
              codigo_carrito: localStorage.getItem("codigo_carrito"),
              user_id: userId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            alert("✅ Pago realizado con éxito usando saldo de Maki!");
            localStorage.removeItem("codigo_carrito");
            window.location.href = "/mis-pedidos/";
          } else {
            console.error("Error en la respuesta del servidor:", response);
            alert("⚠️ Error al procesar el pago con saldo.");
          }
        } catch (error) {
          console.error("Error al pagar con saldo:", error);
          alert("Ocurrió un error al procesar el pago con saldo.");
        }
      } else {
        alert("⚠️ Saldo insuficiente para completar la compra.");
      }
    } else {
      try {
        const items = cart.map((product) => ({
          title: product.name,
          quantity: product.quantity,
          unit_price: product.price,
          currency_id: "COP",
        }));

        const response = await api.post(
          "/create_preference/",
          {
            items,
            user_id: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // También asegurar autenticación
            },
          }
        );

        const initPoint = response.data.init_point;
        if (initPoint) {
          localStorage.removeItem("codigo_carrito");
          window.location.href = initPoint;
        } else {
          alert("❌ Error: No se encontró el enlace de pago.");
        }
      } catch (error) {
        console.error("Error al iniciar el pago:", error);
        alert("Error al procesar el pago con Mercado Pago.");
      }
    }
  };

  const updateProductQuantity = async (id, quantity) => {
    console.log(`Iniciando updateProductQuantity para producto ID ${id}...`);
    try {
      const codigoCarrito = localStorage.getItem("codigo_carrito");
      console.log("Código del carrito para actualización:", codigoCarrito);

      console.log("Datos enviados al backend:", {
        codigo_carrito: codigoCarrito,
        producto_id: id,
        cantidad: quantity,
      });

      const response = await api.post("/update_cantidad_producto/", {
        codigo_carrito: codigoCarrito,
        producto_id: id,
        cantidad: quantity,
      });

      console.log(
        `Respuesta del backend para updateProductQuantity (ID ${id}):`,
        response.data
      );
    } catch (error) {
      console.error("Error al actualizar la cantidad del producto:", error);
    }
  };

  // Incrementar cantidad
  const increaseQuantity = (id) => {
    console.log(`Incrementando cantidad para producto ID ${id}...`);
    const updatedCart = cart.map((product) =>
      product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );

    console.log("Carrito actualizado localmente (incrementar):", updatedCart);
    setCart(updatedCart);

    const product = updatedCart.find((product) => product.id === id);
    console.log(
      `Cantidad nueva del producto ID ${id}:`,
      product ? product.quantity : "No encontrado"
    );

    updateProductQuantity(id, product.quantity);
  };

  // Decrementar cantidad
  const decreaseQuantity = (id) => {
    console.log(`Decrementando cantidad para producto ID ${id}...`);
    const updatedCart = cart.map((product) =>
      product.id === id && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );

    console.log("Carrito actualizado localmente (decrementar):", updatedCart);
    setCart(updatedCart);

    const product = updatedCart.find((product) => product.id === id);
    console.log(
      `Cantidad nueva del producto ID ${id}:`,
      product ? product.quantity : "No encontrado"
    );

    if (product && product.quantity > 0) {
      updateProductQuantity(id, product.quantity);
    }
  };

  // Eliminar producto del carrito
  const removeFromCart = async (id) => {
    console.log(`Iniciando eliminación del producto ID ${id} del carrito...`);
    try {
      const codigoCarrito = localStorage.getItem("codigo_carrito");
      console.log("Código del carrito obtenido:", codigoCarrito);

      const requestData = {
        codigo_carrito: codigoCarrito,
        producto_id: id,
      };

      console.log("Datos enviados al backend para eliminación:", requestData);

      // Llamada al backend para eliminar el producto
      const response = await api.post(
        "/remove_product_from_cart/",
        requestData
      );

      console.log(
        `Respuesta del backend para eliminar producto ID ${id}:`,
        response.data
      );

      // Actualizar el estado local después de eliminar
      const updatedCart = cart.filter((product) => product.id !== id);
      console.log("Carrito actualizado localmente (eliminar):", updatedCart);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
      if (error.response) {
        console.log(
          "Datos de respuesta del backend (error):",
          error.response.data
        );
        console.log("Estado de la respuesta:", error.response.status);
      }
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("wasPaid")) {
      handlePaymentSuccess();
    }
    fetchCart();
    const wasPaid = sessionStorage.getItem("wasPaid");
    if (wasPaid) {
      console.log("✅ Pago detectado, reseteando carrito...");
      localStorage.removeItem("codigo_carrito");
      sessionStorage.removeItem("wasPaid"); // Limpiar flag de pago
      setCart([]);
      fetchCart(); // Volver a obtener un carrito vacío
    }

    fetchSaldo();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="absolute-container-carrito">
      <Navbar />
      <div className="background-container-carrito">
        <div className="content-container-carrito">
          <div className="left-column">
            <div className="top-row">
              <div className="payment-card">
                <h3 className="card-title">Tu información de pago</h3>
                <div className="payment-method">
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="mercadoPago"
                      name="payment"
                      className="btn-payment"
                      checked={metodoPago === "mercadoPago"}
                      onChange={() => setMetodoPago("mercadoPago")}
                    />
                    <label htmlFor="mercadoPago">
                      <img
                        src={MercadoPagoimg}
                        alt="Mercado Pago"
                        width="24"
                        height="24"
                      />
                      Mercado Pago
                    </label>
                  </div>
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="saldo"
                      name="payment"
                      className="btn-payment"
                      checked={metodoPago === "saldo"}
                      onChange={() => setMetodoPago("saldo")}
                    />
                    <label htmlFor="saldo">
                      <img src={LogoMakiimg} alt="Maki" className="maki-icon" />
                      Saldo (disponible: {formatMoney(saldo)} COP)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="middle-row">
              {cart.length === 0 ? (
                <p>Carrito vacío :(</p>
              ) : (
                cart.map((product) => (
                  <div key={product.id} className="product-card">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="product-details">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-price">
                        ${(product.price * product.quantity).toLocaleString()}
                      </p>
                    </div>
                    <div className="d-flex flex-column">
                      <div className="quantity-controls">
                        <button
                          className="quantity-button"
                          onClick={() => decreaseQuantity(product.id)}
                        >
                          -
                        </button>

                        <span className="quantity-display">
                          {product.quantity}
                        </span>

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
                        <i className="fas fa-trash-alt remove-icon"></i>{" "}
                        <span className="remove-text">Remover</span>{" "}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="right-column">
            <div className="summary-card">
              <h3 className="card-title">Resumen de compra</h3>
              <p>
                Precio sin IVA:{" "} {formatMoney(cart
                  .reduce(
                    (total, product) =>
                      total + product.price * product.quantity,
                    0
                  ))
                  } COP
              </p>
              <p>
                <strong>
                  TOTAL: {" "} {formatMoney(cart
                    .reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    ))
                    } COP
                </strong>
              </p>
              <button className="Btn-carrito-pay" onClick={handlePayment}>
                Pagar
                <svg className="svgIcon" viewBox="0 0 576 512">
                  <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
