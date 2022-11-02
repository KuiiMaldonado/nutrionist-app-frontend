import React, {useEffect, useState} from "react";
import {Container, Image} from "react-bootstrap";

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
                <h1 className={'mt-3 mb-3'}>Oooops! Page not found</h1>
                <Image rounded className={'mb-3'} src={dogPath}></Image>
            </Container>
        </>
    )
}

export default NotFound;