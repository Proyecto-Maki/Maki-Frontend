import React from 'react';
import Slider from 'react-slick';
import "../styles/makipaws-slider.css";
import anuncio_1_makipaws from "../img/makipaws_banner.png";

const MakipawsSlider = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        arrows: false
      };
    return(
    <div className='absolute-container-makipaws-slider'>
        <section className='makipaws-slider'>
            <div className='container-fluid-makipaws '>
                <Slider {...settings} className='makipaws-slider-main'>
                    <div className='item-slider'>
                        <img src={anuncio_1_makipaws} alt="anuncio_1_makipaws" className="anuncio_1_makipaws" />
                    </div>
                </Slider>
            </div>
        </section>
    </div>
        
    )

};

export default MakipawsSlider;