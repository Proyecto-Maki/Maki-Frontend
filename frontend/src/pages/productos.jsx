import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importa Link para navegación
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/productos.css";
import generateRandomAlphaNumericCode, {
  randomValue,
} from "../GenerateCardCode";
import ProductSlider from "../pages/product-slider";
import Categories from "../components/categories";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState(""); // Para mostrar mensajes al usuario
  const [inCart, setInCart] = useState(() => {
    const savedCart = localStorage.getItem("inCart");
    return savedCart ? JSON.parse(savedCart) : {};
  }); // Estado para manejar si cada producto está en el carrito
  const cloudinaryBaseUrl = "https://res.cloudinary.com/dlktjxg1a/";
  const codigo_carrito =
    localStorage.getItem("codigo_carrito") ||
    (() => {
      const nuevoCodigo = generateRandomAlphaNumericCode(10); // Genera el código aleatorio
      localStorage.setItem("codigo_carrito", nuevoCodigo);
      return nuevoCodigo;
    })();
  console.log("Código del carrito generado:", codigo_carrito);

  const agregar_producto = (producto) => {
    const nuevoProducto = {
      codigo: codigo_carrito, // Código del carrito
      id_producto: producto.id, // ID del producto
    };

    // Log para verificar los datos enviados
    console.log("Datos enviados:", nuevoProducto);

    api
      .post("agregar_producto/", nuevoProducto)
      .then((res) => {
        console.log("Respuesta del servidor:", res.data);
        setMensaje("Producto agregado al carrito correctamente.");
        setTimeout(() => setMensaje(""), 3000); // Limpia el mensaje después de 3 segundos
        setInCart((prev) => {
          const updatedCart = { ...prev, [producto.id]: true };
          localStorage.setItem("inCart", JSON.stringify(updatedCart));
          return updatedCart;
        });
      })
      .catch((err) => {
        console.error("Error al agregar producto:", err.message);
        setMensaje("Error al agregar el producto al carrito.");
        setTimeout(() => setMensaje(""), 3000); // Limpia el mensaje después de 3 segundos
      });
  };

  const getProductos = () => {
    api
      .get("/productos/")
      .then((res) => {
        setProductos(res.data); // Guardamos los productos en el estado
        console.log("Productos:", res.data); // Verificamos los datos en consola
      })
      .catch((err) => alert("Error al obtener productos: " + err));
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="absolute-products-container">
      <Navbar />
      <ProductSlider />
      <Categories />
      <main className="main-content-products">
        <div className="container py-5">
          <header className="text-center mb-4">
            <h1
              className="display-4 welcome-text"
              style={{ fontFamily: "Koulen", color: "#8fc064" }}
            >
              Productos para tu Mascota
            </h1>
          </header>

          {/* Mensaje de feedback */}
          {mensaje && (
            <div className="alert alert-info text-center" role="alert">
              {mensaje}
            </div>
          )}

          {/* Renderizamos los productos */}
          {productos.length > 0 ? (
            <div className="row">
              {productos.map((producto) => (
                <div key={producto.slug} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm border-0 login-content">
                    <Link to={`/productos/${producto.slug}`}>
                      <img
                        src={`${cloudinaryBaseUrl}${producto.imagen}`} // Concatenamos la URL base con la ruta de la imagen
                        alt={producto.nombre} // Usamos "nombre" según tu API
                        className="card-img-top img-fluid logo-img-login"
                        style={{ borderRadius: "10px" }}
                      />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">{producto.nombre}</h5>
                      <p className="card-price">${producto.precio}</p>
                      <Link
                        to={`/productos/${producto.slug}`}
                        className="btn card-button"
                      >
                        <button class="details">
                          <span>Ver detalles</span>
                          <svg width="15px" height="10px" viewBox="0 0 13 10">
                            <path d="M1,5 L11,5"></path>
                            <polyline points="8 1 12 5 8 9"></polyline>
                          </svg>
                        </button>
                      </Link>
                      <button
                        className="btn-cart-products card-button mt-2"
                        onClick={() => agregar_producto(producto)}
                        disabled={inCart[producto.id]}
                      >
                        <div class="default-btn">
                          <svg
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            stroke="#ffffff"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="cart-icon"
                          >
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                          </svg>
                          <span>Agregar al carrito</span>
                        </div>
                        <div class="hover-btn">
                          <svg
                            viewBox="0 0 320 512"
                            width="12.5"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z"
                              fill="#ffffff"
                            ></path>
                          </svg>
                          <span>${producto.precio}</span>
                        </div>
                        {inCart ? "Agregado" : ""}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No hay productos disponibles.</p>
          )}
        </div>
      </main>
      <div className="footer-container-productos">
        <Footer />
      </div>
    </div>
  );
}

export default Productos;
