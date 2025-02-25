import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import "../styles/about-us.css";
import maki_foto from "../img-webp/maki.webp";
import duenosmascotas_foto from "../img-webp/duenosmascotas-acercade.webp";
import fundaciones_foto from "../img-webp/fundaciones-acercade.webp";
import { use } from "react";
import fotoAngel from "../img/AboutUs/FotoAngel.jpeg";
import fotoCatalina from "../img/AboutUs/FotoCatalina.jpeg";
import fotoIvana from "../img/AboutUs/FotoIvana.jpg";
import fotoKelly from "../img/AboutUs/FotoKelly.jpeg";
import iconDog from "../img/dog_icon_aboutus.png";
import iconCat from "../img/cat_icon_aboutus.png";
import fotoFaq from "../img-webp/faq-image.webp";
import { ImLinkedin } from "react-icons/im";
import { FaGithub } from "react-icons/fa";

function AboutUs() {
  const misionClientes =
    "Promover el bienestar de las mascotas, ofreciendo productos amigables con el ambiente y servicios especializados que contribuyan a su salud y calidad de vida, para generar confianza en hogares comprometidos con el bienestar animal.";
  const visionClientes =
    "En 5 años, Maki será una plataforma consolidada para la comercialización confiable de productos orgánicos, amigables con el medio ambiente y de alta calidad para mascotas en Bogotá, reconocida por su ética, responsabilidad y compromiso con el cuidado animal.";
  const misionFundaciones =
    "Apoyar la labor social de las fundaciones, fomentando sus donaciones y ofreciendo visibilidad en la adopción responsable de mascotas para ayudar mediante un enfoque empático, colaborativo y comprometido, al bienestar animal y fortalecer las organizaciones que trabajan por su protección.";
  const visionFundaciones =
    "En 5 años, Maki será una plataforma consolidada, reconocida por su colaboración con fundaciones de Bogotá, facilitando donaciones y promoviendo la adopción responsable de mascotas. Se destacará por su compromiso con la ética, la responsabilidad social y su empatía hacia las necesidades de los animales.";

  const [mision, setMision] = React.useState(misionClientes);
  const [vision, setVision] = React.useState(visionClientes);
  const [user, setUser] = React.useState("dueños de mascotas");

  const handleClientes = () => {
    setUser("dueños de mascotas");
    setVision(visionClientes);
    setMision(misionClientes);
  };

  const handleFundaciones = () => {
    setUser("fundaciones");
    setVision(visionFundaciones);
    setMision(misionFundaciones);
  };

  return (
    <div>
      <Navbar />

      <div className="about-us-container">
        <div className="about-us-title">
          <h2>Acerca de Maki</h2>
        </div>
        <div className="about-us-content">
          <div className="about-us-content-image">
            <img src={maki_foto}></img>
          </div>

          <div className="about-us-content-text">
            <h3>¿Qué es Maki?</h3>
            <p>
              Maki es una plataforma web de marketplace especializado en
              productos y servicios con un enfoque ético y sostenible para
              mascotas de todas las especies. El objetivo de Maki es promover el
              bienestar animal y la sostenibilidad ambiental, conectando a
              dueños de mascotas, cuidadores capacitados y fundaciones
              animalistas en un solo lugar.
            </p>
          </div>
        </div>
        <div class="custom-shape-divider-bottom-1736726303">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="about-us-mision">
          <div className="about-us-mision-title">
            <h3>Nuestros posibles usuarios</h3>
          </div>
          <div className="about-us-mision-img">
            <div className="about-us-mision-clientes">
              <img src={duenosmascotas_foto}></img>
              <p className="img-quote">Diseñado por Freepik</p>

              <a onClick={handleClientes}>
                <h4>Dueños de mascotas</h4>
              </a>  
            </div>

            <div className="about-us-mision-fundaciones">
              <img src={fundaciones_foto}></img>
              <p className="img-quote">Diseñado por Freepik</p>
              <a onClick={handleFundaciones}>
                <h4>Fundaciones</h4>
              </a>
            </div>
          </div>
          <div className="about-us-mision-text">
            <div className="about-us-mision-text-vision">
              <h4>Visión {user}</h4>
              <p>{vision}</p>
            </div>
            <div className="vertical-line"></div>
            <div className="about-us-mision-text-mision">
              <h4>Misión {user}</h4>
              <p>{mision}</p>
            </div>
          </div>
          <div></div>
        </div>
        <div className="about-us-propose">
          <div className="about-us-mision-title">
            <h3>Nuestra propuesta de valor</h3>
          </div>
          <div className="about-us-propose-text">
            <div className="about-us-propose-text-dm">
              <div style={{alignContent:"center"}}>
                <img 
                  src={iconDog}
                  style={{width:"100%"}}
                ></img>
              </div>
              <div className="text-propose-dm">
                <h4 style={{color:"#ff793f", fontSize:"30px"}}>Para Dueños de Mascotas</h4>
                <p style={{fontSize:"28px"}}>Promover el bienestar de las mascotas y el medio ambiente a través de un espacio para encontrar productos sostenibles, cuidadores especializados y apoyar causas animalistas, como lo son adopciones y donaciones contribuyendo a un futuro más ético y responsable con los animales.</p>
              </div>
            </div>
            <hr style={{border:"3px solid #ffa726", borderRadius:"5px"}}></hr>
            <div className="about-us-propose-text-f">
              <div className="text-propose-f">
                <h4 style={{color:"#ff793f", fontSize:"30px"}}>Para Fundaciones</h4>
                <p style={{fontSize:"28px"}}>Apoyar a las fundaciones en su labor de cuidado y preservación animal, conectándose con productos y servicios éticos y sostenibles, a la vez qué se promueve su visibilidad en una comunidad comprometida con el bienestar animal.</p>
              </div>
              <div style={{alignContent:"center"}}>
                <img 
                  src={iconCat}
                  style={{width:"100%", justifySelf:"center"}}
                ></img>
              </div>
              
            </div>
          </div>
          <div></div>
        </div>

        <div class="custom-shape-divider-top-1736726719">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
          <h2 style={{marginLeft: "25px", fontSize: "30px", fontStyle: "unset"}} className="h2-FAQ">Preguntas frecuentes </h2>
          <div class="FAQ-container">
            <div className="accordion">
              <div class="accordion-item">
                <input type="radio" id="section1" name="accordion" />
                <label for="section1" class="accordion-header">
                  <label class="accordion-title">¿Maki es gratuito o tiene algún costo?</label>
                  <div class="accordion-icon">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.293 5.293a1 1 0 0 1 1.414 0L8 7.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </label>
                <div class="content">
                  <p>Para los dueños de mascotas, Maki es completamente gratuito. Los usuarios pueden navegar, comprar productos, hacer donaciones y adoptar sin ningún costo.
                    Para las fundaciones, ofrecemos dos planes:
                    <br></br><p style={{fontStyle:"italic"}}>➜ Plan Gratuito:  Permite a las fundaciones recibir donaciones en forma de tarjetas de regalo, y con las cuales podrán canjear productos dentro de la plataforma.</p> 
                    <p style={{fontStyle:"italic"}}>➜ Plan Premium: Por una membresía de $29,000 COP, las fundaciones adquieren beneficios adicionales, como la publicación de sus mascotas para promocionarlas en adopción y un 25% de descuento en todos lops productos de Maki</p>
                  </p>
                </div>
              </div>

              <div class="accordion-item">
                <input  type="radio" id="section2" name="accordion" />
                <label for="section2" class="accordion-header">
                  <label class="accordion-title">¿Maki cumple con regulaciones de privacidad?</label>
                  <div class="accordion-icon">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.293 5.293a1 1 0 0 1 1.414 0L8 7.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </label>
                <div class="content">
                  <p>Maki sigue las normativas de protección de datos personales establecidas en la Ley Estatutaria 1581 de 2012, que regula el tratamiento de información en plataformas digitales. Nuestras políticas de privacidad garantizan un uso seguro y transparente de los datos de nuestros usuarios.
                    
                  </p>
                </div>
              </div>
              
              <div class="accordion-item">
                <input type="radio" id="section4" name="accordion" />
                <label for="section4" class="accordion-header">
                  <label class="accordion-title">¿Maki cómo beneficia a las fundaciones?</label>
                  <div class="accordion-icon">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.293 5.293a1 1 0 0 1 1.414 0L8 7.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </label>
                <div class="content">
                  <p>Maki facilita el apoyo a las fundaciones a través de donaciones en forma de tarjetas de regalo, que pueden ser utilizadas para adquirir productos en la plataforma.
                    <br></br><p style={{fontStyle:"italic", marginLeft: "10px"}}>➜ Tarjetas de regalo:  Los clientes pueden comprar y donar tarjetas con los siguientes valores:
                    <p style={{marginLeft: "10px"}}>
                      - Bronze: $20,000 COP
                      <br></br> - Silver: $50,000 COP
                      <br></br> - Gold: $80,000 COP
                      <br></br> - Platinum: $110,000 COP
                    </p>
                  </p> 
                  <p >
                    Las fundaciones pueden redimir el saldo total de las tarjetas donadas para comprar productos en Maki. Si el pedido supera el saldo disponible, la diferencia puede pagarse
                    con otros métodos de pago habilitados en la plataforma.
                  </p>
                  </p>
                </div>
              </div>
              <div class="accordion-item">
                <input type="radio" id="section5" name="accordion" />
                <label for="section5" class="accordion-header">
                  <label class="accordion-title">¿Qué es MakiPaws?</label>
                  <div class="accordion-icon">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.293 5.293a1 1 0 0 1 1.414 0L8 7.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </label>
                <div class="content">
                  <p>MakiPaws es un servicio amigable que conecta a los dueños de mascotas con cuidadores de mascotas capacitados según la especie del animal. 
                    Los usuarios pueden:
                    <br></br><p style={{fontStyle:"italic", marginLeft: "10px"}}> 
                      ➜ Especificar horarios según su disponibilidad.
                      <br></br>➜ Indicar dietas especiales o condiciones de salud específicas.
                      <br></br>➜ Seleccionar la modalidad de cuidado adecuada para su mascota
                    </p>
                    MakiPaws garantiza un servicio confiable y personalizado, asegurando el bienestar de cada mascota.
                  </p>
                </div>
              </div>
              <div class="accordion-item">
                <input type="radio" id="section6" name="accordion" />
                <label for="section6" class="accordion-header">
                  <label class="accordion-title">¿Qué productos vende Maki?</label>
                  <div class="accordion-icon">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.293 5.293a1 1 0 0 1 1.414 0L8 7.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </label>
                <div class="content">
                  <p> Maki ofrece una variedad de productos naturales y eco-amigables, priorizando el bienestar de las mascotas y el cuidado del medio ambiente. En nuestra plataforma, los usuarios pueden encontrar:
                  <br></br><p style={{fontStyle:"italic", marginLeft: "10px"}}>
                    ➜ Alimentos orgánicos y naturales.
                    <br></br>➜ Accesorios biodegradables y ecológicos.
                  </p>
                      Todos los productos provienen de proveedores comprometidos con la sostenibilidad y la calidad.
                  </p>
                </div>
              </div>
            </div>
            <div className="FAQ-image-container">
                <img src={fotoFaq}></img>
                <p>Imagen de wirestock en Freepik</p>
            </div>
          </div>
          

        <div className="about-us-team">
          <div className="about-us-team-title">
            <h3>Nuestro equipo</h3>
          </div>
          <div className="about-us-team-content">
            <div className="about-us-team-member">
              <div className="about-us-team-member-img">
                <img src={fotoCatalina}></img>
              </div>
              <div className="about-us-team-member-text">
                <h4>Catalina Gómez M.</h4>
                <p>Desarrolladora Frontend</p>
                <p className="member-cite">"Quien mira hacia afuera: sueña; quien mira hacia adentro, despierta" - Carl Jung</p>
                <div className="about-us-team-member-social">
                  <a
                    href="https://www.linkedin.com/in/cat-gomez/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ImLinkedin />
                  </a>
                  <a
                    href="https://github.com/CatGmz"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>
            </div>
            <div className="about-us-team-member">
              <div className="about-us-team-member-img">
                <img src={fotoIvana}></img>
              </div>
              <div className="about-us-team-member-text">
                <h4>Ivana A. Pedraza H.</h4>
                <p>Desarrolladora Frontend</p>
                <p className="member-cite">"Empieza a ser quién eres, en vez de calcular quién serás" - Franz Kafka</p>
                <div className="about-us-team-member-social">
                  <a
                    href="https://www.linkedin.com/in/ivana-alejandra-pedraza-hernandez-a268011b3/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ImLinkedin />
                  </a>
                  <a
                    href="https://github.com/IvanaPedraza"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>
            </div>
            <div className="about-us-team-member">
              <div className="about-us-team-member-img">
                <img src={fotoAngel}></img>
              </div>
              <div className="about-us-team-member-text">
                <h4>Ángel D. Piñeros S.</h4>
                <p>Desarrollador Backend</p>
                <p className="member-cite">"Siempre cosas"
                - Danilo Amerise</p>
                <div className="about-us-team-member-social">
                  <a
                    href="https://www.linkedin.com/in/apineross/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ImLinkedin />
                  </a>
                  <a
                    href="https://github.com/Locotin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>
            </div>
            <div className="about-us-team-member">
              <div className="about-us-team-member-img">
                <img src={fotoKelly}></img>
              </div>
              <div className="about-us-team-member-text">
                <h4>Kelly J. Solano C.</h4>
                <p>Desarrolladora Backend</p>
                <p className="member-cite">"Todo cambiará, no te resistas a crecer" - Karmadame (Zoé)</p>
                <div className="about-us-team-member-social">
                  <a
                    href="https://www.linkedin.com/in/kelly-solano/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ImLinkedin />
                  </a>
                  <a
                    href="https://github.com/kellysolanomt"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default AboutUs;
