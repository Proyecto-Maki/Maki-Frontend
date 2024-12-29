import React from "react";
import ReactDOM from "react-dom/client"; // Para versiones modernas de React
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App"; // Asegúrate de tener un componente App principal
import "./index.css"; // Opcional: archivo de estilos globales

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
