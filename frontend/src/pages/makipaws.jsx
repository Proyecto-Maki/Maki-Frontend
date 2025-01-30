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
import item from "../img/paw-item-adoption.png";

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

  const cuidadores = [
    {
      id: 1,
      nombre: "Julian",
      imagen: foto_perfil_cuidador,
      ocupacion: "Cuidador experto en perros pequeños.",
      categoriaMascotas: "Perros",
      localidad: "Chapinero",
      experiencia: "Julián es un técnico enfocado en el cuidado de lagartos. Contó con experiencia trabajando en zoológicos y santuarios de animales."
    },
    {
      id: 2,
      nombre: "Mariana",
      imagen: foto_perfil_cuidador,
      ocupacion: "Cuidadora especializada en gatos.",
      categoriaMascotas: "Gatos",
      localidad: "Usaquén",
      experiencia: "Julián es un técnico enfocado en el cuidado de lagartos. Contó con experiencia trabajando en zoológicos y santuarios de animales."
    },
    {
      id: 3,
      nombre: "Carlos",
      imagen: foto_perfil_cuidador,
      ocupacion: "Cuidador con experiencia en aves y exóticos.",
      categoriaMascotas: "Aves",
      localidad: "Galerías",
      experiencia: "Julián es un técnico enfocado en el cuidado de lagartos. Contó con experiencia trabajando en zoológicos y santuarios de animales."
    },
    {
      id: 4,
      nombre: "Kelly",
      imagen: foto_perfil_cuidador,
      ocupacion: "Veterinaria.",
      categoriaMascotas: "Gatos",
      localidad: "Fontibón",
      experiencia: "Julián es un técnico enfocado en el cuidado de lagartos. Contó con experiencia trabajando en zoológicos y santuarios de animales."
    },
  ];
  

  return (
    <div className="absolute-makipaws-container">
      <div className="makipaws-container">
      <Navbar />
      <MakipawsSlider />
      <Categories />
      <main className="main-content-makipaws">
        <div className="container py-5">
          {/* Mensaje de feedback */}
          {/*{mensaje && (
            <div className="alert alert-info text-center" role="alert">
              {mensaje}
            </div>
          )}*/}

          {/* Renderizamos los productos */}
          {/*{productos.length > 0 ? (*/}
          <div className="row-makipaws">
            {cuidadores.map((cuidador) => (
              <div className="columns-makipaws" key={cuidador.id}>
                <div className="card-makipaws">
                  <div className="image-cuidador">
                    <img
                      src={cuidador.imagen}
                      alt={cuidador.nombre}
                      className="card-img-top"
                      style={{ borderRadius: "50%", marginTop: "5%"}}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-name">{cuidador.nombre}</h5>
                      <div className="card-information">
                        <p className="card-ocupation">
                        <img
                              src={item}
                              alt="item"
                              className="item"
                              style={{ height: "20px", marginRight: "10px" }}
                        />
                        <strong>
                          Ocupación:
                        </strong>
                          {cuidador.ocupacion}
                        </p>

                        <p className="card-category">
                          <img
                              src={item}
                              alt="item"
                              className="item"
                              style={{ height: "20px", marginRight: "10px" }}
                            />
                          <strong>
                            Categoría:
                          </strong>
                          {cuidador.categoriaMascotas}
                        </p>

                        <p className="card-locality">
                          <img
                              src={item}
                              alt="item"
                              className="item"
                              style={{ height: "20px", marginRight: "10px" }}
                            />
                          <strong>
                            Localidad:
                          </strong>
                          {cuidador.localidad}
                        </p>

                        <p className="card-experience">
                          <img
                              src={item}
                              alt="item"
                              className="item"
                              style={{ height: "20px", marginRight: "10px" }}
                            />
                          <strong>
                            Experiencia:
                          </strong>
                          {cuidador.experiencia}
                        </p>
                      </div>
                    <Link to={`/info-cuidador/${cuidador.id}`} className="btn card-button">
                      <button className="details-cuidador">
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
            ))}
          </div>

          {/*}) : (
            <p className="text-center">No hay cuidadores disponibles.</p>
          )}*/}
        </div>
      </main>
      <div className="footer-container-makipaws">
        <Footer />
      </div>
      </div>
      
    </div>
  );
}

export default Makipaws;