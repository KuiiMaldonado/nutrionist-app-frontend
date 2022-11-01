import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapLocationDot} from '@fortawesome/free-solid-svg-icons';
import {Container} from "react-bootstrap";

import '../assets/css/Location.css'

const Location = () => {
    return (
        <>
            <Container className={'flex'}>
                <div className={'row text-center'}>
                    <h1>Visit us</h1>
                </div>
                <div className={'row mt-4 mb-4 col-8 offset-2'}>
                    <iframe id={'locationMap'} title={'MetPro location'}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7525.865063348044!2d-99.18046147328926!3d19.41532086632341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff4489e635e3%3A0xed1c076e8bc9b8e7!2sColonia%20Condesa%2C%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1665620849742!5m2!1ses!2smx"
                        allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className={'row text-center'}>
                    <FontAwesomeIcon icon={faMapLocationDot} className={'fa-3x'}/>
                    <h4>Condesa, Cuauhtémoc</h4>
                    <h4>Mexico City, Mexico</h4>
                </div>
            </Container>
        </>
    );
}

export default Location;
