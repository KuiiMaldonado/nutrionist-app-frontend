import React from "react";

import service_image_1 from '../assets/images/heading_1.jpg';
import service_image_2 from '../assets/images/heading_2.jpg';
import service_image_3 from '../assets/images/heading_3.jpg';

import '../assets/css/Services.css';

const Services = () => {
    return (
        <div className={'row services'}>
            <div className={'col-lg-4 text-center'}>
                <img src={service_image_1} alt={'servicio nutricion'} className={'rounded-circle'}/>
                <h2>Nutrición</h2>
                <p>
                    Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh
                    ultricies vehicula ut id elit.
                </p>
            </div>
            <div className={'col-lg-4 text-center'}>
                <img src={service_image_2} alt={'servicio rutinas personalizadas'} className={'rounded-circle'}/>
                <h2>Entrenamiento</h2>
                <p>
                    Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh
                    ultricies vehicula ut id elit.
                </p>
            </div>
            <div className={'col-lg-4 text-center'}>
                <img src={service_image_3} alt={'servicio entrenadortes personales'} className={'rounded-circle'}/>
                <h2>Coaching</h2>
                <p>
                    Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh
                    ultricies vehicula ut id elit.
                </p>
            </div>
        </div>
    );
}

export default Services;