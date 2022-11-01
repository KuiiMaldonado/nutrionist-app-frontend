import React from "react";
import ProfileSections from "../components/ProfileSections";
import Measures from "../components/Measures";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import Auth from "../utils/auth";
import {useQuery} from "@apollo/client";
import {GET_ME} from "../utils/queries";

const ProfilePage = () => {
    if (!Auth.loggedIn()) {
        window.location.assign('/login');
    }

    const {loading, data} = useQuery(GET_ME);
    let userData;

    if (!loading) {
        userData = data.me;
    }
    else {
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
    return (
        <>
            <Container>
                <Row className={'d-flex align-items-center'}>
                    <Col className={'col-lg-3'}>
                        <ProfileSections userData={userData}/>
                    </Col>
                    {/*<Col className={'offset-lg-1 col-lg-8'}>*/}
                    {/*    <Measures/>*/}
                    {/*</Col>*/}
                </Row>
            </Container>
        </>
    )
}

export default ProfilePage;