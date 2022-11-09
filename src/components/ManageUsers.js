import React from "react";
import {Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import Auth from "../utils/auth";
import {useQuery} from "@apollo/client";
import {GET_ALL_USERS} from "../utils/queries";
import LoadingSpinners from "./LoadingSpinners";
import {faUserPen, faUserSlash, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import '../assets/css/ManageUsers.css';

const ManageUsers = () => {
    if (!Auth.loggedIn()) {
        window.location.assign('/login');
    }

    if (!Auth.isAdmin()) {
        window.location.assign('/profile');
    }

    const {loading, data} = useQuery(GET_ALL_USERS);

    if (loading) {
        return (
            <LoadingSpinners/>
        );
    }
    return (
        <Container>
            <Row>
                <h2>Manage users</h2>
            </Row>
            <ListGroup as={'ul'}>
                {data.users.map((user) => {
                    return (
                        <ListGroupItem key={user._id} as={'li'} className={'d-flex justify-content-between align-items-start'}>
                            <div>
                                <div>
                                    <h6>{`${user.firstName} ${user.lastName}`}</h6>
                                </div>
                                {user.email}
                            </div>
                            <div>
                                <button className={'user-button edit'}>
                                    <FontAwesomeIcon icon={faUserPen} size={'xl'}/>
                                </button>
                                <button className={'user-button delete'}>
                                    <FontAwesomeIcon icon={faUserSlash} size={'xl'}/>
                                </button>
                            </div>
                        </ListGroupItem>
                    );
                })}
                <ListGroupItem as={'li'}>
                    <div className={'text-center'}>
                        <button className={'user-button add'}>
                            <FontAwesomeIcon icon={faUserPlus} size={'xl'}/>
                        </button>
                    </div>
                </ListGroupItem>
            </ListGroup>
        </Container>
    );
}

export default ManageUsers;