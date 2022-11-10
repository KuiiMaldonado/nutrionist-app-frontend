import React, {useEffect, useState} from "react";
import {Button, Container, ListGroup, ListGroupItem, Modal, Row} from "react-bootstrap";
import Auth from "../utils/auth";
import {useQuery, useMutation} from "@apollo/client";
import {GET_ALL_USERS} from "../utils/queries";
import {DELETE_PROFILE} from "../utils/mutations";
import LoadingSpinners from "./LoadingSpinners";
import {faUserPen, faUserSlash, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import '../assets/css/ManageUsers.css';
import Divider from "./Divider";
import {useNavigate} from "react-router-dom";

const ManageUsers = () => {
    if (!Auth.loggedIn()) {
        window.location.assign('/login');
    }

    if (!Auth.isAdmin()) {
        window.location.assign('/profile');
    }

    const {loading, data, refetch} = useQuery(GET_ALL_USERS);
    const [deleteProfile] = useMutation(DELETE_PROFILE);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        refetch().then((result) => {
            console.log('Re-fetching')
        });
    });

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleModal = async (userId) => {
        handleShow();
        setDeleteId(userId);
    }

    const handleDeleteUser = async () => {
        try {
            const {data} = await deleteProfile({
                variables: {userId: deleteId}
            });
            if (!data) {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            console.error(error);
        }
        handleClose();
    }

    if (loading) {
        return (
            <LoadingSpinners/>
        );
    }
    return (
        <Container>
            <Modal centered show={showModal}>
                <Modal.Header>
                    <Modal.Title>Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Deleting user</h5>
                    <p>
                        You are about to delete the user. This action can not be undone.
                        Do you want to proceed?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'secondary'} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant={'danger'} onClick={handleDeleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row>
                <h2>Manage users</h2>
            </Row>
            <Divider/>
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
                                <button className={'user-button edit'} onClick={() => navigate('editUser', {state: {id: user._id}})}>
                                    <FontAwesomeIcon icon={faUserPen} size={'xl'}/>
                                </button>
                                <button className={'user-button delete'} onClick={() => handleModal(user._id)}>
                                    <FontAwesomeIcon icon={faUserSlash} size={'xl'}/>
                                </button>
                            </div>
                        </ListGroupItem>
                    );
                })}
                <ListGroupItem as={'li'}>
                    <div className={'text-center'}>
                        <button className={'user-button add'} onClick={() => window.location.assign(window.location.pathname + '/addUser')}>
                            <FontAwesomeIcon icon={faUserPlus} size={'xl'}/>
                        </button>
                    </div>
                </ListGroupItem>
            </ListGroup>
        </Container>
    );
}

export default ManageUsers;