import React, { useState } from "react";
import "../styles/categories.css";
import Slider from "react-slick";

/*categorias*/
import cat_Aves from "../img/categoriaAves.jpg";
import cat_Gato from "../img/categoriaGatos.jpg";
import cat_Peces from "../img/categoriaPeces.jpg";
import cat_Perro from "../img/categoriaPerros.jpg";
import cat_Reptil from "../img/categoriaReptiles.jpg";
import cat_Roedores from "../img/categoriaRoedores.jpg";

/*imágenes subcategorias*/
import sub_Aves1 from "../img/cat_aves/comida_Aves.jpg";
import sub_Aves2 from "../img/cat_aves/accesorios_Aves.jpg";
import sub_Aves3 from "../img/cat_aves/juguetes_Aves.jpg";
import sub_Aves4 from "../img/cat_aves/Paseo_Aves.jpg";
import sub_Aves5 from "../img/cat_aves/higiene_Aves.jpg";
import sub_Gato1 from "../img/cat_gatos/comida_Gatos.jpg";
import sub_Gato2 from "../img/cat_gatos/accesorios_Gatos.jpg";
import sub_Gato3 from "../img/cat_gatos/juguetes_Gatos.jpg";
import sub_Gato4 from "../img/cat_gatos/premios_Gatos.jpg";
import sub_Gato5 from "../img/cat_gatos/paseo_Gatos.jpg";
import sub_Gato6 from "../img/cat_gatos/higiene_Gatos.jpg";
import sub_Pez1 from "../img/cat_pez/comida_peces.jpg";
import sub_Pez2  from "../img/cat_pez/accesorios peces.jpg";
import sub_Pez3  from "../img/cat_pez/higiene_peces.jpg";
import sub_Perro1 from "../img/cat_Perros/comida_Perros.jpg";
import sub_Perro2 from "../img/cat_Perros/accesorios_Perros.jpg";
import sub_Perro3 from "../img/cat_Perros/juguetes_Perros.jpg";
import sub_Perro4 from "../img/cat_Perros/premios_Perros.jpg";
import sub_Perro5 from "../img/cat_Perros/paseo_perros.jpg";
import sub_Perro6 from "../img/cat_Perros/higiene_Perros.jpg";
import sub_Reptil1 from "../img/cat_Reptiles/comida_Reptiles.jpg";
import sub_Reptil2 from "../img/cat_Reptiles/accesorios_Reptiles.jpg";
import sub_Reptil3 from "../img/cat_Reptiles/premios_Reptiles.jpg";
import sub_Roedor1 from "../img/cat_Roedores/comida_Roedores.jpg";
import sub_Roedor2 from "../img/cat_Roedores/accesorios_Roedores.jpg";
import sub_Roedor3 from "../img/cat_Roedores/juguetes_Roedores.jpg";
import sub_Roedor4 from "../img/cat_Roedores/higiene_Roedores.jpg";


/*subsubcategorias*/
import sub_subAves1 from "../img/sub_cat_aves/alimento_seco.jpg";
import sub_subAves2_1 from "../img/sub_cat_aves/ropa_aves.jpg";
import sub_subAves2_2 from "../img/sub_cat_aves/comederos_aves.jpg";
import sub_subAves2_3 from "../img/sub_cat_aves/bebederos_aves.jpg";
import sub_subAves2_4 from "../img/sub_cat_aves/casa_aves.jpg";
import sub_subAves2_5 from "../img/sub_cat_aves/decoraciones_aves.jpg";
import sub_subAves3_1 from "../img/sub_cat_aves/interactivos_aves.jpg";
import sub_subAves3_2 from "../img/sub_cat_aves/gimnasios_aves.jpg";
import sub_subAves4_1 from "../img/sub_cat_aves/arnes_aves.jpg";
import sub_subAves4_2 from "../img/sub_cat_aves/correas_aves.jpg";
import sub_subAves5_1 from "../img/sub_cat_aves/shampoo_aves.jpg";

