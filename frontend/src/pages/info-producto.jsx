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

  // Define la URL base de Cloudinary
  const cloudinaryBaseUrl = "https://res.cloudinary.com/dlktjxg1a/";

  useEffect(() => {
    // Solicita la información del producto al backend
    api
      .get(`/productos/${slug}/`)
      .then((response) => {
        console.log("Producto recibido:", response.data);
        const data = response.data;
        setProduct(data);
        // Configura la imagen principal
        setMainImage(`${cloudinaryBaseUrl}${data.imagen}`);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el producto:", error);
        setLoading(false);
      });
  }, [slug]);

  // Funciones para incrementar y decrementar la cantidad
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return <LoadingPage />;
  }

  if (!product) {
    return <p>No se encontró el producto.</p>;
  }

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
          {/* Primera fila */}
          <div className="row">
            <div className="column">
              <div className="d-flex flex-row">
                <div className="main-product-image">
                  <img src={mainImage} alt={product.nombre} />
                </div>
                <div className="thumbnails">
                  {/* Miniaturas dinámicas */}
                  {product.thumbnails?.map((thumb, index) => (
                    <img
                      key={index}
                      src={`${cloudinaryBaseUrl}${thumb}`} // Concatenamos la URL base con la miniatura
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
              <div className="container-quantity-selector">
                <div className="quantity-selector">
                  <span onClick={handleDecrement}>-</span>
                  <span className="quantity-value">{quantity}</span>
                  <span onClick={handleIncrement}>+</span>
                </div>
              </div>
              <div className="Btn-add-cart-info-pr">
                <button className="cartBtn">
                  <svg class="cart" fill="white" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                    ADD TO CART
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" class="product"><path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"></path></svg>
                </button>
              </div>
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
    </div>
  );
};

export default InfoProduct;
