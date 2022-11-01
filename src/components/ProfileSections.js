import React from "react";
import {Container, Row} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faAt, faGear, faUtensils, faDumbbell, faUsersGear, faWeightScale} from '@fortawesome/free-solid-svg-icons';
import Avatar from "./Avatar";
import Divider from "./Divider";

const ProfileSections = (props) => {
    return (
        <Container>
            <Row className={'mt-4'}>
                <Avatar size={'200px'}/>
            </Row>
            <Row className={'mt-2'}>
                <h4>{`${props.userData.firstName} ${props.userData.lastName}`}</h4>
            </Row>
            <Row className={'mt-1'}>
                <span className={'d-inline-flex'}>
                    <FontAwesomeIcon icon={faUser} size={'xl'}/>
                    <h5 className={'ms-2'}>{`${props.userData.username}`}</h5>
                </span>
            </Row>
            <Row className={'mt-1'}>
                <span className={'d-inline-flex'}>
                    <FontAwesomeIcon icon={faAt} size={'xl'}/>
                    <h5 className={'ms-2'}>{`${props.userData.email}`}</h5>
                </span>
            </Row>
            <Divider/>
            <Row className={'mt-1'}>
                <span className={'d-inline-flex'}>
                    <FontAwesomeIcon icon={faWeightScale} size={'xl'}/>
                    <h5 className={'ms-2'}>Measures</h5>
                </span>
            </Row>
            <Row className={'mt-1'}>
                <span className={'d-inline-flex'}>
                    <FontAwesomeIcon icon={faUtensils} size={'xl'}/>
                    <h5 className={'ms-2'}>Diets</h5>
                </span>
            </Row>
            <Row className={'mt-1'}>
                <span className={'d-inline-flex'}>
                    <FontAwesomeIcon icon={faDumbbell} size={'xl'}/>
                    <h5 className={'ms-2'}>Trainings</h5>
                </span>
            </Row>
            <Divider/>
            <Row className={'mt-1'}>
                <span className={'d-inline-flex'}>
                    <FontAwesomeIcon icon={faGear} size={'xl'}/>
                    <h5 className={'ms-2'}>Account</h5>
                </span>
            </Row>
            {props.userData.isAdmin && (
                <>
                    <Divider/>
                    <Row className={'mt-1'}>
                        <span className={'d-inline-flex'}>
                            <FontAwesomeIcon icon={faUsersGear} size={'xl'}/>
                            <h5 className={'ms-2'}>Manage users</h5>
                        </span>
                    </Row>
                </>
            )}
        </Container>
    );
}

export default ProfileSections;