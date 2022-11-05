import React, {useEffect, useState} from "react";
import {Button, Col, Container, Image, Row} from "react-bootstrap";

const NotFound = () => {
    const[dogPath, setDogPath] = useState('');

    useEffect(() => {
        fetch('https://dog.ceo/api/breeds/image/random').then(response => {
            response.json().then(data => {
                setDogPath(data.message);
            });
        });
    }, [])
    return (
        <>
            <Container className={'text-center'}>
                <Row>
                    <Col className={'offset-3 col-6'}>
                        <h1 className={'mt-3 mb-3'}>Oooops! Page not found</h1>
                        <Image rounded className={'mb-3'} src={dogPath}></Image>
                    </Col>
                </Row>
                <Row>
                    <Col className={'offset-3 col-6'}>
                        <Button variant={'success'} className={'mb-3'} href={'/'}>Back to main page</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default NotFound;