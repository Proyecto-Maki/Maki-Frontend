import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import LoadingPage from "../components/loading-page";
import api from "../api"; // Axios configurado
import imagenCuidador from "../img/Mari Juliano.jpg";
import { useNavigate } from "react-router-dom";
import "../styles/info-producto.css";
import { formatDateTime } from "../functions";
import clientes_img from "../img/Foto_Perfil_Clientes.svg";
import fundaciones_img from "../img/Foto_Perfil_Fundaciones.svg";

const InfoProduct = () => {
  const { slug } = useParams(); // Obtiene el slug desde la URL
  const [mainImage, setMainImage] = useState(""); // Imagen principal
  const cloudinaryBaseUrl = "https://res.cloudinary.com/dlktjxg1a/";
  const [copia_main, setCopia_Main] = useState("");
  const thumbnails = [
    copia_main,
    copia_main,
    copia_main,
    copia_main,
    copia_main,
  ]; // Vistas adicionales del producto
  const [product, setProduct] = useState(null); // Información del producto
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Maneja la cantidad seleccionada
  const [mensaje, setMensaje] = useState(""); // Mensaje para retroalimentación
  const [inCart, setInCart] = useState(() => {
    const savedCart = localStorage.getItem("inCart");
    return savedCart ? JSON.parse(savedCart) : {};
  }); // Estado para manejar si el producto está en el carrito
  const [cartProducts, setCartProducts] = useState([]); // Define cartProducts state
  const cart_code = localStorage.getItem("codigo_carrito"); // Obtén el código del carrito desde localStorage
  const navigate = useNavigate();

  const email = sessionStorage.getItem("email");

  const handleClick = () => {
    navigate("/publish-review"); // Cambia "/otra-pagina" por la ruta deseada
  };
  const codigo_carrito =
    localStorage.getItem("codigo_carrito") ||
    (() => {
      const nuevoCodigo = Math.random().toString(36).substr(2, 10);
      localStorage.setItem("codigo_carrito", nuevoCodigo);
      return nuevoCodigo;
    })();

  // Obtiene información del producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/productos/${slug}/`);
        setProduct(response.data);
        setMainImage(`${cloudinaryBaseUrl}${response.data.imagen}`);
        setCopia_Main(`${cloudinaryBaseUrl}${response.data.imagen}`);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    console.log("Cargando resenas del producto:", product?.id);
    const fetchResenas = async () => {
      if (product?.id) {
        try {
          const response = await api.get(`resenas/producto/${product.id}/`);
          console.log("resenas del producto:", response.data);
          setResenas(response.data);
        } catch (error) {
          console.error("Error al cargar las resenas:", error);
        }
      }
    };
    fetchResenas();
  }, [product?.id]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        console.log("Fetching cart with codigo_carrito:", codigo_carrito);
        const response = await api.get(
          `/get_estado_carrito?codigo_carrito=${codigo_carrito}`
        );
        console.log("Cart response:", response.data);
        const productosEnCarrito = response.data.productos.map(
          (item) => item.id
        );
        setCartProducts(productosEnCarrito);
        setInCart(
          productosEnCarrito.reduce((acc, id) => ({ ...acc, [id]: true }), {})
        );
        console.log("Productos en carrito obtenidos:", productosEnCarrito);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
    };
    fetchCart();
  }, [codigo_carrito]);

  // Verifica si el producto está en el carrito
  useEffect(() => {
    const syncCart = async () => {
      if (product?.id) {
        try {
          const response = await api.get(
            `/producto_en_carrito/?codigo=${codigo_carrito}&id_producto=${product.id}`
          );
          setInCart((prev) => ({
            ...prev,
            [product.id]: response.data.producto_en_carrito,
          }));
        } catch (error) {
          console.error(
            "Error al verificar el producto en el carrito:",
            error.message
          );
        }
      }
    };

    syncCart();
  }, [product?.id, codigo_carrito]);

  const agregar_producto = async (producto) => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId) {
      console.error("❌ Error: No se encontró user_id en sessionStorage");
      setMensaje("Error: No se encontró usuario. Inicia sesión.");
      return;
    }
    const codigoCarrito = localStorage.getItem("codigo_carrito");
    // Objeto con la información a enviar, que incluye la cantidad deseada.
    const productoData = {
      codigo: codigo_carrito,
      id_producto: producto.id,
      user_id: userId,
      cantidad: quantity,
    };

    // Si el producto ya está en el carrito, actualizar la cantidad
    if (inCart[producto.id]) {
      try {
        // Asegúrate de tener este endpoint en el backend para actualizar la cantidad
        const response = await api.patch("actualizar_producto/", productoData);
        console.log("✅ Cantidad actualizada:", response.data);
        setMensaje("Cantidad actualizada en el carrito.");
        setTimeout(() => setMensaje(""), 3000);
        // Aquí podrías, si lo requieres, actualizar el estado local con la nueva cantidad.
      } catch (err) {
        console.error("❌ Error al actualizar la cantidad:", err.message);
        setMensaje("Error al actualizar la cantidad.");
        setTimeout(() => setMensaje(""), 3000);
      }
    } else {
      // Si el producto no está en el carrito, se agrega por primera vez.
      try {
        const response = await api.post("agregar_producto/", productoData);
        console.log("✅ Producto agregado:", response.data);
        setMensaje("Producto agregado al carrito correctamente.");
        setTimeout(() => setMensaje(""), 3000);
        // Marcar el producto como agregado
        setInCart((prev) => ({ ...prev, [producto.id]: true }));
        setCartProducts((prev) => [...prev, producto.id]);
      } catch (err) {
        console.error("❌ Error al agregar producto:", err.message);
        setMensaje("Error al agregar el producto al carrito.");
        setTimeout(() => setMensaje(""), 3000);
      }
    }
  };

  // Incrementa o decrementa la cantidad
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return <LoadingPage />;
  }

  if (!product) {
    return <p>No se encontró el producto.</p>;
  }

  // const resenas = [
  //   {
  //     id: 1,
  //     nombre: "Ivana P.",
  //     fecha: "25/12/24",
  //     estrellas: 4,
  //     texto:
  //       "Así que mi cachorro tiene un estómago sensible y he probado muchas cosas diferentes...",
  //     avatar: imagenCuidador,
  //   },
  //   {
  //     id: 2,
  //     nombre: "Melissa",
  //     fecha: "27/11/24",
  //     estrellas: 3,
  //     texto:
  //       "Nuestros dos perros han sido criados con cordero y arroz integral...",
  //     avatar: imagenCuidador,
  //   },
  //   {
  //     id: 3,
  //     nombre: "Rosa",
  //     fecha: "10/11/24",
  //     estrellas: 5,
  //     texto:
  //       "Mi cachorro tenía tantas infecciones de oído que su veterinario sugirió cambiar su dieta...",
  //     avatar: imagenCuidador,
  //   },
  // ];

  // DEBAJO DE ESTO NO AGREGAR USEEFFECTS

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="absolute-container-info-producto">
      <Navbar />
      <div className="background-container-info-producto">
        <div className="producto-container-total">
          {/* Mensaje de retroalimentación */}
          {mensaje && <div className="alert alert-info">{mensaje}</div>}

          {/* Primera fila */}
          <div className="row-info">
            <div className="column-info">
              <div className="d-flex flex-row">
                <div className="main-product-image">
                  <img src={mainImage} alt={product.nombre} />
                </div>
                <div className="thumbnails">
                  {/* {product.thumbnails?.map((thumb, index) => (
                    <img
                      key={index}
                      src={`${cloudinaryBaseUrl}${thumb}`}
                      alt={`Vista ${index + 1}`}
                      onClick={() =>
                        setMainImage(`${cloudinaryBaseUrl}${thumb}`)
                      }
                      className="thumbnail-image"
                    />
                  ))} */}
                  {thumbnails.map((thumb, index) => (
                    <img
                      key={index}
                      src={thumb}
                      alt={`Vista ${index + 1}`}
                      onClick={() => setMainImage(thumb)}
                      className="thumbnail-image"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="column-info">
              <h1>{product.nombre}</h1>
              <h2>${parseFloat(product.precio).toFixed(2)}</h2>
              <p>Selecciona la cantidad:</p>
              <div className="container-quantity-selector">
                <div className="quantity-selector">
                  <span onClick={handleDecrement}>-</span>
                  <span className="quantity-value">{quantity}</span>
                  <span onClick={handleIncrement}>+</span>
                </div>
              </div>
              <div className="Btn-add-cart-info-pr">
                <button
                  className="cartBtn"
                  onClick={() => agregar_producto(product)}
                  disabled={inCart[product.id]}
                >
                  <svg
                    className="cart"
                    fill="white"
                    viewBox="0 0 576 512"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                  </svg>
                  {inCart[product.id] ? "Agregado" : "Agregar al carrito"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 640 512"
                    className="product"
                  >
                    <path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Segunda fila */}
          <div className="row-info">
            <div className="column-info">
              <h3>Acerca del Item</h3>
              <p>{product.descripcion}</p>
            </div>
            <div className="column-info">
              <h3>Ingredientes/Materiales</h3>
              <p>{product.ingredientes || "Información no disponible."}</p>
            </div>
          </div>
          <h2 className="title-comments"> Criticas y reseñas </h2>
          <div className="container-reseñas-de-producto">
            <div className="producto-container">
              <div className="reseñas-prod">
                {resenas.length > 0 ? (
                  <>
                    {resenas.map((resena) => (
                      <div key={resena.id} className="reseña-prod">
                        <div className="reseña-prod-header">
                          <img
                            src={clientes_img}
                            alt="Imagen"
                            className="reseña-avatar-prod"
                          />

                          <div className="reseña-info-prod">
                            <p className="reseña-titulo-prod">
                              {resena.titulo}
                            </p>
                            <p className="reseña-nombre-prod">
                              {resena.user_data.nombre
                                ? resena.user_data.nombre
                                : resena.user_data.primer_nombre}
                            </p>
                            <p className="reseña-fecha-prod">
                              {formatDateTime(resena.fecha)}
                            </p>
                          </div>
                          {resena.user_data.email === email ? (
                            <>
                              <button
                                className="boton-eliminar"
                                onClick={() => eliminarReseña(resena.id)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </>
                          ) : (
                            <></>
                          )}
                          
                        </div>
                        <div className="reseña-stars-prod">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <span key={index}>
                              {index < resena.calificacion ? "⭐" : "☆"}
                            </span>
                          ))}
                        </div>
                        <p className="reseña-texto-prod">{resena.comentario}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <p className="reseña-titulo-prod">No hay comentarios</p>
                  </>
                )}
              </div>

              <div className="escribir-reseña-prod">
                <h2 className="titulo-escribir-reseña-producto">
                  {" "}
                  ¿Deseas escribir una resena?{" "}
                </h2>
                <p className="Subtitulo-escribir-reseña-producto">
                  {" "}
                  Comparte tus opiniones y experiencias con otros clientes ¡Nos
                  ayudarías mucho!
                </p>
                <button
                  className="boton-escribir-reseña-prod"
                  onClick={handleClick}
                >
                  Escríbela
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoProduct;
