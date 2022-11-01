import React from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
import Auth from "../utils/auth";
import Avatar from "./Avatar";

import logo from '../assets/images/logo.jpg';
import '../assets/css/NavigationBar.css';

const NavigationBar = () => {
    const user = Auth.loggedIn();
    return (
        <Navbar className={'custom-navbar'} collapseOnSelect expand='lg' variant='dark'>
            <Container>
                <Navbar.Brand as={Link} to={'/'}><img src={logo} alt={'Metpro brand logo'}/></Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link className={'custom-navLink'} as={Link} to={'/meet-us'}>Our team</Nav.Link>
                        <Nav.Link className={'custom-navLink'} as={Link} to={'/contact-us'}>Contact us</Nav.Link>
                        <Nav.Link className={'custom-navLink'} as={HashLink} to={'#socialMediaContainer'} smooth>Stay tuned</Nav.Link>
                        {user &&
                            <Nav.Link className={'custom-navLink'} onClick={Auth.logout}>Logout</Nav.Link>
                        }
                    </Nav>
                    <Nav>
                        {user ? (
                            <Nav.Link className={'custom-navLink'} as={Link} to={'/profile'}>
                                <Avatar size={'100px'}/>
                            </Nav.Link>
                        ) : (
                            <Nav.Link className={'custom-navLink'} href={'/login'}>Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;