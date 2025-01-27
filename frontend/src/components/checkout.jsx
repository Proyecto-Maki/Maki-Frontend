import React, { useEffect } from "react";
import api from "../api"; // Axios configurado para tu backend

const Checkout = () => {
  useEffect(() => {
    // Cargar el script del SDK de Mercado Pago
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Limpiar el script
    };
  }, []);

  const handlePayment = async () => {
    try {
      // Crear una preferencia en el backend
      const response = await api.post("/create_preference/", {
        title: "Producto de ejemplo",
        quantity: 1,
        unit_price: 500.0,
      });

      const { id } = response.data;

      // Inicializar el SDK de Mercado Pago
      const mp = new window.MercadoPago(
        "TEST-a48d9349-b5e8-46b3-ae41-3056dd865828",
        {
          locale: "es-MX",
        }
      );

      // Iniciar el checkout
      mp.checkout({
        preference: {
          id, // ID de la preferencia devuelta por el backend
        },
        autoOpen: true, // Abrir automáticamente
      });
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
    }
  };

  return (
    <div>
      <h1>Checkout con Mercado Pago</h1>
      <button onClick={handlePayment}>Pagar con Mercado Pago</button>
    </div>
  );
};

export default Checkout;
