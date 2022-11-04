import React from "react";
import ProfileSections from "../components/ProfileSections";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import Auth from "../utils/auth";
import {useQuery} from "@apollo/client";
import {GET_ME} from "../utils/queries";
import Measures from "../components/Measures";

const ProfilePage = (props) => {
    if (!Auth.loggedIn()) {
        window.location.assign('/login');
    }

    const {loading, data} = useQuery(GET_ME);
    let userData;

    const renderSection = (props) => {
        switch (props.section) {
            case 'measures':
                return <Measures/>;
            case 'diets':
                return <h1>Diets</h1>;
            case 'trainings':
                return <h1>Trainings</h1>;
            case 'settings':
                return <h1>Settings</h1>;
            case 'manage':
                return <h1>Manage users</h1>;
            default:
                return <h1>Settings</h1>
        }
    }

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
            <Container fluid>
                <Row className={'d-flex align-items-center'}>
                    <Col className={'col-lg-2'}>
                        <ProfileSections userData={userData}/>
                    </Col>
                    <Col className={'offset-lg-1 col-lg-8'}>
                        {renderSection(props)}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProfilePage;