import React, { useState, useContext, useEffect } from "react";
import "../styles/categories.css";
import Slider from "react-slick";

/*categorias*/
import cat_Aves from "../img/categoriaAves.jpg";
import cat_Gato from "../img/categoriaGatos.jpg";
import cat_Peces from "../img/categoriaPeces.jpg";
import cat_Perro from "../img/categoriaPerros.jpg";
import cat_Reptil from "../img/categoriaReptiles.jpg";
import cat_Roedores from "../img/categoriaRoedores.jpg";

const CategoriesPets = ({ categoria, setCategoria }) => {
  const categorias = [
    {
      name: "Aves",
      image: cat_Aves,
    },
    {
      name: "Gatos",
      image: cat_Gato,
    },
    {
      name: "Peces",
      image: cat_Peces,
    },
    {
      name: "Perros",
      image: cat_Perro,
    },
    {
      name: "Reptiles",
      image: cat_Reptil,
    },
    {
      name: "Roedores",
      image: cat_Roedores,
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
    autoplay: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };


  /*con esto se puede deseleccionar*/
  const handleCategoryClick = (category) => {
    console.log("Categoría seleccionada:", category);
    if (categoria?.name === category.name) {
      setCategoria(null)
    } else {
      setCategoria(category);
    }
  };


  return (
    <div className="absolute-section-categories">
      <div className="section-categories">
        <div className="container-fluid-cat">
          <h2 className="hd-cat">
            Conoce nuestras categorías de <p> mascotas!</p>
          </h2>

          <Slider {...settings} className="categories-slider-main">
            {categorias.map((category, index) => (
              <button
                key={index}
                className={`item-cat ${
                  categoria?.name === category.name ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <img src={category.image} alt={category.name} />
                <div className="info">
                  <h2>{category.name}</h2>
                </div>
              </button>
            ))}
          </Slider>
          <br />
          
        </div>
      </div>
    </div>
  );
};

export default CategoriesPets;