import sub_subGatos1_1 from "../img/sub_cat_gatos/seca_gatos.jpg";
import sub_subGatos1_2 from "../img/sub_cat_gatos/humeda_gatos.jpg";
import sub_subGatos2_1 from "../img/sub_cat_gatos/ropa_gatos.jpg";
import sub_subGatos2_2 from "../img/sub_cat_gatos/comedero_gatos.jpg";
import sub_subGatos2_3 from "../img/sub_cat_gatos/bebedero_gatos.jpg";
import sub_subGatos2_4 from "../img/sub_cat_gatos/cama_gatos.jpg";
import sub_subGatos2_5 from "../img/sub_cat_gatos/casas_gatos.jpg";
import sub_subGatos3_1 from "../img/sub_cat_gatos/rascadores_gatos.jpg";
import sub_subGatos3_2 from "../img/sub_cat_gatos/gimnasios_gatos.jpg";
import sub_subGatos4_1 from "../img/sub_cat_gatos/galletas_gatos.jpg";
import sub_subGatos4_2 from "../img/sub_cat_gatos/bocaditos_gatos.jpg";
import sub_subGatos4_3 from "../img/sub_cat_gatos/catnip_gatos.jpg";
import sub_subGatos4_4 from "../img/sub_cat_gatos/dentales_gatos.jpg";
import sub_subGatos5_1 from "../img/sub_cat_gatos/collares_gatos.jpg";
import sub_subGatos5_2 from "../img/sub_cat_gatos/arnes_gatos.jpg";
import sub_subGatos5_3 from "../img/sub_cat_gatos/correas_gatos.jpg";
import sub_subGatos6_1 from "../img/sub_cat_gatos/arenas_gatos.jpg";
import sub_subGatos6_2 from "../img/sub_cat_gatos/shampoo_gatos.jpg";
import sub_subGatos6_3 from "../img/sub_cat_gatos/Acondicionador_gatos.jpg";
import sub_subGatos6_4 from "../img/sub_cat_gatos/cepillos_gatos.jpg";

import sub_subPeces1_1 from "../img/sub_cat_peces/comida_peces.jpg";
import sub_subPeces2_1 from "../img/sub_cat_peces/casas_peces.jpg";
import sub_subPeces2_2 from "../img/sub_cat_peces/decoraciones_peces.jpg";

import sub_subPerros1_1 from "../img/sub_cat_perros/seca_perros.jpg";
import sub_subPerros1_2 from "../img/sub_cat_perros/humeda_perros.jpg";
import sub_subPerros2_1 from "../img/sub_cat_perros/ropa_perros.jpg";
import sub_subPerros2_2 from "../img/sub_cat_perros/comederos_perros.jpg";
import sub_subPerros2_3 from "../img/sub_cat_perros/bebederos_perros.jpg";
import sub_subPerros2_4 from "../img/sub_cat_perros/camas_perros.jpg";
import sub_subPerros2_5 from "../img/sub_cat_perros/casas_perros.jpg";
import sub_subPerros3_1 from "../img/sub_cat_perros/pelotas_perros.jpg";
import sub_subPerros3_2 from "../img/sub_cat_perros/mordederos_perros.jpg";
import sub_subPerros3_3 from "../img/sub_cat_perros/peluches_perros.jpg";
import sub_subPerros4_1 from "../img/sub_cat_perros/galletas_perros.jpg";
import sub_subPerros4_2 from "../img/sub_cat_perros/huesos_perros.jpg";
import sub_subPerros4_3 from "../img/sub_cat_perros/dentales_perros.jpg";
import sub_subPerros5_1 from "../img/sub_cat_perros/collares_perros.jpg";
import sub_subPerros5_2 from "../img/sub_cat_perros/arnes_perros.jpg";
import sub_subPerros5_3 from "../img/sub_cat_perros/correas_perros.jpg";
import sub_subPerros5_4 from "../img/sub_cat_perros/bozales_perros.jpg";
import sub_subPerros6_1 from "../img/sub_cat_perros/pañales_perros.jpg";
import sub_subPerros6_2 from "../img/sub_cat_perros/shampoo_perros.jpg";
import sub_subPerros6_3 from "../img/sub_cat_perros/acondicionador_perros.jpg";
import sub_subPerros6_4 from "../img/sub_cat_perros/colonia_perros.jpg";
import sub_subPerros6_5 from "../img/sub_cat_perros/cepillo_perros.jpg";

