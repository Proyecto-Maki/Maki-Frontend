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

  useEffect(() => {
    // Solicita la información del producto al backend
    api
      .get(`/productos/${slug}/`)
      .then((response) => {
        console.log("Producto recibido:", response.data);
        const data = response.data;
        setProduct(data);
        setMainImage(data.imagen); // Usa la imagen principal del producto
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

  return (
    <>
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
                      src={thumb}
                      alt={`Vista ${index + 1}`}
                      onClick={() => setMainImage(thumb)}
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
              <button className="add-to-cart-button">Agregar al carrito</button>
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
