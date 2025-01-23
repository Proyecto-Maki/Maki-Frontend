import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import LoadingPage from "../components/loading-page";
import "../styles/membresias.css";
import api from "../api";
import logo from "../img/Logotipo Maki.png";
import paw from "../img/paw.svg";
import minus from "../img/minus.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

function Membresias() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

 
  return (
    <div className="absolute-membership-container">
      <Navbar /> {/* Add Navbar component */}
      <div className="total-container-membership">
        <div className="background-membership">
                <div className="membership-container">
                    <div className="logo-membership">
                        <img
                        src={logo}
                        alt="logo"
                        className="logo-membership-img"
                        style={{ height: "100px", marginRight: "10px" }}
                        />
                        <p className="type-user-membership">Tú plan, tu decisión</p>
                        <h3 className="membership-text">Ofrecemos los siguientes planes con los siguientes beneficios para tu fundación de mascotas</h3>
                    </div>
                    <div className="plan-table">
                        <div className="table-wrapper">
                            <div className="table">
                                <div className="plan">Elige tu plan</div>
                                <div className="plan column-personal">Personal</div>
                                <div className="plan column-peludos">Peludos</div>
                                <div className="row header">
                                    <div className="cell">Podrás ver y comprar nuestros productos.</div>
                                    <div className="cell column-personal">
                                        <img
                                            src={paw}
                                            alt="paw"
                                            className="paw-membership-img"
                                            style={{ height: "50px", backgroundColor: "#D0DAD8"}}
                                        />
                                    </div>
                                    <div className="cell column-peludos">
                                        <img
                                        src={paw}
                                        alt="paw"
                                        className="paw-membership-img"
                                        style={{ height: "50px", backgroundColor: "#D0DAD8"}}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                <div className="cell">Podrás recibir donaciones de nuestros clientes.</div>
                                <div className="cell column-personal">
                                    <img
                                            src={paw}
                                            alt="paw"
                                            className="paw-membership-img"
                                            style={{ height: "50px", backgroundColor: "#fcf3e3"}}
                                            />
                                    </div>
                                <div className="cell column-peludos">
                                    <img
                                            src={paw}
                                            alt="paw"
                                            className="paw-membership-img"
                                            style={{ height: "50px", backgroundColor: "#fcf3e3"}}
                                            />
                                    </div>
                                </div>
                                <div className="row header">
                                <div className="cell">
                                    Podrás publicar tus animales en adopción en nuestra plataforma.
                                </div>
                                <div className="cell column-personal">
                                    <img
                                        src={minus}
                                        alt="minus"
                                        className="minus-membership-img"
                                        style={{ height: "25px", width: "50px",backgroundColor: "#D0DAD8",justifySelf: "center"}}
                                    />
                                </div>
                                <div className="cell column-peludos">
                                    <img
                                        src={paw}
                                        alt="paw"
                                        className="paw-membership-img"
                                        style={{ height: "50px", backgroundColor: "#D0DAD8"}}
                                    />
                                </div>
                                </div>
                                <div className="row">
                                <div className="cell">
                                    Obtendrás un 25% de descuento en nuestros productos.
                                </div>
                                <div className="cell column-personal">
                                    <img
                                        src={minus}
                                        alt="minus"
                                        className="minus-membership-img"
                                        style={{ height: "25px", width: "50px",backgroundColor: "#fcf3e3",justifySelf: "center"}}
                                    />
                                </div>
                                <div className="cell column-peludos">
                                    <img
                                        src={paw}
                                        alt="paw"
                                        className="paw-membership-img"
                                        style={{ height: "50px", backgroundColor: "#fcf3e3"}}
                                    />
                                </div>
                                </div>
                                <div className="row price">
                                    <h2 >Precio</h2>
                                    <button className="price-personal">$0 COP</button>
                                    <button className="price-peludos">$26.000 COP</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-button-later">
                        <button className="button-later">Recuérdame más tarde</button>
                    </div>
                </div>
            </div>

      </div>
    </div>
  );
}

export default Membresias;