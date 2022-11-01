import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons';

import '../assets/css/SocialMedia.css'

const SocialMedia = () => {
    return (
        <Container className={'text-center'}>
            <div className={'row'}>
                <h1>Follow us:</h1>
            </div>
            <div className={'row'} id={'socialMediaContainer'}>
                <ul>
                    <div className={'col-3'}>
                        <a id={'facebookIcon'} href={'https://www.facebook.com/metaproj'} rel={'noreferrer'} target={'_blank'}>
                            <li><FontAwesomeIcon icon={faFacebook} /></li>
                        </a>
                    </div>
                    <div className={'col-3'}>
                        <a id={'instagramIcon'} href={'https://www.instagram.com/metaproj/'} rel={'noreferrer'} target={'_blank'}>
                            <li><FontAwesomeIcon icon={faInstagram} /></li>
                        </a>
                    </div>
                    <div className={'col-3'}>
                        <a id={'youtubeIcon'} href={'https://www.youtube.com'} rel={'noreferrer'} target={'_blank'}>
                            <li><FontAwesomeIcon icon={faYoutube} /></li>
                        </a>
                    </div>
                    <div className={'col-3'}>
                        <a id={'twitterIcon'} href={'https://www.twitter.com'} rel={'noreferrer'} target={'_blank'}>
                            <li><FontAwesomeIcon icon={faTwitter} /></li>
                        </a>
                    </div>
                </ul>
            </div>
        </Container>
    );
}

export default SocialMedia;