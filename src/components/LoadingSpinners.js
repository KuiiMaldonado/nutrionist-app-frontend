import React from "react";
import {Col, Container, Row, Spinner} from "react-bootstrap";

const LoadingSpinners = () => {
    return (
        <Container>
            <Row>
                <Col className={'text-center mt-5'}>
                    <Spinner animation="grow"/>
                    <Spinner animation="grow"/>
                    <Spinner animation="grow"/>
                </Col>
            </Row>
        </Container>
    );
}

export default LoadingSpinners;