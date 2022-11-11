import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import Auth from "../utils/auth";
import {Container, Row, Tabs, Tab} from "react-bootstrap";
import {useQuery, useMutation} from "@apollo/client";
import {GET_USER} from "../utils/queries";
import Divider from "./Divider";
import Measures from "./Measures";
import LoadingSpinners from "./LoadingSpinners";

import '../assets/css/ManageUsers.css';

const EditUser = () => {
    if (!Auth.loggedIn()) {
        window.location.assign('/login');
    }

    if (!Auth.isAdmin()) {
        window.location.assign('/profile');
    }

    const {state} = useLocation();
    const {id} = state;
    const {loading, data, refetch} = useQuery(GET_USER, {
        variables: {userId: id}
    });

    useEffect(() => {
       refetch().then(() => {

       })
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
                    <Measures measures={userData.userMeasures} edit={true}/>
                </Tab>
                <Tab eventKey={'diets'} title={'Diets'}>
                    <h1>Diets</h1>
                </Tab>
                <Tab eventKey={'trainings'} title={'Trainings'}>
                    <h1>Trainings</h1>
                </Tab>
            </Tabs>
        </Container>
    );
}

export default EditUser;