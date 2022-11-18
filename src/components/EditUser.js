import React from "react";
import {useLocation} from "react-router-dom";
import Auth from "../utils/auth";
import {Container, Row, Tabs, Tab} from "react-bootstrap";
import {useQuery} from "@apollo/client";
import {GET_USER} from "../utils/queries";
import Divider from "./Divider";
import Measures from "./Measures";
import LoadingSpinners from "./LoadingSpinners";

import '../assets/css/ManageUsers.css';
import Diets from "./Diets";
import Trainings from "./Trainings";

const EditUser = () => {
    if (!Auth.loggedIn()) {
        window.location.assign('/login');
    }

    if (!Auth.isAdmin()) {
        window.location.assign('/profile');
    }

    const {state} = useLocation();
    const {id} = state;
    const {loading, data} = useQuery(GET_USER, {
        variables: {userId: id}
    });

    let userData;
    if (!loading) {
        userData = data.user;
    }
    else {
        return (
            <LoadingSpinners/>
        );
    }

    return (
        <Container>
            <Row>
                <h2>Editing <span id={'profileName'}>{`${userData.firstName} ${userData.lastName}`}</span></h2>
            </Row>
            <Divider/>
            <Tabs defaultActiveKey={'measures'} justify>
                <Tab eventKey={'measures'} title={'Measures'}>
                    <Measures edit={true} userId={id}/>
                </Tab>
                <Tab eventKey={'diets'} title={'Diets'}>
                    <Diets edit={true} userId={id}/>
                </Tab>
                <Tab eventKey={'trainings'} title={'Trainings'}>
                    <Trainings edit={true} userId={id}/>
                </Tab>
            </Tabs>
        </Container>
    );
}

export default EditUser;