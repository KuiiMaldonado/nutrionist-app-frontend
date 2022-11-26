import React, {useState} from "react";
import {Button, Container} from "react-bootstrap";

import '../assets/css/Footer.css';

const Footer = () => {

    const [topButtonStatus, setTopButtonStatus] = useState('none')

    window.onscroll = () => {
        if (document.documentElement.scrollTop > 50)
            setTopButtonStatus('block')
        else
            setTopButtonStatus('none')
    }

    function topFunction() {
        document.documentElement.scrollTop = 0;
    }

    return (
        <footer>
            <Container>
                <div className={'row'}>
                    <div className={'col-10'}>
                        <p>
                            Developed by: <b>KuiiMaldonado</b>&copy; 2022 - All rights reserved
                        </p>
                    </div>
                    <div className={'col-2'}>
                        <Button variant={'secondary'} style={{display: topButtonStatus}} size={'sm'} onClick={topFunction} id={'backTopButton'}>Back top ^</Button>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;