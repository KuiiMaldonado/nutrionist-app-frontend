import React, {createContext, useEffect, useState} from "react";
import ProfileSections from "../components/ProfileSections";
import {Col, Container, Row} from "react-bootstrap";
import Auth from "../utils/auth";
import {useQuery} from "@apollo/client";
import {GET_ME} from "../utils/queries";
import Measures from "../components/Measures";
import AccountSettings from "../components/AccountSettings";
import ManageUsers from "../components/ManageUsers";
import LoadingSpinners from "../components/LoadingSpinners";
import AddUser from "../components/AddUser";
import EditUser from "../components/EditUser";
import AddMeasure from "../components/AddMeasure";
import Diets from "../components/Diets";
import Trainings from "../components/Trainings";
export const ProfileContext = createContext();

const ProfilePage = (props) => {
    if (!Auth.loggedIn()) {
        window.location.assign('/login');
    }
    let userData;
    const [isUpdated, setIsUpdated] = useState(false);
    const {loading, data, refetch} = useQuery(GET_ME);

    useEffect(() => {
        if (isUpdated) {
            refetch().then();
        }
    }, [isUpdated, refetch])

    const renderSection = (props) => {
        switch (props.section) {
            case 'measures':
                return <Measures userId={userData._id}/>;
            case 'diets':
                return <Diets/>;
            case 'trainings':
                return <Trainings/>;
            case 'settings':
                return <AccountSettings user={userData}/>;
            case 'manage':
                return <ManageUsers/>;
            case 'addUser':
                return <AddUser/>;
            case 'addMeasure':
                return <AddMeasure/>
            case 'editUser':
                return <EditUser/>
            default:
                return <AccountSettings user={userData}/>;
        }
    }

    if (!loading) {
        userData = data.me;
    }
    else {
        return (
            <LoadingSpinners/>
        );
    }
    return (
        <>
            <ProfileContext.Provider value={[isUpdated, setIsUpdated]}>
                <Container fluid>
                    <Row className={'mt-3'}>
                        <Col sm={12} md={3} lg={2}>
                            <ProfileSections userData={userData}/>
                        </Col>
                        <Col sm={12} md={9} lg={{span: 8, offset: 1}}>
                            {renderSection(props)}
                        </Col>
                    </Row>
                </Container>
            </ProfileContext.Provider>
        </>
    )
}

export default ProfilePage;