import sub_subReptil1_1 from "../img/sub_cat_reptiles/seca_reptiles.jpg";
import sub_subReptil2_1 from "../img/sub_cat_reptiles/ropa_reptiles.jpg";
import sub_subReptil2_2 from "../img/sub_cat_reptiles/comederos_reptiles.jpg";
import sub_subReptil2_3 from "../img/sub_cat_reptiles/bebederos_reptiles.jpg";
import sub_subReptil2_4 from "../img/sub_cat_reptiles/casas_reptiles.jpg";
import sub_subReptil2_5 from "../img/sub_cat_reptiles/decoraciones reptiles.jpg";
import sub_subReptil3_1 from "../img/sub_cat_reptiles/bocados_reptiles.jpg";


import sub_subRoedor1_1 from "../img/sub_cat_roedor/comida_roedores.jpg";
import sub_subRoedor2_1 from "../img/sub_cat_roedor/ropa_roedores.jpg";
import sub_subRoedor2_2 from "../img/sub_cat_roedor/comedero_roedores.jpg";
import sub_subRoedor2_3 from "../img/sub_cat_roedor/bebedero_hamster.jpg";
import sub_subRoedor2_4 from "../img/sub_cat_roedor/casas_roedores.jpg";
import sub_subRoedor2_5 from "../img/sub_cat_roedor/decoracion_roedores.jpg";
import sub_subRoedor3_1 from "../img/sub_cat_roedor/pelotas_roedores.jpg";
import sub_subRoedor3_2 from "../img/sub_cat_roedor/gimnasios_roedores.jpg";
import sub_subRoedor4_1 from "../img/sub_cat_roedor/arena_roedores.jpg";
import sub_subRoedor4_2 from "../img/sub_cat_roedor/acerrin_roedores.jpg";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const categories = [
    { name: "Aves", image: cat_Aves, 
      subcategories: [
        { name: "Comida", image: sub_Aves1, sub_subcategories: [sub_subAves1], sub_subcatname:["Seca"] },
        { name: "Accesorios", image: sub_Aves2, sub_subcategories: [sub_subAves2_1, sub_subAves2_2, sub_subAves2_3, sub_subAves2_4, sub_subAves2_5], sub_subcatname:["Ropa", "Comederos", "Bebederos", "Casas", "Decoraciones"]},
        { name: "Juguetes", image: sub_Aves3, sub_subcategories: [sub_subAves3_1, sub_subAves3_2], sub_subcatname:["Interactivos", "Gimnasios"] },
        { name: "Paseo", image: sub_Aves4, sub_subcategories: [sub_subAves4_1, sub_subAves4_2], sub_subcatname:["Arnés", "Correas"]},
        { name: "Higiene", image: sub_Aves5, sub_subcategories: [sub_subAves5_1], sub_subcatname:["Shampoo"] },
      ],
      /*subcategories: [sub_Aves1, sub_Aves2, sub_Aves3, sub_Aves4, sub_Aves5], subcat_name: ["Comida", "Accesorios", "Juguetes", "Paseo","Higiene"]*/
    },
    { name: "Gatos", image: cat_Gato, 
      subcategories: [
        { name: "Comida", image: sub_Gato1, sub_subcategories: [sub_subGatos1_1, sub_subGatos1_2], sub_subcatname:["Seca", "Húmeda"] },
        { name: "Accesorios", image: sub_Gato2, sub_subcategories: [sub_subGatos2_1, sub_subGatos2_2, sub_subGatos2_3, sub_subGatos2_4, sub_subGatos2_5], sub_subcatname:["Ropa", "Comederos", "Bebederos", "Camas", "Casas"] },
        { name: "Juguetes", image: sub_Gato3, sub_subcategories: [sub_subGatos3_1, sub_subGatos3_2], sub_subcatname:["Rascadores", "Gimnasios"] },
        { name: "Premios", image: sub_Gato4, sub_subcategories: [sub_subGatos4_1, sub_subGatos4_2, sub_subGatos4_3, sub_subGatos4_4], sub_subcatname:["Galletas", "Bocaditos", "Catnip", "Dentales"] },
        { name: "Paseo", image: sub_Gato5, sub_subcategories: [sub_subGatos5_1, sub_subGatos5_2,sub_subGatos5_3], sub_subcatname:["Collares", "Arnés", "Correas"] },
        { name: "Higiene", image: sub_Gato6, sub_subcategories: [sub_subGatos6_1, sub_subGatos6_2, sub_subGatos6_3, sub_subGatos6_4], sub_subcatname:["Arena", "Shampoos", "Acondicionadores", "Cepillos y Peines"] },
      ],
      /*subcategories: [sub_Gato1, sub_Gato2, sub_Gato3, sub_Gato4, sub_Gato5, sub_Gato6], subcat_name: ["Comida", "Accesorios", "Juguetes", "Premios", "Paseo", "Higiene"]*/
    },
    { name: "Peces", image: cat_Peces, 
      subcategories: [
        { name: "Comida", image: sub_Pez1, sub_subcategories: [sub_subPeces1_1], sub_subcatname:["Seca"] },
        { name: "Accesorios", image: sub_Pez2, sub_subcategories: [sub_subPeces2_1, sub_subPeces2_2], sub_subcatname:["Casas", "Decoraciones"] },
      ],
      /*subcategories: [sub_Pez1, sub_Pez2, sub_Pez3], subcat_name: ["Comida", "Accesorios", "Higiene"]*/},
    { name: "Perros", image: cat_Perro, 
      subcategories: [
        { name: "Comida", image: sub_Perro1, sub_subcategories: [sub_subPerros1_1, sub_subPerros1_2], sub_subcatname:["Seca", "Húmeda"] },
        { name: "Accesorios", image: sub_Perro2, sub_subcategories: [sub_subPerros2_1, sub_subPerros2_2, sub_subPerros2_3, sub_subPerros2_4, sub_subPerros2_5], sub_subcatname:["Ropa", "Comederos", "Bebederos", "Camas", "Casas"] },
        { name: "Juguetes", image: sub_Perro3, sub_subcategories: [sub_subPerros3_1, sub_subPerros3_2, sub_subPerros3_3], sub_subcatname:["Pelotas", "Mordederos", "Peluches"] },
        { name: "Premios", image: sub_Perro4, sub_subcategories: [sub_subPerros4_1, sub_subPerros4_2, sub_subPerros4_3], sub_subcatname:["Galletas", "Huesos", "Dentales"] },
        { name: "Paseo", image: sub_Perro5, sub_subcategories: [sub_subPerros5_1, sub_subPerros5_2, sub_subPerros5_3, sub_subPerros5_4], sub_subcatname:["Collares", "Arnés", "Correas", "Bozales"]},
        { name: "Higiene", image: sub_Perro6, sub_subcategories: [sub_subPerros6_1, sub_subPerros6_2, sub_subPerros6_3, sub_subPerros6_4, sub_subPerros6_5], sub_subcatname:["Pañales", "Shampoos", "Acondicionadores", "Colonias", "Cepillos y Peines"]},
      ],
      /*subcategories: [sub_Perro1, sub_Perro2, sub_Perro3, sub_Perro4, sub_Perro5, sub_Perro6], subcat_name: ["Comida", "Accesorios", "Juguetes", "Premios", "Paseo", "Higiene"] */},
    { name: "Reptiles", image: cat_Reptil, 
      subcategories: [
        { name: "Comida", image: sub_Reptil1, sub_subcategories: [sub_subReptil1_1 ], sub_subcatname:["Seca"] },
        { name: "Accesorios", image: sub_Reptil2, sub_subcategories: [sub_subReptil2_1, sub_subReptil2_2,sub_subReptil2_3, sub_subReptil2_4, sub_subReptil2_5], sub_subcatname:["Ropa", "Comederos", "Bebederos", "Casas", "Decoraciones"] },
        { name: "Premios", image: sub_Reptil3, sub_subcategories: [sub_subReptil3_1], sub_subcatname:["Bocaditos"] },
      ],
      /*subcategories: [sub_Reptil1, sub_Reptil2, sub_Reptil3], subcat_name: ["Comida", "Accesorios", "Premios"]*/},
    { name: "Roedores", image: cat_Roedores, 
      subcategories: [
        { name: "Comida", image: sub_Roedor1, sub_subcategories: [sub_subRoedor1_1], sub_subcatname:["Seca"] },
        { name: "Accesorios", image: sub_Roedor2, sub_subcategories: [sub_subRoedor2_1, sub_subRoedor2_2, sub_subRoedor2_3, sub_subRoedor2_4, sub_subRoedor2_5], sub_subcatname:["Ropa", "Comederos", "Bebederos", "Casas", "Decoraciones"] },
        { name: "Juguetes", image: sub_Roedor3, sub_subcategories: [sub_subRoedor3_1, sub_subRoedor3_2], sub_subcatname:["Pelotas", "Gimnasios"]},
        { name: "Higiene", image: sub_Roedor4, sub_subcategories: [sub_subRoedor4_1, sub_subRoedor4_2], sub_subcatname:["Arena", "Acerrín"] },
      ],
      
      /*subcategories: [sub_Roedor1, sub_Roedor2, sub_Roedor3, sub_Roedor4], subcat_name: ["Comida", "Accesorios", "Juguetes", "Higiene"]*/},
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

 const settings_subcat = {
    slidesToShow: 6,
    slidesToScroll: 1,
    centerMode: true,
    infinite: false,
    arrows: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: false,
                autoplay: true
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: false,
                autoplay: true
            }
        }
    ],

 };

 const settings_sub_subcat = {
  slidesToShow: 6,
  slidesToScroll: 1,
  centerMode: true,
  infinite: false,
  arrows: true,
  responsive: [
      {
          breakpoint: 768,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              centerMode: false,
              autoplay: true
              
          }
      },
      {
          breakpoint: 480,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              centerMode: false,
              autoplay: true
          }
      }
  ],

};

 /*con esto se puede deseleccionar*/
 const handleCategoryClick = (category) => {
  if (selectedCategory?.name === category.name) {
    setSelectedCategory(null); 
    setSelectedSubcategory(null);
  } else {
    setSelectedCategory(category); 
    setSelectedSubcategory(null);
  }
};

