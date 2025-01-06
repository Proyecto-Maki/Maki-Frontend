import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importa Link para navegación
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/productos.css";

function Productos() {
  const [productos, setProductos] = useState([]);
  const cloudinaryBaseUrl = "https://res.cloudinary.com/dlktjxg1a/";

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
    <div className="absolute-home-container">
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
                      <button className="btn btn-warning w-100 login-btn mt-2">
                        Agregar al carrito
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
      {/* <Footer /> */}
    </div>
  );
}

export default Productos;
