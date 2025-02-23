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

      setCart(productos);
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
    } finally {
      setIsLoading(false);
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
          alert("❌ Ocurrió un error al procesar el pago con saldo.");
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
        alert("❌ Error al procesar el pago con Mercado Pago.");
      }
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("wasPaid")) {
      handlePaymentSuccess();
    }
    fetchCart();
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
                      Saldo (disponible: ${formatMoney(saldo)})
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
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="right-column">
            <div className="summary-card">
              <h3 className="card-title">Resumen de compra</h3>
              <p>
                Precio sin IVA: $
                {cart
                  .reduce(
                    (total, product) =>
                      total + product.price * product.quantity,
                    0
                  )
                  .toLocaleString()}
              </p>
              <p>
                <strong>
                  TOTAL: $
                  {cart
                    .reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )
                    .toLocaleString()}
                </strong>
              </p>
              <button className="Btn-carrito-pay" onClick={handlePayment}>
                Pagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
