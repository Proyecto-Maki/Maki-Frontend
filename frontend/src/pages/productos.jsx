import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/productos.css";

function Productos() {
  const [productos, setProductos] = useState([]);

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
              <div key={producto.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm border-0 login-content">
                  <img
                    src={producto.imagen} // Usamos "imagen" según tu API
                    alt={producto.nombre} // Usamos "nombre" según tu API
                    className="card-img-top img-fluid logo-img-login"
                    style={{ borderRadius: "10px" }}
                  />
                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{ fontFamily: "Koulen", color: "#f39029" }}
                    >
                      {producto.nombre} {/* Usamos "nombre" según tu API */}
                    </h5>
                    <p className="card-text text-muted">
                      {producto.descripcion}{" "}
                      {/* Usamos "descripcion" según tu API */}
                    </p>
                    <p className="card-text text-primary fw-bold">
                      ${producto.precio} {/* Usamos "precio" según tu API */}
                    </p>
                    <button className="btn btn-warning w-100 login-btn">
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

      <Footer />
    </div>
  );
}

export default Productos;
