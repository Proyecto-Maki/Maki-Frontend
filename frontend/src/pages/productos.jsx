import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"; // Importa Link para navegación
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/productos.css";
import generateRandomAlphaNumericCode from "../GenerateCardCode";
import ProductSlider from "../pages/product-slider";
import LoadingPage from "../components/loading-page";

import { use } from "react";
import Categories from "../components/categories";

function Productos() {
  const [isLoading, setIsLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const [cartProducts, setCartProducts] = useState([]); // Almacena los productos del carrito
  const [mensaje, setMensaje] = useState(""); // Para mostrar mensajes al usuario
  const [inCart, setInCart] = useState({}); // Estado para manejar productos en el carrito

  const cloudinaryBaseUrl = "https://res.cloudinary.com/dlktjxg1a/";
  const [categoriaPrincipal, setCategoriaPrincipal] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [subcategoria, setSubcategoria] = useState(null);
  const [filtroPrecio, setFiltroPrecio] = useState("Todos");

  // Obtener código del carrito o generarlo si no existe
  const codigo_carrito =
    localStorage.getItem("codigo_carrito") ||
    (() => {
      const nuevoCodigo = generateRandomAlphaNumericCode(10);
      localStorage.setItem("codigo_carrito", nuevoCodigo);
      return nuevoCodigo;
    })();

  console.log("Código del carrito generado:", codigo_carrito);

  // Obtener los productos del carrito
  const fetchCart = async () => {
    console.log("Iniciando fetchCart...");
    try {
      let codigoCarrito = localStorage.getItem("codigo_carrito");
      console.log("Código del carrito obtenido:", codigoCarrito);

      const response = await api.get(
        `/get_estado_carrito?codigo_carrito=${codigoCarrito}`
      );
      console.log("Respuesta del backend (carrito):", response.data);

      const productosEnCarrito = response.data.productos.map((item) => item.id);
      if (response.status === 404) {
        console.warn("❌ No se encontró el carrito, generando uno nuevo...");
        const nuevoCodigo = generateRandomAlphaNumericCode(10);
        localStorage.setItem("codigo_carrito", nuevoCodigo);
        return;
      }
      setCartProducts(productosEnCarrito);

      // Marcar productos en el carrito
      setInCart((prev) => {
        const updatedCart = {};
        productosEnCarrito.forEach((id) => (updatedCart[id] = true));
        return updatedCart;
      });
    } catch (error) {
      console.error("❌ Error al obtener los productos del carrito:", error);
    } finally {
      setIsLoading(false);
      console.log("Finalizado fetchCart.");
    }
  };

  // Obtener los productos de la tienda
  const getProductos = () => {
    try {
      // const response = await api.get("/productos/");
      // setProductos(response.data);
      // console.log("Productos obtenidos:", response.data);
      // const categoria_principal = selectedCategory;
      // const categoria = selectedSubcategory;
      // const subcategoria = selectedSubsubcategory;
      // console.log("Categoría principal:", categoria_principal);
      // console.log("Categoría:", categoria);
      // console.log("Subcategoría:", subcategoria);
    } catch (error) {
      alert("Error al obtener productos: " + error);
    }
  };

  // Agregar producto al carrito
  const agregar_producto = (producto) => {
    const userId = sessionStorage.getItem("user_id"); // Obtener user_id desde sessionStorage

    if (!userId) {
      console.error("❌ Error: No se encontró user_id en sessionStorage");
      setMensaje("Error: No se encontró usuario. Inicia sesión.");
      return;
    }

    const nuevoProducto = {
      codigo: codigo_carrito,
      id_producto: producto.id,
      user_id: userId, // Agregar user_id en la petición
    };

    console.log("📌 Enviando datos al backend:", nuevoProducto);

    api
      .post("agregar_producto/", nuevoProducto)
      .then((res) => {
        console.log("✅ Respuesta del servidor:", res.data);
        setMensaje("Producto agregado al carrito correctamente.");
        setTimeout(() => setMensaje(""), 3000);

        // Marcar producto como agregado
        setInCart((prev) => {
          const updatedCart = { ...prev, [producto.id]: true };
          return updatedCart;
        });

        // Actualizar productos en carrito
        setCartProducts((prev) => [...prev, producto.id]);
      })
      .catch((err) => {
        console.error("❌ Error al agregar producto:", err.message);
        setMensaje("Error al agregar el producto al carrito.");
        setTimeout(() => setMensaje(""), 3000);
      });
  };

  // Cargar productos y carrito al iniciar
  useEffect(() => {
    //getProductos();
    fetchCart();
  }, []);

  useEffect(() => {
    const categoria_principal_a = categoriaPrincipal
      ? categoriaPrincipal.name
      : null;
    const categoria_a = categoria ? categoria.name : null;
    const sub_categoria_a = subcategoria ? subcategoria.name : null;
    console.log("Cambios en productos");
    console.log("Categoría principal:", categoria_principal_a);
    console.log("Categoría:", categoria_a);
    console.log("Subcategoría:", sub_categoria_a);

    const params = {
      categoria_principal: categoria_principal_a,
      categoria: categoria_a,
      sub_categoria: sub_categoria_a,
    };

    api
      .get("productos-clasificados/", {
        params: params,
      })
      .then((res) => {
        console.log("Productos obtenidos:", res.data);
        setProductos(res.data);
        setFiltroPrecio("Todos");
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener productos:", err);
      });
  }, [categoriaPrincipal, categoria, subcategoria]);

  const handleFiltroPrecio = (e) => {
    console.log("Filtro precio:", e.target.id);
    setFiltroPrecio(e.target.id);
  };

  const ordenarProductos = () => {
    console.log("Filtro de precios:", filtroPrecio);
    let productosOrdenados = [...productos];
    if (filtroPrecio === "Todos") {
      return;
    } else if (filtroPrecio === "Menor-a-Mayor") {
      productosOrdenados.sort((a, b) => a.precio - b.precio);
    } else if (filtroPrecio === "Mayor-a-Menor") {
      productosOrdenados.sort((a, b) => b.precio - a.precio);
    }

    setProductos(productosOrdenados);
    console.log("Productos ordenados de:", filtroPrecio, productosOrdenados);
  };

  useEffect(() => {
    ordenarProductos();
  }, [filtroPrecio]);


  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="absolute-products-container">
      <div className="products-container">
        <Navbar />
        <ProductSlider />
        <Categories
          categoriaPrincipal={categoriaPrincipal}
          setCategoriaPrincipal={setCategoriaPrincipal}
          categoria={categoria}
          setCategoria={setCategoria}
          subcategoria={subcategoria}
          setSubcategoria={setSubcategoria}
        />
        <main className="main-content-products">
          <div className="container-content">
            <div className="container-header-filter">
              <header className="text-center-productos">
                <h1
                  className="display-4 welcome-text"
                  style={{ fontFamily: "Koulen", color: "#8fc064" }}
                >
                  Productos para tu Mascota
                </h1>

                {/*<label className="label-creacion-adopcion-niños">
                Filtra por precios:
                    <div className="tooltip-creacion-adopcion">
                      <select
                        className="input-creacion-adopcion-locality"
                        name="ninnos"
                      >
                        <option defaultValue>Selecciona...</option>
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                      </select>
                    </div>
                </label>*/}
              </header>
              <div className="filter-prices">
                <p> Ordena por precios: </p>
                <div className="select">
                  <div
                    class="selected"
                    data-default="Todos"
                    data-one="Menor a Mayor"
                    data-two="Mayor a Menor"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                      class="arrow"
                    >
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
                    </svg>
                  </div>
                  <div class="options">
                    <div title="Todos">
                      <input
                        id="Todos"
                        name="option"
                        type="radio"
                        checked={filtroPrecio === "Todos"}
                        onChange={handleFiltroPrecio}
                      />
                      <label
                        class="option"
                        for="Todos"
                        data-txt="Todos"
                      ></label>
                    </div>
                    <div title="Menor-a-Mayor">
                      <input
                        id="Menor-a-Mayor"
                        name="option"
                        type="radio"
                        checked={filtroPrecio === "Menor-a-Mayor"}
                        onChange={handleFiltroPrecio}
                      />
                      <label
                        class="option"
                        for="Menor-a-Mayor"
                        data-txt="Menor a Mayor"
                      ></label>
                    </div>
                    <div title="Mayor-a-Menor">
                      <input
                        id="Mayor-a-Menor"
                        name="option"
                        type="radio"
                        checked={filtroPrecio === "Mayor-a-Menor"}
                        onChange={handleFiltroPrecio}
                      />
                      <label
                        class="option"
                        for="Mayor-a-Menor"
                        data-txt="Mayor a Menor"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mensaje de feedback */}
            {mensaje && (
              <div className="alert alert-info text-center" role="alert">
                {mensaje}
              </div>
            )}

            {/* Renderizamos los productoss */}
            {productos.length > 0 ? (
              <div className="container-cards-products">
                <div className="row-productos">
                  {productos.map((producto) => (
                    <div key={producto.slug} className="col-cards-products">
                      <div className="card-productos">
                        <Link to={`/productos/${producto.slug}`}>
                          <img
                            src={`${cloudinaryBaseUrl}${producto.imagen}`}
                            alt={producto.nombre}
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
                            <button className="details">
                              <span>Ver detalles</span>
                              <svg
                                width="15px"
                                height="10px"
                                viewBox="0 0 13 10"
                              >
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                              </svg>
                            </button>
                          </Link>
                          <button
                            className="btn-cart-products card-button mt-2"
                            onClick={() => agregar_producto(producto)}
                            disabled={
                              producto.stock <= 0 || inCart[producto.id]
                            }
                          >
                            <div className="default-btn">
                              <svg
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                stroke="#ffffff"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="cart-icon"
                              >
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                              </svg>
                              <span>
                                {producto.stock > 0
                                  ? inCart[producto.id]
                                    ? "Agregado"
                                    : "Agregar al carrito"
                                  : "Sin stock"}
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
    </div>
  );
}

export default Productos;
