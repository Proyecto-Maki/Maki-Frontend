import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar"; // Navbar personalizado
import LoadingPage from "../components/loading-page";
import api from "../api"; // Tu configuración de Axios para el backend
import "../styles/carrito.css"; // Importa el archivo CSS

const Carrito = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const codigoCarrito = localStorage.getItem("codigo_carrito"); // Recuperar el código del carrito
      const response = await api.get(
        `/get_estado_carrito?codigo_carrito=${codigoCarrito}`
      );
      const productos = response.data.productos.map((item) => ({
        id: item.id,
        name: item.producto.nombre,
        price: parseFloat(item.producto.precio),
        image: `https://res.cloudinary.com/dlktjxg1a/${item.producto.imagen}`,
        quantity: item.cantidad,
      }));
      setCart(productos);
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  useEffect(() => {
    fetchCart();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="absolute-container-carrito">
      <Navbar />
      <div className="background-container-carrito">
        <div className="content-container-carrito">
          {/* Columna izquierda */}
          <div className="left-column">
            {/* Información de pago */}
            <div className="payment-card">
              <h3 className="card-title">Tu información de pago</h3>
              <div className="payment-method">
                <input
                  type="radio"
                  id="mercadoPago"
                  name="payment"
                  className="btn-payment"
                  defaultChecked
                />
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
                    <i className="fas fa-trash-alt remove-icon"></i>{" "}
                    {/* Ícono de eliminar de Font Awesome */}
                    <span className="remove-text">Remover</span>{" "}
                    {/* Texto "Remover" */}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Columna derecha */}
          <div className="right-column">
            <div className="summary-card">
              <h3 className="card-title">Resumen de compra</h3>
              <p>Precio sin IVA: ${totalPrice.toLocaleString()}</p>
              <p>
                <strong>TOTAL: ${totalPrice.toLocaleString()}</strong>
              </p>
              {/* Botón de pagar */}
              <button className="Btn-carrito-pay">
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
