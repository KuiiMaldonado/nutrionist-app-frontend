import React, {createContext, useEffect, useState} from "react";
import ProfileSections from "../components/ProfileSections";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import Auth from "../utils/auth";
import {useQuery} from "@apollo/client";
import {GET_ME} from "../utils/queries";
import Measures from "../components/Measures";
import AccountSettings from "../components/AccountSettings";
import ManageUsers from "../components/ManageUsers";
import LoadingSpinners from "../components/LoadingSpinners";
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
            refetch().then((result) => {
                console.log('Re-fetching')
            });
        }
    }, [isUpdated, refetch])

    const renderSection = (props) => {
        switch (props.section) {
            case 'measures':
                return <Measures/>;
            case 'diets':
                return <h1>Diets</h1>;
            case 'trainings':
                return <h1>Trainings</h1>;
            case 'settings':
                return <AccountSettings user={userData}/>;
            case 'manage':
                return <ManageUsers/>;
            default:
                return <h1>Settings</h1>
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
                    <Row className={'d-flex mt-3'}>
                        <Col className={'col-lg-2'}>
                            <ProfileSections userData={userData}/>
                        </Col>
                        <Col className={'offset-lg-1 col-lg-8'}>
                            {renderSection(props)}
                        </Col>
                    </Row>
                </Container>
            </ProfileContext.Provider>
        </>
    )
}

export default ProfilePage;