import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar"; // Navbar personalizado
import LoadingPage from "../components/loading-page";
import api from "../api"; // Tu configuración de Axios para el backend
import "../styles/carrito.css"; // Importa el archivo CSS

const Carrito = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCart = async () => {
    console.log("Iniciando fetchCart...");
    try {
      const codigoCarrito = localStorage.getItem("codigo_carrito");
      console.log("Código del carrito obtenido:", codigoCarrito);

      const response = await api.get(
        `/get_estado_carrito?codigo_carrito=${codigoCarrito}`
      );
      console.log("Respuesta del backend (carrito):", response.data);

      const productos = response.data.productos.map((item) => ({
        id: item.id, // Este ID ahora corresponde al Producto.id real
        name: item.name,
        price: parseFloat(item.price),
        image: item.image,
        quantity: item.cantidad,
      }));

      console.log("Productos mapeados del backend:", productos);
      setCart(productos);
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
    } finally {
      setIsLoading(false);
      console.log("Finalizado fetchCart.");
    }
  };

  const handlePayment = async () => {
    try {
      const items = cart.map((product) => ({
        title: product.name,
        quantity: product.quantity,
        unit_price: product.price,
        currency_id: "COP",
      }));

      console.log("Datos enviados al backend para crear la preferencia:", {
        items,
      });

      // Llama al backend para crear la preferencia
      const response = await api.post("/create_preference/", { items });

      const initPoint = response.data.init_point; // Obtiene el init_point del backend
      console.log("URL de Mercado Pago (init_point):", initPoint);

      if (initPoint) {
        window.location.href = initPoint; // Redirige al usuario al checkout de Mercado Pago
      } else {
        console.error("No se encontró init_point en la respuesta del backend.");
      }
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
    }
  };

  // Actualizar cantidad de un producto
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
                      {/* Ícono de eliminar de Font Awesome */}
                      <span className="remove-text">Remover</span>{" "}
                      {/* Texto "Remover" */}
                    </button>
                  </div>
                </div>
              ))
            )}
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
