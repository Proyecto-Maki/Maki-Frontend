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

function Productos() {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState(""); // Para mostrar mensajes al usuario
  const cloudinaryBaseUrl = "https://res.cloudinary.com/dlktjxg1a/";
  const codigo_carrito =
    localStorage.getItem("codigo_carrito") ||
    (() => {
      const nuevoCodigo = generateRandomAlphaNumericCode(10); // Genera el código aleatorio
      localStorage.setItem("codigo_carrito", nuevoCodigo);
      return nuevoCodigo;
    })();
  console.log("Código del carrito generado:", codigo_carrito);

  const [inCart, setIncart] = useState(false);

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
        setIncart(true);
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
      .then((res) => res.data)
      .then((data) => {
        setProductos(data); // Guardamos los productos en el estado
        console.log("Productos:", data); // Verificamos los datos en consola
      })
      .catch((err) => alert("Error al obtener productos: " + err));
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="absolute-products-container">
      <Navbar />
      <main className="main-content">
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
                      <h5
                        className="card-title"
                        style={{ fontFamily: "Koulen", color: "#f39029" }}
                      >
                        {producto.nombre}
                      </h5>
                      <p className="card-text text-muted">
                        {producto.descripcion}
                      </p>
                      <p className="card-text text-primary fw-bold">
                        ${producto.precio}
                      </p>
                      <Link
                        to={`/productos/${producto.slug}`}
                        className="btn btn-primary w-100"
                      >
                        Ver detalles
                      </Link>
                      <button
                        className="btn btn-warning w-100 login-btn mt-2"
                        onClick={() => agregar_producto(producto)}
                        disabled={inCart}
                      >
                        {inCart ? "Agregado" : "Agregar al carrito"}
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