/*deseleccionar subcategoría*/
const handleSubcategoryClick = (subcategory) => {
  if (selectedSubcategory?.name === subcategory.name) {
    setSelectedSubcategory(null);  
  } else {
    setSelectedSubcategory(subcategory); 
  }
};

  return (
    <div className="absolute-section-categories">
      <div className="section-categories">
        <div className="container-fluid-cat">
          <h2 className="hd-cat">Conoce nuestras categorías de <p> mascotas!</p></h2>

          <Slider {...settings} className="categories-slider-main">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`item-cat ${selectedCategory?.name === category.name ? "active" : ""}`}
                onClick={() =>handleCategoryClick(category)}
              >
                <img src={category.image} alt={category.name} />
                <div className="info">
                  <h2>{category.name}</h2>
                </div>
              </button>
            ))}
          </Slider>
            <br />
           {/*subcategoria*/}
           {selectedCategory && (
            <div className="subcategories-slider-container">
              <h3>Productos para <p>{selectedCategory.name} </p></h3>
              <Slider {...settings_subcat} className="subcategories-slider">
                {selectedCategory.subcategories.map((subcat, idx) => (
                  <button
                    key={idx}
                    className={`sub-item-cat ${selectedSubcategory?.name === subcat.name ? "active" : ""}`}
                    onClick={() =>  handleSubcategoryClick(subcat) }
                  >
                  <img src={subcat.image} alt={subcat.name} />
                    <div className="info-sub">
                      <h2>{subcat.name}</h2>
                    </div>
                </button>
                  /*}
                  <div key={idx} className="sub-item-cat">
                    <img src={subcat} alt={`Subcategoría ${idx}`} />
                  </div>*/
                ))}
              </Slider>
            </div>
          )}
          {/*subsubcategorias*/}
          {selectedSubcategory && selectedSubcategory.sub_subcategories && selectedSubcategory.sub_subcategories.length > 0 && (
            <div className="sub-subcategories-slider-container">
              <Slider {...settings_sub_subcat} className="sub-subcategories-slider">
                {selectedSubcategory.sub_subcategories.map((subsubcat, idx) => (
                  <button
                    key={idx}
                    className="sub-sub-item-cat"
                    /*onClick={() => handleCategoryClick(category)}*/
                  >
                    <img src={subsubcat} alt={`Sub-subcategoría ${idx}`} />
                    <div className="info-subsub">
                      <h2>{selectedSubcategory.sub_subcatname[idx]}</h2>
                    </div>
                </button>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
