import React from 'react';
import Slider from 'react-slick';
import "../styles/product-slider.css";
import anuncio_1 from "../img/anuncio_1.png";
import anuncio_2 from "../img/anuncio_2.png";
import anuncio_3 from "../img/anuncio_3.png";
import anuncio_4 from "../img/anuncio_4.png";

const ProductSlider = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: true
      };
    return(
    <div className='absolute-container-products-slider'>
        <section className='products-slider'>
            <div className='container-fluid '>
                <Slider {...settings} className='product-slider-main'>
                    <div className='item-slider'>
                        <img src={anuncio_1} alt="anuncio_1" className="anuncio_1" />
                    </div>
                    <div className='item-slider'>
                        <img src={anuncio_2} alt="anuncio_2" className="anuncio_2" />
                    </div>
                    <div className='item-slider'>
                        <img src={anuncio_3} alt="anuncio_3" className="anuncio_3" />
                    </div>
                    <div className='item-slider'>
                        <img src={anuncio_4} alt="anuncio_4" className="anuncio_4" />
                    </div>
                </Slider>
            </div>
        </section>
    </div>
        
    )

};

export default ProductSlider;