import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"; // Importa Link para navegación
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import api from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/productos.css";
import generateRandomAlphaNumericCode from "../GenerateCardCode";
import ProductSlider from "../pages/product-slider";

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
    const categoria_principal_a = categoriaPrincipal ? categoriaPrincipal.name : null;
    const categoria_a = categoria ? categoria.name : null;
    const sub_categoria_a = subcategoria ? subcategoria.name : null;
    console.log("Cambios en productos")
    console.log("Categoría principal:", categoria_principal_a);
    console.log("Categoría:", categoria_a);
    console.log("Subcategoría:", sub_categoria_a);

    const params = {
      categoria_principal: categoria_principal_a,
      categoria: categoria_a,
      sub_categoria: sub_categoria_a,
    }

    api
      .get("productos-clasificados/", {
        params: params
      })
      .then((res) => {
        console.log("Productos obtenidos:", res.data);
        setProductos(res.data);
        setFiltroPrecio("Todos");
      })
      .catch((err) => {
        console.error("Error al obtener productos:", err);
      });

  }, [categoriaPrincipal, categoria, subcategoria]);

  const handleFiltroPrecio = (e) => {
    console.log("Filtro precio:", e.target.id);
    setFiltroPrecio(e.target.id);
  }

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
  }

  useEffect(() => {
    ordenarProductos();
  }, [filtroPrecio]);

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
              <header className="text-center">
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
                        <path
                          d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                        ></path>
                      </svg>
                    </div>
                    <div class="options">
                      <div title="Todos">
                        <input id="Todos" name="option" type="radio" checked={filtroPrecio === "Todos"} onChange={handleFiltroPrecio}/>
                        <label class="option" for="Todos" data-txt="Todos"></label>
                      </div>
                      <div title="Menor-a-Mayor">
                        <input id="Menor-a-Mayor" name="option" type="radio" checked={filtroPrecio === "Menor-a-Mayor"} onChange={handleFiltroPrecio}/>
                        <label class="option" for="Menor-a-Mayor" data-txt="Menor a Mayor"></label>
                      </div>
                      <div title="Mayor-a-Menor">
                        <input id="Mayor-a-Menor" name="option" type="radio" checked={filtroPrecio === "Mayor-a-Menor"} onChange={handleFiltroPrecio}/>
                        <label class="option" for="Mayor-a-Menor" data-txt="Mayor a Menor"></label>
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

            {/* Renderizamos los productos */}
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
                                    {inCart[producto.id]
                                      ? "Agregado"
                                      : "Agregar al carrito"}
                                  </span>
                                </div>

                                <div className="hover-btn">
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
                                  <span>{producto.precio}</span>
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
