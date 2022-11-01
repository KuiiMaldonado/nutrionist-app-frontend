import React from "react";
import {Carousel} from "react-bootstrap";
import slide_1 from '../assets/images/carousel_1.jpg';
import slide_2 from '../assets/images/carousel_2.jpg';
import slide_3 from '../assets/images/carousel_3.jpg';

import '../assets/css/Slides.css'

const Slides = () => {
    return (
        <Carousel fade>
            <Carousel.Item className={'carousel-item'}>
                <img className={'d-block w-100'} src={slide_1} alt={'First slide'}/>
                <Carousel.Caption>
                    <h1>Lorem ipsum dolor sit amet.</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className={'carousel-item'}>
                <img className={'d-block w-100'} src={slide_2} alt={'Second slide'}/>
                <Carousel.Caption>
                    <h1>Lorem ipsum dolor sit amet.</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className={'carousel-item'}>
                <img className={'d-block w-100'} src={slide_3} alt={'Third slide'}/>
                <Carousel.Caption>
                    <h1>Lorem ipsum dolor sit amet.</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a nulla in risus interdum lobortis.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Slides;