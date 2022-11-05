import React from "react";
import {Col, Container, Row} from "react-bootstrap";

const AccountSettings = (props) => {
    return (
        <Container >
            <form>
                <Row className={'mb-3'}>
                    <Col className={'col-6'}>
                        <Row>
                            <h6>Username</h6>
                        </Row>
                        <input type={'text'} className={'form-control'}/>
                    </Col>
                </Row>
                <Row className={'mb-3'}>
                    <Col className={'col-6'}>
                        <Row>
                            <label>Email</label>
                        </Row>
                        <input type={'email'} className={'form-control'}/>
                    </Col>
                </Row>
                <Row className={'mb-3'}>
                    <Col className={'col-6'}>
                        <label>First Name</label>
                        <input type={'text'} className={'form-control'}/>
                    </Col>
                </Row>
                <Row className={'mb-3'}>
                    <Col className={'col-6'}>
                        <label>Last Name</label>
                        <input type={'text'} className={'form-control'}/>
                    </Col>
                </Row>
                <Row className={'mb-3'}>
                    <Col className={'col-6'}>
                        <Row>
                            <label>Password</label>
                        </Row>
                        <input type={'password'} className={'form-control'}/>
                    </Col>
                </Row>
            </form>
        </Container>
    );
}

export default AccountSettings;