import React from 'react'
import "../styles/categories.css";
import Slider from 'react-slick';
import cat_Aves from "../img/categoriaAves.jpg";
import cat_Gato from "../img/categoriaGatos.jpg";
import cat_Peces from "../img/categoriaPeces.jpg";
import cat_Perro from "../img/categoriaPerros.jpg";
import cat_Reptil from "../img/categoriaReptiles.jpg";
import cat_Roedores from "../img/categoriaRoedores.jpg";

const Categories = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
        autoplay: true, // Activa la rotación automática
        responsive: [
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 3, 
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480, 
                settings: {
                    slidesToShow: 2, 
                    slidesToScroll: 1,
                },
            },
        ],
      };
    return(
        <div className='absolute-section-categories'>
            <div className='section-categories'>
                <div className='container-fluid-cat'>
                    <h2 className='hd-cat'> Conoce nuestras categorías de mascotas!</h2>

                    <Slider {...settings} className='categories-slider-main'>
                        <button className='item-cat'>
                            <img src={cat_Aves} alt="cat_Aves" className="cat_Aves" />
                            <div className='info'>
                                <h2>Aves</h2>
                            </div>
                        </button>
                        <button className='item-cat'>
                            <img src={cat_Gato} alt="cat_Gato" className="cat_Gato" />
                            <div className='info'>
                                <h2>Gatos</h2>
                            </div>
                        </button>
                        <button className='item-cat'>
                            <img src={cat_Peces} alt="cat_Peces" className="cat_Peces" />
                            <div className='info'>
                                <h2>Peces</h2>
                            </div>
                        </button>
                        <button className='item-cat'>
                            <img src={cat_Perro} alt="cat_Perro" className="cat_Perro" />
                            <div className='info'>
                                <h2>Perros</h2>
                            </div>
                        </button>
                        <button className='item-cat'>
                            <img src={cat_Reptil} alt="cat_Reptil" className="cat_Reptil" />
                            <div className='info'>
                                <h2>Reptiles</h2>
                            </div>
                        </button>
                        <button className='item-cat'>
                            <img src={cat_Roedores} alt="cat_Roedores" className="cat_Roedores" />
                            <div className='info'>
                                <h2>Roedores</h2>
                            </div>
                        </button>
                        
                    </Slider>
                </div>
            </div>
            <br /><br /><br /><br /><br /><br />
        </div>
    )
};

export default Categories;