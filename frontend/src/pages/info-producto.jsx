import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import LoadingPage from "../components/loading-page";
import api from "../api"; // Axios configurado
import "../styles/info-producto.css";

const InfoProduct = () => {
  const { slug } = useParams(); // Obtiene el slug desde la URL
  const [mainImage, setMainImage] = useState(""); // Imagen principal
  const [product, setProduct] = useState(null); // Información del producto
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Maneja la cantidad seleccionada
  const [mensaje, setMensaje] = useState(""); // Mensaje para retroalimentación
  const [inCart, setInCart] = useState(() => {
    const savedCart = localStorage.getItem("inCart");
    return savedCart ? JSON.parse(savedCart) : {};
  }); // Estado para manejar si el producto está en el carrito
  const cart_code = localStorage.getItem("codigo_carrito"); // Obtén el código del carrito desde localStorage

  const cloudinaryBaseUrl = "https://res.cloudinary.com/dlktjxg1a/";

  // Obtiene información del producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/productos/${slug}/`);
        setProduct(response.data);
        setMainImage(`${cloudinaryBaseUrl}${response.data.imagen}`);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Verifica si el producto está en el carrito
  useEffect(() => {
    const syncCart = async () => {
      if (product?.id) {
        try {
          const response = await api.get(
            `/producto_en_carrito/?codigo=${cart_code}&id_producto=${product.id}`
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
  }, [product?.id, cart_code]);

  const agregar_producto = async (producto) => {
    const nuevoProducto = {
      codigo: cart_code, // Código del carrito
      id_producto: producto.id, // ID del producto
    };

    try {
      const response = await api.post("agregar_producto/", nuevoProducto);
      setInCart((prev) => {
        const updatedCart = { ...prev, [producto.id]: true };
        localStorage.setItem("inCart", JSON.stringify(updatedCart));
        return updatedCart;
      });
      setMensaje("Producto agregado al carrito.");
    } catch (err) {
      console.error("Error al agregar producto:", err.message);
      setMensaje("Error al agregar el producto.");
    } finally {
      setTimeout(() => setMensaje(""), 3000); // Limpia el mensaje después de 3 segundos
    }
  };

  // Incrementa o decrementa la cantidad
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) return <LoadingPage />;
  if (!product) return <p>No se encontró el producto.</p>;

  return (
    <>
      <Navbar />
      <div className="background-container-info-producto">
        <div className="producto-container-total">
          {/* Mensaje de retroalimentación */}
          {mensaje && <div className="alert alert-info">{mensaje}</div>}

          {/* Primera fila */}
          <div className="row">
            <div className="column">
              <div className="d-flex flex-row">
                <div className="main-product-image">
                  <img src={mainImage} alt={product.nombre} />
                </div>
                <div className="thumbnails">
                  {product.thumbnails?.map((thumb, index) => (
                    <img
                      key={index}
                      src={`${cloudinaryBaseUrl}${thumb}`}
                      alt={`Vista ${index + 1}`}
                      onClick={() =>
                        setMainImage(`${cloudinaryBaseUrl}${thumb}`)
                      }
                      className="thumbnail-image"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="column">
              <h1>{product.nombre}</h1>
              <h2>${parseFloat(product.precio).toFixed(2)}</h2>
              <p>Selecciona la cantidad:</p>
              <div className="quantity-selector">
                <button onClick={handleDecrement}>-</button>
                <span className="quantity-value">{quantity}</span>
                <button onClick={handleIncrement}>+</button>
              </div>
              <button
                className="btn btn-warning w-100 login-btn mt-2"
                onClick={() => agregar_producto(product)}
                disabled={inCart[product?.id]} // Desactiva el botón si el producto está en el carrito
              >
                {inCart[product?.id] ? "Agregado" : "Agregar al carrito"}
              </button>
            </div>
          </div>

          {/* Segunda fila */}
          <div className="row">
            <div className="column">
              <h3>Acerca del Item</h3>
              <p>{product.descripcion}</p>
            </div>
            <div className="column">
              <h3>Ingredientes/Materiales</h3>
              <p>{product.ingredientes || "Información no disponible."}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoProduct;
