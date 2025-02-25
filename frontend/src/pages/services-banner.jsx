import React from 'react';
import Slider from 'react-slick';
import "../styles/services-slider.css";
import anuncio_3 from "../img/anuncio_3.png";
import anuncio_4 from "../img/anuncio_4.png";

const ServicesSlider = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        arrows: true
      };
    return(
    <div className='absolute-container-services-slider'>
        <section className='services-slider'>
            <div className='container-fluid-services '>
                <Slider {...settings} className='services-slider-main'>
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

export default ServicesSlider;