import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importa Link para navegación
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/makipaws.css";
import generateRandomAlphaNumericCode, {
  randomValue,
} from "../GenerateCardCode";
import MakipawsSlider from "../pages/makipaws_banner";
import Categories from "../components/categories";
import foto_perfil_cuidador from "../img/Mari Juliano.jpg";

function Makipaws() {
  /*const [productos, setProductos] = useState([]);
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
  }, []);*/

  return (
    <div className="absolute-products-container">
      <div className="products-container">
      <Navbar />
      <MakipawsSlider />
      <Categories />
      <main className="main-content-products">
        <div className="container py-5">
          {/* Mensaje de feedback */}
          {/*{mensaje && (
            <div className="alert alert-info text-center" role="alert">
              {mensaje}
            </div>
          )}*/}

          {/* Renderizamos los productos */}
          {/*{productos.length > 0 ? (*/}
            <div className="row-productos">
              {/*{productos.map((producto) => (*/}
                <div className="col-md-4 mb-4">
                  <div className="card-productos">
                      <img
                        src={foto_perfil_cuidador} 
                        alt={foto_perfil_cuidador}
                        className="card-img-top img-fluid logo-img-login"
                        style={{ borderRadius: "10px" }}
                      />
                    <div className="card-body">
                      <h5 className="card-title">Julian</h5>
                      <p className="card-price">a</p>
                      <Link
                        to={`/productos`}
                        className="btn card-button"
                      >
                        <button class="details">
                          <span>¡Me interesa!</span>
                          <svg width="15px" height="10px" viewBox="0 0 13 10">
                            <path d="M1,5 L11,5"></path>
                            <polyline points="8 1 12 5 8 9"></polyline>
                          </svg>
                        </button>
                      </Link>
                      
                    </div>
                  </div>
                </div>
              {/*}))}*/}
            </div>
          {/*}) : (
            <p className="text-center">No hay cuidadores disponibles.</p>
          )}*/}
        </div>
      </main>
      <div className="footer-container-productos">
        <Footer />
      </div>
      </div>
      
    </div>
  );
}

export default Makipaws;