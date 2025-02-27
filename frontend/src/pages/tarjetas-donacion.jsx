import Navbar from "../components/navbar";
import LoadingPage from "../components/loading-page";
import "../styles/tarjetas-donacion.css";
import api from "../api";
import logo from "../img/Logotipo Maki.png";
import mascota from "../img/mascotaAdopcion1.png";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import ConfirmationModal from "../components/ConfirmationModal";

function TarjetasDonacion() {
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".card");

    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const angle = Math.atan2(-x, y);
      card.style.setProperty("--rotation", angle + "rad");
    };

    cards.forEach((card) => card.addEventListener("mousemove", handleMouseMove));

    return () => {
      cards.forEach((card) => card.removeEventListener("mousemove", handleMouseMove));
    };
  }, []); 

  return (
    <div className="absolute-container-create-adoption">
      {/* Navbar */}
      <Navbar />
        <div className="total-container-create-adoption">
            <div className="background-container-create-adoption">
                <div className="logo-container">
                    <img
                    src={logo}
                    alt="Logo Maki"
                    className="logo-img"
                    style={{ height: "100px" }}
                    />
                    
                </div>
                <div className="container-tarjetas-donaciones">
                        <div className="card otherCard3">
                            <div>
                                <h2>Tarjeta Bronze</h2>
                                <h2 style={{
                                                fontFamily:"Koulen", 
                                                color:"#f4a258", 
                                                fontSize:"48px", 
                                                textAlign:"left", 
                                                display:"flex",
                                                alignSelf:"flex-start"}}>
                                                    $20,000 <p style={{color:"#fcf3e3"}}>COP</p>
                                </h2>
                                <p style={{
                                                fontFamily:"Aoboshi One", 
                                                color:"#302F2F", 
                                                fontSize:"20px", 
                                                textAlign:"left", 
                                                display:"flex",
                                                alignSelf:"flex-start"}}>
                                Tu donación, tu impacto. En Maki, garantizamos que 
                                cada aporte llega directamente a las fundaciones, 
                                sin intermediarios. ¡Juntos hacemos la diferencia! 💚🐾.
                                </p>
                            </div>
                            
                            
                            <button>Donar</button>
                        </div>
                        <div className="card otherCard2" >
                            <div>
                                <h2>Tarjeta Silver</h2>
                                <h2 style={{
                                            fontFamily:"Koulen", 
                                            color:"#f4a258", 
                                            fontSize:"48px", 
                                            textAlign:"left", 
                                            display:"flex",
                                            alignSelf:"flex-start"}}>
                                                $50,000 <p style={{color:"#fcf3e3"}}>COP</p>
                                </h2>
                                <p style={{
                                                fontFamily:"Aoboshi One", 
                                                color:"#302F2F", 
                                                fontSize:"20px", 
                                                textAlign:"left", 
                                                display:"flex",
                                                alignSelf:"flex-start"}}>
                                Tu donación, tu impacto. En Maki, garantizamos que 
                                cada aporte llega directamente a las fundaciones, 
                                sin intermediarios. ¡Juntos hacemos la diferencia! 💚🐾.
                                </p>
                            </div>
                            
                            <button>Donar</button>
                        </div>
                        <div className="card otherCard1">
                            <div>
                                <h2>Tarjeta Gold</h2>
                                <h2 style={{
                                        fontFamily:"Koulen", 
                                        color:"#f4a258", 
                                        fontSize:"48px", 
                                        textAlign:"left", 
                                        display:"flex",
                                        alignSelf:"flex-start"}}>
                                            $80,000 <p style={{color:"#fcf3e3"}}>COP</p>
                                </h2>
                                <p style={{
                                                fontFamily:"Aoboshi One", 
                                                color:"#302F2F", 
                                                fontSize:"20px", 
                                                textAlign:"left", 
                                                display:"flex",
                                                alignSelf:"flex-start"}}>
                                Tu donación, tu impacto. En Maki, garantizamos que 
                                cada aporte llega directamente a las fundaciones, 
                                sin intermediarios. ¡Juntos hacemos la diferencia! 💚🐾.
                                </p>
                            </div>
                            
                            <button>Donar</button>
                        </div>
                        <div className="card principalCard" >
                            <div>
                                <h2>Tarjeta Platinum</h2>
                                <h2 style={{
                                    fontFamily:"Koulen", 
                                    color:"#f4a258", 
                                    fontSize:"48px", 
                                    textAlign:"left", 
                                    display:"flex",
                                    alignSelf:"flex-start"}}>
                                        $110,000 <p style={{color:"#fcf3e3"}}>COP</p>
                                </h2>
                                <p style={{
                                                fontFamily:"Aoboshi One", 
                                                color:"#302F2F", 
                                                fontSize:"20px", 
                                                textAlign:"left", 
                                                display:"flex",
                                                alignSelf:"flex-start"}}>
                                Tu donación, tu impacto. En Maki, garantizamos que 
                                cada aporte llega directamente a las fundaciones, 
                                sin intermediarios. ¡Juntos hacemos la diferencia! 💚🐾.
                                </p>
                            </div>
                            <a target="_blank"><button id="main">Donar</button></a>
                        </div>
                        
                    </div>
            </div>
        </div>
    </div>
  );
}

export default TarjetasDonacion;